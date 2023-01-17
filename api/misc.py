from gpt_index import GPTSimpleVectorIndex, SimpleDirectoryReader, GPTListIndex, GPTTreeIndex


# Loads all the data from the txts folder
documents = SimpleDirectoryReader('txts').load_data()

# builds an index over the documents in the data folder
index = GPTSimpleVectorIndex(documents)

index.save_to_disk("/Users/arshad/Desktop/Projects/Legal/api/index/index.json")
# load from disk
index = GPTSimpleVectorIndex.load_from_disk('/Users/arshad/Desktop/Projects/Legal/api/index/index.json')

response = index.query("What type of document it is?", verbose=True, response_mode="default")

print(response)

