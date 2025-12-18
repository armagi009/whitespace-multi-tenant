
--------------------------------------------------
1. Tenant isolation & data-plane hardening
--------------------------------------------------
- Logical vs physical isolation decision (row-level, schema-per-tenant, DB-per-tenant, VPC-per-tenant).  
- Tenant-id enforced at the lowest possible layer (DB FK, GraphQL context, queue headers, object-storage path).  
- Parameterised DB migrations that run once per new tenant; rollback tested.  
- Connection-pool multiplexing that can’t leak data across tenants (PG’s SET app.current_tenant, SQL Server’s ROW LEVEL SECURITY, etc.).  
- Encryption at rest with per-tenant KMS keys if you ever want SOC-2 Type II.

--------------------------------------------------
2. Zero-trust security & compliance
--------------------------------------------------
- SSO/SAML/OIDC for tenants that already have Okta/AzureAD/GoogleWS.  
- SCIM provisioning so the customer can deactivate a user in their IdP and see it reflected in your app within minutes.  
- Audit log (immutable, signed, streamed to customer SIEM) for every mutating call.  
- GDPR/CCPA delete/export API; DPA template in click-through.  
- Pen-test + dependency scanning in CI; SAST/DAST gates; bug-bounty page.  
- Rate-limit per tenant + per user; WAF rules tuned for your framework.

--------------------------------------------------
3. Ops & reliability
--------------------------------------------------
- Blue/green or canary deploys; feature flags by tenant.  
- Horizontal scaling story (stateless containers, sticky-sessionless).  
- Tenant-level resource guardrails (CPU, memory, storage, #API calls) so one customer can’t DOS the others.  
- Multi-region fail-over with <15 min RTO and <5 min RPO.  
- Status page with per-tenant health (not just “we’re up”).  
- On-call runbooks + paging rotation; post-mortem culture.

--------------------------------------------------
4. Usage metering & billing accuracy
--------------------------------------------------
- Event stream (Kafka/Kinesis/PubSub) that records every billable action with tenant-id and timestamp.  
- Idempotent aggregation job that produces the “invoice line items” table; back-fill & correction UI.  
- Graceful overage handling (hard block vs soft throttle vs automatic bump to next tier).  
- Credit-card, ACH, wire, PayPal, PO/Net-30; dunning sequence; proration when they change plans mid-cycle.  
- Tax calculation (Sales tax, VAT, GST) via Avalara/TaxJar/Stripe Tax; location evidence storage.  
- Revenue recognition sub-ledger if you care about GAAP.

--------------------------------------------------
5. Customer lifecycle & self-service
--------------------------------------------------
- Tenant provisioning API (POST /tenants) that returns 201 in <30 s.  
- White-label custom domain (acme.yourapp.com) with automatic TLS cert.  
- Email domain verification so invites come from the customer’s own domain.  
- In-app onboarding checklist, progress meter, and interactive tooltip tour.  
- Support ticket integration (Zendesk, Intercom) with tenant-id tag.  
- Cancellation, export, and data-deletion self-service flows (required by Stripe and most enterprise MSAs).

--------------------------------------------------
6. Product telemetry & analytics
--------------------------------------------------
- Feature-usage funnel per tenant; retention cohorts; time-to-value metric.  
- Error tracking (Sentry) grouped by tenant so you can prioritise the whale on the broken plan.  
- Performance SLI per tenant (p50/p95 latency of key screens).  
- NPS & in-app survey with tenant segmentation.

--------------------------------------------------
7. Legal, risk, and go-to-market
--------------------------------------------------
- MSA + DPA + SLA (uptime, support response, credits).  
- SOC-2 Type II roadmap; ISO-27001 statement of applicability.  
- GDPR Records of Processing Activities (ROPA).  
- Vendor-management questionnaire answers pre-written (SIG Lite).  
- Salesforce/HubSpot integration so sales can see usage vs plan.  
- Partner program & referral tracking if you sell through channels.

--------------------------------------------------
8. Developer extensibility
--------------------------------------------------
- REST + webhook + (optionally) GraphQL APIs with tenant-scoped tokens.  
- Public API rate-limit per tenant and per token.  
- Embeddable UI components (React, iFrame, SDK) for white-label.  
- Sandbox tenant that never bills and auto-resets data.

--------------------------------------------------
9. Internationalisation & localisation
--------------------------------------------------
- Per-tenant locale, timezone, currency, number/date formatting.  
- Time-zone-aware cron jobs; calendar integration that respects DST.  
- Right-to-left UI mirroring if you sell in MENA.

--------------------------------------------------
10. Performance & cost optimisation
--------------------------------------------------
- Query planner analysis per tenant to catch the one customer with 100 M rows that kills the shared DB.  
- Tiered storage (hot/warm/cold) for large tenant blobs.  
- CDN with tenant-scoped cache keys; cache purge API.  
- Cost-of-revenue dashboard: infra spend per $ of ARR.

--------------------------------------------------
Rule of thumb
--------------------------------------------------
If you can delete the mock data, create a brand-new tenant via a self-service form, enter a credit card, invite three co-workers with different roles, hit 100 % of your core use-cases without a single 500 or cross-tenant data leak, and THEN delete the tenant and get a PDF invoice within 5 min—you’re ready for early-adopters.  
