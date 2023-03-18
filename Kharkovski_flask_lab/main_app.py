from flask import Flask, request
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

formpage = """ 
<!DOCTYPE html> 
<html> 
    <head>
        <title>Basic form</title>
    </head> 
    <body> 
        <form action="" method="post"> 
            Enter a number: <input type="text" name="anumber" />
            <br/> 
            Enter a string: <input type="text" name="astring" /> 
            <br/>
            <input type="submit" value="submit" /> 
        </form> 
    </body> 
</html>
"""

presentpage = """ 
<!DOCTYPE html> 
<html> 
    <head> 
        <title>Present data!</title> 
    </head> 
    <body> 
        You entered this number: {} 
        <br/> 
        You entered this string: {} 
    </body> 
</html> 
"""


@app.route("/")
def contactController():
    return "<h2> This is the bar page </h2>"


@app.route("/about")
def aboutController():
    return "<h1> This is the foo page </h1>"


@app.route("/contact", methods=["GET", "POST"])
def main():
    if request.method == "GET":
        return formpage
    else:
        return presentpage.format(request.form["anumber"], request.form["astring"])


if __name__ == "__main__":
    app.run()
