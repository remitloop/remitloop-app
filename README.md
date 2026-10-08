# RemitLoop — remitloop-app

> Cross-border payment state tracking and reconciliation.

![RemitLoop Web app](banner.png)

## About the project

RemitLoop tracks cross-border payments (remittances) from start to finish on Stellar/Soroban. Each transfer has a state that moves through its lifecycle, and the sending and receiving sides can reconcile their records against one shared, tamper-evident source instead of trading spreadsheets and emails. The loop closes when both sides agree a payment has settled.

**Who it is for:** Remittance operators, payment partners on both sides of a corridor, and the senders and recipients who want to know where their money is.

**How the pieces fit together:**

| Repository | Responsibility |
|---|---|
| `remitloop-contracts` | On-chain Soroban state and authorization — the source of truth |
| `remitloop-backend` | Off-chain indexing, read models and operational APIs |
| `remitloop-app` | User-facing web application |

Typical flow:

1. A payment's state is recorded and advanced on-chain by an authorized party (authorized by that party's Stellar account).
2. The backend indexes state changes into a read model for tracking and reconciliation reports.
3. Operators and customers open the web app to follow a payment and see whether both sides reconcile.

## This repository: Web app

The **app** repository is the user-facing web application for RemitLoop. It reads public chain state directly through Stellar RPC and sends writes through the wallet/signing layer, so users never hand their keys to the service. Indexing and persistence stay in the backend.

### What is included today

- A Next.js 15 (App Router) + React 19 + TypeScript application.
- A home page showing the RemitLoop name, its tagline and a **Network** card.
- `lib/stellar.ts` with a `networkSummary()` helper that reports the configured Stellar network (currently Testnet) using `@stellar/stellar-sdk` 17.2.1.
- A dark theme (deep navy background with violet and cyan accents) shared across the RemitLoop repositories.
- Configuration for the network, RPC endpoint, contract ID and backend URL via environment variables.

### Tech stack

Next.js 15.5 · React 19.1 · TypeScript 5.8 · `@stellar/stellar-sdk` 17.2.1

### Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                 # http://localhost:3000
npm run build               # production build
npm run lint
npm test
```

### Configuration

| Variable | Purpose | Default |
|---|---|---|
| `STELLAR_NETWORK` | Which Stellar network to target | `testnet` |
| `STELLAR_RPC_URL` | Soroban RPC endpoint used for reads | `https://soroban-testnet.stellar.org` |
| `CONTRACT_ID` | Deployed RemitLoop contract to talk to | *(empty — set after deployment)* |
| `BACKEND_URL` | Base URL of the RemitLoop backend API | `http://localhost:8787` |

## Roadmap

- Connect a wallet and sign transactions against the RemitLoop contract.
- Replace the placeholder home page with the real RemitLoop screens.
- Read live data from the backend API and the chain, with loading and error states.

## Maintainer

`@ollypee22`

## Status

**v0.1.0 development baseline — not audited and not production-ready.**

## Stellar alignment

The project uses Stellar/Soroban where on-chain state is the source of truth or where deterministic settlement is valuable. Off-chain services are kept out of consensus-critical logic.

## License

Apache-2.0
