from config import app, db
from models import User, Contact

with app.app_context():
    db.create_all()
    print("✅ Tables created successfully.")
