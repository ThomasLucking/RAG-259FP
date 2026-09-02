# Original concept
Basically what I wanted to do, is to integrate a local LLM which fetches data on the server side, like the documents currently present
which shows a bunch of coding concepts databases, coding practices etc.. I wanted to do this with a backend of python and a react frontend
using tanstack query to call the api that I made using fastapi. 

# first step
first I looked up on what are the main steps to implement rag for very simple stuff especially with local LLMS, which was basically
chunking -> embedding -> storing the data inside a vector db -> retrieval, which is the same thing with the user query but instead of
storing the query, I just embed it then query the vector db with the user query to get the closest ones.

to implement this, I first created `data_chunking.py` which basically grabs the data from `/data` and I had to first parse it correctly before embedding it, so the first thing I did was chunk the headers first of each markdown file, then I split the content of the markdown files.

I had to do this so I can keep the sections seperate, and it'll be easier to embed since the amount of content will be smaller.
To achieve this I had to use langchain TextSplitter, which in turn I ended up with chunks now.

# second step
the second step was using those chunks and embed them using a embedding mode, I originally planned to use quen3-embedding 4b, but I ran into problems since when I was chunking large amounts of data, it took too long and drained too much power from my computer. so I decided to use 
`nomic-embed-text` which was rougly 30x smaller and a lot faster, after embedding the data I had to store it inside a vector database, so I decided to use chroma db since it's small and I didn't need to spin up postgresSQL for something this small.

# third step.
now the third step which was generating the user query, originally I planned to do something similiar which was chunk -> embed -> store,
however since the user query was a simple txt file, I didn't need to parse the header's or anything. and after consulting with claude and online resoucrs I realised that I didn't need to store it inside a vector db, since it's a simple user query i could directly grab the user prompt and embed it. then query it to the vector db.

# api layer
now since the backend it's finished, however the code is not modular yet, I had to transform every file into different functions and allowed parameters to come through, I decided to ask claude to do that since I'm lazy.

after that. I created 3 endpoints

- POST /retrieve returns the top-matching document chunks for a given question, no answer generation.

- POST /query full RAG: retrieves relevant chunks and returns an LLM-generated answer along with the chunks used.

- GET /documents/{slug} — reassembles and returns the full content of one source markdown file by its slug (all its stored chunks stitched back together).

# frontend

after the backend was done, I decided to ask claude claude directly to create me the user interface, which you can see inside of [here](docs/app.png)

# problems encountered

- it's a bit a painful in the beginning since I didn't know that you had to chunk the headers first or the markdown files then chunk the content first, so I ran into a lot of problems where I couldn't chunk the data correctly

- embedding model that is too big, when I tried using a 4b model for the embeddings it took too long, and drained way too much battery.

- over-engineered the user-query, I spent around 30-45 minutes trying to implement the same flow with the user query, but I figured out that you just need to embed the raw user query. then query the vectordb to find the macthing vectors 

# extra features I would like to add.

- a way to add documents dynamiclly instead of a fixed data set

- the person could possibly choose the model and embedding model they want, especially if they have a better setup, but user friendly so no modifying the code.

- improve the style of the website, which was a bit basic.

- able to upload multiple different types of files, since currently the embedding and chunking only worked on markdown files, but I would love to add so it would also work for txt, pdf's docx files.. etc...

- give the local llm internet access so it can search further details into the user query.
