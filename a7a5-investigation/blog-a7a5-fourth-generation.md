# A7A5 Sanctions Evasion: New Infrastructure Emerges After Each Exposure

**January 27, 2026**

An independent analysis of the A7A5 ruble stablecoin has identified what appears to be a fourth generation of operational infrastructure—wallet addresses that did not exist until December 2025, well after previous enforcement actions and media exposure. This finding suggests that the operators behind A7A5 are systematically rotating their financial infrastructure in response to sanctions and investigative reporting, staying one step ahead of enforcement.

## Background

A7A5 is a cryptocurrency token pegged to the Russian ruble, launched in early 2025 and designed to facilitate cross-border payments outside the Western financial system. The token is majority-owned by Ilan Shor, a sanctioned Moldovan oligarch convicted of stealing $1 billion from Moldovan banks, with minority ownership by Promsvyazbank, a sanctioned Russian state bank serving the defense sector.

The token operates on the TRON blockchain and has been used to move billions of dollars, primarily during Moscow business hours—a pattern consistent with commercial use by Russian entities seeking to circumvent sanctions.

## The Infrastructure Rotation Pattern

Our analysis traced the evolution of A7A5's operational wallets through four distinct phases:

**Phase 1: Garantex (February–March 2025)**
A7A5 initially operated through Garantex, a Russian cryptocurrency exchange. When U.S. law enforcement took down Garantex on March 7, 2025, and Tether froze $23 million in associated wallets, operations migrated elsewhere.

**Phase 2: Grinex (March–August 2025)**
Within days of the Garantex takedown, a new exchange called Grinex emerged in Kyrgyzstan, widely assessed to be a Garantex successor. A7A5 trading resumed through new wallet addresses. In August 2025, the United States sanctioned Grinex.

**Phase 3: Post-Sanctions Wallets (August–October 2025)**
Following the Grinex sanctions, A7A5 administrators used a smart contract function called "destroyBlackFunds" to sever the on-chain connection between sanctioned wallets and newly created ones. The Financial Times reported in October 2025 that $6.1 billion had moved through this post-sanctions infrastructure, with more than 80% of the token supply destroyed and recreated to break the audit trail.

**Phase 4: Current Infrastructure (December 2025–Present)**
Our analysis identified a new cluster of high-volume wallets that received their first transactions on December 25, 2025—Christmas Day—more than two months after the Financial Times exposure. Three separate wallets received identical 100-token test transactions within an 18-minute window, indicating coordinated deployment of fresh infrastructure. These wallets have since processed tens of billions of tokens.

## Why This Matters for Enforcement

The pattern reveals a fundamental challenge for sanctions enforcement in the cryptocurrency space. Each time infrastructure is identified and designated, operators simply deploy new wallets with no on-chain connection to their predecessors. The "destroyBlackFunds" mechanism built into the A7A5 smart contract enables this by design—it allows administrators to delete tokens from blacklisted addresses and mint equivalent amounts to new, "clean" wallets.

Traditional blockchain tracing, which follows the flow of funds from one address to another, cannot bridge these gaps. The transaction history simply ends at the destroyed wallet and begins fresh at the newly minted one.

## Indicators of Continuity

Despite the lack of direct transaction links, behavioral patterns strongly suggest operational continuity:

- **Temporal patterns**: Transactions occur overwhelmingly during Moscow business hours (10 AM–8 PM), with minimal activity on weekends
- **Coordinated setup**: Multiple wallets activated simultaneously with identical test transactions
- **Operational tempo**: New infrastructure becomes active within weeks of previous exposure, suggesting pre-positioned contingency planning

## Recommendations

Effective enforcement against A7A5 and similar sanctions evasion tools will require approaches beyond traditional blockchain tracing:

1. **Monitor smart contract functions**: The "destroyBlackFunds" function provides advance warning of infrastructure rotation. Designating wallets that receive large mints immediately following destruction events could compress the operators' response time.

2. **Behavioral analysis**: Temporal patterns and transaction behaviors can identify related infrastructure even without direct transaction links.

3. **Off-chain intelligence**: The operators maintain physical presence—A7A5 advertises over-the-counter services at Federation Tower in Moscow, the same location as the defunct Garantex. Personnel, corporate structures, and shared digital infrastructure provide attribution pathways that blockchain rotation cannot sever.

4. **Anticipate the next rotation**: Based on the established pattern, fifth-generation infrastructure will likely emerge within weeks of this analysis becoming public.

The A7A5 operation demonstrates that determined actors can sustain sanctions evasion infrastructure indefinitely through systematic rotation. Countering this requires equally systematic monitoring and a willingness to act on behavioral indicators rather than waiting for complete transaction trails that may never materialize.

---

*This analysis is based on publicly available blockchain data and open-source reporting.*
