🧱 Zone 1: Company Context Snapshot (Auto-Derived)

Company Overview
NSOFT India is a specialized technology company focused on Utility Revenue Maximization for distribution utilities. They help utilities increase revenue, profits, and productivity while reducing losses through smart technology solutions.
Core Business Areas
1. Smart Metering & Revenue Management
TRM (Total Revenue Management): Their flagship head-end software solution that automates billing and collection processes
AMI/Smart Metering Systems: End-to-end solutions using patented Smart IoT modules that convert standard meters into smart meters at low cost
Real-time Energy Auditing: Identifies energy leakages and provides accounting solutions
Field Metering & Billing Services: Complete field operations including mobile applications for data capture
2. Utility Applications
ERP Solutions: Specialized for electric and gas utilities, integrating finance, projects, inventory, and revenue management
Automated Rural Drinking Water Supply: IoT-based systems that automate water supply, reduce operational costs, and provide real-time monitoring
Energy Management Systems: For industrial and commercial consumers with sub-metering and billing capabilities
Mobile/Web Applications: For energy management, bill payments, and customer service
3. Smart Grid Solutions
Communication Networks: RF/GPRS/WiFi modules for establishing communication between meters and head-end systems
Distribution Management: Technical loss reduction using IoT modules and AMI systems
Smart City Applications: Complete IoT ecosystem with modules, devices, sensors, and software
Key Technologies & Innovations
Patented Smart IoT Module
Converts standard DLMS meters into smart meters
Enables bi-directional communication and remote disconnect/reconnect
Works on cellular and RF technologies
Significantly cheaper than conventional smart meters
Communication Networks
Multi-protocol support (RF/WiFi/GSM)
Optimized for different topographies
Scalable and robust data transmission
Additional Services
e-Governance Solutions: Workflow automation for public service commissions
EV Charging Station Management: Cloud-based backend software for charging network operations
Field Services: Complete metering and billing operations with optical port reading and drive-by metering
Target Markets
Electricity distribution utilities
Water supply utilities
Gas utilities
Industrial and commercial consumers
Municipalities and public sector utilities
EV charging network operators
Location
Based in Bengaluru, Karnataka, with headquarters at Banashankari 3rd Stage.
Business Model: NSOFT positions itself as a technology partner providing end-to-end solutions rather than just products, focusing on helping utilities maximize revenue through automation, smart metering, and data analytics.

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


https://erp-dost-rho.vercel.app

# Product: ERP-Dost (ERP-Friend)  
**Tag-line:** “Heavy ERP feels like WhatsApp—ask, don’t hunt.”

## 60-sec Elevator Clip (script)
[Clerk voice, inside municipal office]
“I clicked ‘Reports’ → 17 dropdowns → still lost.  
Now I type: ‘Show ward 17 pending works &gt; 1 lakh’  
ERP-Dost **pops the list** + **one-click Excel**.  
I never opened the manual.  
NSOFT support calls **dropped 70 % in 3 months**.”

## Native Stack Fit (assumed NSOFT ERP)
- Front-end: **React admin template** (they already use Ant Design)  
- API: **Django REST** (existing) → add `/copilot` endpoint  
- DB: **PostgreSQL** (same schema) → read-only views  
- Auth: **Same JWT** → no new login  
- Localisation: **i18next** → Hindi, Kannada, Telugu packs included  
- Channel: **Embedded chat widget** (bottom-right) + **WhatsApp** optional  

## Zero-Investment Flow
1. Clerk types question in chat widget → POST to `/copilot`  
2. Prompt (GPT-4o-mini) →  
   “Translate natural language to SQL → run → format as table + Excel link  
   + 1-sentence summary in user’s language.”  
3. Backend → returns JSON → React component renders table + download  
4. **Audit log** → same PostgreSQL → NSOFT support sees **what users ask** → **pre-empt FAQ**


## Screenshot Prompt
“Municipal office PC screen, Ant Design ERP dashboard, bottom-right chat bubble ‘ERP-Dost’, Hindi question typed, table results above, soft office light, professional”

https://jalbot-brief.vercel.app
# Product: JalBot Brief  
**Tag-line:** “From dashboard to **decision** in 60 seconds—delivered on WhatsApp.”

## 60-sec Elevator Clip (script)
[Founder voice, factory background noise]
“We still install the meters and valves—but now **every morning at 6 a.m.** the JalBot sends **one WhatsApp message** to the EE.  
No PDF, no login.  
It says: ‘Zone-4 pump ran 18 % longer—95 % chance valve leak—coordinates attached.’  
He forwards to his lineman **before tea**.  
That’s it. **Reactive to predictive** without extra staff.”

## Native Stack Fit (assumed NSOFT reality)
- Data In: Existing **MQTT topics** from flow/pressure RTUs  
- DB: **InfluxDB** (already in SCADA server)  
- Rules: **Node-RED** flows (they use for pump scheduling)  
- Out: **Twilio WhatsApp Business API** (free 1000 msgs/day)  
- Language: **Hindi + regional** auto-detect  

## Zero-Investment Flow
1. Node-RED cron (06:00 IST) → query Influx last 24 h  
2. Prompt (GPT-4o-mini) →  
   “Given attached JSON, write ≤ 3 bullet WhatsApp Hindi brief, emojis allowed, GPS link short.”  
3. Twilio → send to registered JE/EE numbers  
4. Log → append to SQLite (evidence for billing)

## Screenshot Prompt
“Android phone, 7 a.m. WhatsApp chat, JalBot avatar, three bullet messages in Hindi, GPS map link, NSOFT green tick, outdoor morning light”

https://ami-reason-bot.vercel.app

# Product: AMI-Reason Bot  
**Tag-line:** “From red flag to root cause in 60 seconds—automatically.”

## 60-sec Elevator Clip (script)
[Super-star voice, screen recording of TRM dashboard]
“Meter 18472 spike → 6× normal.  
Old way: 3 phone calls, site visit, 2-day report.  
New way: AMI-Reason Bot pops a card:  
‘Phase imbalance L2-L3 → 18 % extra kWh → not tamper → auto-correct by load balancing.  
Confidence 92 %.’  
Engineer clicks **‘Approve’** → consumer SMS sent.  
NSOFT now sells **clarity**, not just meters.”

## Native Stack Fit (assumed)
- Data tap: **Existing Kafka topic** `meter.anomaly` (they already stream)  
- Store: **TimescaleDB** extension inside PostgreSQL (TRM schema)  
- Rules: **Node-RED** flow (they use for disconnection)  
- Out: **TRM UI widget** (React component) + **SMS via existing SMSC**  
- Auth: **Same LDAP** as TRM → no new login  

## Zero-Investment Flow
1. Kafka trigger (anomaly score &gt; 1.5σ) → POST to internal FastAPI micro-service (Docker side-car)  
2. Prompt (GPT-4o-mini) →  
   “Given JSON: readings, outage log, tamper flags, collection timestamps, tariff  
   → 3-bullet reasoning + confidence % + recommended action (enum).”  
3. FastAPI → writes `ami_reason` table → TRM UI auto-refreshes card  
4. If confidence ≥ 90 % → auto-sends consumer SMS (template approved by utility)  
5. If &lt; 90 % → assigns to human queue (same UI)


## Screenshot Prompt
“TRM dashboard dark theme, red anomaly card expanded, green ‘Reason’ box with 3 bullets, NSOFT logo top-left, professional, 4K”