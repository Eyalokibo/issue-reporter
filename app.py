from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

app = Flask(__name__)
CORS(app)

engine = create_engine('sqlite:///issues.db')
Base = declarative_base()

class Issue(Base):
    __tablename__ = 'issues'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(100))
    description = Column(Text)
    systemnumber = Column(String(100))
    location = Column(String(100))
    failersolved = Column(String(100))
    date = Column(String(50))
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

@app.route('/submit_issue', methods=['POST'])
def submit_issue():
    try:
        data = request.json
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
        print("❌ שגיאה בשרת:", str(e))
        return jsonify({"message": "שגיאה בשרת", "error": str(e)}), 500

@app.route('/issues', methods=['GET'])
def get_issues():
    session = Session()
    issues = session.query(Issue).all()
    return jsonify([{
        'name': i.name,
        'email': i.email,
        'description': i.description,
        'systemnumber': i.systemnumber,
        'location': i.location,
        'failersolved': i.failersolved,
        'date': i.date
    } for i in issues])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
