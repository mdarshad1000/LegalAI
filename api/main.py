# Importing dependencies
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import pdfplumber as pp
import glob
import os 

from app import convert_pdf

app = Flask(__name__)
CORS(app,)


@cross_origin('*')
@app.route('/explain', methods=["POST"])
def home():

    list_of_files = glob.glob('/Users/arshad/Desktop/Projects/Legal/api/static/uploaded_pdfs/*.pdf') # * means all if need specific format then *.csv
    latest_file = max(list_of_files, key=os.path.getctime) # selecting the latest file
    print(latest_file)

    document = convert_pdf(latest_file)


    return jsonify(document=document)



if __name__ == '__main__':
    app.run(debug=True)