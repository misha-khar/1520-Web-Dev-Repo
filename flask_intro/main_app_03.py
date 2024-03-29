from flask import Flask, request

app = Flask(__name__)

formpage = """
<!DOCTYPE html>
<html>
    <head>
        <title>Basic form</title>
    </head>
    <body>
        <form action="" method="post">
            Enter a number: <input type="text" name="anumber" />
            <br />
            Enter a string: <input type="text" name="astring" />
            <br />
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
        <br />
        You entered this string: {}
    </body>
</html>
"""

@app.route("/", methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        return presentpage.format(request.form["anumber"], request.form["astring"])
    else:
        return formpage

@app.route("/foo")
def fooController():
    return "<h1>THIS IS THE FOO PAGE</h1>"

@app.route("/bar")
def bar():
    return "<h1>this is the bar page</h1>"

if __name__ == "__main__":
    app.run()