# backend.py

from flask import Flask
from config import app, db
from flask_cors import CORS
import datetime
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from config import login_manager
from models import User

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

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['POST'])
def login():
    # Dummy login for now – replace with proper auth check
    user = User.query.filter_by(username="admin").first()
    if user:
        login_user(user)
        return {"message": "Logged in successfully"}
    return {"message": "Invalid credentials"}, 401
