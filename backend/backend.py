# backend.py

from flask import Flask
import datetime
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Print statement to confirm the script is running
print("Starting the Flask app...")

# Get the current date and time
x = datetime.datetime.now()

# Route for getting data
@app.route('/data')
def get_time():
    # Returning a response as JSON for React to fetch
    return {
        'Name': "geek", 
        "Age": "22",
        "Date": x.strftime("%Y-%m-%d %H:%M:%S"),  
        "programming": "python"
    }

# Run the Flask app
if __name__ == '__main__':
    print("Running the Flask app...")  # Confirm the app is starting
    app.run(debug=True)
