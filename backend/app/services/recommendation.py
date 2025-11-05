"""
Recommendation Service
Business logic for credit card matching and scoring
"""

from typing import List, Dict, Any
from app.models.schemas import UserData, CardRecommendation
from app.data.cards import CARD_DATABASE
import random


class RecommendationService:
    """Service for generating credit card recommendations"""

    def __init__(self):
        self.cards = CARD_DATABASE

    def calculate_eligibility(self, card: Dict[str, Any], user_data: UserData) -> str:
        """
        Calculate eligibility score: high, medium, or low
        """
        score = 0
        income_value = user_data.incomeValue or 0
        credit_score_value = user_data.creditScoreValue or 600

        # Income scoring
        if income_value >= card["minIncome"] * 1.5:
            score += 40
        elif income_value >= card["minIncome"] * 1.2:
            score += 30
        elif income_value >= card["minIncome"]:
            score += 20
        else:
            score += 5

        # Credit score scoring
        if credit_score_value >= card["minCreditScore"]:
            score += 30
        elif credit_score_value >= card["minCreditScore"] - 50:
            score += 15
        else:
            score += 5

        # Existing cards boost
        card_count = user_data.cardCount or 0
        if card_count > 0:
            score += 15
        if card_count >= 2:
            score += 15

        # Determine eligibility
        if score >= 70:
            return "high"
        elif score >= 50:
            return "medium"
        else:
            return "low"

    def calculate_match_score(self, card: Dict[str, Any], user_data: UserData) -> float:
        """
        Calculate match score (0-100) based on user preferences
        """
        score = 0.0

        # Category match (30 points per match)
        categories = user_data.spendingCategories or []
        category_matches = [cat for cat in categories if cat in card["categories"]]
        score += len(category_matches) * 30

        # Goal match (25 points)
        goals = user_data.primaryGoal
        if isinstance(goals, str):
            goals = [goals]
        if goals and any(g in card["goals"] for g in goals):
            score += 25

        # Payment preference match (20 points)
        payment_prefs = user_data.paymentPreference or []
        if any(p in card["paymentMethods"] for p in payment_prefs):
            score += 20

        # Eligibility boost (20 points)
        eligibility = self.calculate_eligibility(card, user_data)
        if eligibility == "high":
            score += 20
        elif eligibility == "medium":
            score += 10

        # Affordability boost (15 points)
        monthly_spend = user_data.monthlySpendValue or 0
        annual_fee = card["annualFee"]
        if annual_fee == 0:
            score += 15
        elif monthly_spend > 0:
            affordability = (monthly_spend * 12) / max(annual_fee, 1)
            if affordability > 100:
                score += 15

        return min(score, 100)

    def generate_match_criteria(self, card: Dict[str, Any], user_data: UserData) -> List[str]:
        """
        Generate human-readable match criteria
        """
        criteria = []

        # Category matches
        categories = user_data.spendingCategories or []
        category_matches = [cat for cat in categories if cat in card["categories"]]
        if category_matches:
            category_labels = {
                "shopping": "shopping",
                "travel": "travel",
                "dining": "dining",
                "groceries": "groceries",
                "fuel": "fuel",
                "entertainment": "entertainment",
                "bills": "bills & utilities",
                "luxury": "luxury & fashion"
            }
            matched = ", ".join([category_labels.get(c, c) for c in category_matches[:2]])
            criteria.append(f"You spend on {matched}")

        # Goal matches
        goals = user_data.primaryGoal
        if isinstance(goals, str):
            goals = [goals]
        goal_matches = [g for g in (goals or []) if g in card["goals"]]
        if goal_matches:
            goal_labels = {
                "cashback": "cashback",
                "rewards": "rewards",
                "travel": "travel benefits",
                "lifestyle": "lifestyle perks",
                "lowfee": "low fees"
            }
            matched = " and ".join([goal_labels.get(g, g) for g in goal_matches[:2]])
            criteria.append(f"Your goal is {matched}")

        # Payment preference matches
        payment_prefs = user_data.paymentPreference or []
        payment_matches = [p for p in payment_prefs if p in card["paymentMethods"]]
        if payment_matches:
            payment_labels = {
                "card_swipe": "card swipe",
                "online": "online payments",
                "mobile_wallet": "mobile wallets",
                "food_delivery": "food delivery",
                "ecommerce": "e-commerce"
            }
            matched = " and ".join([payment_labels.get(p, p) for p in payment_matches[:2]])
            criteria.append(f"You prefer {matched}")

        # Eligibility
        eligibility = self.calculate_eligibility(card, user_data)
        if eligibility == "high":
            criteria.append("Your income qualifies you strongly")
        elif eligibility == "medium":
            criteria.append("Your income meets requirements")

        return criteria[:4]  # Return top 4 criteria

    def generate_gamified_tagline(self, user_data: UserData, recommendations: List[CardRecommendation]) -> str:
        """
        Generate a fun, personalized tagline
        """
        taglines = [
            f"🎯 We found {len(recommendations)} perfect matches for you!",
            f"✨ Your personalized card portfolio is ready!",
            f"🚀 {len(recommendations)} cards that maximize your rewards!",
            f"💎 Premium picks tailored just for you!",
            f"🎊 Match complete! Here are your top {len(recommendations)} cards!"
        ]

        # Customize based on user profile
        spending_categories = user_data.spendingCategories or []
        if "travel" in spending_categories:
            taglines.append("✈️ Travel rewards optimized for your lifestyle!")
        if "dining" in spending_categories:
            taglines.append("🍽️ Maximum dining rewards await!")
        if "shopping" in spending_categories:
            taglines.append("🛍️ Shopping cashback maximized!")

        return random.choice(taglines)

    def get_recommendations(self, user_data: UserData) -> Dict[str, Any]:
        """
        Get personalized credit card recommendations
        """
        recommendations = []

        for card in self.cards:
            match_score = self.calculate_match_score(card, user_data)
            eligibility = self.calculate_eligibility(card, user_data)
            match_criteria = self.generate_match_criteria(card, user_data)

            # Calculate break-even monthly spend
            break_even = None
            if card["annualFee"] > 0 and card["effectiveRewardRate"] > 0:
                break_even = int((card["annualFee"] / card["effectiveRewardRate"]) / 12)

            recommendation = CardRecommendation(
                **card,
                matchScore=match_score,
                eligibility=eligibility,
                matchCriteria=match_criteria,
                breakEvenMonthlySpend=break_even
            )
            recommendations.append(recommendation)

        # Sort by match score (descending)
        recommendations.sort(key=lambda x: x.matchScore, reverse=True)

        # Take top 6 recommendations
        top_recommendations = recommendations[:6]

        # Generate gamified tagline
        tagline = self.generate_gamified_tagline(user_data, top_recommendations)

        return {
            "recommendations": top_recommendations,
            "userProfile": user_data,
            "gamifiedTagline": tagline
        }
