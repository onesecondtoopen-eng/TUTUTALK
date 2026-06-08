const ASET = "ASET/";

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
  ["PANDA", "DUDUK", "DI", "TAMAN"], ["RUSA", "LARI", "DI", "HUTAN"], ["ZEBRA", "PUNYA", "GARIS"],
  ["AYAM", "PUNYA", "DUA", "SAYAP"], ["BEBEK", "PUNYA", "DUA", "KAKI"],
  ["GAJAH", "PUNYA", "SATU", "BELALAI"], ["PANDA", "PUNYA", "EMPAT", "KAKI"]
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
  letter: 0,
  number: 0,
  word: 0,
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
      setTimeout(() => overlay.remove(), 420);
    }, wait);
  });
}

const audioTracks = {
  home: new Audio(asset("audio/homepage % pilih  kegiatan audio.mp3")),
  lesson: new Audio(asset("audio/belajar audio.mp3"))
};

Object.values(audioTracks).forEach(audio => {
  audio.loop = true;
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

function saveProgress() {
  localStorage.setItem("ttCleanFound", JSON.stringify([...state.found]));
  localStorage.setItem("ttCleanNumbers", JSON.stringify([...state.doneNumbers]));
  localStorage.setItem("ttCleanWords", JSON.stringify([...state.doneWords]));
  localStorage.setItem("ttCleanAnswerTimes", JSON.stringify(state.answerTimes));
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
  if (state.screen === "home") return audioTracks.home;
  if (state.screen === "learn" && state.mode === "category") return audioTracks.home;
  if (state.screen === "learn") return audioTracks.lesson;
  return null;
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

function showScreen(name) {
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
  if ((mode === "numbers" || mode === "words") && !advancedUnlocked()) {
    updateCategoryLocks();
    showReward("Masih Terkunci", "Selesaikan huruf A sampai Z dulu ya", null, { continueText: "Oke" });
    speak("Selesaikan huruf A sampai Z dulu ya");
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
    $("#letterView").classList.add("is-active");
    renderLetter();
    requestAnimationFrame(showLetterTutor);
  }
  if (mode === "numbers") {
    $("#numberView").classList.add("is-active");
    renderNumber();
  }
  if (mode === "words") {
    $("#wordView").classList.add("is-active");
    renderWord();
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
    speak(lesson.voice);
    setTimeout(() => {
      glyph.classList.remove("is-success");
      if (finishedAlphabet) {
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
  speak("Coba lagi ya");
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
    playDragSound();
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
    playDragSound();
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
  renderLetter();
}

function numberAnswer(lesson) {
  return lesson.addends ? lesson.addends[0] + lesson.addends[1] : lesson.value;
}

function numberLabel(lesson) {
  return lesson.addends ? lesson.addends.join(" + ") : String(lesson.value);
}

function renderNumber() {
  stopNumberColorCycle();
  const lesson = numberLessons[state.number];
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
  resetNumberTimer();
}

function handleNumberAnswer(target, correct) {
  if (state.numberAnswerLocked) return;
  state.numberAnswerLocked = true;
  const glyph = $("#numberCard");
  const lesson = numberLessons[state.number];
  const answer = numberAnswer(lesson);
  $$(".number-target").forEach(item => item.classList.remove("is-hovered", "is-wrong", "is-correct"));

  if (correct) {
    state.doneNumbers.add(state.number);
    recordAnswerTime("numbers", state.numberStartedAt);
    saveProgress();
    target.classList.add("is-correct");
    glyph.classList.add("is-success");
    createNumberBurst(target);
    playCorrectSound();
    speak("Hebat, benar!");
    setTimeout(() => {
      glyph.classList.remove("is-success");
      showReward("Angka Selesai!", `${numberLabel(lesson)} jawabannya ${answer}`, () => nextNumber(1));
    }, 520);
    return;
  }

  target.classList.add("is-wrong");
  glyph.classList.add("is-wrong");
  createNumberBurst(target, true);
  playWrongSound();
  speak("Coba hitung lagi ya");
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
  state.word = nextIndex(state.word, step, wordLessons.length);
  renderWord();
}

function selectWordCard(card) {
  if (card.classList.contains("is-used")) return;
  $$(".word-card").forEach(button => button.classList.remove("is-selected"));
  state.selectedWord = card;
  card.classList.add("is-selected");
  playDragSound();
  speak(card.dataset.word);
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
    speak("Coba kata lain ya");
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
    state.wordAnswerLocked = true;
    state.doneWords.add(state.word);
    recordAnswerTime("words", state.wordStartedAt);
    saveProgress();
    speak(wordsToSentence(wordLessons[state.word]));
    showReward("Kalimat Selesai!", wordsToSentence(wordLessons[state.word]), () => {
      nextWord(1);
    });
  }
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
  speak("Tarik kartu huruf ke gambar yang cocok");
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
        speak(lesson.word);
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
  $("#lettersAverage").textContent = `Rata-rata ${averageSeconds("letters")} detik`;
  $("#numbersAverage").textContent = `Rata-rata ${averageSeconds("numbers")} detik`;
  $("#wordsAverage").textContent = `Rata-rata ${averageSeconds("words")} detik`;
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
  state.answerTimes = { letters: [], numbers: [], words: [] };
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
  showScreen("learn");
  showMode("category");
});

$$(".category-card").forEach(card => {
  card.addEventListener("click", () => showMode(card.dataset.mode));
});

$$(".lesson-home").forEach(button => {
  button.addEventListener("click", () => showMode("category"));
});

$$(".nav-item").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.screen);
    if (button.dataset.screen === "learn") showMode("category");
  });
});

$("#letterPrev").addEventListener("click", () => nextLetter(-1));
$("#letterNext").addEventListener("click", () => nextLetter(1));
$("#letterSound").addEventListener("click", () => speak(lessons[state.letter].voice));
$("#numberPrev").addEventListener("click", () => nextNumber(-1));
$("#numberNext").addEventListener("click", () => nextNumber(1));
$("#wordPrev").addEventListener("click", () => nextWord(-1));
$("#wordNext").addEventListener("click", () => nextWord(1));
$("#soundToggle").addEventListener("change", event => {
  state.sound = event.target.checked;
  localStorage.setItem("ttCleanSound", String(state.sound));
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
