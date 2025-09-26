export function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "ko-KR";
  window.speechSynthesis.speak(msg);
}
