const textInput = document.getElementById("textInput");
const voiceSelect = document.getElementById("voiceSelect");
const speakBtn = document.getElementById("speakBtn");

// Load and populate available voices
function loadVoices() {
  const voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';

  voices.forEach(voice => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// Speak the text with the selected voice
function speakText() {
  const text = textInput.value.trim();
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoiceName = voiceSelect.value;
  const voices = speechSynthesis.getVoices();
  const voice = voices.find(v => v.name === selectedVoiceName);

  if (voice) utterance.voice = voice;

  speechSynthesis.speak(utterance);
}

// On page load and when voices load (some browsers are async)
window.addEventListener("load", () => {
  loadVoices();
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }
});

speakBtn.addEventListener("click", speakText);
