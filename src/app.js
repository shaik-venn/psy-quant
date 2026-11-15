// ============================================================================
// src/app.js — UI Controller, Freemium Gate (3 Free), Google Auth & Iframe Mode
// ============================================================================
let appState = {
  mode: "learn",
  selectedTopicId: "percentages",
  topicCategoryFilter: "all",
  selectedLevel: 1,
  freeExercisesUsed: 1,
  isRegistered: false,
  userName: "",
  totalGeneratedCount: 1,
  streak: 0,
  currentQuestion: null,
  answeredCurrent: false,
  cheatSheetOpen: true
};

function initApp() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("level")) {
    const parsed = parseInt(params.get("level"), 10);
    if (parsed >= 1 && parsed <= 7) appState.selectedLevel = parsed;
  }
  if (params.get("embed") === "1") {
    document.getElementById("mainHeader")?.classList.add("hidden");
    document.getElementById("topicsSidebar")?.classList.add("hidden");
    document.getElementById("courseSummaryCard")?.classList.add("hidden");
    const mainSection = document.getElementById("mainContentSection");
    if (mainSection) mainSection.className = "lg:col-span-12 space-y-4";
  }

  renderTopicSidebar();
  renderSevenLevelsBar();
  updateCourseSummaryCard();
  loadAndRenderQuestion();
  renderMiniIframeQuestion();
}

function filterTopicList(cat) {
  appState.topicCategoryFilter = cat;
  ["all", "אלגברה", "בעיות", "גאומטריה וגרפים"].forEach(c => {
    const btn = document.getElementById(`catFilter_${c}`);
    if (!btn) return;
    btn.className = c === cat
      ? "py-1 rounded bg-white text-indigo-700 shadow-sm"
      : "py-1 rounded text-slate-600 hover:bg-white";
  });
  renderTopicSidebar();
}

function renderTopicSidebar() {
  const container = document.getElementById("topicButtonsList");
  if (!container) return;
  const filtered = COURSE_TOPICS.filter(t =>
    appState.topicCategoryFilter === "all" ? true : t.group === appState.topicCategoryFilter
  );
  container.innerHTML = filtered.map((t, idx) => {
    const isActive = appState.mode === "learn" && appState.selectedTopicId === t.id;
    return `
      <button onclick="selectTopic('${t.id}')" class="topic-btn ${isActive ? 'active' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'} w-full text-right px-3 py-2 rounded-xl border text-xs font-bold flex items-center justify-between transition">
        <span class="truncate">${idx + 1}. ${t.name}</span>
        <span class="text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'} px-1.5 py-0.5 rounded">${t.group === 'גאומטריה וגרפים' ? 'גאומ׳' : t.group}</span>
      </button>
    `;
  }).join("");
}

function renderSevenLevelsBar() {
  const bar = document.getElementById("sevenLevelsBar");
  if (!bar) return;
  const colors = [
    "border-emerald-300 bg-emerald-50 text-emerald-900",
    "border-teal-300 bg-teal-50 text-teal-900",
    "border-sky-300 bg-sky-50 text-sky-900",
    "border-indigo-300 bg-indigo-50 text-indigo-900",
    "border-violet-300 bg-violet-50 text-violet-900",
    "border-amber-300 bg-amber-50 text-amber-900",
    "border-rose-300 bg-rose-50 text-rose-900"
  ];
  const labels = ["בסיס", "יישום", "תקני", "דו-שלבי", "אילוצים", "מתקדם", "קצה 700+"];

  bar.innerHTML = [1, 2, 3, 4, 5, 6, 7].map((lvl, idx) => {
    const active = appState.selectedLevel === lvl;
    return `
      <button onclick="selectDifficultyLevel(${lvl})" class="level-pill rounded-xl p-2 border-2 text-center transition ${active ? 'ring-2 ring-indigo-600 border-indigo-600 bg-indigo-600 text-white shadow-md' : colors[idx]}">
        <div class="text-xs md:text-sm font-black">רמה ${lvl}</div>
        <div class="text-[10px] font-bold opacity-85 truncate">${labels[idx]}</div>
      </button>
    `;
  }).join("");

  document.getElementById("levelDescTitle").textContent = LEVEL_DESCRIPTIONS[appState.selectedLevel];
}

function updateCourseSummaryCard() {
  const card = document.getElementById("courseSummaryCard");
  const summaryBanner = document.getElementById("summaryModeBanner");
  if (!card || !summaryBanner) return;

  if (appState.mode === "summary") {
    card.classList.add("hidden");
    summaryBanner.classList.remove("hidden");
    return;
  }

  card.classList.remove("hidden");
  summaryBanner.classList.add("hidden");

  const topicObj = COURSE_TOPICS.find(t => t.id === appState.selectedTopicId) || COURSE_TOPICS[0];
  document.getElementById("cheatTopicTitle").textContent = topicObj.name;
  document.getElementById("cheatTopicCategory").textContent = `(${topicObj.group})`;
  document.getElementById("cheatMethodList").innerHTML = topicObj.method.map(m => `<li>${m}</li>`).join("");
  document.getElementById("cheatRememberList").innerHTML = topicObj.remember.map(r => `<li>${r}</li>`).join("");
  document.getElementById("cheatShortcutsList").innerHTML = topicObj.shortcuts.map(sc => `<li>${sc}</li>`).join("");
}

function toggleCheatSheetBody() {
  appState.cheatSheetOpen = !appState.cheatSheetOpen;
  const body = document.getElementById("cheatSheetBody");
  const btn = document.getElementById("toggleCheatBtn");
  if (appState.cheatSheetOpen) {
    body.classList.remove("hidden");
    btn.textContent = "הסתר כרטיס לימוד ▲";
  } else {
    body.classList.add("hidden");
    btn.textContent = "הצג כרטיס לימוד וקיצורי דרך ▼";
  }
}

function setAppMode(mode) {
  appState.mode = mode;
  const learnBtn = document.getElementById("modeLearnBtn");
  const summaryBtn = document.getElementById("modeSummaryBtn");

  if (mode === "learn") {
    learnBtn.className = "px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition bg-white text-indigo-700 shadow-sm";
    summaryBtn.className = "px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition text-slate-600 hover:text-slate-900";
  } else {
    summaryBtn.className = "px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition bg-white text-indigo-700 shadow-sm";
    learnBtn.className = "px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition text-slate-600 hover:text-slate-900";
  }

  renderTopicSidebar();
  updateCourseSummaryCard();
  loadAndRenderQuestion();
}

function selectTopic(topicId) {
  appState.mode = "learn";
  appState.selectedTopicId = topicId;
  setAppMode("learn");
}

function selectDifficultyLevel(lvl) {
  appState.selectedLevel = lvl;
  renderSevenLevelsBar();
  loadAndRenderQuestion();
}

function stepDifficulty(delta) {
  const nextLvl = Math.max(1, Math.min(7, appState.selectedLevel + delta));
  selectDifficultyLevel(nextLvl);
}

function checkTrialGateBeforeNext() {
  if (!appState.isRegistered && appState.freeExercisesUsed >= 3) {
    openAuthModal();
    return false;
  }
  if (!appState.isRegistered) {
    appState.freeExercisesUsed++;
  }
  appState.totalGeneratedCount++;
  updateTrialStatusUI();
  return true;
}

function updateTrialStatusUI() {
  const badge = document.getElementById("trialBadge");
  const text = document.getElementById("trialCountText");
  if (appState.isRegistered) {
    badge.className = "bg-emerald-50 border border-emerald-200 text-emerald-900 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5";
    text.textContent = `גישה מלאה פתוחה ∞ (${appState.userName || "רשום"})`;
  } else {
    badge.className = "bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5";
    text.textContent = `תרגיל ${appState.freeExercisesUsed} מתוך 3`;
  }
}

function generateNextInfiniteQuestion() {
  if (!checkTrialGateBeforeNext()) return;
  loadAndRenderQuestion();
}

function regenerateSameTopicAndLevel() {
  if (!checkTrialGateBeforeNext()) return;
  loadAndRenderQuestion();
}

function loadAndRenderQuestion() {
  appState.answeredCurrent = false;
  const activeTopicId = appState.mode === "summary"
    ? pick(COURSE_TOPICS).id
    : appState.selectedTopicId;

  const topicObj = COURSE_TOPICS.find(t => t.id === activeTopicId) || COURSE_TOPICS[0];
  const qData = generateQuestionForTopic(activeTopicId, appState.selectedLevel);
  appState.currentQuestion = { ...qData, topicName: topicObj.name };

  document.getElementById("qBadgeNumber").textContent = `תרגיל #${appState.totalGeneratedCount}`;
  document.getElementById("qBadgeTopic").textContent = appState.mode === "summary"
    ? "🎯 תרגול מסכם (נושא מוסתר עד המענה)"
    : topicObj.name;
  document.getElementById("qBadgeLevel").textContent = `רמת קושי ${appState.selectedLevel} / 7`;

  document.getElementById("qQuickTipText").textContent = appState.mode === "summary"
    ? "קרא את השאלה, זהה לאיזה מ-15 הנושאים היא שייכת והפעל את קיצור הדרך המתאים."
    : qData.quickTip;

  const promptEl = document.getElementById("questionPrompt");
  const textCol = document.getElementById("questionTextContainer");
  const svgCol = document.getElementById("questionSvgContainer");

  promptEl.innerHTML = qData.prompt;
  if (qData.svg) {
    textCol.className = "md:col-span-7 space-y-3";
    svgCol.className = "md:col-span-5 flex justify-center";
    svgCol.innerHTML = qData.svg;
  } else {
    textCol.className = "md:col-span-12 space-y-3";
    svgCol.className = "md:col-span-5 hidden";
    svgCol.innerHTML = "";
  }

  const optsContainer = document.getElementById("optionsContainer");
  optsContainer.innerHTML = qData.options.map((opt, idx) => `
    <button onclick="selectAnswer(${idx})" id="optBtn_${idx}" class="w-full text-right p-3.5 rounded-xl border-2 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition flex items-center gap-3 font-bold text-sm text-slate-800">
      <span class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-black flex items-center justify-center text-xs shrink-0">(${idx + 1})</span>
      <span class="math-dir">${opt}</span>
    </button>
  `).join("");

  document.getElementById("explanationBox").classList.add("hidden");
}

function selectAnswer(idx) {
  if (appState.answeredCurrent) return;
  appState.answeredCurrent = true;

  const q = appState.currentQuestion;
  const isCorrect = idx === q.correctIndex;
  appState.streak = isCorrect ? appState.streak + 1 : 0;
  document.getElementById("statsStreakBadge").textContent = `רצף הצלחות: ${appState.streak}`;
  document.getElementById("qBadgeTopic").textContent = q.topicName;

  q.options.forEach((_, i) => {
    const btn = document.getElementById(`optBtn_${i}`);
    if (i === q.correctIndex) {
      btn.className = "w-full text-right p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-950 flex items-center gap-3 font-extrabold text-sm";
    } else if (i === idx && !isCorrect) {
      btn.className = "w-full text-right p-3.5 rounded-xl border-2 border-rose-500 bg-rose-50 text-rose-950 flex items-center gap-3 font-bold text-sm";
    } else {
      btn.className = "w-full text-right p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 flex items-center gap-3 font-medium text-sm opacity-70";
    }
  });

  const expBox = document.getElementById("explanationBox");
  const expTitle = document.getElementById("explanationStatusTitle");
  const expBadge = document.getElementById("explanationTechniqueBadge");
  const expText = document.getElementById("explanationText");

  expBox.classList.remove("hidden");
  if (isCorrect) {
    expBox.className = "rounded-2xl p-4 border-2 border-emerald-200 bg-emerald-50/60 space-y-2";
    expTitle.className = "font-black text-sm text-emerald-900";
    expTitle.textContent = "✅ תשובה נכונה! פיצוח מדויק.";
  } else {
    expBox.className = "rounded-2xl p-4 border-2 border-rose-200 bg-rose-50/60 space-y-2";
    expTitle.className = "font-black text-sm text-rose-900";
    expTitle.textContent = `❌ לא מדויק — התשובה הנכונה היא (${q.correctIndex + 1}).`;
  }

  expBadge.textContent = `טכניקת פיצוח: ${q.techniqueUsed}`;
  expText.innerHTML = q.explanation;
}

function openAuthModal() { document.getElementById("authModal").classList.remove("hidden"); }
function closeAuthModal() { document.getElementById("authModal").classList.add("hidden"); }

function completeRegistration(displayName) {
  appState.isRegistered = true;
  appState.userName = displayName;
  document.getElementById("authHeaderBtnText").textContent = `מחובר: ${displayName}`;
  updateTrialStatusUI();
  closeAuthModal();
  loadAndRenderQuestion();
}

function handleGoogleSignIn() { completeRegistration("משתמש Google"); }

function handleModalLeadSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("modalName").value.trim() || "תלמיד רשום";
  completeRegistration(name);
}

function handleSidebarLeadSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("sideLeadEmail").value.trim();
  const feedback = document.getElementById("sideLeadFeedback");
  feedback.textContent = `✓ נרשמת בהצלחה (${email}) לקבלת שאלה יומית ב-SMS ובמייל!`;
  feedback.classList.remove("hidden");
  appState.isRegistered = true;
  appState.userName = email.split("@")[0];
  updateTrialStatusUI();
}

function openShareModal(tab) {
  document.getElementById("shareModal").classList.remove("hidden");
  switchShareTab(tab || "social");
}
function closeShareModal() { document.getElementById("shareModal").classList.add("hidden"); }

function switchShareTab(tab) {
  const socialPane = document.getElementById("shareSocialPane");
  const iframePane = document.getElementById("shareIframePane");
  const socialBtn = document.getElementById("tabSocialBtn");
  const iframeBtn = document.getElementById("tabIframeBtn");

  if (tab === "iframe") {
    socialPane.classList.add("hidden");
    iframePane.classList.remove("hidden");
    iframeBtn.className = "pb-2 px-3 text-xs font-extrabold border-b-2 border-indigo-600 text-indigo-600";
    socialBtn.className = "pb-2 px-3 text-xs font-extrabold border-b-2 border-transparent text-slate-500";
  } else {
    iframePane.classList.add("hidden");
    socialPane.classList.remove("hidden");
    socialBtn.className = "pb-2 px-3 text-xs font-extrabold border-b-2 border-indigo-600 text-indigo-600";
    iframeBtn.className = "pb-2 px-3 text-xs font-extrabold border-b-2 border-transparent text-slate-500";
  }
}

function shareExternal(platform) {
  const text = encodeURIComponent("נסו את Psy-Quant ∞ — למידה לפי 15 נושאים ומחולל שאלות חשיבה כמותית ב-7 רמות קושי!");
  const url = encodeURIComponent(window.location.href);
  const map = {
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
  };
  window.open(map[platform], "_blank");
}

function copyShareUrl() {
  navigator.clipboard.writeText(window.location.href);
  const btn = document.getElementById("copyUrlBtn");
  btn.textContent = "הקישור הועתק ✓";
  setTimeout(() => (btn.textContent = "העתק קישור"), 2000);
}

function copyIframeCode() {
  const input = document.getElementById("iframeCodeInput");
  navigator.clipboard.writeText(input.value);
  const btn = document.getElementById("copyIframeBtn");
  btn.textContent = "הועתק ✓";
  setTimeout(() => (btn.textContent = "העתק קוד"), 2000);
}

function renderMiniIframeQuestion() {
  const topic = pick(COURSE_TOPICS);
  const lvl = randInt(1, 7);
  const q = generateQuestionForTopic(topic.id, lvl);
  const badge = document.getElementById("iframeTopicBadge");
  if (!badge) return;
  badge.textContent = `נושא: ${topic.name} · רמה ${lvl}/7`;
  document.getElementById("iframeQText").innerHTML = q.prompt;
  const fb = document.getElementById("iframeFeedback");
  fb.classList.add("hidden");

  const optsEl = document.getElementById("iframeOpts");
  optsEl.innerHTML = q.options.map((o, i) => `
    <button onclick="answerMiniIframe(${i}, ${q.correctIndex})" class="text-right text-xs font-bold p-2 rounded-lg border border-slate-200 hover:border-indigo-500 bg-slate-50">
      (${i + 1}) <span class="math-dir">${o}</span>
    </button>
  `).join("");
}

function answerMiniIframe(chosen, correct) {
  const fb = document.getElementById("iframeFeedback");
  fb.classList.remove("hidden");
  if (chosen === correct) {
    fb.className = "text-xs font-bold text-emerald-700";
    fb.textContent = "✅ תשובה נכונה בווידג׳ט!";
  } else {
    fb.className = "text-xs font-bold text-rose-700";
    fb.textContent = `❌ לא מדויק — התשובה הנכונה היא (${correct + 1}).`;
  }
}

window.addEventListener("DOMContentLoaded", initApp);
