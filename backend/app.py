# backend.py

from flask import Flask, request, jsonify, abort
from config import app, db
from flask_cors import CORS
import datetime
from models import Contact
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from config import login_manager
from models import User, Patient, Medication
from werkzeug.security import check_password_hash

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Get the current date and time
x = datetime.datetime.now()

# Route for getting data
@app.route('/medicine', methods=["GET"])
def get_time():
    # Returning a response as JSON for React to fetch
    return {
        'Name': "geek", 
        "Age": "22",
        "Date": x.strftime("%Y-%m-%d %H:%M:%S"),  
        "programming": "python"
    }

# GET all items
@app.route('/users', methods=['GET'])
def get_users():
    #users = User.query.all()
    return {
        'Name':"rywoah",
    }
    #return jsonify([user.to_dict() for user in users]), 200

# GET a single item by id
@app.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = Contact.query.get_or_404(item_id)
    return jsonify(item.to_dict()), 200

# POST create a new item
@app.route("/medication", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstname")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "You must include a first name, last name and email"}),
            400,
        )

    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201

"""
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

# Endpoint to search for a patient's medications by name
@app.route('/search', methods=['GET'])
def search_medications():
    patient_name = request.args.get('name')
    if not patient_name:
        return jsonify({'error': 'Patient name is required'}), 400

    patient = Patient.query.filter_by(name=patient_name).first()
    if not patient:
        return jsonify({'error': 'Patient not found'}), 404

    medications = [med.to_dict() for med in patient.medications]
    return jsonify({'patient': patient.name, 'medications': medications}), 200

# Endpoint to add a new medication for a patient
@app.route('/medications', methods=['POST'])
def add_medication():
    data = request.get_json()
    # Expecting the following keys in the JSON payload
    patient_name = data.get('patient_name')
    medication_name = data.get('medication_name')
    prescription_provider = data.get('prescription_provider')
    total_dosage = data.get('total_dosage')

    if not all([patient_name, medication_name, prescription_provider, total_dosage]):
        return jsonify({'error': 'Missing required fields'}), 400

    # Find the patient by name
    patient = Patient.query.filter_by(name=patient_name).first()
    if not patient:
        return jsonify({'error': 'Patient not found'}), 404

    new_med = Medication(
        medication_name=medication_name,
        prescription_provider=prescription_provider,
        total_dosage=total_dosage,
        patient_id=patient.id
    )
    db.session.add(new_med)
    db.session.commit()

    return jsonify({
        'message': 'Medication added successfully',
        'medication': new_med.to_dict()
    }), 201
