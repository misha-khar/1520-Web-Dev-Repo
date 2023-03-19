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
        <h2>Welcome to Wikipedia, the free encyclopedia that anyone can contribute</h2>
        <p>6,467,051 articles in English<p>
        <ul>
            <li>The arts </li>
            <li>Biography </li>
            <li>Geography </li>
            <li>History </li>
            <li>Mathematics </li>
            <li>Technology </li>
        </ul>
        <a href="{0}">About</a>
        </br>
        <a href="{1}">Contact Us</a>
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
        <p>Wikipedia's purpose is to benefit readers by acting as a widely accessible and free encyclopedia that contains information on all branches of knowledge. It is supported by the Wikimedia Foundation and consists of freely editable content. The name "Wikipedia" is a blending of the words wiki (a technology for creating collaborative websites, from the Hawaiian word wiki, meaning "quick") and encyclopedia. Wikipedia's articles provide links to guide readers to related pages with more information.</p>
        <p>Wikipedia is written collaboratively by largely anonymous volunteers. Anyone with Internet access and in good standing can write and make changes to Wikipedia articles, except in limited cases where editing is restricted to prevent disruption or vandalism.</p>
        <p>Since its creation on January 15, 2001, Wikipedia has grown into the world's largest reference website, attracting 1.7 billion unique-device visitors monthly as of November 2021. It currently has more than fifty-nine million articles in more than 300 languages, including 6,534,664 articles in English with 115,594 active contributors in the past month.</p>
        <p>The fundamental principles of Wikipedia are summarized in its five pillars. The Wikipedia community has developed many policies and guidelines, with which familiarity is not a requirement for contributing. </p>
        <a href="{0}">back to main page</a>
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
        <form action="" method="post">
			Name:  <input type="text" name="name" />
            </br>
			Email:  <input type="text" name="email" />
            </br>
			<input type="submit" value="submit" />
		</form>
        </br>
        <a href="{0}">back to main page</a>
    </body> 
</html> 
"""

acknowledgepage = """ 
<!DOCTYPE html> 
<html> 
    <head> 
        <title>Acknowledge Page</title> 
    </head> 
    <body> 
        <h1>Thanks, {0} </h1>
        <p>Your request has been submitted!<p>
        <p>We will contact you via your email: {1} <p>
        </br>
        <a href="{2}">back to main page</a>
    </body> 
</html> 
"""


@app.route("/")
def mainController():
    return mainpage.format(url_for("aboutController"), url_for("contactController"))


@app.route("/about")
def aboutController():
    return aboutpage.format(url_for("mainController"))


@app.route("/contact", methods=["GET", "POST"])
def contactController():
    if request.method == "GET":
        return contactpage.format(url_for("mainController"))
    else:
        return acknowledgepage.format(request.form["name"], request.form["email"], url_for("mainController"))


if __name__ == "__main__":
    app.run()
