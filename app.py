from pydparser import ResumeParser
from pymongo import MongoClient

try:
    # Parse resume data
    data = ResumeParser('uploads/latest.pdf').get_extracted_data()
    print(data)
except UnicodeEncodeError:
    print("Unable to print some characters due to encoding issues.")

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['parsing']
collection = db['details']

# Insert parsed resume data into MongoDB
result = collection.insert_one(data)
print("Data inserted with ID:", result.inserted_id)
