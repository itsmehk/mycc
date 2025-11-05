from pydantic import BaseModel, Field
from typing import List, Optional, Union, Callable

class QuestionOption(BaseModel):
    value: str
    label: str
    icon: str
    minIncome: Optional[int] = None
    score: Optional[int] = None
    count: Optional[int] = None
    amount: Optional[int] = None

class Question(BaseModel):
    id: str
    type: str
    icon: str
    title: str
    subtitle: str
    field: str
    displayName: str
    min: Optional[int] = None
    max: Optional[int] = None
    placeholder: Optional[str] = None
    options: Optional[List[QuestionOption]] = None

class UserData(BaseModel):
    name: Optional[str] = None
    income: Optional[str] = None
    incomeValue: Optional[int] = None
    creditScore: Optional[str] = None
    creditScoreValue: Optional[int] = None
    existingCards: Optional[str] = None
    cardCount: Optional[int] = None
    spendingCategories: Optional[List[str]] = None
    monthlySpend: Optional[str] = None
    monthlySpendValue: Optional[int] = None
    paymentPreference: Optional[List[str]] = None
    primaryGoal: Optional[Union[str, List[str]]] = None

class CardPerk(BaseModel):
    icon: str
    title: str
    desc: str

class CreditCard(BaseModel):
    name: str
    bank: str
    bankCode: str
    cardImageKey: str
    minIncome: int
    minCreditScore: int
    annualFee: int
    estimatedValue: int
    effectiveRewardRate: float
    features: List[str]
    detailedPerks: List[CardPerk]
    type: str
    categories: List[str]
    goals: List[str]
    paymentMethods: List[str]
    affiliateTag: str
    partnerId: str
    applyUrl: str

class CardRecommendation(CreditCard):
    matchScore: float
    eligibility: str
    matchCriteria: List[str]
    breakEvenMonthlySpend: Optional[int] = None

class RecommendationRequest(BaseModel):
    userData: UserData

class RecommendationResponse(BaseModel):
    recommendations: List[CardRecommendation]
    userProfile: UserData
    gamifiedTagline: str
