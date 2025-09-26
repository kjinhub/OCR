import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { speak } from "../utils/tts";

export default function ImageCropper({ src, onResult }) {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    cropper.getCroppedCanvas().toBlob((blob) => {
      if (!blob) return;
      const formData = new FormData();
      formData.append("image", blob);

      fetch("http://localhost:5000/ocr", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.text) {
            speak("인식 실패");
            return;
          }
          onResult(data.text);
        })
        .catch(() => speak("서버 오류"));
    });
  };

  return (
    <div>
      <Cropper
        ref={cropperRef}
        src={src}
        style={{ height: 400, width: "100%" }}
      />
      <button onClick={handleCrop}>OCR 실행</button>
    </div>
  );
}
