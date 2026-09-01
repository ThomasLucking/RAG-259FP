# RAG-259FP

Local Retrieval-Augmented Generation pipeline over a personal document set, using a local LLM via Ollama, Chroma for vector search, a FastAPI backend, and a minimal React frontend.

## Goal

Build a working RAG demo and compare "with retrieval" vs "without retrieval" answers, including an honest analysis of failure modes (chunking artifacts, retrieval misses, hallucination despite context).

## Stack

- **LLM runtime:** Ollama (local HTTP API)
- **Generation model:** `qwen2.5`
- **Embedding model:** `qwen3-embedding:4b`
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

Requires Python >= 3.14 and [Ollama](https://ollama.com) running locally.

```bash
ollama pull qwen2.5
ollama pull qwen3-embedding:4b
uv sync
uv run main.py
```

## Docs

- [`docs/plan.md`](docs/plan.md) — hour-by-hour build plan
- [`docs/tech-stack.md`](docs/tech-stack.md) — stack rationale

## Status

Early scaffolding — pipeline not yet implemented.
