# Local RAG Project — 6-7 Hour Plan

## Goal
Build a Retrieval-Augmented Generation (RAG) pipeline using a **local LLM**, over a small personal document set, with a minimal React frontend on top of a small Python API. Deliverable: a working demo + a short written comparison of "with retrieval" vs "without retrieval" answers, plus honest discussion of failure modes.

## Scope note
Swapping in Chroma + a React frontend + two Ollama models adds scope on top of the original numpy/CLI version — but with the frontend capped at ~30 min (AI-generated, not hand-built), most of the added time is just Chroma + the FastAPI wrapper, which is small. The freed-up time goes back into retrieval/generation and the failure-mode analysis, which is what's actually being evaluated.

## Document set
Pick something you actually have and care about — apprenticeship notes, a course PDF, README/docs from one of your own projects. 5-20 pages is plenty. Real content makes failure-mode discussion more honest than a toy dataset.

---

## Hour-by-hour

### Hour 1 — Setup
- Install Ollama, pull generation model (`ollama pull qwen2.5`) and embedding model (`ollama pull qwen3-embedding:4b`)
- Confirm both respond via the local HTTP API (`curl localhost:11434/...` or Python `requests`)
- Set up Python env, install `chromadb`, `fastapi`, `uvicorn`, `requests`
- Gather and clean your document set into plain text

### Hour 2 — Chunking + embedding + Chroma
- Write `chunk(text) -> list[str]` — split by paragraph or fixed token/word window (~200-400 words, maybe with slight overlap)
- Write `embed(text) -> list[float]` — call Ollama's embedding endpoint (`qwen3-embedding:4b`)
- Create a Chroma collection, `add()` each chunk with its embedding (id + text + vector)
- This replaces hand-rolled cosine similarity — know that Chroma is doing the same similarity search under the hood, worth one line in your write-up

### Hour 3 — Retrieval + generation (backend logic)
- Write `retrieve(query, k=3) -> list[str]` — embed the query, call Chroma's `query()`, return top-k chunk texts
- Write `build_prompt(query, chunks) -> str` — inject retrieved chunks as context, clear instruction to answer only from context
- Write `generate(prompt) -> str` — call Ollama's chat/generate endpoint (`qwen2.5`)
- Wire it end-to-end as a plain function first: query → retrieve → build_prompt → generate → print. Confirm it works before touching FastAPI or React.

### Hour 4 — API + frontend (~30 min frontend, AI-generated)
- Wrap the pipeline in a single FastAPI endpoint: `POST /query {question: str} -> {answer: str, chunks: list[str]}` (~30 min)
- Frontend: generate a minimal React page (input, submit, result area, TanStack Query for the fetch/loading/error state) rather than hand-writing it — cap at 30 min including wiring it to `/query`
- Leftover time in this hour rolls straight into Hour 5

### Hour 5 — Comparison + testing
- Pick 5-8 test questions about your document set (mix of easy factual lookups and harder ones) — go for more like 8-10 if the frontend came in under budget
- For each: run **with retrieval** and **without retrieval** (bare LLM, no context), record both answers
- Note where retrieval clearly helps, where it doesn't, and any wrong/hallucinated answers in either mode

### Hour 6 — Failure mode analysis
- Try to break it on purpose: ambiguous questions, questions the documents don't answer, questions needing info from multiple chunks
- Note: chunking artifacts (answer split across two chunks), retrieval misses (right chunk not in top-k), model ignoring context and hallucinating anyway
- This section is often the most valuable part for an evaluated project — it shows understanding, not just a working demo. With time freed up from the frontend, worth also testing a second chunk size or k value here (see Stretch goals) rather than treating it as optional.

### Hour 6.5-7 — Write-up
- Short markdown summary: what you built, chunk size + k chosen and why, why Chroma over numpy (or vice versa in hindsight), the with/without comparison table, failure modes observed, what you'd improve with more time (re-ranking, hybrid search, smarter chunking, etc.)

---

## Core functions checklist
```
chunk(text: str) -> list[str]
embed(text: str) -> list[float]
retrieve(query: str, k: int = 3) -> list[str]        # via Chroma collection.query()
build_prompt(query: str, retrieved_chunks: list[str]) -> str
generate(prompt: str) -> str
```

## What to skip
- LangChain / LlamaIndex — not worth the ramp-up time given no prior familiarity
- Frontend styling/polish — function over form, timebox it
- Auth, multi-user, deployment — none of it is relevant to what's being evaluated

## Stretch goals (only if time remains)
- Try 2 different chunk sizes, compare retrieval quality
- Try 2 different k values
- Show retrieved chunks in the UI alongside the answer (source attribution)
