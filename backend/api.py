from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from user_query import user_query
from user_query import generate_answer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str


class QueryResponse(BaseModel):
    answer: str
    chunks: list[str]


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
