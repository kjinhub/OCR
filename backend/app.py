from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import vision
import io

app = Flask(__name__)
CORS(app)

client = vision.ImageAnnotatorClient.from_service_account_json("gcp-key.json")

@app.route("/ocr", methods=["POST"])
def ocr():
    if "image" not in request.files:
        return jsonify({"error": "이미지 없음"}), 400

    image = request.files["image"].read()
    vision_image = vision.Image(content=image)
    response = client.text_detection(image=vision_image)
    texts = response.text_annotations

    if not texts:
        return jsonify({"text": ""})

    return jsonify({"text": texts[0].description})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
