import hmac
import sqlite3
import datetime

from flask import Flask, request, jsonify
from flask_jwt import JWT, jwt_required, current_identity
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message
import cloudinary
from cloudinary import uploader


class User(object):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password


def fetch_users():
    with sqlite3.connect('real.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user")
        users = cursor.fetchall()

        new_data = []

        for data in users:
            new_data.append(User(data[0], data[3], data[4]))
    return new_data


def init_user_table():
    conn = sqlite3.connect('real.db')
    print("Opened database successfully")
    # creating user table
    conn.execute("CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY AUTOINCREMENT,"
                 "first_name TEXT NOT NULL,"
                 "last_name TEXT NOT NULL,"
                 "username TEXT NOT NULL,"
                 "password TEXT NOT NULL,"
                 "email NOT NULL)")
    print("user table created successfully")
    conn.close()


def init_property_table():
    with sqlite3.connect('real.db') as conn:
        # creating product table
        conn.execute("CREATE TABLE IF NOT EXISTS property(id INTEGER PRIMARY KEY AUTOINCREMENT,"
                     "title TEXT NOT NULL,"
                     "description TEXT NOT NULL,"
                     "price TEXT NOT NULL,"
                     "category TEXT NOT NULL,"
                     "location TEXT NOT NULL,"
                     "date_created TEXT NOT NULL)")
    print("Property table created successfully.")


init_user_table()
init_property_table()

users = fetch_users()

username_table = {u.username: u for u in users}
userid_table = {u.id: u for u in users}


def authenticate(username, password):
    user = username_table.get(username, None)
    if user and hmac.compare_digest(user.password.encode('utf-8'), password.encode('utf-8')):
        return user


def identity(payload):
    user_id = payload['identity']
    return userid_table.get(user_id, None)


app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'super-secret'
# allows an extension on the token time limit
app.config['JWT_EXPIRATION_DELTA'] = datetime.timedelta(seconds=4000)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = "jasondoescoding@gmail.com"
app.config['MAIL_PASSWORD'] = "JayoCee07"
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

jwt = JWT(app, authenticate, identity)


@app.route('/')
def welcome():
    response = {}
    response["message"] = "Welcome to my API"
    response["status_code"] = 200
    return response


@app.route('/protected')
@jwt_required()
def protected():
    return '%s' % current_identity


# Function to register users
@app.route('/registration/', methods=["POST"])
@cross_origin()
def user_registration():
    response = {}

    if request.method == "POST":

        first_name = request.form['first_name']
        last_name = request.form['last_name']
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        with sqlite3.connect("real.db") as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO user("
                           "first_name,"
                           "last_name,"
                           "username,"
                           "password,"
                           "email) VALUES(?, ?, ?, ?, ?)", (first_name, last_name, username, password, email))
            conn.commit()
            response["message"] = "success"
            response["status_code"] = 201

            if response['status_code'] == 201:
                msg = Message('success', sender='jasondoescoding@gmail.com', recipients=[email])
                msg.body = 'Registration successful.'
                mail.send(msg)
                return "Registration Successful"


@app.route("/auth/", methods=["POST"])
@cross_origin()
def auth():
    response = {}

    if request.method == "POST":

        username = request.json['username']
        password = request.json['password']

        with sqlite3.connect("real.db") as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM user WHERE username='{}' AND password='{}'".format(username, password))
            user_information = cursor.fetchone()

        if user_information:
            response["user_info"] = user_information
            response["message"] = "Success"
            response["status_code"] = 201
            return jsonify(response)

        else:
            response['message'] = "Unsuccessful login, try again"
            response['status_code'] = 401
            return jsonify(response)


# Function to add products to the cart
@app.route('/add-prop/', methods=["POST"])
# @jwt_required()
def add_property():
    response = {}

    if request.method == "POST":
        try:
            title = request.json['title']
            description = request.json['description']
            price = request.json['price']
            category = request.json['category']
            location = request.json['location']
            product_image = request.json['img']
            date_created = datetime.datetime.now()

            cloudinary.config(cloud_name='dkjvy0lsk', api_key='341771532432914',
                              api_secret='860zypKrIl-scl-EGZxNjwkAm-8')
            upload_result = None

            app.logger.info('%s file_to_upload', product_image)
            if product_image:
                upload_result = cloudinary.uploader.upload(product_image)  # Upload results
                app.logger.info(upload_result)
                data = jsonify(upload_result)

            with sqlite3.connect('real.db') as conn:
                cursor = conn.cursor()
                cursor.execute("INSERT INTO property("
                               "title,"
                               "description,"
                               "price,"
                               "category,"
                               "location,"
                               "date_created) VALUES(?, ?, ?, ?, ?, ?)",
                               (title, description, price, category, location, date_created))
                conn.commit()
                response["status_code"] = 201
                response['description'] = "Property added successfully"

        except Exception as x:
            conn.rollback()
            response["description"] = "Error occurred while trying to add property" + str(x)
        finally:
            conn.close()
            return response


# https://stormy-tundra-96699.herokuapp.com

# function to view the entire cart
@app.route('/view-all/', methods=["GET"])
def get_cart():
    response = {}
    with sqlite3.connect("real.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM property")

        products = cursor.fetchall()

    response['status_code'] = 200
    response['data'] = products
    return response


# function to remove a product from cart
@app.route("/remove-prop/<int:product_id>")
# @jwt_required()
def remove_product(product_id):
    response = {}
    with sqlite3.connect("real.db") as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM property WHERE id=" + str(product_id))
        conn.commit()
        response['status_code'] = 200
        response['message'] = "Product removed successfully."
    return response


# function to edit a specific characteristic of a product
@app.route('/edit-prop/<int:product_id>/', methods=["PUT"])
# @jwt_required()
def edit_product(product_id):
    response = {}

    if request.method == "PUT":
        with sqlite3.connect('real.db') as conn:
            incoming_data = dict(request.json)
            put_data = {}

            if incoming_data.get("title") is not None:
                put_data["title"] = incoming_data.get("title")
                with sqlite3.connect('real.db') as conn:
                    cursor = conn.cursor()
                    cursor.execute("UPDATE property SET title =? WHERE id=?", (put_data["title"], product_id))
                    conn.commit()

                    response['message'] = "Update to title was successful"
                    response['status_code'] = 200
            if incoming_data.get("description") is not None:
                put_data['description'] = incoming_data.get('description')

                with sqlite3.connect('real.db') as conn:
                    cursor = conn.cursor()
                    cursor.execute("UPDATE comics SET description =? WHERE id=?", (put_data["description"], product_id))
                    conn.commit()

                    response["description"] = "Update to description successful"
                    response["status_code"] = 200
            if incoming_data.get("price") is not None:
                put_data['price'] = incoming_data.get('price')

                with sqlite3.connect('real.db') as conn:
                    cursor = conn.cursor()
                    cursor.execute("UPDATE property SET price =? WHERE id=?", (put_data["price"], product_id))
                    conn.commit()

                    response["price"] = "Update to price was successful"
                    response["status_code"] = 200
            if incoming_data.get("category") is not None:
                put_data['category'] = incoming_data.get('category')

                with sqlite3.connect('real.db') as conn:
                    cursor = conn.cursor()
                    cursor.execute("UPDATE property SET category =? WHERE id=?", (put_data["category"], product_id))
                    conn.commit()

                    response["category"] = "Update to category was successful"
                    response["status_code"] = 200
    return response


# running program
if __name__ == "__main__":
    app.run()
