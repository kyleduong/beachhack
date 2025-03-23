# backend.py

from flask import Flask, request, jsonify, abort
from config import app, db
from flask_cors import CORS
import datetime
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from config import login_manager
from werkzeug.security import check_password_hash, generate_password_hash
from models import UserAccount, MedicationRecord

# Initialize Flask app
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
    users = UserAccount.query.all()
    return jsonify([user.to_dict() for user in users]), 200

# GET a single item by id
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = UserAccount.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200

# Endpoint to search for medications by medication name
@app.route('/search', methods=['GET'])
def search_medications():
    medication_name = request.args.get('name')
    if not medication_name:
        return jsonify({'error': 'Medication name is required'}), 400

    try:
        # Print debugging information
        print(f"Searching for medication: {medication_name}")
        
        # Find medications by medication name (using LIKE for partial matches)
        medications = MedicationRecord.query.filter(
            MedicationRecord.medication_name.ilike(f'%{medication_name}%')
        ).all()
        
        # Print how many results found
        print(f"Found {len(medications)} results")
        
        if not medications:
            return jsonify({
                'medication_search': medication_name,
                'results': []
            }), 200  # Return 200 with empty array instead of 404

        return jsonify({
            'medication_search': medication_name, 
            'results': [med.to_dict() for med in medications]
        }), 200
        
    except Exception as e:
        print(f"Search error: {str(e)}")
        return jsonify({'error': f'Search failed: {str(e)}'}), 500

# Endpoint to add a new medication for a patient
@app.route('/medications', methods=['POST'])
def add_medication():
    data = request.get_json()
    # Expecting the following keys in the JSON payload
    patient_name = data.get('patient_name')
    medication_name = data.get('medication_name')
    doctor_name = data.get('doctor_name')
    dosage = data.get('dosage')
    days_needed = data.get('days_needed')

    if not all([patient_name, medication_name, doctor_name, dosage, days_needed]):
        return jsonify({'error': 'Missing required fields'}), 400

    # Find the user account by patient name
    user_account = UserAccount.query.filter_by(patient_name=patient_name).first()
    if not user_account:
        return jsonify({'error': 'Patient not found'}), 404

    new_med = MedicationRecord(
        patient_name=patient_name,
        medication_name=medication_name,
        doctor_name=doctor_name,
        dosage=dosage,
        days_needed=days_needed,
        user_account_id=user_account.id
    )
    db.session.add(new_med)
    db.session.commit()

    return jsonify({
        'message': 'Medication added successfully',
        'medication': new_med.to_dict()
    }), 201

@app.route('/create', methods=['POST'])
def create_user():
    if not request.json or 'userName' not in request.json or 'password' not in request.json or 'patientName' not in request.json:
        abort(400, description="Missing username, password, or patient name")

    username = request.json['userName']
    password = request.json['password']
    patient_name = request.json['patientName']

    # Check for existing user
    if UserAccount.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 409

    # Check for existing patient name
    if UserAccount.query.filter_by(patient_name=patient_name).first():
        return jsonify({'message': 'Patient name already exists'}), 409

    hashed_password = generate_password_hash(password)
    new_user = UserAccount(
        username=username, 
        password=hashed_password, 
        patient_name=patient_name
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict()), 201

@login_manager.user_loader
def load_user(user_id):
    return UserAccount.query.get(int(user_id))

# Run the Flask app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    print("Running the Flask app...") 
    app.run(debug=True)