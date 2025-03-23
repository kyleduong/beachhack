from config import app, db
from models import MedicationRecord, UserAccount

with app.app_context():
    db.create_all()
    print("✅ Tables created successfully.")
