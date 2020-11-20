from flask import Flask, redirect, url_for, render_template, request

app = Flask(__name__)
app.secret_key = "hello"

@app.route("/", methods=["POST","GET"])
def welcome():

    return "Welcome screen... 3/7"


@app.route("/menu", methods=["POST","GET"])
def menu():

    return "Menu page... 4/7"

@app.route("/example", methods=["POST","GET"])
def example():

    return "An example of a maze... 1/7"

@app.route("/about", methods=["POST","GET"])
def about():

    return "About us... 2/7"

@app.route("/contact", methods=["POST", "GET"])
def contact():

    return "To contact with us... 5/7"

@app.route("/game", methods=["POST","GET"])
def game():

    return "Playable game... 6/7"

@app.route("/settings", methods=["POST","GET"])
def settings():

    return "Settings... 7/7"

if __name__ == '__main__':
    app.run()
