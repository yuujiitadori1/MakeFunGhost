# MakeFun Ghost — makefun-coin-launch-01

A real coin launched on pump.fun for the make.fun `makefun-coin-launch-01`
bounty (race to launch; rank = on-chain creation time, earliest first).

- **Name:** MakeFun Ghost
- **Symbol:** GHOST
- **Description:** made for make.fun $1000 bounty
- **Mint:** `CizBFK8rFs3wmDoDTVcaHzdeKitxntTYJtyzQxKbfZVp`
- **Create signature:** `4dqo4B273A94j3yvm8m2u8bZowbKqzrZkCavjdTp1mff8vKqdgFkWAtZGXVbF3z15cJuVg326jgqB2NS2iiZvkBD`
- **Launched:** 2026-11-14T02:24:26Z (slot 469159362, finalized)
- **Cost:** 0.005862 SOL (rent + fee only; no initial buy)
- **Coin page:** https://pump.fun/coin/CizBFK8rFs3wmDoDTVcaHzdeKitxntTYJtyzQxKbfZVp

## How the launch was done

The agent launched the coin in this same session, fully programmatically:

1. The make.fun ghost mascot logo was uploaded unmodified, and the token
   metadata (`name`, `symbol`, `description`, `image`) was hosted at a public
   HTTPS URL.
2. A fresh mint keypair was generated for the coin.
3. PumpDev's `POST https://pumpdev.io/api/create` built the unsigned
   pump.fun create transaction (no dev buy — `buyAmountSol` omitted,
   priority fee 0.00001 SOL).
4. The transaction was simulated first to measure its exact cost
   (5,862,000 lamports = 0.005862 SOL), then signed locally with the agent
   keypair and the mint keypair, sent to Solana mainnet, and confirmed.
5. Verified on-chain: the mint account exists (Token-2022, metadata stored
   in the mint account itself), the pump.fun bonding curve account exists,
   and the create transaction is finalized with no error.

## How to run the program

The coin is already launched; this program only copies `LAUNCH.json` to the
output directory where the gate reads it. Node 22, standard library only.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`LAUNCH.json` at the repository root holds the mint address and the create
signature. The entry is `main.ts` plus `LAUNCH.json`.
