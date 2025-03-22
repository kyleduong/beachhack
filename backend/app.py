# backend.py

from flask import Flask
from config import app, db
from flask_cors import CORS
import datetime

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Get the current date and time
x = datetime.datetime.now()

# Route for getting data
@app.route('/data', methods=["GET"])
def get_time():
    # Returning a response as JSON for React to fetch
    return {
        'Name': "geek", 
        "Age": "22",
        "Date": x.strftime("%Y-%m-%d %H:%M:%S"),  
        "programming": "python"
    }

"""
# Route for getting data
@app.route('/create_content', methods=["POST"])
def create_contacts():
    # code to create the contact
    return 0
"""

# Run the Flask app
if __name__ == '__main__':
    with app.app_context:
        db.create_all()
    print("Running the Flask app...")  # Confirm the app is starting
    app.run(debug=True)
