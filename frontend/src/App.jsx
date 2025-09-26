import React, { useState } from "react";
import CameraCapture from "./components/CameraCapture";
import ImageCropper from "./components/ImageCropper";
import { parsePrescription } from "./utils/parser";
import { speak } from "./utils/tts";
import "./App.css"; // 스타일 분리

export default function App() {
  const [captured, setCaptured] = useState(null);
  const [ocrText, setOcrText] = useState("");

  const handleResult = (text) => {
    setOcrText(text);

    const parsed = parsePrescription(text);
    if (parsed) {
      speak(parsed);
    } else {
      speak("처방전을 인식하지 못했습니다.");
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">처방전 OCR + 음성 안내</h1>

      {!captured ? (
        <CameraCapture onCapture={setCaptured} />
      ) : (
        <ImageCropper src={captured} onResult={handleResult} />
      )}

      {/* 카메라 밑 버튼 */}
      <div className="button-group">
        <button className="big-button" onClick={() => speak("테스트")}>
          음성 테스트
        </button>
        <button
          className="big-button"
          onClick={() => console.log(window.speechSynthesis.getVoices())}>
          음성 목록 보기
        </button>
      </div>

      {ocrText && (
        <div className="ocr-result">
          <h3 className="ocr-title">OCR 결과:</h3>
          <p className="ocr-text">{ocrText}</p>
          <button className="big-button orange" onClick={() => speak(ocrText)}>
            읽어주기
          </button>
        </div>
      )}
    </div>
  );
}
