from flask import Flask, request, abort, url_for, redirect, render_template
app = Flask(__name__)


@app.route("/")
def mainController():
    return render_template("mainpage.html",
                           linkToAbout=url_for("aboutController"),
                           linkToContact=url_for("contactController"))


@app.route("/about")
def aboutController():
    return render_template("aboutpage.html",
                           linkToMain=url_for("mainController"))


@app.route("/contact", methods=["GET", "POST"])
def contactController():
    if request.method == "GET":
        return render_template("contactpage.html",
                               linkToMain=url_for("mainController"))
    else:
        return render_template("acknowledgepage.html",
                               linkToMain=url_for("mainController"),
                               name=request.form["name"],
                               email=request.form["email"])


if __name__ == "__main__":
    app.run()
