import psycopg2
from flask import g
from config import DATABASE_CONFIG

def get_db():
    if 'db' not in g:
        try:
            g.db = psycopg2.connect(**DATABASE_CONFIG)
        except psycopg2.Error as e:
            print("Error connecting to the database:", e)
            g.db = None
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()
