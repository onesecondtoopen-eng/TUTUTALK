const ASET = "../ASET/";

const lessons = [
  ["A", "Ayam", "ayam.png"], ["B", "Bebek", "bebek.png"], ["C", "Cicak", "cicak.png"],
  ["D", "Domba", "domba.png"], ["E", "Emu", "emu.png"], ["F", "Flaminggo", "flaminggo.png"],
  ["G", "Gajah", "gajah.png"], ["H", "Harimau", "harimau.png"], ["I", "Iguana", "iguana.png"],
  ["J", "Jerapah", "jerapah.png"], ["K", "Kelinci", "kelinci.png"], ["L", "Lumba-lumba", "lumba lumba.png"],
  ["M", "Monyet", "monyet.png"], ["N", "Nuri", "nuri.png"], ["O", "Owl", "owl _ burung hantu.png"],
  ["P", "Panda", "panda.png"], ["Q", "Quokka", "quokka.png"], ["R", "Rusa", "rusa.png"],
  ["S", "Singa", "singa.png"], ["T", "Tupai", "tupai.png"], ["U", "Unta", "unta.png"],
  ["V", "Viku", "viku.png"], ["W", "Walet", "walet.png"], ["X", "Xray Ikan", "xray ikan.png"],
  ["Y", "Yak", "yak.png"], ["Z", "Zebra", "zebra.png"]
].map(([letter, word, img]) => ({ letter, word, img, voice: `${letter} untuk ${word}` }));

const numberLessons = [
  { value: 1, img: "ayam.png" }, { value: 2, img: "bebek.png" }, { value: 3, img: "kelinci.png" },
  { value: 4, img: "nuri.png" }, { value: 5, img: "panda.png" }, { value: 6, img: "walet.png" },
  { value: 7, img: "cicak.png" }, { value: 8, img: "domba.png" }, { value: 9, img: "monyet.png" },
  { value: 10, img: "gajah.png" }, { addends: [2, 3], img: "ayam.png" }, { addends: [4, 2], img: "bebek.png" },
  { addends: [5, 2], img: "kelinci.png" }, { addends: [3, 5], img: "nuri.png" }, { addends: [6, 4], img: "panda.png" }
];

const wordLessons = [
  ["AYAM", "BERKUKUK"], ["BEBEK", "BERENANG"], ["GAJAH", "MAKAN", "DAUN"],
  ["KUCING", "MINUM", "SUSU"], ["IKAN", "BERENANG", "CEPAT"], ["BURUNG", "TERBANG", "TINGGI"],
  ["ZEBRA", "PUNYA", "GARIS"], ["KELINCI", "MAKAN", "WORTEL"], ["SINGA", "SUARA", "KERAS"],
  ["MONYET", "NAIK", "POHON"], ["ANAK", "SUKA", "BELAJAR"],
  ["PANDA", "DUDUK", "DI", "TAMAN"], ["RUSA", "LARI", "DI", "HUTAN"],
  ["AYAM", "PUNYA", "DUA", "SAYAP"], ["BEBEK", "PUNYA", "DUA", "KAKI"],
  ["GAJAH", "PUNYA", "SATU", "BELALAI"], ["PANDA", "PUNYA", "EMPAT", "KAKI"],
  ["HARIMAU", "LARI", "SANGAT", "CEPAT"], ["BURUNG", "TERBANG", "DI", "LANGIT"],
  ["KELINCI", "LOMPAT", "DI", "TANAH"]
];

const homeMascots = [
  "maskot hi.png",
  "maskot happy.png",
  "maskot senang.png",
  "maskot ide.png",
  "maskot yay.png"
];

const letterMoods = [
  { after: 0, img: "awan sangat senang.png", label: "Semangat!" },
  { after: 10, img: "awan senang.png", label: "Ayo coba!" },
  { after: 20, img: "awan menunggu.png", label: "Pelan-pelan ya" }
];

const wordMoods = [
  { after: 0, img: "awan sangat senang.png", label: "Semangat!" },
  { after: 15, img: "awan senang.png", label: "Ayo susun!" },
  { after: 30, img: "awan menunggu.png", label: "Pelan-pelan ya" }
];

const letterColors = [
  "#f47bb0", "#70baf2", "#83c95f", "#ff9d7d", "#b98bf6", "#f6c94f",
  "#63c6bd", "#ff7f8f", "#8fbf52", "#ee8bd2", "#5eb7e8", "#f08b65"
];

const state = {
  screen: "home",
  mode: "category",
  letter: Number(localStorage.getItem("ttCleanCurrentLetter") || "0"),
  number: Number(localStorage.getItem("ttCleanCurrentNumber") || "0"),
  word: Number(localStorage.getItem("ttCleanCurrentWord") || "0"),
  homeMascot: 0,
  letterStartedAt: Date.now(),
  letterMood: "",
  numberStartedAt: Date.now(),
  numberMood: "",
  wordStartedAt: Date.now(),
  wordMood: "",
  selectedWord: null,
  sound: localStorage.getItem("ttCleanSound") !== "false",
  music: localStorage.getItem("ttCleanMusic") !== "false",
  volume: Number(localStorage.getItem("ttCleanVolume") || "65"),
  speechRate: Number(localStorage.getItem("ttCleanSpeechRate") || "95"),
  random: localStorage.getItem("ttCleanRandom") === "true",
  found: new Set(JSON.parse(localStorage.getItem("ttCleanFound") || "[]")),
  doneNumbers: new Set(JSON.parse(localStorage.getItem("ttCleanNumbers") || "[]")),
  doneWords: new Set(JSON.parse(localStorage.getItem("ttCleanWords") || "[]")),
  answerTimes: JSON.parse(localStorage.getItem("ttCleanAnswerTimes") || "{\"letters\":[],\"numbers\":[],\"words\":[]}"),
  wordPlaced: [],
  letterColorTimer: null,
  numberColorTimer: null,
  letterAnswerLocked: false,
  numberAnswerLocked: false,
  wordAnswerLocked: false
};

state.letter = Math.max(0, Math.min(lessons.length - 1, state.letter));
state.number = Math.max(0, Math.min(numberLessons.length - 1, state.number));
state.word = Math.max(0, Math.min(wordLessons.length - 1, state.word));

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const asset = path => ASET + path;

const loadingAssets = [
  "LOGO.png",
  "PANEL HOME.png",
  "background_home.png",
  "MASKOT/maskot yay.png",
  "MASKOT/maskot hi.png",
  "MASKOT/maskot happy.png",
  "MASKOT/maskot senang.png",
  "MASKOT/maskot ide.png",
  "button/button mulai.png",
  "card and panel/card belajar huruf.png",
  "card and panel/card belajar angka unlock.png",
  "card and panel/card belajar kata unlock.png",
  "card and panel/panel huruf dan angka.png",
  "navbar/beranda.png",
  "navbar/belajar.png",
  "navbar/koleksi.png",
  "navbar/orang tua.png",
  "navbar/pengaturan.png",
  ...lessons.map(lesson => `HEWAN/${lesson.img}`),
  ...homeMascots.map(name => `MASKOT/${name}`),
  ...letterMoods.map(mood => `indikator/${mood.img}`),
  ...wordMoods.map(mood => `indikator/${mood.img}`)
];

function setLoadingProgress(percent, text = "Memuat aset...") {
  const fill = $("#loadingFill");
  const label = $("#loadingText");
  if (fill) fill.style.width = `${Math.max(8, Math.min(100, percent))}%`;
  if (label) label.textContent = text;
}

function loadImage(src) {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });
}

function startInitialLoading() {
  const overlay = $("#loadingScreen");
  if (!overlay) return;

  const domImages = $$("img").map(image => image.getAttribute("src")).filter(Boolean);
  const uniqueSources = [...new Set([...domImages, ...loadingAssets.map(asset)])];
  let loaded = 0;
  const startedAt = Date.now();
  const minimumMs = 900;

  setLoadingProgress(8);

  Promise.all(uniqueSources.map(src => loadImage(src).then(() => {
    loaded += 1;
    const percent = Math.round((loaded / uniqueSources.length) * 100);
    setLoadingProgress(percent, percent >= 100 ? "Siap bermain!" : "Memuat aset...");
  }))).then(() => {
    const wait = Math.max(0, minimumMs - (Date.now() - startedAt));
    setTimeout(() => {
      setLoadingProgress(100, "Siap bermain!");
      overlay.classList.add("is-hidden");
      updateBackgroundAudio();
      setTimeout(() => overlay.remove(), 420);
    }, wait);
  });
}

const audioTracks = {
  home: new Audio(asset("audio/homepage % pilih  kegiatan audio.mp3")),
  lesson: new Audio(asset("audio/belajar audio.mp3"))
};

const soundEffects = {
  introLetters: "audio/sound efect/ayok belajar huruf.mp3",
  lockedLetters: "audio/sound efect/selesaikan dulu belajar huruf ya.mp3",
  additionInstruction: "audio/sound efect/hitung pertambahan ini.mp3",
  wordInstruction: "audio/sound efect/susun kat akat aini menjadi kalimat yang benar.mp3",
  tryAgain: "audio/voice update/coba lagi ya.mp3",
  countAgain: "audio/voice update/COBA HITUNG LAGI YA.mp3",
  greatCorrect: "audio/voice update/HEBAT BENAR.mp3",
  alphabetHold: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => `audio/suara alfabet/${letter}.WAV`),
  wordSentences: [
    "audio/belajar kata/AYAM BERKUKUK.mp3",
    "audio/belajar kata/BEBEK BERENANG.mp3",
    "audio/belajar kata/GAJAH MAKAN DAUN.mp3",
    "audio/belajar kata/KUCING MINUM SUSU.mp3",
    "audio/belajar kata/IKAN BERENANG CEPAT.mp3",
    "audio/belajar kata/BURUNG TERBANG TINGGI.mp3",
    "audio/belajar kata/ZEBRA PUNYA GARIS.mp3",
    "audio/belajar kata/KELINCI MAKAN WORTEL.mp3",
    "audio/belajar kata/SINGA SUARA KERAS.mp3",
    "audio/belajar kata/MONYET NAIK POHON.mp3",
    "audio/belajar kata/ANAK SUKA BELAJAR.mp3",
    "audio/belajar kata/PANDA DUDUK DI TAMAN.mp3",
    "audio/belajar kata/RUSA LARI DI HUTAN.mp3",
    "audio/belajar kata/AYAM PUNYA DUA SAYAP.mp3",
    "audio/belajar kata/BEBEK PUNYA DUA KAKI.mp3",
    "audio/belajar kata/GAJAH PUNYA SATU BELALAI.mp3",
    "audio/belajar kata/PANDA PUNYA EMPAT KAKI.mp3",
    "audio/belajar kata/HARIMAU LARI SANGAT CEPAT.mp3",
    "audio/belajar kata/BURUNG TERBANG DI LANGIT.mp3",
    "audio/belajar kata/KELINCI LOMAT D I TANAH.mp3"
  ],
  animals: [
    "audio/suara hewan/SUARA AYAM.mp3",
    "audio/suara hewan/SUARA BEBEK.mp3",
    "audio/suara hewan/SUAAR CICAK.mp3",
    "audio/suara hewan/SUARA KAMBING.mp3",
    "audio/suara hewan/SUARA EMU.mp3",
    "audio/suara hewan/SUARA FLAMINGGO.mp3",
    "audio/suara hewan/SUARA GAJAH.mp3",
    "audio/suara hewan/SUARA HARIMAU.mp3",
    "audio/suara hewan/SUARA IGUANA.mp3",
    "audio/suara hewan/SUARA JERAPAH.mp3",
    "audio/suara hewan/SUARA KELINCI.mp3",
    "audio/suara hewan/SUARA LUMBA LUMBA.mp3",
    "audio/suara hewan/SUARA MONYET.mp3",
    "audio/suara hewan/SUARA NURI.mp3",
    "audio/suara hewan/SUARA OWL.mp3",
    "audio/suara hewan/SUARA PANDA.mp3",
    "audio/suara hewan/SUARA QUOKA.mp3",
    "audio/suara hewan/SUARA RUSA.mp3",
    "audio/suara hewan/SUARA SINGA.mp3",
    "audio/suara hewan/SUARA TUPAI.mp3",
    "audio/suara hewan/SUARA UNTA.mp3",
    "audio/suara hewan/SUARA VIKU.mp3",
    "audio/suara hewan/SUARA WALET.mp3",
    "audio/suara hewan/SUARA XRAY IKAN.mp3",
    "audio/suara hewan/SUARA YAK.mp3",
    "audio/suara hewan/SUARA ZEBRA.mp3"
  ],
  letters: [
    "audio/sound efect/a untuk ayam.mp3",
    "audio/sound efect/b untuk bebek.mp3",
    "audio/sound efect/c untuk cicak.mp3",
    "audio/sound efect/d untuk domba.mp3",
    "audio/sound efect/e untuk emu.mp3",
    "audio/sound efect/f untuk flaminggo.mp3",
    "audio/sound efect/g untuk gajah.mp3",
    "audio/sound efect/h untuk harimau.mp3",
    "audio/sound efect/i untuk iguana.mp3",
    "audio/sound efect/j untuk jerapah.mp3",
    "audio/sound efect/k untuk kelinci.mp3",
    "audio/sound efect/l untuk lumba lumba.mp3",
    "audio/sound efect/m untuk monyet.mp3",
    "audio/sound efect/n untuk nuri.mp3",
    "audio/sound efect/o untuk owl.mp3",
    "audio/sound efect/p untuk panda.mp3",
    "audio/sound efect/q untuk quoka.mp3",
    "audio/sound efect/r untuk rusa.mp3",
    "audio/sound efect/s untunk singa.mp3",
    "audio/sound efect/t untuk tupai.mp3",
    "audio/sound efect/u untuk unta.mp3",
    "audio/sound efect/v untuk viku.mp3",
    "audio/sound efect/w untuk walet.mp3",
    "audio/sound efect/x untuk xray ikan.mp3",
    "audio/sound efect/y untuk yak.mp3",
    "audio/sound efect/z untuk zebra.mp3"
  ],
  numbers: [
    "audio/sound efect/1.mp3",
    "audio/sound efect/2.mp3",
    "audio/sound efect/3.mp3",
    "audio/sound efect/4.mp3",
    "audio/sound efect/5.mp3",
    "audio/sound efect/6.mp3",
    "audio/sound efect/7.mp3",
    "audio/sound efect/8.mp3",
    "audio/sound efect/9.mp3",
    "audio/sound efect/10.mp3"
  ]
};

Object.values(audioTracks).forEach(audio => {
  audio.loop = true;
  audio.preload = "auto";
});

function normalizedVolume(multiplier = 1) {
  const volume = Number.isFinite(state.volume) ? state.volume : 65;
  return Math.max(0, Math.min(1, (volume / 100) * multiplier));
}

function applyBackgroundVolume() {
  Object.values(audioTracks).forEach(audio => {
    audio.volume = normalizedVolume(.42);
  });
}

async function requestLandscapeMode() {
  try {
    if (screen.orientation?.lock) {
      await screen.orientation.lock("landscape");
    }
  } catch (_) {
    // Mobile browsers often allow orientation lock only in fullscreen/PWA mode.
  }
}

function saveProgress() {
  localStorage.setItem("ttCleanFound", JSON.stringify([...state.found]));
  localStorage.setItem("ttCleanNumbers", JSON.stringify([...state.doneNumbers]));
  localStorage.setItem("ttCleanWords", JSON.stringify([...state.doneWords]));
  localStorage.setItem("ttCleanAnswerTimes", JSON.stringify(state.answerTimes));
}

function saveRoundPosition(kind) {
  const keys = {
    letters: ["ttCleanCurrentLetter", state.letter],
    numbers: ["ttCleanCurrentNumber", state.number],
    words: ["ttCleanCurrentWord", state.word]
  };
  const [key, value] = keys[kind] || [];
  if (key) localStorage.setItem(key, String(value));
}

function markRoundComplete(kind) {
  const keys = {
    letters: "ttCleanLettersRoundComplete",
    numbers: "ttCleanNumbersRoundComplete",
    words: "ttCleanWordsRoundComplete"
  };
  if (keys[kind]) localStorage.setItem(keys[kind], "true");
}

function prepareRound(kind) {
  const config = {
    letters: { key: "ttCleanLettersRoundComplete", currentKey: "ttCleanCurrentLetter", prop: "letter" },
    numbers: { key: "ttCleanNumbersRoundComplete", currentKey: "ttCleanCurrentNumber", prop: "number" },
    words: { key: "ttCleanWordsRoundComplete", currentKey: "ttCleanCurrentWord", prop: "word" }
  }[kind];
  if (!config || localStorage.getItem(config.key) !== "true") return;
  state[config.prop] = 0;
  localStorage.setItem(config.currentKey, "0");
  localStorage.setItem(config.key, "false");
}

function recordAnswerTime(kind, startedAt) {
  const seconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
  const list = Array.isArray(state.answerTimes[kind]) ? state.answerTimes[kind] : [];
  list.push(seconds);
  state.answerTimes[kind] = list.slice(-100);
  saveProgress();
}

function averageSeconds(kind) {
  const list = Array.isArray(state.answerTimes[kind]) ? state.answerTimes[kind] : [];
  if (!list.length) return 0;
  return Math.round(list.reduce((total, seconds) => total + seconds, 0) / list.length);
}

function renderAverage(id, kind) {
  const seconds = averageSeconds(kind);
  $(id).innerHTML = `Rata-rata <span class="average-value">${seconds}</span> detik`;
}

function advancedUnlocked() {
  return lessons.every(lesson => state.found.has(lesson.letter));
}

function updateCategoryLocks() {
  const unlocked = advancedUnlocked();
  $$(".category-card").forEach(card => {
    const locked = (card.dataset.mode === "numbers" || card.dataset.mode === "words") && !unlocked;
    card.classList.toggle("is-locked", locked);
    card.setAttribute("aria-disabled", locked ? "true" : "false");
    const image = card.querySelector("img");
    if (image && card.dataset.lockedSrc && card.dataset.unlockedSrc) {
      image.src = locked ? card.dataset.lockedSrc : card.dataset.unlockedSrc;
    }
  });
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - .5);
}

function nextIndex(current, step, total) {
  if (state.random && step > 0 && total > 1) {
    let next = current;
    while (next === current) {
      next = Math.floor(Math.random() * total);
    }
    return next;
  }
  return (current + step + total) % total;
}

function choiceCountFor(index) {
  if (index <= 2) return 1;
  if (index <= 8) return 2;
  if (index <= 17) return 3;
  return 4;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function resetLetterTimer() {
  state.letterStartedAt = Date.now();
  updateLetterTimer(true);
}

function updateLetterTimer(forceMood = false) {
  if (state.mode !== "letters") return;
  const seconds = Math.max(0, Math.floor((Date.now() - state.letterStartedAt) / 1000));
  $("#letterTimer").textContent = formatTime(seconds);

  const mood = [...letterMoods].reverse().find(item => seconds >= item.after) || letterMoods[0];
  if (!forceMood && state.letterMood === mood.img) return;

  state.letterMood = mood.img;
  const image = $("#letterMoodImage");
  image.classList.add("is-changing");
  setTimeout(() => {
    image.src = asset(`indikator/${mood.img}`);
    image.alt = mood.label;
    image.classList.remove("is-changing");
  }, 120);
  $("#letterMood").textContent = mood.label;
}

function resetNumberTimer() {
  state.numberStartedAt = Date.now();
  updateNumberTimer(true);
}

function updateNumberTimer(forceMood = false) {
  if (state.mode !== "numbers") return;
  const seconds = Math.max(0, Math.floor((Date.now() - state.numberStartedAt) / 1000));
  $("#numberTimer").textContent = formatTime(seconds);

  const mood = [...letterMoods].reverse().find(item => seconds >= item.after) || letterMoods[0];
  if (!forceMood && state.numberMood === mood.img) return;

  state.numberMood = mood.img;
  const image = $("#numberMoodImage");
  image.classList.add("is-changing");
  setTimeout(() => {
    image.src = asset(`indikator/${mood.img}`);
    image.alt = mood.label;
    image.classList.remove("is-changing");
  }, 120);
  $("#numberMood").textContent = mood.label;
}

function resetWordTimer() {
  state.wordStartedAt = Date.now();
  updateWordTimer(true);
}

function updateWordTimer(forceMood = false) {
  if (state.mode !== "words") return;
  const seconds = Math.max(0, Math.floor((Date.now() - state.wordStartedAt) / 1000));
  $("#wordTimer").textContent = formatTime(seconds);

  const mood = [...wordMoods].reverse().find(item => seconds >= item.after) || wordMoods[0];
  if (!forceMood && state.wordMood === mood.img) return;

  state.wordMood = mood.img;
  const image = $("#wordMoodImage");
  image.classList.add("is-changing");
  setTimeout(() => {
    image.src = asset(`indikator/${mood.img}`);
    image.alt = mood.label;
    image.classList.remove("is-changing");
  }, 120);
  $("#wordMood").textContent = mood.label;
}

function speak(text) {
  if (!state.sound || !("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  utterance.rate = Math.max(.8, Math.min(1.8, state.speechRate / 100));
  utterance.pitch = 1.28;
  speechSynthesis.speak(utterance);
}

function playSoundFile(path, multiplier = .95) {
  if (!state.sound || !path) return false;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  const audio = new Audio(asset(path));
  audio.volume = normalizedVolume(multiplier);
  audio.play().catch(() => {});
  return true;
}

function speakOrPlay(text, path, multiplier = .95) {
  if (playSoundFile(path, multiplier)) return;
  speak(text);
}

function letterVoicePath(lesson) {
  const index = lessons.indexOf(lesson);
  return soundEffects.letters[index] || null;
}

function numberVoicePath(value) {
  return soundEffects.numbers[value - 1] || null;
}

function wordSentenceVoicePath() {
  return soundEffects.wordSentences[state.word] || null;
}

function animalVoicePath(lesson) {
  const index = lessons.indexOf(lesson);
  return soundEffects.animals[index] || null;
}

let activeAlphabetAudio = null;
let activeNumberAudio = null;
let activeAnimalAudio = null;
let activeAnimalTimer = null;

function alphabetHoldPath() {
  return soundEffects.alphabetHold[state.letter] || null;
}

function stopAlphabetHoldSound() {
  if (!activeAlphabetAudio) return;
  activeAlphabetAudio.pause();
  activeAlphabetAudio.currentTime = 0;
  activeAlphabetAudio = null;
}

function stopNumberHoldSound() {
  if (!activeNumberAudio) return;
  activeNumberAudio.pause();
  activeNumberAudio.currentTime = 0;
  activeNumberAudio = null;
}

function stopAnimalSound() {
  if (activeAnimalTimer) {
    clearTimeout(activeAnimalTimer);
    activeAnimalTimer = null;
  }
  if (!activeAnimalAudio) return;
  activeAnimalAudio.pause();
  activeAnimalAudio.currentTime = 0;
  activeAnimalAudio = null;
}

function playAnimalSound(lesson) {
  stopAnimalSound();
  if (!state.sound) return;
  activeAnimalAudio = new Audio(asset(animalVoicePath(lesson)));
  activeAnimalAudio.volume = normalizedVolume(.95);
  activeAnimalAudio.play().catch(() => {});
  activeAnimalTimer = setTimeout(stopAnimalSound, 3000);
}

function startAlphabetHoldSound() {
  stopAlphabetHoldSound();
  if (!state.sound) return;
  activeAlphabetAudio = new Audio(asset(alphabetHoldPath()));
  activeAlphabetAudio.loop = true;
  activeAlphabetAudio.volume = normalizedVolume(.85);
  activeAlphabetAudio.play().catch(() => {});
}

function numberHoldPath() {
  const lesson = numberLessons[state.number];
  if (lesson.addends) return soundEffects.additionInstruction;
  return numberVoicePath(lesson.value);
}

function startNumberHoldSound() {
  stopNumberHoldSound();
  if (!state.sound) return;
  activeNumberAudio = new Audio(asset(numberHoldPath()));
  activeNumberAudio.loop = true;
  activeNumberAudio.volume = normalizedVolume(.85);
  activeNumberAudio.play().catch(() => {});
}

function playCorrectSound() {
  if (!state.sound) return;
  const audio = new Audio(asset("audio/correct answer.mp3"));
  audio.volume = normalizedVolume(.95);
  audio.play().catch(() => {});
}

function playWrongSound() {
  if (!state.sound) return;
  const audio = new Audio(asset("audio/wrong answer.mp3"));
  audio.volume = normalizedVolume(.95);
  audio.play().catch(() => {});
}

function playDragSound() {
  if (!state.sound || !window.AudioContext && !window.webkitAudioContext) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const context = new AudioCtx();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(520, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(760, context.currentTime + .08);
  gain.gain.setValueAtTime(.001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(normalizedVolume(.18), context.currentTime + .015);
  gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .12);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + .13);
  setTimeout(() => context.close(), 240);
}

function playFinishSound() {
  if (!state.sound) return;
  const audio = new Audio(asset("audio/yeay-childrens.mp3"));
  audio.volume = normalizedVolume(1);
  audio.play().catch(() => {});
}

function currentBackgroundTrack() {
  if (state.screen === "learn" && state.mode !== "category") return audioTracks.lesson;
  return audioTracks.home;
}

function updateBackgroundAudio() {
  applyBackgroundVolume();
  const active = state.music ? currentBackgroundTrack() : null;
  Object.values(audioTracks).forEach(audio => {
    if (audio === active) return;
    audio.pause();
  });
  if (!active) return;
  active.play().catch(() => {});
}

function unlockBackgroundAudio() {
  updateBackgroundAudio();
}

["pointerdown", "touchstart", "click"].forEach(eventName => {
  window.addEventListener(eventName, unlockBackgroundAudio, { once: true, passive: true });
});

function showScreen(name) {
  stopAlphabetHoldSound();
  stopNumberHoldSound();
  stopAnimalSound();
  state.screen = name;
  document.body.dataset.screen = name;
  if (name !== "learn") {
    delete document.body.dataset.lessonMode;
  }
  $$(".screen").forEach(screen => screen.classList.remove("is-active"));
  $(`#${name}Screen`)?.classList.add("is-active");
  $$(".nav-item").forEach(button => button.classList.toggle("is-active", button.dataset.screen === name));
  if (name === "collection") renderCollection();
  if (name === "parent") renderStats();
  updateBackgroundAudio();
}

function showMode(mode) {
  stopAlphabetHoldSound();
  stopNumberHoldSound();
  stopAnimalSound();
  if ((mode === "numbers" || mode === "words") && !advancedUnlocked()) {
    updateCategoryLocks();
    showReward("Masih Terkunci", "Selesaikan huruf A sampai Z dulu ya", null, { continueText: "Oke" });
    speakOrPlay("Selesaikan huruf A sampai Z dulu ya", soundEffects.lockedLetters);
    return;
  }
  state.mode = mode;
  if (mode === "category") {
    delete document.body.dataset.lessonMode;
  } else {
    document.body.dataset.lessonMode = mode;
  }
  $("#categoryView").classList.toggle("is-active", mode === "category");
  $$(".lesson-view").forEach(view => view.classList.remove("is-active"));
  if (mode === "letters") {
    prepareRound("letters");
    $("#letterView").classList.add("is-active");
    renderLetter();
    const tutorDelay = playSoundFile(soundEffects.introLetters) ? 900 : 0;
    setTimeout(showLetterTutor, tutorDelay);
  }
  if (mode === "numbers") {
    prepareRound("numbers");
    $("#numberView").classList.add("is-active");
    renderNumber();
  }
  if (mode === "words") {
    prepareRound("words");
    $("#wordView").classList.add("is-active");
    renderWord();
    setTimeout(() => {
      if (state.screen === "learn" && state.mode === "words") {
        playSoundFile(soundEffects.wordInstruction);
      }
    }, 180);
  }
  updateBackgroundAudio();
}

function renderLetter() {
  stopLetterColorCycle();
  const lesson = lessons[state.letter];
  const count = choiceCountFor(state.letter);
  const wrongs = shuffle(lessons.filter(item => item !== lesson)).slice(0, count - 1);
  const choices = shuffle([lesson, ...wrongs]);
  const grid = $("#choiceGrid");

  $("#letterView").dataset.choiceCount = String(count);
  $("#letterGlyph").textContent = lesson.letter;
  $("#letterGlyph").style.setProperty("--letter-color", letterColors[state.letter % letterColors.length]);
  $("#letterProgress").textContent = `${state.letter + 1} / ${lessons.length}`;
  $("#letterBubble").textContent = count === 1 ? "Tarik ke gambar!" : "Pilih gambarnya!";
  $("#letterHint").textContent = count === 1 ? "Tarik ke gambar" : "Pilih gambar yang cocok";
  grid.className = `choice-grid choice-${count}`;
  grid.innerHTML = "";
  state.letterAnswerLocked = false;

  choices.forEach(choice => {
    const card = document.createElement("button");
    card.className = "choice-card";
    card.type = "button";
    card.dataset.correct = choice === lesson ? "true" : "false";
    card.innerHTML = `
      <img src="${asset(`HEWAN/${choice.img}`)}" alt="">
      <span>${choice.word}</span>
    `;
    card.addEventListener("click", () => {
      handleLetterAnswer(card, card.dataset.correct === "true", lesson);
    });
    grid.append(card);
  });
  resetLetterTimer();
}

function handleLetterAnswer(card, correct, lesson) {
  if (state.letterAnswerLocked) return;
  state.letterAnswerLocked = true;
  const glyph = $("#letterCard");
  $$(".choice-card").forEach(item => item.classList.remove("is-hovered", "is-wrong", "is-correct"));

  if (correct) {
    const finishedAlphabet = state.letter === lessons.length - 1;
    state.found.add(lesson.letter);
    recordAnswerTime("letters", state.letterStartedAt);
    saveProgress();
    updateCategoryLocks();
    card.classList.add("is-correct");
    glyph.classList.add("is-success");
    createLetterBurst(card);
    playCorrectSound();
    speakOrPlay(lesson.voice, letterVoicePath(lesson));
    setTimeout(() => {
      glyph.classList.remove("is-success");
      if (finishedAlphabet) {
        markRoundComplete("letters");
        playFinishSound();
        showReward("Hebat!", "A-Z selesai! Belajar Angka dan Kata terbuka!", () => showMode("category"), { continueText: "Pilih Kegiatan", special: true });
      } else {
        showReward("Bagus!", lesson.voice, () => nextLetter(1));
      }
    }, 520);
    return;
  }

  card.classList.add("is-wrong");
  glyph.classList.add("is-wrong");
  createLetterBurst(card, true);
  playWrongSound();
  speakOrPlay("Coba lagi ya", soundEffects.tryAgain);
  setTimeout(() => {
    card.classList.remove("is-wrong");
    glyph.classList.remove("is-wrong");
    state.letterAnswerLocked = false;
  }, 520);
}

function createLetterBurst(anchor, wrong = false) {
  const burst = document.createElement("span");
  const rect = anchor.getBoundingClientRect();
  const stageRect = $(".letter-stage").getBoundingClientRect();
  burst.className = `letter-burst${wrong ? " is-wrong" : ""}`;
  burst.style.left = `${rect.left - stageRect.left + rect.width / 2}px`;
  burst.style.top = `${rect.top - stageRect.top + rect.height / 2}px`;
  $(".letter-stage").append(burst);
  setTimeout(() => burst.remove(), 700);
}

function setupLetterDrag() {
  const glyph = $("#letterCard");
  let drag = null;

  glyph.addEventListener("pointerdown", event => {
    if (state.mode !== "letters") return;
    event.preventDefault();
    const rect = glyph.getBoundingClientRect();
    drag = {
      startX: event.clientX,
      startY: event.clientY,
      dx: event.clientX - rect.left,
      dy: event.clientY - rect.top,
      moved: false
    };
    glyph.setPointerCapture?.(event.pointerId);
    glyph.classList.add("is-holding");
    startAlphabetHoldSound();
    startLetterColorCycle();
  });

  glyph.addEventListener("pointermove", event => {
    if (!drag) return;
    event.preventDefault();
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (Math.hypot(deltaX, deltaY) > 5) {
      drag.moved = true;
      glyph.classList.add("is-dragging");
    }
    glyph.style.setProperty("--drag-x", `${deltaX}px`);
    glyph.style.setProperty("--drag-y", `${deltaY}px`);
    updateLetterHover(event.clientX, event.clientY);
  });

  function finish(event) {
    if (!drag) return;
    const moved = drag.moved;
    glyph.releasePointerCapture?.(event.pointerId);
    glyph.classList.remove("is-holding", "is-dragging");
    glyph.style.setProperty("--drag-x", "0px");
    glyph.style.setProperty("--drag-y", "0px");
    stopAlphabetHoldSound();
    stopLetterColorCycle();

    const target = moved ? choiceCardAt(event.clientX, event.clientY) : null;
    $$(".choice-card").forEach(item => item.classList.remove("is-hovered"));
    drag = null;
    if (!target) return;

    const lesson = lessons[state.letter];
    handleLetterAnswer(target, target.dataset.correct === "true", lesson);
  }

  glyph.addEventListener("pointerup", finish);
  glyph.addEventListener("pointercancel", finish);
}

function startLetterColorCycle() {
  stopLetterColorCycle(false);
  const glyph = $("#letterGlyph");
  let index = state.letter;
  state.letterColorTimer = setInterval(() => {
    index += 1;
    glyph.style.setProperty("--letter-color", letterColors[index % letterColors.length]);
  }, 320);
}

function stopLetterColorCycle(reset = true) {
  if (state.letterColorTimer) {
    clearInterval(state.letterColorTimer);
    state.letterColorTimer = null;
  }
  if (reset) {
    $("#letterGlyph").style.setProperty("--letter-color", letterColors[state.letter % letterColors.length]);
  }
}

function choiceCardAt(x, y) {
  const glyph = $("#letterCard");
  const previousPointerEvents = glyph.style.pointerEvents;
  glyph.style.pointerEvents = "none";
  const element = document.elementFromPoint(x, y);
  glyph.style.pointerEvents = previousPointerEvents;
  return element?.closest?.("#choiceGrid .choice-card") || null;
}

function updateLetterHover(x, y) {
  const hovered = choiceCardAt(x, y);
  $$(".choice-card").forEach(card => card.classList.toggle("is-hovered", card === hovered));
}

function setupNumberDrag() {
  const glyph = $("#numberCard");
  let drag = null;

  glyph.addEventListener("pointerdown", event => {
    if (state.mode !== "numbers") return;
    event.preventDefault();
    const rect = glyph.getBoundingClientRect();
    drag = {
      startX: event.clientX,
      startY: event.clientY,
      dx: event.clientX - rect.left,
      dy: event.clientY - rect.top,
      moved: false
    };
    glyph.setPointerCapture?.(event.pointerId);
    glyph.classList.add("is-holding");
    startNumberHoldSound();
    startNumberColorCycle();
  });

  glyph.addEventListener("pointermove", event => {
    if (!drag) return;
    event.preventDefault();
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (Math.hypot(deltaX, deltaY) > 5) {
      drag.moved = true;
      glyph.classList.add("is-dragging");
    }
    glyph.style.setProperty("--drag-x", `${deltaX}px`);
    glyph.style.setProperty("--drag-y", `${deltaY}px`);
    updateNumberHover(event.clientX, event.clientY);
  });

  function finish(event) {
    if (!drag) return;
    const moved = drag.moved;
    glyph.releasePointerCapture?.(event.pointerId);
    glyph.classList.remove("is-holding", "is-dragging");
    glyph.style.setProperty("--drag-x", "0px");
    glyph.style.setProperty("--drag-y", "0px");
    stopNumberHoldSound();
    stopNumberColorCycle();

    const target = moved ? numberTargetAt(event.clientX, event.clientY) : null;
    $$(".number-target").forEach(item => item.classList.remove("is-hovered"));
    drag = null;
    if (!target) return;
    handleNumberAnswer(target, target.dataset.correct === "true");
  }

  glyph.addEventListener("pointerup", finish);
  glyph.addEventListener("pointercancel", finish);
}

function numberTargetAt(x, y) {
  const glyph = $("#numberCard");
  const previousPointerEvents = glyph.style.pointerEvents;
  glyph.style.pointerEvents = "none";
  const element = document.elementFromPoint(x, y);
  glyph.style.pointerEvents = previousPointerEvents;
  return element?.closest?.("#numberTargets .number-target") || null;
}

function updateNumberHover(x, y) {
  const hovered = numberTargetAt(x, y);
  $$(".number-target").forEach(target => target.classList.toggle("is-hovered", target === hovered));
}

function startNumberColorCycle() {
  stopNumberColorCycle(false);
  const glyph = $("#numberGlyph");
  let index = state.number;
  state.numberColorTimer = setInterval(() => {
    index += 1;
    glyph.style.setProperty("--letter-color", letterColors[index % letterColors.length]);
  }, 320);
}

function stopNumberColorCycle(reset = true) {
  if (state.numberColorTimer) {
    clearInterval(state.numberColorTimer);
    state.numberColorTimer = null;
  }
  if (reset) {
    $("#numberGlyph").style.setProperty("--letter-color", letterColors[state.number % letterColors.length]);
  }
}

function nextLetter(step) {
  state.letter = nextIndex(state.letter, step, lessons.length);
  saveRoundPosition("letters");
  renderLetter();
}

function numberAnswer(lesson) {
  return lesson.addends ? lesson.addends[0] + lesson.addends[1] : lesson.value;
}

function numberLabel(lesson) {
  return lesson.addends ? lesson.addends.join("+") : String(lesson.value);
}

function renderNumber() {
  stopNumberColorCycle();
  const lesson = numberLessons[state.number];
  const lessonIndex = state.number;
  const answer = numberAnswer(lesson);
  const choiceCount = lesson.addends ? 2 : 3;
  const wrongs = shuffle(Array.from({ length: 10 }, (_, index) => index + 1).filter(value => value !== answer)).slice(0, choiceCount - 1);
  const choices = shuffle([answer, ...wrongs]);
  const targets = $("#numberTargets");

  $("#numberView").classList.toggle("is-addition", Boolean(lesson.addends));
  targets.className = `number-targets number-choice-${choiceCount}`;
  $("#numberGlyph").textContent = numberLabel(lesson);
  $("#numberGlyph").style.setProperty("--letter-color", letterColors[state.number % letterColors.length]);
  $("#numberProgress").textContent = `${state.number + 1} / ${numberLessons.length}`;
  $("#numberInstruction").textContent = lesson.addends ? "Pilih hasil jumlahnya!" : "Hitung gambarnya!";
  $("#numberHint").textContent = lesson.addends ? "Pilih hasil yang pas" : "Pilih jumlah yang pas";
  targets.innerHTML = "";
  state.numberAnswerLocked = false;

  choices.forEach(count => {
    const target = document.createElement("button");
    target.className = `number-target count-${count}`;
    target.type = "button";
    target.dataset.count = String(count);
    target.dataset.correct = count === answer ? "true" : "false";

    const items = document.createElement("span");
    items.className = "count-items";
    for (let i = 0; i < count; i += 1) {
      const img = document.createElement("img");
      img.src = asset(`HEWAN/${lesson.img}`);
      img.alt = "";
      items.append(img);
    }
    target.append(items);
    target.addEventListener("click", () => {
      handleNumberAnswer(target, target.dataset.correct === "true");
    });
    targets.append(target);
  });
  placeNumberNav(Boolean(lesson.addends));
  resetNumberTimer();
  setTimeout(() => {
    if (state.screen !== "learn" || state.mode !== "numbers" || state.number !== lessonIndex) return;
    if (lesson.addends) {
      speakOrPlay("Hitung pertambahan ini", soundEffects.additionInstruction);
      return;
    }
    speakOrPlay(String(lesson.value), numberVoicePath(lesson.value));
  }, 180);
}

function useCardNavForAddition() {
  return window.matchMedia("(orientation: landscape) and (min-width: 900px) and (min-height: 650px)").matches;
}

function placeNumberNav(inAnswers) {
  const nav = $("#numberCardNav");
  if (!nav) return;
  if (inAnswers && !useCardNavForAddition()) {
    $("#numberTargets").after(nav);
    return;
  }
  $("#numberCard").closest(".glyph-zone")?.append(nav);
}

function handleNumberAnswer(target, correct) {
  if (state.numberAnswerLocked) return;
  state.numberAnswerLocked = true;
  const glyph = $("#numberCard");
  const lesson = numberLessons[state.number];
  const answer = numberAnswer(lesson);
  $$(".number-target").forEach(item => item.classList.remove("is-hovered", "is-wrong", "is-correct"));

  if (correct) {
    const finishedNumbers = state.number === numberLessons.length - 1;
    state.doneNumbers.add(state.number);
    recordAnswerTime("numbers", state.numberStartedAt);
    saveProgress();
    target.classList.add("is-correct");
    glyph.classList.add("is-success");
    createNumberBurst(target);
    playCorrectSound();
    speakOrPlay("Hebat, benar!", soundEffects.greatCorrect);
    setTimeout(() => {
      glyph.classList.remove("is-success");
      if (finishedNumbers) {
        markRoundComplete("numbers");
        playFinishSound();
        showReward("Angka Selesai!", "Semua latihan angka selesai!", () => showMode("category"), { continueText: "Pilih Kegiatan", special: true });
      } else {
        showReward("Angka Selesai!", `${numberLabel(lesson)} jawabannya ${answer}`, () => nextNumber(1));
      }
    }, 520);
    return;
  }

  target.classList.add("is-wrong");
  glyph.classList.add("is-wrong");
  createNumberBurst(target, true);
  playWrongSound();
  speakOrPlay("Coba hitung lagi ya", soundEffects.countAgain);
  setTimeout(() => {
    target.classList.remove("is-wrong");
    glyph.classList.remove("is-wrong");
    state.numberAnswerLocked = false;
  }, 520);
}

function createNumberBurst(anchor, wrong = false) {
  const burst = document.createElement("span");
  const rect = anchor.getBoundingClientRect();
  const stageRect = $(".number-stage").getBoundingClientRect();
  burst.className = `letter-burst${wrong ? " is-wrong" : ""}`;
  burst.style.left = `${rect.left - stageRect.left + rect.width / 2}px`;
  burst.style.top = `${rect.top - stageRect.top + rect.height / 2}px`;
  $(".number-stage").append(burst);
  setTimeout(() => burst.remove(), 700);
}

function nextNumber(step) {
  state.number = nextIndex(state.number, step, numberLessons.length);
  saveRoundPosition("numbers");
  renderNumber();
}

function renderWord() {
  const words = wordLessons[state.word];
  const slots = $("#sentenceSlots");
  const bank = $("#wordBank");
  state.selectedWord = null;
  state.wordPlaced = Array(words.length).fill(false);
  state.wordAnswerLocked = false;
  $("#wordProgress").textContent = `${state.word + 1} / ${wordLessons.length}`;
  $("#wordView").classList.remove("word-count-2", "word-count-3", "word-count-4");
  $("#wordView").classList.add(`word-count-${Math.min(words.length, 4)}`);
  slots.innerHTML = "";
  bank.innerHTML = "";
  slots.style.setProperty("--word-theme", letterColors[state.word % letterColors.length]);

  words.forEach((word, index) => {
    const slot = document.createElement("div");
    slot.className = "sentence-slot";
    slot.setAttribute("role", "button");
    slot.setAttribute("tabindex", "0");
    slot.setAttribute("aria-label", `Slot kata ${index + 1}`);
    slot.dataset.word = word;
    slot.dataset.index = String(index);
    slot.innerHTML = `
      <span class="trace-word">${word}</span>
      <span class="placed-word"></span>
    `;
    slot.addEventListener("click", () => placeWord(slot));
    slot.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        placeWord(slot);
      }
    });
    slots.append(slot);
  });

  shuffle(words.map((word, index) => ({ word, index }))).forEach(item => {
    const card = document.createElement("button");
    card.className = "word-card";
    card.type = "button";
    card.dataset.word = item.word;
    card.dataset.index = String(item.index);
    card.textContent = item.word;
    card.addEventListener("click", () => selectWordCard(card));
    setupWordCardDrag(card);
    bank.append(card);
  });
  resetWordTimer();
}

function nextWord(step) {
  state.word = (state.word + step + wordLessons.length) % wordLessons.length;
  saveRoundPosition("words");
  renderWord();
}

function selectWordCard(card) {
  if (card.classList.contains("is-used")) return;
  $$(".word-card").forEach(button => button.classList.remove("is-selected"));
  state.selectedWord = card;
  card.classList.add("is-selected");
  playDragSound();
}

function placeWord(slot) {
  if (!state.selectedWord || slot.classList.contains("is-filled")) return;
  answerWordSlot(state.selectedWord, slot);
}

function setupWordCardDrag(card) {
  let drag = null;

  card.addEventListener("pointerdown", event => {
    if (state.mode !== "words" || card.classList.contains("is-used")) return;
    event.preventDefault();
    drag = {
      startX: event.clientX,
      startY: event.clientY,
      moved: false
    };
    card.setPointerCapture?.(event.pointerId);
    card.classList.add("is-holding");
    selectWordCard(card);
  });

  card.addEventListener("pointermove", event => {
    if (!drag) return;
    event.preventDefault();
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (Math.hypot(deltaX, deltaY) > 5) {
      drag.moved = true;
      card.classList.add("is-dragging");
    }
    card.style.setProperty("--drag-x", `${deltaX}px`);
    card.style.setProperty("--drag-y", `${deltaY}px`);
    updateWordHover(event.clientX, event.clientY, card);
  });

  function finish(event) {
    if (!drag) return;
    const moved = drag.moved;
    card.releasePointerCapture?.(event.pointerId);
    card.classList.remove("is-holding", "is-dragging");
    card.style.setProperty("--drag-x", "0px");
    card.style.setProperty("--drag-y", "0px");

    const slot = moved ? wordSlotAt(event.clientX, event.clientY, card) : null;
    $$(".sentence-slot").forEach(item => item.classList.remove("is-hovered"));
    drag = null;
    if (!slot) return;
    answerWordSlot(card, slot);
  }

  card.addEventListener("pointerup", finish);
  card.addEventListener("pointercancel", finish);
}

function wordSlotAt(x, y, card) {
  const previousPointerEvents = card.style.pointerEvents;
  card.style.pointerEvents = "none";
  const element = document.elementFromPoint(x, y);
  card.style.pointerEvents = previousPointerEvents;
  return element?.closest?.("#sentenceSlots .sentence-slot") || null;
}

function updateWordHover(x, y, card) {
  const hovered = wordSlotAt(x, y, card);
  $$(".sentence-slot").forEach(slot => slot.classList.toggle("is-hovered", slot === hovered));
}

function answerWordSlot(card, slot) {
  if (state.wordAnswerLocked) return;
  if (!card || !slot || slot.classList.contains("is-filled") || card.classList.contains("is-used")) return;
  const cardIndex = Number(card.dataset.index);
  const correct = slot.dataset.word === card.dataset.word && Number(slot.dataset.index) === cardIndex;
  if (!correct) {
    state.wordAnswerLocked = true;
    slot.classList.add("is-wrong");
    card.classList.add("is-wrong");
    playWrongSound();
    speakOrPlay("Coba kata lain ya", soundEffects.tryAgain);
    setTimeout(() => {
      slot.classList.remove("is-wrong");
      card.classList.remove("is-wrong");
      state.wordAnswerLocked = false;
    }, 520);
    return;
  }
  slot.classList.add("is-filled");
  slot.querySelector(".placed-word").textContent = card.dataset.word;
  card.classList.add("is-used");
  card.classList.remove("is-selected");
  if (state.selectedWord === card) state.selectedWord = null;
  state.wordPlaced[cardIndex] = true;
  slot.classList.add("is-correct");
  createWordBurst(slot);
  playCorrectSound();
  setTimeout(() => slot.classList.remove("is-correct"), 540);

  if (state.wordPlaced.every(Boolean)) {
    const finishedWords = state.word === wordLessons.length - 1;
    state.wordAnswerLocked = true;
    state.doneWords.add(state.word);
    recordAnswerTime("words", state.wordStartedAt);
    saveProgress();
    playWordCompletionAnimation(() => {
      speakOrPlay(wordsToSentence(wordLessons[state.word]), wordSentenceVoicePath());
      if (finishedWords) {
        markRoundComplete("words");
        setTimeout(() => {
          playFinishSound();
          showReward("Kata Selesai!", "Semua latihan kata selesai!", () => showMode("category"), { continueText: "Pilih Kegiatan", special: true });
        }, 900);
      } else {
        showReward("Kalimat Selesai!", wordsToSentence(wordLessons[state.word]), () => {
          nextWord(1);
        });
      }
    });
  }
}

function playWordCompletionAnimation(done) {
  const slots = $$("#sentenceSlots .sentence-slot");
  const colors = shuffle([...letterColors]);
  slots.forEach((slot, index) => {
    slot.classList.remove("is-celebrating");
    slot.style.setProperty("--relay-color", colors[index % colors.length]);
  });
  slots.forEach((slot, index) => {
    setTimeout(() => {
      slot.classList.add("is-celebrating");
      playDragSound();
    }, index * 230);
  });
  setTimeout(() => {
    slots.forEach(slot => slot.classList.remove("is-celebrating"));
    done?.();
  }, Math.max(720, slots.length * 230 + 520));
}

function createWordBurst(anchor, wrong = false) {
  const burst = document.createElement("span");
  const rect = anchor.getBoundingClientRect();
  const stageRect = $(".word-stage").getBoundingClientRect();
  burst.className = `letter-burst${wrong ? " is-wrong" : ""}`;
  burst.style.left = `${rect.left - stageRect.left + rect.width / 2}px`;
  burst.style.top = `${rect.top - stageRect.top + rect.height / 2}px`;
  $(".word-stage").append(burst);
  setTimeout(() => burst.remove(), 700);
}

function wordsToSentence(words) {
  return words.join(" ").toLocaleLowerCase("id-ID");
}

function showReward(title, text, next, options = {}) {
  $("#rewardTitle").textContent = title;
  $("#rewardText").textContent = text;
  $("#rewardContinue").textContent = options.continueText || "Lanjut";
  $("#rewardOverlay").classList.toggle("is-special", Boolean(options.special));
  $("#rewardOverlay").classList.add("is-visible");
  $("#rewardContinue").onclick = () => {
    $("#rewardOverlay").classList.remove("is-visible");
    $("#rewardOverlay").classList.remove("is-special");
    next?.();
  };
}

function closeReward() {
  $("#rewardOverlay").classList.remove("is-visible");
  $("#rewardOverlay").classList.remove("is-special");
}

function showLetterTutor() {
  if (state.screen !== "learn" || state.mode !== "letters") return;
  $("#letterTutorOverlay").classList.add("is-visible");
}

function closeLetterTutor() {
  $("#letterTutorOverlay").classList.remove("is-visible");
}

function renderCollection() {
  const grid = $("#collectionGrid");
  const foundCount = state.found.size;
  const percent = Math.round((foundCount / lessons.length) * 100);

  $("#collectionProgressText").textContent = `${foundCount} dari ${lessons.length} karakter ditemukan!`;
  $("#collectionPercent").textContent = `${percent}%`;
  $("#collectionProgressFill").style.width = `${percent}%`;

  grid.innerHTML = "";
  lessons.forEach(lesson => {
    const unlocked = state.found.has(lesson.letter);
    const card = document.createElement("button");
    card.className = `collection-card${unlocked ? " is-unlocked" : " is-locked"}`;
    card.type = "button";
    card.setAttribute("aria-label", unlocked ? `${lesson.letter} untuk ${lesson.word}` : `Kartu ${lesson.letter} terkunci`);
    card.innerHTML = `
      <span class="collection-image-wrap">
        <img src="${asset(`HEWAN/${lesson.img}`)}" alt="${unlocked ? lesson.word : ""}">
      </span>
      <strong>${unlocked ? lesson.word : "Rahasia"}</strong>
      <small>${unlocked ? "Ditemukan" : "Terkunci"}</small>
    `;
    card.addEventListener("click", () => {
      if (unlocked) {
        playDragSound();
        playAnimalSound(lesson);
      } else {
        playWrongSound();
        speak("Selesaikan huruf ini dulu ya");
      }
      const hue = Math.floor(Math.random() * 360);
      card.style.setProperty("--neon-a", `hsl(${hue} 95% 66%)`);
      card.style.setProperty("--neon-b", `hsl(${(hue + 70) % 360} 95% 68%)`);
      card.classList.remove("is-tapped");
      requestAnimationFrame(() => card.classList.add("is-tapped"));
    });
    grid.append(card);
  });
}

function renderStats() {
  const letters = state.found.size;
  const numbers = state.doneNumbers.size;
  const words = state.doneWords.size;
  const letterPercent = letters / lessons.length;
  const numberPercent = numbers / numberLessons.length;
  const wordPercent = words / wordLessons.length;
  const totalPercent = Math.round(((letterPercent + numberPercent + wordPercent) / 3) * 100);

  $("#lettersStat").textContent = `${letters} / ${lessons.length}`;
  $("#numbersStat").textContent = `${numbers} / ${numberLessons.length}`;
  $("#wordsStat").textContent = `${words} / ${wordLessons.length}`;
  renderAverage("#lettersAverage", "letters");
  renderAverage("#numbersAverage", "numbers");
  renderAverage("#wordsAverage", "words");
  $("#parentTotalPercent").textContent = `${totalPercent}%`;
  $("#parentStatusText").innerHTML = [
    ["Huruf", letters, lessons.length, "#f587b7"],
    ["Angka", numbers, numberLessons.length, "#74bdf0"],
    ["Kata", words, wordLessons.length, "#a8d76b"]
  ].map(([label, current, total, color]) => {
    const percent = Math.round((current / total) * 100);
    return `
      <div class="parent-status-row" style="--status-fill: ${percent}%; --status-color: ${color}">
        <div class="parent-status-label">
          <span>${label}</span>
          <b>${current}/${total}</b>
        </div>
        <div class="parent-status-track" aria-label="${label} ${percent}%">
          <i></i>
        </div>
      </div>
    `;
  }).join("");
  const tips = [
    letters >= lessons.length ? "Huruf A-Z sudah kuat. Pertahankan dengan mengulang huruf acak." : "Fokuskan latihan huruf sedikit demi sedikit sampai A-Z selesai.",
    numbers >= numberLessons.length ? "Pemahaman angka sudah baik. Ulangi soal jumlah agar makin cepat." : "Latih angka dengan benda nyata agar anak terbiasa menghitung.",
    words >= wordLessons.length ? "Susun kata sudah selesai. Ajak anak membaca kalimat pendek." : "Latih susun kata pelan-pelan, mulai dari kalimat dua kata.",
    averageSeconds("letters") || averageSeconds("numbers") || averageSeconds("words") ? "Perhatikan rata-rata waktu. Jika mulai turun, anak makin percaya diri." : "Catat waktu belajar setelah beberapa ronde untuk melihat perkembangan.",
    advancedUnlocked() ? "Aktivitas lanjutan sudah terbuka. Gunakan sesi pendek tapi rutin." : "Selesaikan Belajar Huruf untuk membuka Angka dan Kata."
  ];
  $("#parentTipList").innerHTML = tips.map(tip => `<li>${tip}</li>`).join("");
}

function resetProgress() {
  state.found.clear();
  state.doneNumbers.clear();
  state.doneWords.clear();
  state.letter = 0;
  state.number = 0;
  state.word = 0;
  state.answerTimes = { letters: [], numbers: [], words: [] };
  localStorage.setItem("ttCleanCurrentLetter", "0");
  localStorage.setItem("ttCleanCurrentNumber", "0");
  localStorage.setItem("ttCleanCurrentWord", "0");
  localStorage.setItem("ttCleanLettersRoundComplete", "false");
  localStorage.setItem("ttCleanNumbersRoundComplete", "false");
  localStorage.setItem("ttCleanWordsRoundComplete", "false");
  saveProgress();
  updateCategoryLocks();
  renderStats();
  renderCollection();
}

function rotateHomeMascot() {
  if (state.screen !== "home") return;
  const mascot = $("#homeMascot");
  state.homeMascot = (state.homeMascot + 1) % homeMascots.length;
  mascot.classList.add("is-changing");
  setTimeout(() => {
    mascot.src = asset(`MASKOT/${homeMascots[state.homeMascot]}`);
    mascot.classList.remove("is-changing");
  }, 220);
}

$("#startButton").addEventListener("click", () => {
  requestLandscapeMode();
  showScreen("learn");
  showMode("category");
});

$$(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    requestLandscapeMode();
    showMode(card.dataset.mode);
  });
});

$$(".lesson-home").forEach(button => {
  button.addEventListener("click", () => showMode("category"));
});

$$(".nav-item").forEach(button => {
  button.addEventListener("click", () => {
    requestLandscapeMode();
    showScreen(button.dataset.screen);
    if (button.dataset.screen === "learn") showMode("category");
  });
});

$("#letterPrev").addEventListener("click", () => nextLetter(-1));
$("#letterNext").addEventListener("click", () => nextLetter(1));
$("#letterSound").addEventListener("click", () => {
  const lesson = lessons[state.letter];
  speakOrPlay(lesson.voice, letterVoicePath(lesson));
});
$("#numberPrev").addEventListener("click", () => nextNumber(-1));
$("#numberNext").addEventListener("click", () => nextNumber(1));
$("#wordPrev").addEventListener("click", () => nextWord(-1));
$("#wordNext").addEventListener("click", () => nextWord(1));
$("#soundToggle").addEventListener("change", event => {
  state.sound = event.target.checked;
  localStorage.setItem("ttCleanSound", String(state.sound));
  if (!state.sound) stopAlphabetHoldSound();
  if (!state.sound) stopNumberHoldSound();
  if (!state.sound) stopAnimalSound();
  if (!state.sound && "speechSynthesis" in window) speechSynthesis.cancel();
});
$("#musicToggle").addEventListener("change", event => {
  state.music = event.target.checked;
  localStorage.setItem("ttCleanMusic", String(state.music));
  updateBackgroundAudio();
});
$("#volumeRange").addEventListener("input", event => {
  state.volume = Number(event.target.value);
  localStorage.setItem("ttCleanVolume", String(state.volume));
  applyBackgroundVolume();
});
$("#speechRateRange").addEventListener("input", event => {
  state.speechRate = Number(event.target.value);
  localStorage.setItem("ttCleanSpeechRate", String(state.speechRate));
});
$("#randomToggle").addEventListener("change", event => {
  state.random = event.target.checked;
  localStorage.setItem("ttCleanRandom", String(state.random));
});
$("#resetButton").addEventListener("click", resetProgress);
$("#parentResetButton").addEventListener("click", resetProgress);
$("#rewardClose").addEventListener("click", closeReward);
$("#letterTutorClose").addEventListener("click", closeLetterTutor);
$("#letterTutorStart").addEventListener("click", closeLetterTutor);

requestLandscapeMode();
startInitialLoading();
setupLetterDrag();
setupNumberDrag();
$("#soundToggle").checked = state.sound;
$("#musicToggle").checked = state.music;
$("#volumeRange").value = String(state.volume);
$("#speechRateRange").value = String(state.speechRate);
$("#randomToggle").checked = state.random;
applyBackgroundVolume();
renderLetter();
renderNumber();
renderWord();
renderCollection();
renderStats();
updateCategoryLocks();
setInterval(rotateHomeMascot, 3200);
setInterval(updateLetterTimer, 1000);
setInterval(updateNumberTimer, 1000);
setInterval(updateWordTimer, 1000);
