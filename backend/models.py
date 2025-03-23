from config import db
from flask_login import UserMixin

class UserAccount(UserMixin, db.Model):
    __tablename__ = 'user_accounts'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    patient_name = db.Column(db.String(100), unique=True, nullable=False)

    # One-to-many relationship to medications
    medications = db.relationship('MedicationRecord', backref='user_account', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "patient_name": self.patient_name
        }

class MedicationRecord(db.Model):
    __tablename__ = 'medication_records'

    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(100), nullable=False)  # Redundant but can be useful
    medication_name = db.Column(db.String(100), nullable=False)
    dosage = db.Column(db.String(100), nullable=False)
    doctor_name = db.Column(db.String(100), nullable=False)
    days_needed = db.Column(db.Integer, nullable=False)

    user_account_id = db.Column(db.Integer, db.ForeignKey('user_accounts.id'), nullable=False)

    def to_dict(self):
        return {
            "medication_name": self.medication_name,
            "dosage": self.dosage,
            "doctor_name": self.doctor_name,
            "days_needed": self.days_needed,
            "patient_name": self.patient_name
        }
