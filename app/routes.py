from flask import Flask, request, jsonify, g
from app.db import get_db, close_db
import base64, requests
import uuid
from datetime import datetime, timezone

def register_teardown_functions(app):
    @app.before_request
    def before_request():
        get_db()

    @app.teardown_request
    def teardown_request(exception=None):
        close_db(exception)

def register_routes(app):
    register_teardown_functions(app)

    @app.route('/app/login/<email>/<password>', methods=['GET'])
    def login(email, password):
        db = get_db()
        cursor = db.cursor()

        try:
            cursor.execute("SELECT email, password FROM userLogin WHERE email = %s and password = %s", (email,password))
            user_login = cursor.fetchone()
            if user_login:
                # Assuming user_data is in the order: id, name, photo, bio, email
                if user_login[0] == email and user_login[1] == password:
                    return jsonify({"message": "Success!"}), 200
            else:
                return jsonify({"error": "Invalid credentials"}), 403

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()

    @app.route('/app/signup', methods=['POST'])
    def signup():
        # Assuming your table and columns setup matches this structure
        email = request.form['email']
        password = request.form['password']

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute("INSERT INTO userLogin (email, password) VALUES (%s, %s)", (email, password))
            db.commit()
            return jsonify({'message': 'Sign up completed successfully'}), 201
        except Exception as e:
            db.rollback()
            return jsonify({'message': 'Failed to sign up', 'error': str(e)}), 500
        finally:
            cursor.close()

    @app.route('/user/createProfile', methods=['POST'])
    def create_profile():
        # Assuming your table and columns setup matches this structure
        name = request.form['name']
        photo = request.files['photo']
        bio = request.form['bio']
        email = request.form['email']

        imgbb_api_key = '4be6dbf04b0b92a24d37664bc6b536ee'
        imgbb_url = "https://api.imgbb.com/1/upload"
        payload = {
            "key": imgbb_api_key,
            "image": base64.b64encode(photo.read()),
        }
        res = requests.post(imgbb_url, payload)
        if res.status_code == 200:
            photo_url = res.json()['data']['url']
        else:
            return jsonify({'message': 'Image upload failed'}), 500

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute("INSERT INTO userProfile (name, photo, bio, email) VALUES (%s, %s, %s, %s)", (name, photo_url, bio, email))
            db.commit()
            return jsonify({'message': 'User added successfully'}), 201
        except Exception as e:
            db.rollback()
            return jsonify({'message': 'Failed to add user', 'error': str(e)}), 500
        finally:
            cursor.close()

    @app.route('/user/editProfile', methods=['POST'])
    def edit_profile():
         # Collect data from request
        data = request.form 
        user_email = data.get('email')
        if not user_email:
            return jsonify({'error': 'Email is required'}), 400

        # Initialize SQL insert statement parts
        updates = []
        values = []

        for field in ['name', 'photo', 'bio']:
            if field in data:
                updates.append(f"{field} = %s")
                values.append(data[field])

        values.append(user_email)

        sql = f"UPDATE userProfile SET {', '.join(updates)} WHERE email = %s"

        # Execute the SQL query safely with parameters
        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute(sql, tuple(values))
            if cursor.rowcount == 0:
                return jsonify({'message': 'User not found'}), 404
            db.commit()
            return jsonify({'message': 'User profile updated successfully'}), 200
        except Exception as e:
            db.rollback()
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()

    @app.route('/user/getProfile/<email>', methods=['GET'])
    def get_profile(email):
        db = get_db()
        cursor = db.cursor()

        try:
            cursor.execute("SELECT id, name, photo, bio, email FROM userProfile WHERE email = %s", (email,))
            user_data = cursor.fetchone()
            if user_data:
                # Assuming user_data is in the order: id, name, photo, bio, email
                user_profile = {
                    "id": user_data[0],
                    "name": user_data[1],
                    "photo": user_data[2],
                    "bio": user_data[3],
                    "email": user_data[4]
                }
                return jsonify(user_profile), 200
            else:
                return jsonify({"error": "User not found"}), 404

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()

    @app.route('/hobbies/createHobby', methods=['POST'])
    def create_hobby():
        category = request.form['category']
        title = request.form['title']
        description = request.form['description']
        email = request.form['email']

        if not email:
            return jsonify({'error': 'Email is required'}), 400

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute("INSERT INTO hobbies (category, title, description, email) VALUES (%s, %s, %s, %s)", 
                           (category, title, description, email))
            db.commit()
            return jsonify({'message': 'Hobby created successfully'}), 201
        except Exception as e:
            db.rollback()
            return jsonify({'message': 'Failed to create hobby', 'error': str(e)}), 500
        finally:
            cursor.close()

    @app.route('/hobbies/listUserHobbies/<email>', methods=['GET'])
    def list_user_hobbies(email):
        if not email:
            return jsonify({'error': 'Email is required'}), 400

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute("SELECT * FROM hobbies WHERE email=%s", (email,))
            hobbies = cursor.fetchall()
            if hobbies:
                hobbies_list = [{"id": hobby[0], "category": hobby[1], "title": hobby[2], "description": hobby[3], "email": hobby[3]} for hobby in hobbies]
                return jsonify({'message': hobbies_list}), 200
        except Exception as e:
            return jsonify({'message': 'Failed to retrieve hobby', 'error': str(e)}), 500
        finally:
            cursor.close()

    @app.route('/user/editHobby', methods=['POST'])
    def edit_hobby():
        data = request.form 
        email = data.get('email')
        hobby_id = data.get('id')
        if not hobby_id or not email:
            return jsonify({'error': 'ID and email is required'}), 400

        updates = []
        values = []

        for field in ['category', 'title', 'description, email']:
            if field in data:
                updates.append(f"{field} = %s")
                values.append(data[field])

        values.append(hobby_id)

        sql = f"UPDATE hobbies SET {', '.join(updates)} WHERE id = %s"

        # Execute the SQL query safely with parameters
        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute(sql, tuple(values))
            if cursor.rowcount == 0:
                return jsonify({'message': 'Hobby not found'}), 404
            db.commit()
            return jsonify({'message': 'Hobby updated successfully'}), 200
        except Exception as e:
            db.rollback()
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()
    
    @app.route('/user/deleteHobby', methods=['POST'])
    def delete_hobby():
        data = request.form
        hobby_id = data.get('id')
        if not hobby_id:
            return jsonify({'error': 'ID is required'}), 400

        sql = "DELETE FROM hobbies WHERE id = %s"

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute(sql, (hobby_id,))
            if cursor.rowcount == 0:
                return jsonify({'message': 'Hobby not found'}), 404
            db.commit()
            return jsonify({'message': 'Hobby deleted successfully'}), 200
        except Exception as e:
            db.rollback()
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()

    @app.route('/messages/createConversation', methods=['POST'])
    def create_conversation():
        data = request.form
        userOne = data.get('userOne')
        userTwo = data.get('userTwo')
        if not userOne or not userTwo:
            return jsonify({'error': 'Both users are required'}), 400
        conversation_id = uuid.uuid4()
        db = get_db()
        cursor = db.cursor()
        cursor.execute("""
            SELECT conversation_id FROM conversations 
            WHERE 
            (participant_one_email = %s AND participant_two_email = %s) 
            OR 
            (participant_one_email = %s AND participant_two_email = %s)
        """, (userOne, userTwo, userTwo, userOne))
        if cursor.fetchone():
            # A conversation already exists, so don't insert a new one.
            return jsonify({'error': 'Conversation already exists'}), 409

        conversation_id = uuid.uuid4()
        try:
            cursor.execute("INSERT INTO conversations (conversation_id, participant_one_email, participant_two_email, readStatus) VALUES (%s, %s, %s, %s)", (str(conversation_id), userOne, userTwo, True))
            db.commit()
            return jsonify({'message': 'Conversation created successfully'}), 201
        except Exception as e:
            db.rollback()
            return jsonify({'message': 'Failed to create conversation', 'error': str(e)}), 500
        finally:
            cursor.close()
    
    @app.route('/messages/sendMessage', methods=['POST'])
    def send_message():
        data = request.form
        sender = data.get('sender')
        receiver = data.get('receiver')
        message = data.get('message')
        current_utc_time = datetime.now(timezone.utc)

        if not sender or not receiver:
            return jsonify({'error': 'Both users are required'}), 400
        
        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute("""
                SELECT conversation_id FROM conversations 
                WHERE 
                (participant_one_email = %s AND participant_two_email = %s) 
                OR 
                (participant_one_email = %s AND participant_two_email = %s)
                """, (sender, receiver, receiver, sender))
            conversationId = cursor.fetchone()
            
            cursor.execute("INSERT INTO messages (conversationId, sender, message, timeSent) VALUES (%s, %s, %s, %s)", (str(conversationId[0]), sender, message, current_utc_time))
            db.commit()

            cursor.execute("UPDATE conversations SET readStatus = %s WHERE conversation_id = %s", (False, str(conversationId[0])))
            db.commit()
            return jsonify({'message': 'Message sent successfully'}), 201
        except Exception as e:
            db.rollback()
            return jsonify({'message': 'Failed to send message', 'error': str(e)}), 500
        finally:
            cursor.close()
    
    @app.route('/messages/getNMessages/<userOne>/<userTwo>/<number>', methods=['GET'])
    def get_n_messages(userOne, userTwo, number):
        db = get_db()
        cursor = db.cursor()

        cursor.execute("""
            SELECT conversation_id FROM conversations 
            WHERE 
            (participant_one_email = %s AND participant_two_email = %s) 
            OR 
            (participant_one_email = %s AND participant_two_email = %s)
        """, (userOne, userTwo, userTwo, userOne))
        
        result = cursor.fetchone()
        if result:
            conversation_id = result[0]
        else:
            return "Conversation not found."

        try:
            cursor.execute("""
                SELECT sender, message, timeSent FROM messages 
                WHERE conversationId = %s
                ORDER BY timeSent DESC
                LIMIT %s
            """, (conversation_id, number))
            
            messages = cursor.fetchall()
            
            # Formatting the result for display
            formatted_messages = [{"message": msg[0], "timeSent": msg[1]} for msg in messages]
            
            return jsonify(formatted_messages), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()