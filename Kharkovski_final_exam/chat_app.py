from flask import Flask, jsonify, request, abort, url_for, redirect, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_BINDS'] = {'chat': 'sqlite:///chat.db'}

db = SQLAlchemy()
db.init_app(app)


class User(db.Model):  # create a User class for the app.db database
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(10), unique=True, nullable=False)
    password = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)


class Chat(db.Model):  # create a Chat class for the chat.db database
    __bind_key__ = 'chat'
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    user = db.Column(db.String(10), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)


@app.route("/create_db")  # create the database
def create_db():
    db.create_all()
    return "all tables have been created!"


@app.route("/")  # by default, direct to login
def default():
    return redirect(url_for("login_controller"))


@app.route("/login/", methods=["GET", "POST"])  # login controller
def login_controller():
    if request.method == "POST":
        # check if username and pass word match form db
        username = request.form["username"]
        password = request.form["password"]

        user = User.query.filter_by(
            username=username, password=password).first()

        if user is not None:
            return redirect(url_for("profile", username=username))
        else:
            return render_template("loginPage.html", errorMessage="Incorrect username or password", refToRegister=url_for("register_controller"))

    elif request.method == "GET":
        return render_template("loginPage.html", refToRegister=url_for("register_controller"), errorMessage="")

    return render_template("loginPage.html", refToRegister=url_for("register_controller"), errorMessage="")


@app.route("/register/", methods=["GET", "POST"])  # register controller
def register_controller():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        # confirm if passwords match
        if password != confirm_password:
            # Passwords don't match - display error message
            error = "Passwords don't match. Please try again."
            return render_template('register.html', error=error)
        else:
            try:
                # Create new user in database and redirect to login page
                new_user = User(username=username,
                                email=email, password=password)
                # add new user to the database
                db.session.add(new_user)
                # commit changes to the database
                db.session.commit()
                return redirect(url_for('profile', username=username, refToLogout=url_for("unlogger")))
            except:
                # Display error message if username already exists
                error = "Error creating account. Please try again."
                return render_template('register.html', error=error, errorMessage="Username or email already exists")
    else:
        return render_template('register.html')


@app.route("/profile/<username>")  # profile controller
def profile(username=None):
    return render_template("chat_page.html", username=username, refToLogout=url_for("unlogger"))


@app.route("/logout/")  # logout controller
def unlogger():
    return render_template("logoutPage.html", refToLogin=url_for("login_controller"))


@app.route("/new_message/", methods=["POST"])  # new message controller
def new_message():
    try:
        message = request.form["message"]
        user = request.form["username"]
        timestamp = datetime.now()
        new_message = Chat(message=message, user=user, timestamp=timestamp)
        # add new message to the database
        db.session.add(new_message)
        # commit changes to the database
        db.session.commit()
        return "success"
    except Exception as e:
        print(e)
        return "error"


@app.route("/messages/")  # messages controller
def messages():
    try:
        # get all messages from the database
        rawMessages = Chat.query.order_by(Chat.timestamp.desc()).all()
        results = []
        # create a dictionary for each message
        for message in rawMessages:
            res = {
                message.user: message.message,
            }
            # append each message to the results list
            results.append(res)
            # return the results list as a json object
        return jsonify(results)
    except Exception as e:
        print(e)
        return "error"


if __name__ == "__main__":
    app.run()
