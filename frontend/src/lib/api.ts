const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000"

export interface QueryResponse {
  answer: string
  chunks: string[]
}

export interface DocumentResponse {
  slug: string
  title: string
  content: string
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const detail = await res
      .json()
      .then((data) => data.detail as string)
      .catch(() => null)
    throw new Error(detail ?? `Request failed with status ${res.status}`)
  }

  return res.json()
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  return handleResponse<T>(res)
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`)
  return handleResponse<T>(res)
}

export function retrieveChunks(question: string): Promise<string[]> {
  return post<string[]>("/retrieve", { question })
}

export function askQuestion(question: string): Promise<QueryResponse> {
  return post<QueryResponse>("/query", { question })
}

export function fetchDocument(slug: string): Promise<DocumentResponse> {
  return get<DocumentResponse>(`/documents/${slug}`)
}
