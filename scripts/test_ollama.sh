#!/usr/bin/env bash
set -euo pipefail

OLLAMA_HOST="${OLLAMA_HOST:-http://localhost:11434}"
GEN_MODEL="${GEN_MODEL:-qwen2.5}"
EMBED_MODEL="${EMBED_MODEL:-qwen3-embedding:4b}"

echo "== Testing generation model: $GEN_MODEL =="
curl -sS "$OLLAMA_HOST/api/generate" \
  -d "{\"model\": \"$GEN_MODEL\", \"prompt\": \"Say hello in one word.\", \"stream\": false}" | jq .

echo
echo "== Testing embedding model: $EMBED_MODEL =="
curl -sS "$OLLAMA_HOST/api/embeddings" \
  -d "{\"model\": \"$EMBED_MODEL\", \"prompt\": \"Hello world\"}" | jq .
