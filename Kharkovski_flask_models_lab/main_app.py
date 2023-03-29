from flask import Flask, render_template, redirect, request, url_for
from flask_sqlalchemy import SQLAlchemy
from BlogModel import db, Blog


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
db.init_app(app)


@app.route("/blog/:id")
def blogId(id):
    blogs = Blog.query.order_by(Blog.title).all()
    return render_template("index.html", blogs=blogs, refToHome=url_for("index"), refToNewBlog=url_for("newBlogPage"))


@app.route("/")
def index():
    blogs = Blog.query.order_by(Blog.title).all()
    return render_template("index.html", blogs=blogs, refToHome=url_for("index"), refToNewBlog=url_for("newBlogPage"))


@app.route("/blog/<int:id>", methods=['GET'])
def blog(id):
    blog = Blog.query.get_or_404(id)
    try:
        return render_template('blogView.html', blog=blog, refToHome=url_for("index"), refToNewBlog=url_for("newBlogPage"))
    except:
        return 'That blog does not exist'


@app.route('/delete/<int:id>')
def delete(id):
    blog_to_delete = Blog.query.get_or_404(id)
    try:
        db.session.delete(blog_to_delete)
        db.session.commit()
        return redirect("/")
    except:
        return 'There was a problem deleting that blog'


@app.route("/new-blog", methods=["GET", "POST"])
def newBlogPage():
    if request.method == 'POST':
        blog_title = request.form['blog-title']
        blog_body = request.form['blog-body']
        blog_author = request.form['blog-author']
        new_blog = Blog(title=blog_title, body=blog_body, author=blog_author)

        try:
            db.session.add(new_blog)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue adding your blog'
    else:
        return render_template("newBlogPage.html", refToHome=url_for("index"), refToNewBlog=url_for("newBlogPage"))


@app.route("/create_db")
def create_db():
    db.create_all()
    return "all tables have been created!"


if __name__ == "__main__":
    app.run()
