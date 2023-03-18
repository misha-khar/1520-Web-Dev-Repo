from flask import Flask, request, abort, url_for, redirect, session

app = Flask(__name__)

users = {"alice": "qwert", "bob": "asdfg", "charlie": "zxcvb"}

loginPage = """<!DOCTYPE html>
<html>
	<head>
		<title>Basic form</title>
	</head>
	<body>
		<form action="" method="post">
			Username:  <input type="text" name="user" />
			<br />
			Password:  <input type="text" name="pass" />
			<br />
			<input type="submit" value="submit" />
		</form>
	</body>
</html>
"""

curProfile = """<!DOCTYPE html>
<html>
	<head>
		<title>Your profile!</title>
	</head>
	<body>
		<h2> Welcome back! </h2> 
        <a href="{}"> click here to logout</a>
	</body>
</html>
"""

otherProfile = """<!DOCTYPE html>
<html>
	<head>
		<title>{0}'s profile!</title>
	</head>
	<body>
		This is {0}'s profile page.
	</body>
</html>
"""

logoutPage = """
<html>
	<head>
		<title>Logout Page!</title>
	</head>
	<body>
		<h2> You have successfully been logout out! </h2>
	</body>
</html>"""

@app.route("/")
def default():
	return redirect(url_for("login_controller"))

@app.route("/login", methods = ["GET", "POST"])
def login_controller():
    # first check if the user is already logged in
    if "username" in session:
        return redirect(url_for("profile", username = session["username"]))
    elif request.method == "POST":
        if request.form["user"] in users:
            if users[request.form["user"]] == request.form["pass"]:
                session["username"] = request.form["user"]
                return redirect(url_for("profile", username = request.form["user"]))
            else:
                abort(401)
        else: 
            abort(401)
    else: 
        return loginPage

@app.route("/profile/", methods=["GET", "POST"])
@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username=None):
	if not username:
		if "username" in session:
			return redirect(url_for("profile", username = session["username"]))
	elif username in users:
		if "username" in session and session["username"] == username:
			return curProfile.format(url_for("unlogger"))
		else:
			return otherProfile.format(username)
	else:
		abort(404)

@app.route("/logout/")
def unlogger():
	# if logged in, log out, otherwise offer to log in
	if "username" in session:
		# note, here were calling the .clear() method for the python dictionary builtin
		session.clear()
		return logoutPage
	else:
		return redirect(url_for("login_controller"))
        
# needed to use sessions
# note that this is a terrible secret key
app.secret_key = "this is a terrible secret key"

if __name__ == "__main__":
	app.run()