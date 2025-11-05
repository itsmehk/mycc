"""
Recommendations API endpoint
"""

from fastapi import APIRouter, HTTPException
from app.models.schemas import RecommendationRequest, RecommendationResponse
from app.services.recommendation import RecommendationService
import logging

logger = logging.getLogger(__name__)

router = APIRouter()
recommendation_service = RecommendationService()

@router.post("/", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    """
    Get personalized credit card recommendations based on user data
    """
    try:
        logger.info(f"Processing recommendation request for user: {request.userData.name}")

        # Validate user data
        if not request.userData.incomeValue:
            raise HTTPException(status_code=400, detail="Income value is required")

        # Get recommendations
        result = recommendation_service.get_recommendations(request.userData)

        logger.info(f"Generated {len(result['recommendations'])} recommendations")

        return RecommendationResponse(**result)

    except Exception as e:
        logger.error(f"Error generating recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate recommendations: {str(e)}")
