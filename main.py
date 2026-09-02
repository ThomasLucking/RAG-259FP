import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent / "backend"))

import chromadb
import uvicorn

from data_chunking import chunk_documents
from data_embedding import embed_and_store

CHROMA_PATH = "./chroma_db"
COLLECTION_NAME = "docs_collection"


def ingest_if_needed() -> None:
    client = chromadb.PersistentClient(path=CHROMA_PATH)
    collection = client.get_or_create_collection(name=COLLECTION_NAME)

    if collection.count() > 0:
        print(f"chroma collection already has {collection.count()} chunks, skipping ingestion")
        return

    chunks = chunk_documents()
    if not chunks:
        print("no markdown files found in ./data, skipping ingestion")
        return

    embed_and_store(chunks, collection)


def main() -> None:
    ingest_if_needed()
    uvicorn.run("api:app", host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
