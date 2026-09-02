from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from user_query import user_query
from user_query import generate_answer, collection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str

    @property
    def query(self) -> str:
        return self.question


class QueryResponse(BaseModel):
    answer: str
    chunks: list[str]


class DocumentResponse(BaseModel):
    slug: str
    title: str
    content: str


@app.post('/retrieve')
def send_query(req: QueryRequest) -> list[str]:
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="query must not be empty")
    try:
        return user_query(req.query)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc


@app.post('/query')
def ask_question(req: QueryRequest) -> QueryResponse:
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="query must not be empty")
    try:
        chunks = user_query(req.query)
        answer = generate_answer(req.query, chunks)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    return QueryResponse(answer=answer, chunks=chunks)


def _title_from_slug(slug: str) -> str:
    return " ".join(word.capitalize() for word in slug.split("-"))


@app.get('/documents/{slug}')
def get_document(slug: str) -> DocumentResponse:
    source = str(Path("data") / f"{slug}.md")
    results = collection.get(where={"source": source}, include=["documents", "metadatas"])

    if not results["ids"]:
        raise HTTPException(status_code=404, detail=f"no document found for slug '{slug}'")

    ordered = sorted(
        zip(results["ids"], results["documents"]),
        key=lambda pair: int(pair[0].removeprefix("chunk_")),
    )
    content = "\n\n".join(text for _id, text in ordered)

    return DocumentResponse(slug=slug, title=_title_from_slug(slug), content=content)
