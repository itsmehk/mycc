"""
Cards API endpoint
"""

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.data.cards import CARD_DATABASE

router = APIRouter()

@router.get("/")
async def get_all_cards():
    """
    Get all credit cards in the database
    """
    return JSONResponse(content=CARD_DATABASE)

@router.get("/{bank_code}")
async def get_cards_by_bank(bank_code: str):
    """
    Get cards filtered by bank code
    """
    filtered_cards = [card for card in CARD_DATABASE if card["bankCode"] == bank_code.lower()]
    return JSONResponse(content=filtered_cards)
