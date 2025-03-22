# backend.py

from flask import Flask, request, jsonify, abort
from config import app, db
from flask_cors import CORS
import datetime
from models import Contact
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

# GET all items
@app.route('/items', methods=['GET'])
def get_items():
    items = Contact.query.all()
    return jsonify([item.to_dict() for item in items]), 200

# GET a single item by id
@app.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = Contact.query.get_or_404(item_id)
    return jsonify(item.to_dict()), 200

# POST create a new item
@app.route('/items', methods=['POST'])
def create_item():
    if not request.json or 'name' not in request.json:
        abort(400, description="Missing required field: name")
    name = request.json['name']
    description = request.json.get('description', '')
    new_item = Contact(name=name, description=description)
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_dict()), 201

# PUT update an existing item
@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    item = Contact.query.get_or_404(item_id)
    if not request.json:
        abort(400, description="Missing JSON in request")
    item.name = request.json.get('name', item.name)
    item.description = request.json.get('description', item.description)
    db.session.commit()
    return jsonify(item.to_dict()), 200

# DELETE an item
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = Contact.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item deleted"}), 200

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
