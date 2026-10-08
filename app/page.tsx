import { networkSummary } from "../lib/stellar";
export default function Home(){return <main><p className="tag">STELLAR / SOROBAN</p><h1>RemitLoop</h1><p>Cross-border payment state tracking and reconciliation.</p><section className="card"><h2>Network</h2><p>{networkSummary()}</p></section></main>}
