#!/usr/bin/env bash
set -euo pipefail

GEN_MODEL="${GEN_MODEL:-qwen2.5}"
EMBED_MODEL="${EMBED_MODEL:-nomic-embed-text}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

if ! command -v ollama >/dev/null 2>&1; then
  echo "== Installing Ollama =="
  curl -fsSL https://ollama.com/install.sh | sh
fi

if ! pgrep -x "ollama" >/dev/null 2>&1; then
  echo "== Starting Ollama server =="
  ollama serve >/tmp/ollama.log 2>&1 &
  sleep 2
fi

echo "== Pulling models =="
ollama pull "$GEN_MODEL"
ollama pull "$EMBED_MODEL"

cleanup() {
  echo "== Shutting down =="
  jobs -p | xargs -r kill 2>/dev/null
}
trap cleanup EXIT INT TERM

echo "== Starting backend =="
(cd "$ROOT_DIR" && uv run main.py) &
BACKEND_PID=$!

echo "== Starting frontend =="
(cd "$ROOT_DIR/frontend" && bun run dev) &
FRONTEND_PID=$!

wait "$BACKEND_PID" "$FRONTEND_PID"
