from flask import Flask, request, abort, url_for, redirect
app = Flask(__name__)

mainpage = """
<!DOCTYPE html> 
<html> 
    <head>
        <title>Mainpage</title>
    </head> 
    <body> 
        <h1>Main Page</h1>
        <h2>Welcome to Wikipedia, the free encyclopedia</h2>
    </body> 
</html>
"""

aboutpage = """ 
<!DOCTYPE html> 
<html> 
    <head>
        <title>About Page</title>
    </head> 
    <body> 
        about page
    </body> 
</html>
"""

contactpage = """ 
<!DOCTYPE html> 
<html> 
    <head> 
        <title>Contact Page</title> 
    </head> 
    <body> 
        contact page
    </body> 
</html> 
"""

submittedpage = """ 
<!DOCTYPE html> 
<html> 
    <head> 
        <title>Submitted Page</title> 
    </head> 
    <body> 
        Submitted form page
    </body> 
</html> 
"""


@app.route("/")
def contactController():
    return mainpage


@app.route("/about")
def aboutController():
    return aboutpage


@app.route("/contact", methods=["GET", "POST"])
def main():
    if request.method == "GET":
        return contactpage
    else:
        return submittedpage


if __name__ == "__main__":
    app.run()
