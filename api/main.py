# Importing dependencies
from flask import Flask, request
from flask_cors import CORS, cross_origin
from app import convert_pdf, conversation
import os

# Create flask instance
app = Flask(__name__)

# config to handle CORS requests
CORS(app)


@cross_origin('*')
@app.route('/', methods=["POST"])
def home():

    # pdf & text upload path
    path_pdf = os.environ.get("path_pdf")
    path_txt = os.environ.get("path_txt")

    # fetch filename from Node backend
    query = request.json["fileName"]
    # print(query)

    # convert pdf to text
    stored_document = convert_pdf(path_pdf + query)

    # save the converted pdf as txt to retrieve later
    with(open(f"{path_txt}file.txt", 'w')) as file:
        file.write(stored_document)

    return "PDF RECIEVED!!!"



@cross_origin("*", supports_credentials=True)
@app.route('/chat', methods=["POST", "GET"])
def chat():
    
    # text upload path
    path_txt = os.environ.get("path_txt")


    # fetch user's question
    question = request.data
    modified_question = question.decode().rstrip('"}').lstrip()[12:]

    # Load the uploaded txt file (Legal Doc)
    with(open(f"{path_txt}file.txt", "r")) as file:
        contents = file.read()

    # generate answers 
    answer = conversation(contents, modified_question)
    print(answer)

    res = {"Answer": answer}
    print(res)

    return res




if __name__ == '__main__':
    app.run(debug=True)