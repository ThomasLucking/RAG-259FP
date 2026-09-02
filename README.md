# RAG-259FP

Local Retrieval-Augmented Generation pipeline over a personal document set, using a local LLM via Ollama, Chroma for vector search, a FastAPI backend, and a minimal React frontend.

## Goal

Build a working RAG demo and compare "with retrieval" vs "without retrieval" answers, including an honest analysis of failure modes (chunking artifacts, retrieval misses, hallucination despite context).

## Stack

- **LLM runtime:** Ollama (local HTTP API)
- **Generation model:** `qwen2.5`
- **Embedding model:** `nomic-embed-text`
- **Vector store:** Chroma (embedded, in-process)
- **Backend:** Python, FastAPI
- **Frontend:** React, TanStack Query

## Pipeline

```
chunk(text) -> list[str]
embed(text) -> list[float]
retrieve(query, k=3) -> list[str]        # via Chroma collection.query()
build_prompt(query, chunks) -> str
generate(prompt) -> str
```

`POST /query {question: str} -> {answer: str, chunks: list[str]}`

## Setup

Requires Python >= 3.14, [uv](https://docs.astral.sh/uv/), and [Bun](https://bun.sh).

```bash
uv sync
cd frontend && bun install && cd ..
```

## Running

```bash
./scripts/start.sh
```

This installs Ollama if missing, pulls the `qwen2.5` and `nomic-embed-text` models, then launches the backend (`uv run main.py`, port 8000) and frontend (`bun run dev`) together. Override the models with the `GEN_MODEL` and `EMBED_MODEL` environment variables.

## Docs

- [`docs/plan.md`](docs/plan.md) — hour-by-hour build plan
- [`docs/tech-stack.md`](docs/tech-stack.md) — stack rationale

## Status

Pipeline implemented and running: ingestion, retrieval, and the `/query` endpoint work end to end.
