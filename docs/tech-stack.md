## Stack
- **LLM runtime:** Ollama (local, HTTP API)
- **Generation model:** `qwen2.5` (confirm exact tag/size when pulling, e.g. `qwen2.5:7b`)
- **Embedding model:** `qwen3-embedding:4b` (via Ollama)
- **Backend language:** Python, typescript
- **Retrieval:** Chroma (vector DB, embedded/in-process — no server to run)
- **Backend API:** FastAPI (thin wrapper exposing `/query` so the frontend has something to call) — not in the original plan, needed once you add a frontend
- **Frontend:** React, TanStack Query for the fetch/loading/error state around the `/query` call
- **Interface:** Simple page — text input, submit, display answer (+ optionally the retrieved chunks)
