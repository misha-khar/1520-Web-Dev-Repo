from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.String(500), nullable=False)
    author = db.Column(db.String(50), nullable=False)
