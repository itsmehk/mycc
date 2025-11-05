"""
Questions API endpoint
"""

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.data.questions import QUESTIONS

router = APIRouter()

@router.get("/")
async def get_questions():
    """
    Get all quiz questions
    """
    return JSONResponse(content=QUESTIONS)
