from flask import Flask, redirect, url_for, render_template, request

app = Flask(__name__)
app.secret_key = "hello"

@app.route("/", methods=["POST","GET"])
def home():

    if request.method == "POST":
        print("x")
        return "butona basildi islemler..."

    else:
        return render_template("basic.html")


if __name__ == '__main__':
    app.run()
