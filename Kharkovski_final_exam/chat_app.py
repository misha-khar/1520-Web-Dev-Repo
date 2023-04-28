from flask import Flask, request, abort, url_for, redirect, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_BINDS'] = {'chat': 'sqlite:///chat.db'}

db = SQLAlchemy()
db.init_app(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(10), unique=True, nullable=False)
    password = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)


class Chat(db.Model):
    __bind_key__ = 'chat'
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    user = db.Column(db.String(10), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)


@app.route("/create_db")
def create_db():
    db.create_all()
    return "all tables have been created!"


# by default, direct to login
@app.route("/")
def default():
    return redirect(url_for("login_controller"))


@app.route("/login/", methods=["GET", "POST"])
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
            return render_template("loginPage.html", error="Incorrect username or password", refToRegister=url_for("register_controller"))

    elif request.method == "GET":
        return render_template("loginPage.html", refToRegister=url_for("register_controller"))

    return render_template("loginPage.html", refToRegister=url_for("register_controller"))


@app.route("/register/", methods=["GET", "POST"])
def register_controller():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        # username = 'misha'
        # email = 'test@gmail.com'
        # password = 'abc'
        # confirm_password = 'abc'
        if password != confirm_password:
            # Passwords don't match - display error message
            error = "Passwords don't match. Please try again."
            return render_template('register.html', error=error)
        else:
            try:
                # Create new user in database and redirect to login page
                new_user = User(username=username,
                                email=email, password=password)
                db.session.add(new_user)
                db.session.commit()
                return redirect(url_for('profile', username=username, refToLogout=url_for("unlogger")))
            except:
                # Display error message if username already exists
                error = "Error creating account. Please try again."
                return render_template('register.html', error=error)
    else:
        # Display registration form
        return render_template('register.html')


@app.route("/profile/<username>")
def profile(username=None):
    return render_template("chat_page.html", username=username, refToLogout=url_for("unlogger"))


@app.route("/logout/")
def unlogger():
    return redirect(url_for("login_controller"))


# @app.route("/new_message/", methods=["POST"])
# def new_message():


# @app.route("/messages/")
# def messages():


if __name__ == "__main__":
    app.run()
