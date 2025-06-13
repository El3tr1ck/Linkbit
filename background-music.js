// Configuração do AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let isPlaying = false;

function createOscillator(frequency, duration) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'triangle'; // Tom suave, típico de pixel art
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
  return oscillator;
}

function playBackgroundMusic() {
  if (isPlaying) return;
  isPlaying = true;

  const melody = [
    { freq: 261.63, duration: 0.5 }, // Dó (C4)
    { freq: 329.63, duration: 0.5 }, // Mi (E4)
    { freq: 392.00, duration: 0.5 }, // Sol (G4)
    { freq: 329.63, duration: 0.5 }, // Mi (E4)
  ];

  function playLoop() {
    melody.forEach(note => {
      createOscillator(note.freq, note.duration);
    });
    setTimeout(playLoop, 2000); // Repete a melodia a cada 2 segundos
  }

  playLoop();
}

function stopBackgroundMusic() {
  isPlaying = false;
  audioContext.close().then(() => {
    // Reinicia o contexto para evitar erros
    const newContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContext = newContext;
  });
}

// Inicia a música quando a página carrega
window.addEventListener('load', playBackgroundMusic);
