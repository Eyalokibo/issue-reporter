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
    title = Column(String(100))
    description = Column(Text)
    user_email = Column(String(100))
    status = Column(String(20), default='פתוחה')
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

@app.route('/submit_issue', methods=['POST'])
def submit_issue():
    data = request.json
    session = Session()
    issue = Issue(
        title=data['title'],
        description=data['description'],
        user_email=data['user_email']
    )
    session.add(issue)
    session.commit()
    return jsonify({'message': 'התקלה נשלחה בהצלחה!'})

@app.route('/issues', methods=['GET'])
def get_issues():
    session = Session()
    issues = session.query(Issue).all()
    return jsonify([{
        'id': i.id,
        'title': i.title,
        'description': i.description,
        'user_email': i.user_email,
        'status': i.status,
        'created_at': i.created_at.isoformat()
    } for i in issues])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
