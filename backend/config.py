from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime
from flask_login import LoginManager

app = Flask(__name__)
CORS(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # or any route name for login


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Print statement to confirm the script is running
print("Starting the Flask app...")

