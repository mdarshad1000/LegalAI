# Importing dependencies
from flask import Flask, request, g
from flask_cors import CORS, cross_origin
from app import convert_pdf, conversation


app = Flask(__name__)

app.config['SECRET_KEY'] = 'This is a super secret keyyyyy'

CORS(app)


@cross_origin('*')
@app.route('/', methods=["POST"])
def home():

    # pdf & text upload path
    path_pdf = "/Users/arshad/Desktop/Projects/Legal/backend/pdfs/"
    path_txt = "/Users/arshad/Desktop/Projects/Legal/api/txts/"

    # fetch filename from Node backend
    query = request.json["fileName"]
    # print(query)

    # convert pdf to text
    
    stored_document = convert_pdf(path_pdf + query)

    with(open(f"{path_txt}file.txt", 'w')) as file:
        file.write(stored_document)

    return "PDF RECIEVED"



# @cross_origin("*", supports_credentials=True)
@app.route('/chat', methods=["POST", "GET"])
def chat():
    
    # text upload path
    path_txt = "/Users/arshad/Desktop/Projects/Legal/api/txts/"

    # Fetch question
    question = request.data
    modified_question = question.decode().rstrip('"}').lstrip()[12:]

    # Load the uploaded text
    with(open(f"{path_txt}file.txt", "r")) as file:
        contents = file.read()

    # generate answers 
    answer = conversation(contents, modified_question)
    print("This is answer", answer)

    res = {"Answer": answer}

    # return "PDF RECIEVED"
    return res, 200, {'Access-Control-Allow-Origin': '*'}

    # return "HIHIHIHIHI"


if __name__ == '__main__':
    app.run(debug=True)