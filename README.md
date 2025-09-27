# 📷 Camera OCR & Voice Guide

React (Vite) + Flask + Google Cloud Vision OCR + Web Speech API 를 이용한 **처방전 OCR + 음성 안내** 테스트 프로젝트입니다.  
휴대폰 카메라로 사진을 촬영 → 잘라내기(Cropper) → OCR 인식 → 음성으로 안내합니다.

---

## 🚀 주요 기능
- **카메라 촬영**: 모바일 브라우저에서 전/후면 카메라 전환 가능
- **이미지 크롭**: `react-cropper`를 이용한 영역 선택 후 OCR 실행
- **OCR**: Google Cloud Vision API 사용
- **음성 안내**: Web Speech API (`window.speechSynthesis`)로 텍스트 읽어주기
- **다시 찍기 버튼**: 인식 결과가 만족스럽지 않으면 재촬영 가능

## 🛠 기술 스택
### Frontend
- [React](https://react.dev/) (Vite 기반)
- [Cropper.js](https://github.com/fengyuanchen/cropperjs)
- Web Speech API (음성 출력)

### Backend
- [Flask](https://flask.palletsprojects.com/)
- [Google Cloud Vision API](https://cloud.google.com/vision)


## 📂 프로젝트 구조
frontend/
├─ src/
│ ├─ App.jsx
│ ├─ App.css
│ ├─ components/
│ │ ├─ CameraCapture.jsx # 카메라 촬영 및 다시 찍기
│ │ ├─ CameraCapture.css
│ │ ├─ ImageCropper.jsx # 잘라내기 + OCR 실행
│ │ └─ ErrorMessage.jsx
│ └─ utils/
│ ├─ parser.js # OCR 텍스트 파싱 로직
│ └─ tts.js # 음성 출력 유틸
├─ vite.config.js
└─ certs/ # mkcert 인증서 (HTTPS 테스트용)

backend/
└─ app.py # Flask + Vision OCR API


## ⚙️ 설치 및 실행

### 1. Backend (Flask)
```bash
cd backend
pip install flask flask-cors google-cloud-vision
python app.py
app.py 실행 시 http://0.0.0.0:5000/ocr API 제공

2. Frontend (React + Vite)
cd frontend
npm install
npm run dev
HTTPS 실행 시 인증서 필요 → mkcert로 생성 후 frontend/certs에 두기

실행 후 → https://<PC_IP>:5173 로 접속

휴대폰은 같은 와이파이 연결 필요

🔑 환경 설정
Google Cloud Vision API 키 파일 필요 (gcp-key.json)

Flask에서 client = vision.ImageAnnotatorClient.from_service_account_json("gcp-key.json") 부분 수정

📱 사용 방법
카메라 허용 → 전/후면 카메라 전환 가능

사진 촬영 → Cropper에서 잘라낼 영역 지정

OCR 실행 → 텍스트 추출

읽어주기 버튼 → 음성 안내 확인


