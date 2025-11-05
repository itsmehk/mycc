"""
Credit Card Database
Contains all available credit cards with their features and requirements
"""

CARD_DATABASE = [
    {
        "name": "HDFC Infinia",
        "bank": "HDFC Bank",
        "bankCode": "hdfc",
        "cardImageKey": "hdfc_infinia",
        "minIncome": 1500000,
        "minCreditScore": 750,
        "annualFee": 12500,
        "estimatedValue": 95000,
        "effectiveRewardRate": 0.033,
        "features": [
            "3.33-33.3% rewards on all spends",
            "Best overall premium card per TechnoFino",
            "Unlimited lounge access worldwide",
            "Superior redemption value on travel"
        ],
        "detailedPerks": [
            {
                "icon": "fas fa-gift",
                "title": "3.33% Base Rewards",
                "desc": "Earn 3.33 reward points per ₹150 spent, worth ₹5 when redeemed for flights/hotels"
            },
            {
                "icon": "fas fa-plane-departure",
                "title": "Premium Lounge Access",
                "desc": "Unlimited domestic & international lounge access with Priority Pass for you and a guest"
            },
            {
                "icon": "fas fa-hotel",
                "title": "Luxury Hotel Benefits",
                "desc": "Complimentary room upgrades, late checkout, and breakfast at 1000+ luxury hotels"
            },
            {
                "icon": "fas fa-star",
                "title": "Milestone Rewards",
                "desc": "Up to 33.3% rewards on milestone spends through bonus reward points"
            },
            {
                "icon": "fas fa-shield-alt",
                "title": "Comprehensive Insurance",
                "desc": "Travel insurance, lost card liability, purchase protection, and air accident cover"
            }
        ],
        "type": "premium",
        "categories": ["travel", "dining", "shopping", "luxury"],
        "goals": ["rewards", "travel", "lifestyle"],
        "paymentMethods": ["card_swipe", "online", "mobile_wallet"],
        "affiliateTag": "cardmatch_hdfc_inf",
        "partnerId": "HDFC_PARTNER_001",
        "applyUrl": "https://example.com/apply/hdfc-infinia"
    },
    {
        "name": "SBI Cashback",
        "bank": "SBI Card",
        "bankCode": "sbi",
        "cardImageKey": "sbi_cashback",
        "minIncome": 500000,
        "minCreditScore": 700,
        "annualFee": 999,
        "estimatedValue": 30000,
        "effectiveRewardRate": 0.05,
        "features": [
            "5% cashback on online spends (₹5K monthly cap)",
            "1% cashback on offline spends",
            "Simple, no-frills rewards structure",
            "Community favorite on TechnoFino"
        ],
        "detailedPerks": [
            {
                "icon": "fas fa-percent",
                "title": "5% Online Cashback",
                "desc": "Earn 5% cashback on all online spends including e-commerce, food delivery, and bill payments (₹5,000 monthly cap)"
            },
            {
                "icon": "fas fa-credit-card",
                "title": "1% Offline Cashback",
                "desc": "Earn 1% cashback on all offline retail and swipe transactions with no category restrictions"
            },
            {
                "icon": "fas fa-infinity",
                "title": "No Reward Expiry",
                "desc": "Cashback credited directly to your statement - no reward points to track or redeem"
            },
            {
                "icon": "fas fa-tag",
                "title": "Low Annual Fee",
                "desc": "Just ₹999 annual fee, easily waived on ₹2L annual spends"
            },
            {
                "icon": "fas fa-bolt",
                "title": "Instant Rewards",
                "desc": "Cashback credited within 90 days of transaction date, no complicated redemption process"
            }
        ],
        "type": "standard",
        "categories": ["shopping"],
        "goals": ["cashback", "lowfee"],
        "paymentMethods": ["online", "ecommerce"],
        "affiliateTag": "cardmatch_sbi_cash",
        "partnerId": "SBI_PARTNER_001",
        "applyUrl": "https://example.com/apply/sbi-cashback"
    },
    {
        "name": "Axis Magnus",
        "bank": "Axis Bank",
        "bankCode": "axis",
        "cardImageKey": "axis_magnus",
        "minIncome": 1500000,
        "minCreditScore": 750,
        "annualFee": 10000,
        "estimatedValue": 88000,
        "effectiveRewardRate": 0.048,
        "features": [
            "12 Edge Rewards per ₹200 (4.8% value)",
            "Excellent transfer partners for travel",
            "Milestone benefits up to ₹1L annual spend",
            "Premium travel lounges"
        ],
        "detailedPerks": [
            {
                "icon": "fas fa-gem",
                "title": "12 Edge Rewards/₹200",
                "desc": "Earn accelerated Edge Rewards with excellent redemption value through airline transfer partners"
            },
            {
                "icon": "fas fa-plane",
                "title": "Travel Transfer Partners",
                "desc": "Transfer points to airlines like Singapore Airlines, Vistara at 5:2 or 5:4 ratio for maximum value"
            },
            {
                "icon": "fas fa-trophy",
                "title": "Milestone Benefits",
                "desc": "Earn up to 25,000 bonus points on achieving annual spend milestones"
            },
            {
                "icon": "fas fa-building-columns",
                "title": "Premium Lounge Access",
                "desc": "Complimentary domestic and international lounge access with Priority Pass"
            },
            {
                "icon": "fas fa-concierge-bell",
                "title": "Concierge Services",
                "desc": "24/7 premium concierge for travel bookings, dining reservations, and lifestyle assistance"
            }
        ],
        "type": "premium",
        "categories": ["travel", "dining", "shopping"],
        "goals": ["rewards", "travel"],
        "paymentMethods": ["card_swipe", "online", "mobile_wallet"],
        "affiliateTag": "cardmatch_axis_mag",
        "partnerId": "AXIS_PARTNER_001",
        "applyUrl": "https://example.com/apply/axis-magnus"
    },
    {
        "name": "Amazon Pay ICICI",
        "bank": "ICICI Bank",
        "bankCode": "icici",
        "cardImageKey": "amazon_icici",
        "minIncome": 300000,
        "minCreditScore": 650,
        "annualFee": 0,
        "estimatedValue": 18000,
        "effectiveRewardRate": 0.05,
        "features": [
            "5% cashback on Amazon with Prime",
            "2% cashback on Amazon Pay payments",
            "Lifetime free - no annual fee",
            "Instant digital card approval"
        ],
        "detailedPerks": [
            {
                "icon": "fas fa-amazon",
                "title": "5% Amazon Cashback",
                "desc": "Earn 5% unlimited cashback on Amazon.in purchases if you have Prime membership"
            },
            {
                "icon": "fas fa-wallet",
                "title": "2% Amazon Pay Cashback",
                "desc": "Get 2% cashback on Amazon Pay transactions at partner merchants"
            },
            {
                "icon": "fas fa-shopping-bag",
                "title": "1% Everywhere Cashback",
                "desc": "Earn 1% cashback on all other purchases with no category restrictions"
            },
            {
                "icon": "fas fa-tags",
                "title": "Lifetime Free",
                "desc": "Zero annual fee, no minimum spend requirement, completely free to own and use"
            },
            {
                "icon": "fas fa-mobile-alt",
                "title": "Instant Digital Approval",
                "desc": "Get instant digital card for immediate use on Amazon and other online platforms"
            }
        ],
        "type": "standard",
        "categories": ["shopping"],
        "goals": ["cashback", "lowfee"],
        "paymentMethods": ["online", "ecommerce", "mobile_wallet"],
        "affiliateTag": "cardmatch_icici_amz",
        "partnerId": "ICICI_PARTNER_001",
        "applyUrl": "https://example.com/apply/amazon-pay-icici"
    },
    {
        "name": "HDFC Swiggy",
        "bank": "HDFC Bank",
        "bankCode": "hdfc",
        "cardImageKey": "hdfc_swiggy",
        "minIncome": 300000,
        "minCreditScore": 650,
        "annualFee": 0,
        "estimatedValue": 18000,
        "effectiveRewardRate": 0.10,
        "features": [
            "10% cashback on Swiggy (₹1,500 monthly cap)",
            "5% cashback on Swiggy partner brands",
            "Lifetime free card",
            "Instant digital approval"
        ],
        "detailedPerks": [
            {
                "icon": "fas fa-utensils",
                "title": "10% Swiggy Cashback",
                "desc": "Earn 10% cashback on all Swiggy food delivery and dining orders (₹1,500 monthly cap)"
            },
            {
                "icon": "fas fa-store",
                "title": "5% Partner Brands",
                "desc": "Get 5% cashback on purchases from Swiggy partner brands across categories"
            },
            {
                "icon": "fas fa-shopping-cart",
                "title": "1% Other Spends",
                "desc": "Earn 1% cashback on all other transactions including offline and online purchases"
            },
            {
                "icon": "fas fa-tag",
                "title": "Zero Annual Fee",
                "desc": "Completely free credit card with no annual charges or hidden fees"
            },
            {
                "icon": "fas fa-bolt",
                "title": "Quick Approval",
                "desc": "Fast digital approval process with instant card number for immediate use"
            }
        ],
        "type": "standard",
        "categories": ["dining"],
        "goals": ["cashback", "lowfee"],
        "paymentMethods": ["food_delivery", "online"],
        "affiliateTag": "cardmatch_hdfc_swg",
        "partnerId": "HDFC_PARTNER_002",
        "applyUrl": "https://example.com/apply/hdfc-swiggy"
    },
    {
        "name": "Amex Platinum Travel",
        "bank": "American Express",
        "bankCode": "amex",
        "cardImageKey": "amex_platinum",
        "minIncome": 1200000,
        "minCreditScore": 750,
        "annualFee": 5000,
        "estimatedValue": 65000,
        "effectiveRewardRate": 0.04,
        "features": [
            "₹4,000 Taj hotel voucher annually",
            "8 complimentary airport lounge visits",
            "High travel rewards rate",
            "Most stable rewards program (never devalued)"
        ],
        "detailedPerks": [
            {
                "icon": "fas fa-hotel",
                "title": "₹4,000 Taj Voucher",
                "desc": "Annual Taj hotel voucher worth ₹4,000 effectively reducing your annual fee to just ₹1,000"
            },
            {
                "icon": "fas fa-plane-departure",
                "title": "Airport Lounge Access",
                "desc": "8 complimentary domestic lounge visits per year for you and a guest"
            },
            {
                "icon": "fas fa-gift",
                "title": "High Reward Rate",
                "desc": "Earn 1,000 Membership Rewards points per ₹50 spent with excellent redemption options"
            },
            {
                "icon": "fas fa-shield",
                "title": "Never Devalued",
                "desc": "Amex Membership Rewards program has never been devalued, most stable rewards in India"
            },
            {
                "icon": "fas fa-percent",
                "title": "Welcome Benefits",
                "desc": "Attractive welcome bonus and milestone rewards on meeting spend targets"
            }
        ],
        "type": "standard",
        "categories": ["travel", "dining"],
        "goals": ["travel", "lifestyle"],
        "paymentMethods": ["card_swipe", "online"],
        "affiliateTag": "cardmatch_amex_plt",
        "partnerId": "AMEX_PARTNER_001",
        "applyUrl": "https://example.com/apply/amex-platinum"
    },
    {
        "name": "HSBC Live+",
        "bank": "HSBC Bank",
        "bankCode": "hsbc",
        "cardImageKey": "hsbc_live",
        "minIncome": 800000,
        "minCreditScore": 700,
        "annualFee": 999,
        "estimatedValue": 12000,
        "effectiveRewardRate": 0.10,
        "features": [
            "10% cashback on dining & groceries",
            "10% cashback on entertainment",
            "Fee waiver on ₹2L annual spend",
            "Premium cardholder benefits"
        ],
        "detailedPerks": [
            {
                "icon": "fas fa-utensils",
                "title": "10% Dining Cashback",
                "desc": "Earn 10% cashback on dining transactions at restaurants and food delivery apps"
            },
            {
                "icon": "fas fa-basket-shopping",
                "title": "10% Groceries Cashback",
                "desc": "Get 10% cashback on grocery purchases both online and at supermarkets"
            },
            {
                "icon": "fas fa-film",
                "title": "10% Entertainment",
                "desc": "Enjoy 10% cashback on entertainment including movies, streaming, and events"
            },
            {
                "icon": "fas fa-tag",
                "title": "Fee Waiver",
                "desc": "Annual fee of ₹999 waived on spending ₹2 lakhs annually"
            },
            {
                "icon": "fas fa-credit-card",
                "title": "2% Other Spends",
                "desc": "Earn 2% cashback on all other categories with no restrictions"
            }
        ],
        "type": "standard",
        "categories": ["dining", "groceries", "entertainment"],
        "goals": ["cashback", "lifestyle"],
        "paymentMethods": ["card_swipe", "online", "mobile_wallet"],
        "affiliateTag": "cardmatch_hsbc_live",
        "partnerId": "HSBC_PARTNER_001",
        "applyUrl": "https://example.com/apply/hsbc-live-plus"
    }
]
