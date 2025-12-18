Two-Layer Model 

Layer A — Global Opportunity Feed (which is currently there)

Purpose:
Market sensing
Pattern recognition
“What’s moving in the world”

Characteristics:
Cross-industry
Reg / tech / pain driven
Comparable, scoreable, browseable
This is read-mostly.

Layer B — Company Dashboard (new, high-value surface)

Purpose:
Answer “What should we do?”
Compress weeks of strategy thinking into minutes
Create a natural on-ramp to execution
This is act-oriented.

What a Company Dashboard Should Contain 

🧱 Zone 1: Company Context Snapshot (Auto-Derived)
This sets grounding and trust.

Inputs (mostly public):
Industry, sub-industry
Geography exposure
Revenue band / scale
Regulatory regimes touched
Known tech posture (legacy vs modern signals)
Recent events (funding, expansion, penalties, M&A, hiring)

UI pattern:

Compact “Company Brief” card
Confidence-weighted (what’s inferred vs known)
Editable / correctable by user

🎯 Zone 2: Curated Opportunities for This Company

This is where the LLM does real work.
We are not just filtering the global feed, we are re-projecting it through the company lens.

Each card should answer:

Why this matters to you
What changes if you act / don’t act
What’s the most realistic first build

Sources feeding this zone:
Global WhiteSpace signals
Company context
Industry peers’ moves
Known internal constraints (if provided)

Card anatomy (suggested):

Opportunity title
“Why this is relevant to <Company>”
Impact × Urgency
Regulatory / cost / growth driver
Actionability status (Explore / Prototype Ready / In Progress)
This is where account planning use cases explode in value.

🧪 Zone 3: Factory Artifacts & Prototypes (Gold Layer)


Cards here represent:
Prototypes already built for this company
Or reusable assets adapted to them

Examples:

Clickable UI prototype
API scaffold
Workflow mock
Internal tool MVP
Data model / schema preview

Key idea:

“This isn’t an idea — this already exists in some form.”

Each card should show:
What was built
Which opportunity it maps to
How mature it is (mock / working / deployable)
What’s needed to take it live
This closes the loop between thinking → doing.