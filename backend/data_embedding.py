from pathlib import Path

from openai import OpenAI, APIConnectionError
import chromadb

from data_chunking import chunk_documents

CHROMA_PATH = str(Path(__file__).resolve().parent.parent / "chroma_db")
COLLECTION_NAME = "docs_collection"

# create the client so that the endpoint is exposed
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
)


def embed_and_store(chunks: list, collection) -> None:
    if not chunks:
        print("no chunks to embed")
        return

    # extract the text from each chunk
    texts = [chunk.page_content for chunk in chunks]
    metadatas = [chunk.metadata for chunk in chunks]
    ids = [f"chunk_{i}" for i in range(len(texts))]

    try:
        response = client.embeddings.create(
            model="nomic-embed-text",
            input=texts,
        )
    except APIConnectionError as exc:
        raise RuntimeError("Could not reach Ollama at http://localhost:11434 - is it running?") from exc

    all_embeddings = [item.embedding for item in response.data]

    collection.add(
        ids=ids,
        embeddings=all_embeddings,
        documents=texts,
        metadatas=metadatas,
    )

    print(f"stored {collection.count()} chunks in Chroma")


if __name__ == "__main__":
    chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
    collection = chroma_client.get_or_create_collection(name=COLLECTION_NAME)
    embed_and_store(chunk_documents(), collection)
