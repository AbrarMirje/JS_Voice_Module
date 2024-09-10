
let speech = null;
let isMuted = false;

function textToVoice() {
    const msg = document.getElementById("textToSpeech").value;

    if (msg.trim() !== "") {
        speech = new SpeechSynthesisUtterance(msg);

        // Adjust rate and pitch for slower and deeper voice
        speech.rate = 0.7;  // Slow down the speech (default is 1)
        speech.pitch = 0.8; // Lower pitch for deeper voice (default is 1)
        speech.volume = isMuted ? 0 : 1;   // Control volume
        speech.lang = 'mr-IN'; // Set language to Marathi

        // Set Marathi voice if available
        const voices = window.speechSynthesis.getVoices();
        const marathiVoice = voices.find(voice => voice.lang === 'mr-IN');
        if (marathiVoice) {
            speech.voice = marathiVoice;
        }

        window.speechSynthesis.speak(speech);
    } else {
        alert("Please enter text to convert to speech.");
    }
}

// Mute the voice
function muteVoice() {
    isMuted = true;
    if (speech) {
        speech.volume = 0;
        window.speechSynthesis.cancel(); // Stops any ongoing speech
    }
}

// Unmute the voice and resume
function unmuteVoice() {
    isMuted = false;
    if (speech) {
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
    }
}

// Ensure voices are loaded before calling
window.speechSynthesis.onvoiceschanged = function () {
    const voices = window.speechSynthesis.getVoices();
    console.log(voices);  // Logs all available voices (check for 'mr-IN')
};
