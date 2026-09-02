from langchain_text_splitters import MarkdownHeaderTextSplitter, RecursiveCharacterTextSplitter
from pathlib import Path

HEADERS_TO_SPLIT_ON = [("##", "Header 2"), ("###", "Header 3")]


def chunk_documents(docs_folder: Path = Path("./data")) -> list:
    markdown_files = list(docs_folder.glob("**/*.md"))

    # the headers decide on what to split on,
    md_splitter = MarkdownHeaderTextSplitter(headers_to_split_on=HEADERS_TO_SPLIT_ON)
    # then we can chunk the rest.
    char_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=200)

    """
    basically we split the headers first, since we can keep the sections seperate, and
    the char-splitter, just splits on size so the chunks are small enough to we can embed well.
    """

    all_final_chunks = []

    # split each file by header, then by size, tagging chunks with their source file
    for file_path in markdown_files:
        markdown_text = file_path.read_text(encoding="utf-8")
        md_chunks = md_splitter.split_text(markdown_text)
        final_chunks = char_splitter.split_documents(md_chunks)

        for chunk in final_chunks:
            chunk.metadata["source"] = str(file_path)

        all_final_chunks.extend(final_chunks)

    print(f"{len(markdown_files)} files -> {len(all_final_chunks)} chunks")
    return all_final_chunks


if __name__ == "__main__":
    chunk_documents()
