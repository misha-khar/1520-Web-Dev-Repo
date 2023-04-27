from flask import Flask, request, abort, url_for, redirect, render_template

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_BINDS'] = {'chat': 'sqlite:///chat.db'}


# class Chat(db.Model):
#     __bind_key__ = 'chat'


# by default, direct to login
@app.route("/")
def default():
    return redirect(url_for("login_controller"))


@app.route("/login/", methods=["GET", "POST"])
def login_controller():

    if request.method == "POST":
        return render_template("chat_page.html")

    elif request.method == "GET":
        return render_template("loginPage.html", refToRegister=url_for("register"))

    return render_template("loginPage.html", refToRegister=url_for("register_controller"))


@app.route("/register/", methods=["GET", "POST"])
def register_controller():
    return render_template("registerPage.html")


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
