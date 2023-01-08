# Importing dependencies
from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import pdfplumber as pp
from werkzeug.utils import secure_filename
import os
import openai
from langchain import OpenAI, ConversationChain, LLMChain, PromptTemplate
from langchain.chains.conversation.memory import ConversationalBufferWindowMemory


# Load env file
load_dotenv()

# Set OPENAI API key
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app,)

# Set the upload folder location
app.config['UPLOAD_FOLDER'] = "/Users/arshad/Desktop/Projects/Legal/static/uploaded_pdfs"


# To extract text from the pdf
def convert_pdf(file_name):
    with pp.open(file_name) as book:
        for page_no, page in enumerate(book.pages, start=1):
            data = page.extract_text()
            return data


# To explain the Legal Doc
def explain(doc_name, doc_text):
    response = openai.Completion.create(
    model="text-davinci-003",
    # prompt=f"The user is a novice in the field of legal profession and law. Please explain the following {doc_name} in simple English in detail:\n\n{doc_text}.",
    # prompt=f"Hi there! I'm here to help you understand this {doc_name}. Here's what it says: {doc_text}. Can you explain it to me in simple language, like you're talking to a friend?",
    prompt=f"Please provide a thorough and detailed explanation of the following {doc_name}:\n\n {doc_text}. Include any important definitions, context, and any relevant legal precedent or laws that may be applicable. Also, try to avoid using jargon or technical terms that may be confusing to someone without a legal background.",
    temperature=0.3,
    max_tokens=1024,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    final_answer = response["choices"][0]["text"].lstrip('.')
    return final_answer


@cross_origin('*')
@app.route('/', methods=['GET', 'POST'])
def home():
    # Upload the file
    if request.method == 'POST':
        f = request.files['file']
        legal_name = request.form['legal_name']

        # Save the file 
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename)))

        #  Open the file and extract text from PDF
        document_data = convert_pdf(f)

        # Explain the legal doc using GPT-3
        answer = explain(legal_name, document_data)

    elif request.method == 'POST':
        query = request.json
        template = """Assistant is a large language model trained by OpenAI.
        Assistant is designed to be able to assist with a wide range of tasks, from answering simple questions to providing in-depth explanations and discussions on legal and law related matters. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the law and legal domain.
        Assistant is constantly learning and improving, and its capabilities are constantly evolving. It is able to process and understand large amounts of text, and can use this knowledge to provide accurate and informative responses to a wide range of questions. Additionally, Assistant is able to generate its own text based on the input it receives, allowing it to engage in discussions and provide explanations and descriptions.
        {history}
        Human: {human_input}
        Assistant:"""
        prompt = PromptTemplate(
            input_variables=["history", "human_input"], 
            template=template
        )
        chatgpt_chain = LLMChain(
            llm=OpenAI(temperature=0), 
            prompt=prompt, 
            verbose=True, 
            memory=ConversationalBufferWindowMemory(k=2),
        )
        return render_template('output.html', answer=answer)

    return render_template('home.html')


if __name__ == '__main__':
    app.run(debug=True)