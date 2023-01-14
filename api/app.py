# Importing dependencies
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores.faiss import FAISS
from langchain.prompts import PromptTemplate

from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI

import pdfplumber as pp

# Propmt Template
template = """You are an AI Asisstant who is an expert in legal/law field. 
Include any important definitions, context, and any relevant legal precedent or laws that may be applicable.
Also, usually try to avoid using jargon or technical terms that may be confusing to someone without a legal background.
Given the following legal document, create a final answer. 
If you don't know the answer, just say that you don't know. Don't try to make up an answer.

QUESTION: {question}
"""

# Initialize propmt Template
PROMPT = PromptTemplate(template=template, input_variables=["question"])

# Convert the pdf file to text
def convert_pdf(file_name):
    with pp.open(file_name) as book:
        temp = ""
        for page_no, page in enumerate(book.pages, start=1):
            data = page.extract_text()
            temp += data
    return temp

pdf_file = convert_pdf('POA.pdf')


# Ask questions regarding the uploaded document
def conversation(pdf_file, question):
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_text(pdf_file)

    embeddings = OpenAIEmbeddings()

    docsearch = FAISS.from_texts(texts, embeddings, metadatas=[{"source": i} for i in range(len(texts))])

    query = question

    docs = docsearch.similarity_search(query)

    chain = load_qa_chain(OpenAI(temperature=0), chain_type="stuff")
    
    return chain({"input_documents": docs, "question": query}, return_only_outputs=True)['output_text']


# print(conversation(pdf_file, "Who is a resident of Queens?"))