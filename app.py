from flask import Flask, render_template, request

app = Flask(__name__)
app.secret_key = "hello"
difficultyGlob = "medium"


@app.route("/", methods=["POST", "GET"])
def welcome():
    return render_template("welcome.html")


@app.route("/menu", methods=["POST", "GET"])
def menu():
    return render_template("menu.html")


@app.route("/example", methods=["POST", "GET"])
def example():
    return render_template("example.html")


@app.route("/about", methods=["POST", "GET"])
def about():
    return render_template("about.html")


@app.route("/contact", methods=["POST", "GET"])
def contact():
    return render_template("contact.html")


@app.route("/game", methods=["POST", "GET"])
def game():
    return render_template("game.html", data=difficultyGlob)


@app.route("/rules", methods=["POST", "GET"])
def rules():
    return render_template("rules.html")


@app.route("/settings", methods=["POST", "GET"])
def settings():
    if request.method == "POST":
        val = request.form["switch"]
        print(val)
        diff = val
        global difficultyGlob
        difficultyGlob = val
        return render_template("settings.html", data=diff)
    else:
        return render_template("settings.html", data=difficultyGlob)


if __name__ == '__main__':
    app.run()
