from .db import get_db
db = get_db()

class MyModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

class userProfile(db.Model):
    __tablename__ = 'userProfile'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    photo = db.Column(db.String(255))
    bio = db.Column(db.String(255))
    email = db.Column(db.String(255))