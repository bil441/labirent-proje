from flask import Flask, redirect, url_for, render_template, request

app = Flask(__name__)
app.secret_key = "hello"

@app.route("/", methods=["POST","GET"])
def welcome():

    return render_template("welcome.html")


@app.route("/menu", methods=["POST","GET"])
def menu():

    return render_template("menu.html")

@app.route("/example", methods=["POST","GET"])
def example():

    return render_template("example.html")

@app.route("/about", methods=["POST","GET"])
def about():

    return render_template("about.html")

@app.route("/contact", methods=["POST", "GET"])
def contact():

    return render_template("contact.html")

@app.route("/game", methods=["POST","GET"])
def game():

    return render_template("game.html")

@app.route("/settings", methods=["POST","GET"])
def settings():

    return render_template("settings.html")
