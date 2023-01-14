# Importing dependencies
from flask import Flask, request
from flask_cors import CORS, cross_origin
from app import convert_pdf, conversation

app = Flask(__name__)
CORS(app,)

# Global var to store document
source_document = None

@cross_origin('*')
@app.route('/', methods=["POST"])
def home():

    # pdf upload path
    path = "/Users/arshad/Desktop/Projects/Legal/backend/pdfs/"

    # fetch filename from Node backend
    query = request.json["fileName"]

    # convert pdf to text
    global source_document
    source_document = convert_pdf(path+query)

    return "PDF RECEIVED"


@app.route('/chat', methods=['POST'])
def chat():
    
    # fetch question
    question = request.json["question"]

    # generate answers
    answer = conversation(source_document, question)

    return {"Answer": answer}


if __name__ == '__main__':
    app.run(debug=True)