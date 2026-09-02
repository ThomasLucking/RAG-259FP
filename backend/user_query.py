from pathlib import Path

from openai import OpenAI, APIConnectionError
import chromadb

CHROMA_DB_PATH = Path(__file__).resolve().parent.parent / "chroma_db"

chroma_client = chromadb.PersistentClient(path=str(CHROMA_DB_PATH))
collection = chroma_client.get_or_create_collection('docs_collection')

# create the client for ollama and the endpoint to hit
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
)

def user_query(query: str) -> list[str]:
    # create the embeddings
    try:
        response = client.embeddings.create(
            model="nomic-embed-text",
            input=query
        )
    except APIConnectionError as exc:
        raise RuntimeError("Could not reach Ollama at http://localhost:11434 - is it running?") from exc

    # retrieve them
    query_embedding = response.data[0].embedding
    # associate the user query with the embeddings inside of the collection for the documents, and get the 5 best answers
    # if you want for the llm to fetch more answer's increase the n count.
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=10
    )

    retrieved_chunks = results['documents'][0] if results['documents'] else []

    return retrieved_chunks


def generate_answer(query: str, chunks: list[str]) -> str:
    if not chunks:
        return "I couldn't find any relevant documents."

    context = "\n\n".join(chunks)

    prompt = f"""Answer the question using only the context below. If the answer isn't in the context, say you don't know.

    Context:
    {context}

    Question:
    {query}
    """

    try:
        response = client.chat.completions.create(
            model="qwen2.5",
            messages=[{"role": "user", "content": prompt}]
        )
    except APIConnectionError as exc:
        raise RuntimeError("Could not reach Ollama at http://localhost:11434 - is it running?") from exc

    return response.choices[0].message.content
