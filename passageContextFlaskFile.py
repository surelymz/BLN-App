from flask import Flask, request, jsonify
from summarize import summarize_text

app = Flask(__name__)

@app.route("/summarize")
def summarize():
    text = request.args.get("text")
    subject = request.args.get("subject")
    length = int(request.args.get("length"))
    summary, context = summarize_text(text, length, subject)
    return jsonify({"summary": summary, "context": context})

if __name__ == "__main__":
    app.run()
