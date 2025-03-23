from config import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Store hashed passwords

    def to_dict(self):
        return {"id": self.id, "name": self.username, "password":self.password}

class Contact(db.Model):
    __tablename__ = 'contacts'
    
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50))
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))

    def __repr__(self):
        return f"<Contact {self.firstName} {self.lastName}>"
    
# Database Models
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    medications = db.relationship('Medication', backref='patient', lazy=True)

class Medication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    medication_name = db.Column(db.String(100), nullable=False)
    prescription_provider = db.Column(db.String(100), nullable=False)
    total_dosage = db.Column(db.String(100), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)

    def to_dict(self):
        return {
            'medication_name': self.medication_name,
            'prescription_provider': self.prescription_provider,
            'total_dosage': self.total_dosage
        }