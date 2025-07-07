from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

app = Flask(__name__)
CORS(app)

# הגדרת מסד נתונים SQLite
engine = create_engine('sqlite:///issues.db')
Base = declarative_base()

# הגדרת טבלה
class Issue(Base):
    __tablename__ = 'issues'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(100))
    description = Column(Text)
    systemnumber = Column(String(50))
    location = Column(String(100))
    failersolved = Column(String(100))
    date = Column(String(50))
    status = Column(String(20), default='פתוחה')
    created_at = Column(DateTime, default=datetime.utcnow)

# יצירת הטבלה במסד
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

# נקודת שליחה
@app.route('/submit_issue', methods=['POST'])
def submit_issue():
    try:
        data = request.get_json()
        print("📥 נתונים שהתקבלו:", data)

        session = Session()
        issue = Issue(
            name=data.get('name'),
            email=data.get('email'),
            description=data.get('description'),
            systemnumber=data.get('systemnumber'),
            location=data.get('location'),
            failersolved=data.get('failersolved'),
            date=data.get('date')
        )
        session.add(issue)
        session.commit()

        return jsonify({"message": "התקלה נשלחה בהצלחה!"}), 200
    except Exception as e:
        print("🔥 שגיאה בשרת:", e)
        return jsonify({"message": "אירעה שגיאה בשרת"}), 500

# נקודת שליפה
@app.route('/issues', methods=['GET'])
def get_issues():
    session = Session()
    issues = session.query(Issue).all()
    return jsonify([{
        'id': i.id,
        'name': i.name,
        'email': i.email,
        'description': i.description,
        'systemnumber': i.systemnumber,
        'location': i.location,
        'failersolved': i.failersolved,
        'date': i.date,
        'status': i.status,
        'created_at': i.created_at.isoformat()
    } for i in issues])

# הרצת האפליקציה
if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
