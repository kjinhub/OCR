import React, { useRef, useEffect } from "react";
import "../App.css"; // CSS 불러오기 (경로는 프로젝트 구조에 맞게 조정)

export default function CameraCapture({ onCapture, onError }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      onError && onError("카메라 접근 실패");
    }
  };

  const handleCapture = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 200);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onCapture(dataUrl);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <video ref={videoRef} autoPlay playsInline width="300" height="200" />
      <canvas ref={canvasRef} width="300" height="200" hidden />

      {/* CSS 클래스 적용 */}
      <button className="big-button" onClick={handleCapture}>
        📸 사진 찍기
      </button>
    </div>
  );
}
