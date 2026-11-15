// ============================================================================
// src/gen.js — 15 Course Topics & 7-Level Algorithmic Question Engine
// ============================================================================
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function buildOptions(correctVal, distractors) {
  const cleanCorrect = String(correctVal);
  const uniqueDistractors = [...new Set(distractors.map(String))].filter(d => d !== cleanCorrect);
  let fallbackStep = 1;
  while (uniqueDistractors.length < 3) {
    const candidate = !isNaN(Number(cleanCorrect))
      ? String(Number(cleanCorrect) + fallbackStep * 2)
      : `${cleanCorrect} (${fallbackStep})`;
    if (candidate !== cleanCorrect && !uniqueDistractors.includes(candidate)) {
      uniqueDistractors.push(candidate);
    }
    fallbackStep++;
  }
  const pool = [
    { text: cleanCorrect, isCorrect: true },
    ...uniqueDistractors.slice(0, 3).map(d => ({ text: d, isCorrect: false }))
  ];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return {
    options: pool.map(p => p.text),
    correctIndex: pool.findIndex(p => p.isCorrect)
  };
}

const COURSE_TOPICS = [
  {
    id: "powers_roots",
    name: "חזקות ושורשים",
    group: "אלגברה",
    method: [
      "פירוק כל בסיס מורכב לגורמים ראשוניים משותפים (בסיסי יסוד 2, 3, 5).",
      "בחיבור וחיסור חזקות — הוצאת גורם משותף של החזקה הקטנה ביותר.",
      "השוואת חזקות: השוואת בסיסים או השוואת מעריכים."
    ],
    remember: [
      "חזקה זוגית תמיד אי-שלילית (חיובית או 0).",
      "מעריך שלילי הופך את הבסיס לשבר הופכי (אינו משנה את סימן המספר!).",
      "מעריך שבור פירושו שורש: חזקת חצי היא שורש ריבועי."
    ],
    shortcuts: [
      "קיצור דרך: זיהוי מהיר של חזקות מוכרות (2 עד חזקת 10, 3 עד חזקת 5).",
      "מוקש נפוץ: אין חוק כפל/חיבור ישיר לסכום חזקות — חובה להוציא גורם משותף!"
    ]
  },
  {
    id: "star_ops",
    name: "פעולות מומצאות (סימנים)",
    group: "אלגברה",
    method: [
      "זיהוי: הגדרה של פעולה חדשה באמצעות סימן מיוחד (*, #, $, @).",
      "אסטרטגיית הפתרון — הצבה סדורה של האיבר השמאלי והימני לפי תבנית ההגדרה."
    ],
    remember: [
      "מספר ההצבות כמספר הסימנים בתרגיל (פעולה בתוך סוגריים קודמת תמיד).",
      "הקפדה מלאה על סדר פעולות חשבון לאחר ההצבה."
    ],
    shortcuts: [
      "טכניקת פיצוח: כאשר הסימן פועל על נעלם ומושווה למספר — מתרגמים למשוואה רגילה ופותרים.",
      "מוקש נפוץ: החלפה בטעות בין המיקום של המשתנה הראשון לשני כשההגדרה אינה סימטרית."
    ]
  },
  {
    id: "letter_arith",
    name: "חידות ספרות ואותיות",
    group: "אלגברה",
    method: [
      "בכפל — ניתוח לפי ספרת האחדות ובדיקת סדר גודל.",
      "בחיבור — מעקב אחר עמודת האחדות והעשרות ובדיקת נשיאה ('הקפצת 1' לעמודה הבאה).",
      "בחילוק — תרגום התרגיל למכפלה הופכית או פירוק עשרוני."
    ],
    remember: [
      "ספרות המשמרות את ספרת האחדות במכפלה בעצמן: 0, 1, 5, 6.",
      "בחיבור שני מספרים — ספרת הקצה השמאלית שנוצרת מהקפצה תהיה תמיד 1!"
    ],
    shortcuts: [
      "טכניקת היפוך 9: בחיסור מספר דו-ספרתי והיפוכו (AB − BA), ההפרש תמיד מתחלק ב-9 ושווה ל-9 כפול הפרש הספרות!",
      "בחיבור דו-ספרתי והיפוכו (AB + BA), הסכום תמיד מתחלק ב-11 ושווה ל-11 כפול סכום הספרות.",
      "מיקוד במטרה: אם שאלו רק על סכום ספרות או אות בודדת, אין צורך למצוא את כל שאר האותיות."
    ]
  },
  {
    id: "equations_isolation",
    name: "משוואות ובידוד משתנה",
    group: "אלגברה",
    method: [
      "אלימינציה ממוקדת — חיבור, חיסור, כפל או חילוק של משוואות שלמות זו בזו כדי לקבל ישירות את הביטוי המבוקש.",
      "במערכת משוואות: ביטול ישיר של המשתנים שאינם מופיעים בשאלה."
    ],
    remember: [
      "נוסחאות כפל מקוצר: (a±b)² וכן הפרש ריבועים a² − b² = (a−b)(a+b).",
      "כפל בהצלבה וצמצום גורמים משותפים בשברים אלגבריים."
    ],
    shortcuts: [
      "קיצור דרך: אם הפתרון האלגברי מתארך מעבר לשתי שורות — חפשו צירוף ישיר (חיבור/חיסור) של שתי המשוואות!",
      "טכניקת פיצוח לביטויים הופכיים: העלאה בריבוע של (x + 1/x) מנטרלת את המשתנה באיבר האמצעי (2)."
    ]
  },
  {
    id: "inequalities",
    name: "אי-שוויונות",
    group: "אלגברה",
    method: [
      "שילוב משוואה ואי-שוויון — בידוד משתנה מהמשוואה והצבתו באי-השוויון.",
      "שילוב שני אי-שוויונות — סידור הסימנים באותו כיוון וחיבור האגפים.",
      "אי-שוויון סביב ה-0 — ניתוח סימנים (חיובי / שלילי) וניטרול חזקות זוגיות."
    ],
    remember: [
      "חיבור וחיסור מספר קבוע מותרים תמיד משני האגפים.",
      "בדיקת 4 תחומי המבחן: שלם חיובי, שבר חיובי, שבר שלילי, שלם שלילי."
    ],
    shortcuts: [
      "כלל ברזל: אסור לכפול או לחלק אי-שוויון בנעלם שלא יודעים בוודאות את סימנו!",
      "בכפל או חילוק במספר שלילי — הופכים מיד את כיוון סימן אי-השוויון.",
      "הוצאת שורש או העלאה בחזקה אי-זוגית שומרת תמיד על כיוון הסימן."
    ]
  },
  {
    id: "integers",
    name: "מספרים שלמים (זוגיות וראשוניים)",
    group: "אלגברה",
    method: [
      "פירוק לגורמים ראשוניים לבדיקת התחלקות.",
      "בשאלות 'מה מתקיים בהכרח' — הצבת מספרי מבחן קטנים לפסילת חלופות."
    ],
    remember: [
      "כל המספרים הראשוניים הם אי-זוגיים — למעט המספר 2 (הראשוני הזוגי היחיד!).",
      "חוקי זוגיות משוחזרים בשנייה על ידי הצבת 2 (לזוגי) ו-1 (לאי-זוגי).",
      "סכום של 3 מספרים שלמים עוקבים מתחלק תמיד ב-3."
    ],
    shortcuts: [
      "קיצור דרך: כשסכום של שני ראשוניים הוא אי-זוגי — אחד מהם חייב להיות 2!",
      "טכניקת פסילה: בשאלות 'בהכרח' מספיקה דוגמה נגדית אחת כדי לפסול תשובה."
    ]
  },
  {
    id: "remainders",
    name: "שאריות וחלוקה",
    group: "אלגברה",
    method: [
      "טכניקת הצבת השארית: כאשר נתון שמספר x משאיר שארית R בחלוקה ל-N, מציבים x = R ישירות בביטוי המבוקש!",
      "בבעיות מחזוריות — חלוקה באורך המחזור ובדיקת השארית בלבד."
    ],
    remember: [
      "השארית הקטנה ביותר כשיש שארית היא 1 (ובהתחלקות מדויקת: 0).",
      "השארית הגדולה ביותר האפשרית בחלוקה ב-N היא תמיד N − 1."
    ],
    shortcuts: [
      "קיצור דרך: ניתן לבצע חיבור, חיסור וכפל ישירות על השאריות עצמן במקום על המספרים הגדולים!",
      "אם התוצאה לאחר ההצבה גדולה מהמחלק — מחלקים שוב ולוקחים את השארית החדשה."
    ]
  },
  {
    id: "ratios",
    name: "יחסים ופרופורציה",
    group: "בעיות",
    method: [
      "זיהוי: המילים 'יחס', 'פי', 'מהווה חלק מ-'.",
      "מעבר מיחס לכמות ממשית — שיטת מקדם ההכפלה (פי כמה גדל הסכום או החלק ביחס).",
      "איחוד שני יחסים — סידור בטבלה תלת-עמודתית והשוואת הגורם המשותף."
    ],
    remember: [
      "יחס ניתן להרחבה ולצמצום בדיוק כמו שבר.",
      "תמיד כדאי לעבוד עם יחס שלם מצומצם."
    ],
    shortcuts: [
      "קיצור דרך לשאלות 'מה יכול להיות': בכמויות שלמות (אנשים, חפצים) הסכום הכולל חייב להתחלק בסכום יחידות היחס!",
      "שיטת מקדם ההכפלה חוסכת משוואות: מוצאים כמה שווה 'יחידת יחס אחת' וכופלים."
    ]
  },
  {
    id: "averages",
    name: "ממוצעים",
    group: "בעיות",
    method: [
      "מעבר מיידי לסכום: סכום האיברים = ממוצע × מספר האיברים.",
      "הצטרפות/עזיבת איבר — שיטת הפיזור הקבוצתי (חישוב התוספת הכוללת לכלל המשתתפים).",
      "שתי קבוצות בגדלים שונים — שיטת ציר הממוצע המשוקלל."
    ],
    remember: [
      "הממוצע תמיד כלוא בין האיבר הקטן ביותר לגדול ביותר.",
      "בסדרה חשבונית (הפרשים קבועים) הממוצע שווה לאיבר האמצעי (ולממוצע הראשון והאחרון)."
    ],
    shortcuts: [
      "שיטת הפיזור הקבוצתי: אם איבר חדש העלה את הממוצע של N+1 איברים ב-d נקודות, ערכו הוא הממוצע הישן + (N+1)·d!",
      "בציר ממוצע משוקלל — הממוצע הכולל תמיד קרוב יותר לקבוצה שיש בה יותר איברים (יחס המרחקים הפוך ליחס הכמויות)."
    ]
  },
  {
    id: "percentages",
    name: "אחוזים",
    group: "בעיות",
    method: [
      "שלב ראשון בכל שאלה: זיהוי הבסיס ('מי השלם שמהווה 100%?').",
      "כאשר אין ערכים כספיים מוחלטים בשאלה — הצבת שלם מדומה (100).",
      "בשינויים רצופים (התייקרות ואז הוזלה) — כפל מקדמי שינוי רצופים."
    ],
    remember: [
      "עלייה בשלבים מגדילה יותר מסכום האחוזים (ריבית דריבית).",
      "עלייה באחוז מסוים ואז ירידה באותו אחוז בדיוק — תמיד מובילה להפסד ביחס למחיר ההתחלתי!",
      "חוק הקיזוז ההפוך: עלייה של 1/n מתקזזת חזרה למחיר המקורי על ידי ירידה של 1/(n+1)."
    ],
    shortcuts: [
      "טכניקת הצבת 100: מציבים מחיר התחלתי 100 ופועלים עליו ישירות ללא נעלמים.",
      "חוק הקיזוז המהיר: עלייה של 25% (1/4) מתקזזת בירידה של 20% (1/5); עלייה של 50% (1/2) מתקזזת בירידה של 33.3% (1/3)."
    ]
  },
  {
    id: "word_equations",
    name: "בעיות משוואה וגילאים",
    group: "בעיות",
    method: [
      "הגדרת נעלם מרכזי אחד וביטוי שאר הגדלים באמצעותו.",
      "בבעיות גילאים — בניית טבלת ציר זמן (היום / בעוד X שנים / לפני Y שנים)."
    ],
    remember: [
      "חוק שימור הפרש הגילאים: הפרש הגילאים בין שני אנשים נשאר קבוע בכל נקודת זמן!",
      "איזון האגף הקטן: כדי ליצור משוואה, כופלים או מוסיפים תמיד לצד הקטן יותר."
    ],
    shortcuts: [
      "קיצור דרך: הצבת התשובות מהאמצע חוסכת כתיבת משוואה מורכבת.",
      "מוקש נפוץ: לוודא בסוף אם שאלו על הגיל כיום או על הגיל בעתיד/בעבר."
    ]
  },
  {
    id: "overlapping_sets",
    name: "בעיות חפיפה וקבוצות",
    group: "בעיות",
    method: [
      "זיהוי: שתי תכונות בקבוצה אחת ושאלה על 'גם וגם' או 'לא ולא'.",
      "שימוש בנוסחת האיחוד או בטבלת 2×2 (בעלי תכונה א' / ללא תכונה א')."
    ],
    remember: [
      "חפיפה מינימלית = (קבוצה א' + קבוצה ב') פחות סך כל המשתתפים (אם שלילי — המינימום הוא 0).",
      "חפיפה מקסימלית = גודל הקבוצה הקטנה מבין השתיים."
    ],
    shortcuts: [
      "טכניקת קצוות חפיפה: הפרש בין מקסימום למינימום חפיפה ניתן לחישוב ישיר בשנייה.",
      "מוקש נפוץ: להבחין בין נתונים במספרים שלמים לבין נתונים באחוזים (שבהם השלם הוא 100%)."
    ]
  },
  {
    id: "rate_motion_work",
    name: "בעיות קצב (תנועה והספק)",
    group: "בעיות",
    method: [
      "נוסחת היסוד: קצב × זמן = כמות עבודה (או מהירות × זמן = דרך).",
      "בשני גופים או פועלים — חישוב קצב משותף (חיבור או חיסור מהירויות/הספקים)."
    ],
    remember: [
      "תנועה בכיוונים מנוגדים או זה לקראת זה — מחברים מהירויות.",
      "מרדף באותו כיוון — מחסרים מהירויות (מהירות יחסית).",
      "כאשר הדרך קבועה — יחס הזמנים הפוך ליחס המהירויות!"
    ],
    shortcuts: [
      "מלכודת המהירות הממוצעת: במהירות ממוצעת הזמן הוא הקובע ולא הדרך! בדרכים שוות הלוך וחזור משתמשים בממוצע הרמוני: 2·v1·v2 / (v1+v2).",
      "המהירות הממוצעת בהלוך-חזור תמיד נמוכה מהממוצע החשבוני הפשוט!"
    ]
  },
  {
    id: "combinatorics_prob",
    name: "קומבינטוריקה והסתברות",
    group: "בעיות",
    method: [
      "שיטת השלבים (עקרון הכפל): פירוק הבחירה לשלבים והכפלת מספר האפשרויות בכל שלב.",
      "הסתברות = מספר התוצאות הרצויות חלקי סך כל התוצאות האפשריות.",
      "מאורעות 'וגם' — כפל הסתברויות; מאורעות 'או' זרים — חיבור הסתברויות."
    ],
    remember: [
      "סידור N איברים שונים בשורה = N! (עצרת); במעגל = (N−1)!.",
      "בהוצאה ללא החזרה — גם המונה וגם המכנה קטנים ב-1 בשלב השני.",
      "נוסחת זוגות (לחיצות ידיים / משחקי ליגה / אלכסונים): n(n−1)/2."
    ],
    shortcuts: [
      "טכניקת המאורע המשלים: כשמופיעה המילה 'לפחות אחד', מחשבים 1 פחות ההסתברות של 'אף לא אחד'!",
      "טכניקת זוג זהה ('דאבל'): בבחירת שני פריטים מאותו סוג, הבחירה הראשונה חופשית (הסתברות 1) ורק הבחירה השנייה צריכה להתאים לראשונה!"
    ]
  },
  {
    id: "geometry_graphs",
    name: "גאומטריה, השוואה כמותית וגרפים",
    group: "גאומטריה וגרפים",
    method: [
      "גאומטריה: סימון כל הנתונים על הסרטוט, זיהוי שלשות פיתגוריות (3:4:5, 5:12:13) ומשולשים מיוחדים (30°-60°-90°, 45°-45°-90°).",
      "שטחים מורכבים: חישוב כהפרש או סכום של צורות בסיסיות.",
      "גרפים וטבלאות: קריאת כותרות הצירים והיחידות לפני קריאת השאלות."
    ],
    remember: [
      "חוק הדמיון: יחס שטחים שווה לריבוע יחס הקווים (k²); יחס נפחים שווה למעוקב יחס הקווים (k³)!",
      "תיכון במשולש מחלק אותו לשני משולשים שווי-שטח; תיכון ליתר שווה למחצית היתר."
    ],
    shortcuts: [
      "קיצור דרך: במשולשים בעלי גובה משותף, יחס השטחים שווה ליחס הבסיסים.",
      "בגרף אחוזים או עמודות מורכבות — לוודא תמיד מתוך איזה שלם מחושב האחוז."
    ]
  }
];

const LEVEL_DESCRIPTIONS = {
  1: "רמה 1 — היכרות וזיהוי בסיסי של הכלל (חימום מהיר)",
  2: "רמה 2 — יישום ישיר של אסטרטגיית הפתרון בצעד אחד",
  3: "רמה 3 — שאלת מבחן תקנית עם הפעלת קיצור דרך מובנה",
  4: "רמה 4 — שאלה דו-שלבית עם מסיחים קלאסיים",
  5: "רמה 5 — שילוב אילוצים או משוואה סמויה",
  6: "רמה 6 — רמה מתקדמת: פרמטרים, מקרי קצה והסקה עקיפה",
  7: "רמה 7 — קצה (מועדון 700+): מלכודות עומק וניתוח רב-שלבי"
};

function generateQuestionForTopic(topicId, level) {
  const lvl = Math.max(1, Math.min(7, Number(level) || 1));
  const names = ["דניאל", "נועה", "יובל", "מאיה", "אורי", "רוני", "עמית", "שירה", "גיא", "תמר"];
  const person = pick(names);

  switch (topicId) {
    case "powers_roots": {
      if (lvl === 1) {
        const b = pick([2, 3, 5]);
        const e1 = randInt(2, 4), e2 = randInt(2, 3);
        const ans = `${b}^${e1 + e2}`;
        return {
          prompt: `לפניכם מכפלת חזקות בעלות בסיס זהה: <span class="math-dir">${b}^${e1} · ${b}^${e2} = ?</span>`,
          ...buildOptions(ans, [`${b}^${e1 * e2}`, `${b * b}^${e1 + e2}`, `${b}^${Math.abs(e1 - e2)}`]),
          quickTip: "בכפל חזקות עם אותו בסיס — מחברים את המעריכים.",
          techniqueUsed: "חוק כפל חזקות בסיסי",
          explanation: `לפי חוקי חזקות, כאשר כופלים חזקות בעלות בסיס שווה מחברים את המעריכים: <span class="math-dir">${b}^(${e1}+${e2}) = ${ans}</span>.`
        };
      }
      if (lvl === 2) {
        const b = pick([2, 3]);
        const e1 = randInt(3, 5), e2 = 2;
        const ans = `${b}^${e1 * e2}`;
        return {
          prompt: `למה שווה הביטוי <span class="math-dir">(${b}^${e1})^${e2}</span>?`,
          ...buildOptions(ans, [`${b}^${e1 + e2}`, `${b}^${e1}`, `${b * e2}^${e1}`]),
          quickTip: "בחזקה של חזקה — כופלים את המעריכים זה בזה.",
          techniqueUsed: "חזקה על חזקה",
          explanation: `בחזקה של חזקה כופלים את המעריכים: <span class="math-dir">${e1} × ${e2} = ${e1 * e2}</span> ולכן מתקבל <span class="math-dir">${ans}</span>.`
        };
      }
      if (lvl === 3) {
        const n = randInt(4, 8);
        const ans = `2^${n + 1}`;
        return {
          prompt: `למה שווה סכום החזקות <span class="math-dir">2^${n} + 2^${n}</span>?`,
          ...buildOptions(ans, [`2^${2 * n}`, `4^${n}`, `4^${2 * n}`]),
          quickTip: "בחיבור חזקות זהות — מוציאים גורם משותף!",
          techniqueUsed: "הוצאת גורם משותף בחזקות",
          explanation: `נוציא גורם משותף: <span class="math-dir">2^${n} · (1 + 1) = 2^${n} · 2^1 = 2^${n + 1}</span>. מסיח קלאסי הוא לחבר מעריכים או בסיסים ולקבל <span class="math-dir">4^${n}</span> או <span class="math-dir">2^${2 * n}</span>.`
        };
      }
      if (lvl === 4) {
        const exp = randInt(3, 6);
        const ans = `3^${exp}`;
        return {
          prompt: `פשטו את הביטוי: <span class="math-dir">9^${exp} / 3^${exp}</span>`,
          ...buildOptions(ans, [`3^${exp * 2}`, `3^1`, `6^${exp}`]),
          quickTip: "פרקו בסיסים מורכבים לגורמים ראשוניים או חלקו בסיסים בעלי מעריך זהה.",
          techniqueUsed: "פירוק בסיסים לגורמים ראשוניים",
          explanation: `כאשר המעריכים זהים, ניתן לחלק את הבסיסים: <span class="math-dir">(9 / 3)^${exp} = 3^${exp}</span>.`
        };
      }
      if (lvl === 5) {
        const k = randInt(5, 9);
        const ans = `3^${k}`;
        return {
          prompt: `למה שווה הביטוי <span class="math-dir">(3^${k + 1} − 3^${k}) / 2</span>?`,
          ...buildOptions(ans, [`3^1`, `3^${k - 1}`, `2 · 3^${k}`]),
          quickTip: "הוציאו את החזקה הקטנה (3^k) כגורם משותף מהמונה.",
          techniqueUsed: "גורם משותף בהפרש חזקות",
          explanation: `נוציא <span class="math-dir">3^${k}</span> במונה: <span class="math-dir">3^${k} · (3^1 − 1) / 2 = 3^${k} · 2 / 2 = 3^${k}</span>.`
        };
      }
      if (lvl === 6) {
        const xVal = randInt(3, 6);
        return {
          prompt: `נתון כי <span class="math-dir">4^x = 2^(x + ${xVal})</span>. מהו ערכו של <span class="math-dir">x</span>?`,
          ...buildOptions(xVal, [xVal * 2, xVal - 1, xVal + 2]),
          quickTip: "העבירו את שני האגפים לבסיס ראשוני משותף (בסיס 2).",
          techniqueUsed: "השוואת בסיסים במשוואה מעריכית",
          explanation: `נכתוב <span class="math-dir">4^x = (2^2)^x = 2^(2x)</span>. נשווה מעריכים: <span class="math-dir">2x = x + ${xVal}</span> ולכן <span class="math-dir">x = ${xVal}</span>.`
        };
      }
      return {
        prompt: `עבור כל מספר שלם וחיובי <span class="math-dir">m</span>, הביטוי <span class="math-dir">5^(m+2) − 5^m</span> מתחלק בהכרח ללא שארית ב—`,
        ...buildOptions(24, [25, 10, 15]),
        quickTip: "הוציאו גורם משותף 5^m ובדקו את המספר הקבוע שנוצר בסוגריים.",
        techniqueUsed: "הוצאת גורם משותף + תכונות התחלקות (רמה 7)",
        explanation: `נוציא גורם משותף <span class="math-dir">5^m</span>: <span class="math-dir">5^m · (5^2 − 1) = 5^m · (25 − 1) = 24 · 5^m</span>. לכן הביטוי מתחלק תמיד ב-24 ללא שארית.`
      };
    }

    case "star_ops": {
      const a = randInt(2, 6), b = randInt(2, 5);
      if (lvl <= 2) {
        const k = lvl === 1 ? 2 : 3;
        const res = k * a + b;
        return {
          prompt: `הוגדרה פעולה חדשה <span class="math-dir">@</span> לכל שני מספרים: <span class="math-dir">x @ y = ${k}x + y</span>. מהו הערך של <span class="math-dir">${a} @ ${b}</span>?`,
          ...buildOptions(res, [k * b + a, a * b + k, res + k]),
          quickTip: "הציבו בזהירות את המספר השמאלי במקום x ואת הימני במקום y.",
          techniqueUsed: "הצבה סדורה בפעולה מומצאת",
          explanation: `נציב <span class="math-dir">x = ${a}, y = ${b}</span>: <span class="math-dir">${k}·${a} + ${b} = ${res}</span>.`
        };
      }
      if (lvl <= 4) {
        const x1 = randInt(2, 4), y1 = randInt(3, 5);
        const step1 = x1 + y1 * 2;
        const step2 = step1 + 2 * 2;
        return {
          prompt: `לכל שני מספרים מוגדרת הפעולה: <span class="math-dir">a # b = a + 2b</span>. מהו ערכו של הביטוי הכפול <span class="math-dir">(${x1} # ${y1}) # 2</span>?`,
          ...buildOptions(step2, [step1 + 2, x1 + 2 * (y1 + 4), step2 + 2]),
          quickTip: "מספר ההצבות כמספר הסימנים — פותרים קודם את הסוגריים הפנימיים!",
          techniqueUsed: "פעולה מומצאת מקוננת (שני שלבים)",
          explanation: `שלב 1 (בתוך הסוגריים): <span class="math-dir">${x1} # ${y1} = ${x1} + 2·${y1} = ${step1}</span>. שלב 2: <span class="math-dir">${step1} # 2 = ${step1} + 2·2 = ${step2}</span>.`
        };
      }
      if (lvl <= 6) {
        const m = randInt(3, 6);
        const xAns = randInt(4, 9);
        const target = m * xAns - (m + xAns);
        return {
          prompt: `מוגדרת הפעולה: <span class="math-dir">a $ b = a·b − (a + b)</span>. אם ידוע כי <span class="math-dir">${m} $ x = ${target}</span>, מהו ערכו של <span class="math-dir">x</span>?`,
          ...buildOptions(xAns, [xAns + 1, xAns - 1, xAns + 2]),
          quickTip: "כאשר הסימן פועל על נעלם — מציבים בתבנית ומשווים למספר הנתון.",
          techniqueUsed: "תרגום פעולה מומצאת למשוואה",
          explanation: `נציב בתבנית הפעולה: <span class="math-dir">${m}·x − (${m} + x) = ${target}</span> ⟹ <span class="math-dir">${m - 1}x − ${m} = ${target}</span> ⟹ <span class="math-dir">${m - 1}x = ${target + m}</span> ⟹ <span class="math-dir">x = ${xAns}</span>.`
        };
      }
      const k = randInt(2, 5);
      return {
        prompt: `לכל <span class="math-dir">a, b ≠ 0</span> מוגדרת הפעולה <span class="math-dir">a ❖ b = (a + b) / (a·b)</span>. אם <span class="math-dir">x ❖ (2x) = 3 / ${2 * k}</span>, מהו ערכו של <span class="math-dir">x</span>?`,
        ...buildOptions(k, [2 * k, k + 1, k * 3]),
        quickTip: "הציבו a=x ו-b=2x, צמצמו את x במונה ובמכנה והשוו.",
        techniqueUsed: "פעולה אלגברית עם צמצום משתנה (רמה 7)",
        explanation: `נציב בתבנית: <span class="math-dir">(x + 2x) / (x · 2x) = 3x / (2x²) = 3 / (2x)</span>. נשווה ל-<span class="math-dir">3 / ${2 * k}</span> ונקבל מיד <span class="math-dir">x = ${k}</span>.`
      };
    }

    case "letter_arith": {
      if (lvl <= 3) {
        const diffDigits = randInt(2, 7);
        const res = 9 * diffDigits;
        return {
          prompt: `<span class="math-dir">AB</span> ו-<span class="math-dir">BA</span> הם שני מספרים דו-ספרתיים (<span class="math-dir">A > B</span>). אם ידוע כי <span class="math-dir">A − B = ${diffDigits}</span>, למה שווה ההפרש <span class="math-dir">AB − BA</span>?`,
          ...buildOptions(res, [diffDigits * 10, res + 9, res - 9]),
          quickTip: "הפעילו את טכניקת היפוך 9: בחיסור דו-ספרתי והיפוכו, ההפרש הוא תמיד 9 כפול הפרש הספרות!",
          techniqueUsed: "טכניקת היפוך 9 (חיסור דו-ספרתי מתהפך)",
          explanation: `לפי פירוק עשרוני: <span class="math-dir">AB − BA = (10A + B) − (10B + A) = 9(A − B) = 9 × ${diffDigits} = ${res}</span>.`
        };
      }
      if (lvl <= 5) {
        const sumDigits = randInt(8, 15);
        const total = 11 * sumDigits;
        return {
          prompt: `נתון תרגיל החיבור של שני מספרים דו-ספרתיים: <span class="math-dir">AB + BA = ${total}</span>. מהו סכום הספרות <span class="math-dir">A + B</span>?`,
          ...buildOptions(sumDigits, [sumDigits - 1, sumDigits + 1, Math.floor(total / 10)]),
          quickTip: "בחיבור דו-ספרתי והיפוכו (AB + BA), הסכום תמיד שווה ל-11 כפול (A+B).",
          techniqueUsed: "טכניקת היפוך 11 לחיבור דו-ספרתי",
          explanation: `בחיבור דו-ספרתי והיפוכו מתקיים: <span class="math-dir">AB + BA = 11(A + B) = ${total}</span>. נחלק ב-11 ונקבל <span class="math-dir">A + B = ${sumDigits}</span>.`
        };
      }
      const unitDigit = pick([5, 6]);
      return {
        prompt: `<span class="math-dir">A</span> היא ספרה שונה מ-0 ו-1 המקיימת: ספרת האחדות של המכפלה <span class="math-dir">A × A</span> היא שוב <span class="math-dir">A</span>, וכן מתקיים שהמספר הדו-ספרתי <span class="math-dir">AA</span> מתחלק ב-${unitDigit === 5 ? 5 : 6} ללא שארית. מהו ערכה של הספרה <span class="math-dir">A</span>?`,
        ...buildOptions(unitDigit, [unitDigit === 5 ? 6 : 5, 4, 9]),
        quickTip: "זכרו את הספרות המשמרות את עצמן בספרת האחדות במכפלה: 0, 1, 5, 6!",
        techniqueUsed: "תכונת ספרות משמרות במכפלה (רמה 6–7)",
        explanation: `הספרות השונות מ-0 ו-1 שמשמרות את עצמן בספרת האחדות כשהן מוכפלות בעצמן הן 5 (<span class="math-dir">5×5=25</span>) ו-6 (<span class="math-dir">6×6=36</span>). מתוך הנתון ש-<span class="math-dir">AA</span> מתחלק ב-${unitDigit}, הספרה היא ${unitDigit}.`
      };
    }

    case "equations_isolation": {
      if (lvl <= 2) {
        const x = randInt(3, 9), c = randInt(4, 12);
        const rhs = 3 * x + c;
        return {
          prompt: `פתרו את המשוואה: <span class="math-dir">4x + ${c} = x + ${rhs}</span>. מהו ערכו של <span class="math-dir">x</span>?`,
          ...buildOptions(x, [x + 1, x - 1, x + 2]),
          quickTip: "העבירו את כל הנעלמים לאגף אחד ואת המספרים לאגף השני.",
          techniqueUsed: "בידוד משתנה ישיר",
          explanation: `נחסר <span class="math-dir">x</span> ונחסר <span class="math-dir">${c}</span> משני האגפים: <span class="math-dir">3x = ${rhs - c}</span> ולכן <span class="math-dir">x = ${x}</span>.`
        };
      }
      if (lvl <= 4) {
        const x = randInt(2, 7), y = randInt(3, 8);
        const eq1 = 2 * x + 3 * y;
        const eq2 = x + 2 * y;
        const ans = x + y;
        return {
          prompt: `נתונה מערכת המשוואות: <span class="math-dir">2x + 3y = ${eq1}</span> וגם <span class="math-dir">x + 2y = ${eq2}</span>. מהו ערכו של הסכום <span class="math-dir">x + y</span>?`,
          ...buildOptions(ans, [ans + 2, eq1 - eq2 + 1, Math.abs(x - y)]),
          quickTip: "אלימינציה ממוקדת: חסרו את המשוואה השנייה מהראשונה במקום למצוא את x ו-y בנפרד!",
          techniqueUsed: "אלימינציה ממוקדת — חיסור משוואות ישיר",
          explanation: `נחסר את המשוואה השנייה מהראשונה ישירות: <span class="math-dir">(2x + 3y) − (x + 2y) = x + y = ${eq1} − ${eq2} = ${ans}</span>. קיבלנו את הסכום המבוקש בצעד אחד!`
        };
      }
      if (lvl <= 6) {
        const sum = randInt(8, 14), diff = randInt(2, 5);
        const prod = sum * diff;
        return {
          prompt: `נתון כי <span class="math-dir">a² − b² = ${prod}</span> וכן <span class="math-dir">a − b = ${diff}</span>. מהו ערכו של <span class="math-dir">a + b</span>?`,
          ...buildOptions(sum, [prod - diff, sum + 2, diff * 2]),
          quickTip: "פרקו את הפרש הריבועים לפי נוסחת הכפל המקוצר: (a-b)(a+b).",
          techniqueUsed: "כפל מקוצר — הפרש ריבועים",
          explanation: `לפי כפל מקוצר: <span class="math-dir">a² − b² = (a − b)(a + b) = ${prod}</span>. נציב <span class="math-dir">a − b = ${diff}</span> ונקבל <span class="math-dir">a + b = ${prod} / ${diff} = ${sum}</span>.`
        };
      }
      const s = randInt(3, 6);
      const ans = s * s - 2;
      return {
        prompt: `נתון כי <span class="math-dir">x + 1/x = ${s}</span>. מהו ערכו של הביטוי <span class="math-dir">x² + 1/x²</span>?`,
        ...buildOptions(ans, [s * s, s * s + 2, s * 2]),
        quickTip: "העלו את המשוואה הנתונה בריבוע והשתמשו בכך שהאיבר האמצעי 2·x·(1/x) מצטמצם ל-2!",
        techniqueUsed: "כפל מקוצר עם ביטויים הופכיים (רמה 7)",
        explanation: `נעלה בריבוע את שני האגפים: <span class="math-dir">(x + 1/x)² = x² + 2·x·(1/x) + 1/x² = x² + 2 + 1/x² = ${s}² = ${s * s}</span>. נחסר 2 ונקבל <span class="math-dir">${ans}</span>.`
      };
    }

    case "inequalities": {
      if (lvl <= 2) {
        const k = randInt(2, 5), b = randInt(6, 15);
        return {
          prompt: `נתון אי-השוויון: <span class="math-dir">−${k}x > −${k * b}</span>. מהו תחום הערכים של <span class="math-dir">x</span>?`,
          ...buildOptions(`x < ${b}`, [`x > ${b}`, `x < -${b}`, `x > -${b}`]),
          quickTip: "שימו לב: בחילוק או כפל במספר שלילי — הופכים את כיוון סימן אי-השוויון!",
          techniqueUsed: "היפוך סימן בחילוק בשלילי",
          explanation: `נחלק את שני האגפים ב-<span class="math-dir">(−${k})</span>. מאחר שחילקנו במספר שלילי, סימן אי-השוויון מתהפך ומתקבל <span class="math-dir">x < ${b}</span>.`
        };
      }
      if (lvl <= 4) {
        const k = randInt(2, 6);
        return {
          prompt: `נתון כי <span class="math-dir">${k}x − y < ${k}y − x</span>. איזה מהתנאים הבאים מתקיים בהכרח?`,
          ...buildOptions("x < y", ["x > y", "x > 0", "x + y < 0"]),
          quickTip: "העבירו את כל ה-x לאגף שמאל ואת כל ה-y לאגף ימין וחלקו במקדם החיובי.",
          techniqueUsed: "כינוס איברים באי-שוויון",
          explanation: `נוסיף <span class="math-dir">x + y</span> לשני האגפים: <span class="math-dir">${k + 1}x < ${k + 1}y</span>. נחלק ב-<span class="math-dir">${k + 1}</span> (חיובי) ונקבל <span class="math-dir">x < y</span>.`
        };
      }
      if (lvl <= 6) {
        return {
          prompt: `נתון כי <span class="math-dir">x² · y < 0</span> וגם <span class="math-dir">x · y > 0</span>. מה נכון בהכרח לגבי סימניהם של <span class="math-dir">x</span> ו-<span class="math-dir">y</span>?`,
          ...buildOptions("x < 0 וגם y < 0", ["x > 0 וגם y < 0", "x < 0 וגם y > 0", "x > 0 וגם y > 0"]),
          quickTip: "אי-שוויון סביב ה-0: חזקה זוגית (x²) של מספר שונה מאפס היא תמיד חיובית!",
          techniqueUsed: "נטרול חזקות זוגיות סביב ה-0",
          explanation: `מאחר ש-<span class="math-dir">x² > 0</span> תמיד (כי המכפלה שונה מ-0), מתוך <span class="math-dir">x² · y < 0</span> נובע בהכרח ש-<span class="math-dir">y < 0</span>. כעת מתוך <span class="math-dir">x · y > 0</span> נובע שגם <span class="math-dir">x < 0</span>.`
        };
      }
      return {
        prompt: `נתון מספר ממשי <span class="math-dir">a</span> המקיים את אי-השוויון הכפול: <span class="math-dir">a² > a³ > a</span>. באיזה תחום נמצא <span class="math-dir">a</span> בהכרח?`,
        ...buildOptions("-1 < a < 0", ["0 < a < 1", "a < -1", "a > 1"]),
        quickTip: "בדקו את 4 תחומי המבחן על הציר באמצעות הצבת דוגמה (שלם חיובי, שבר חיובי, שבר שלילי, שלם שלילי).",
        techniqueUsed: "בדיקת 4 תחומי הציר והצבת שבר שלילי (רמה 7)",
        explanation: `נבדוק <span class="math-dir">a = -1/2</span> (שבר שלילי בין 0 ל-1-): <span class="math-dir">a² = 1/4</span>, <span class="math-dir">a³ = -1/8</span>, ו-<span class="math-dir">a = -1/2</span>. אכן מתקיים <span class="math-dir">1/4 > -1/8 > -1/2</span>! בכל שלושת התחומים האחרים הסדר שונה.`
      };
    }

    case "integers": {
      if (lvl <= 2) {
        const add = randInt(3, 9), mult = randInt(2, 4) * 2 + 1;
        return {
          prompt: `${person} בחר מספר זוגי, הוסיף לו ${add}, והכפיל את התוצאה ב-${mult}. התוצאה הסופית היא בהכרח מספר —`,
          ...buildOptions(add % 2 === 0 ? "זוגי" : "אי-זוגי", [add % 2 === 0 ? "אי-זוגי" : "זוגי", "ראשוני", "מתחלק ב-4"]),
          quickTip: "הציבו דוגמה פשוטה (למשל 2 עבור מספר זוגי) ובדקו את התוצאה!",
          techniqueUsed: "הצבת מספר מבחן בזוגיות",
          explanation: `נציב את המספר הזוגי 2: <span class="math-dir">(2 + ${add}) × ${mult} = ${(2 + add) * mult}</span>, שהוא מספר ${add % 2 === 0 ? "זוגי" : "אי-זוגי"}.`
        };
      }
      if (lvl <= 5) {
        return {
          prompt: `נתון כי <span class="math-dir">p</span> ו-<span class="math-dir">q</span> הם שני מספרים ראשוניים שונים כך שסכומם <span class="math-dir">p + q</span> הוא מספר אי-זוגי. איזה מהמספרים הבאים הוא בהכרח אחד משני המספרים?`,
          ...buildOptions("2", ["3", "5", "7"]),
          quickTip: "זכרו את חריג ה-2 — המספר 2 הוא המספר הראשוני הזוגי היחיד!",
          techniqueUsed: "חריג ה-2 (הראשוני הזוגי היחיד)",
          explanation: `כדי שסכום של שני מספרים יהיה אי-זוגי, אחד מהם חייב להיות זוגי והשני אי-זוגי. מאחר שכל המספרים הראשוניים הם אי-זוגיים למעט 2, אחד מהם חייב להיות 2!`
        };
      }
      const k = pick([6, 12, 18]);
      return {
        prompt: `<span class="math-dir">n</span> הוא מספר שלם וחיובי. ידוע כי <span class="math-dir">n²</span> מתחלק ב-${k === 6 ? 12 : 18} ללא שארית. באיזה מהמספרים הבאים מתחלק <span class="math-dir">n</span> עצמו בהכרח ללא שארית?`,
        ...buildOptions("6", ["9", "12", "18"]),
        quickTip: "פרקו לגורמים ראשוניים: כל גורם ראשוני בריבוע שלם (n²) חייב להופיע בחזקה זוגית!",
        techniqueUsed: "פירוק ראשוניים של ריבוע שלם (רמה 6–7)",
        explanation: `נפרק לגורמים ראשוניים: <span class="math-dir">${k === 6 ? "12 = 2² · 3" : "18 = 2 · 3²"}</span>. כדי ש-<span class="math-dir">n²</span> יתחלק בכך, <span class="math-dir">n</span> חייב להכיל לפחות את הגורמים הראשוניים <span class="math-dir">2 · 3 = 6</span>.`
      };
    }

    case "remainders": {
      const div = pick([5, 6, 7, 8]);
      const rem = randInt(1, div - 1);
      if (lvl <= 3) {
        const mult = randInt(2, 4);
        const newRem = (rem * mult) % div;
        return {
          prompt: `כאשר מחלקים את המספר השלם והחיובי <span class="math-dir">x</span> ב-${div}, מתקבלת שארית ${rem}. מה תהיה השארית כאשר נחלק את <span class="math-dir">${mult}x</span> ב-${div}?`,
          ...buildOptions(newRem, [(newRem + 1) % div, rem, div - 1]),
          quickTip: "טכניקת הצבת השארית: הציבו במקום הנעלם x את השארית עצמה!",
          techniqueUsed: "הצבת השארית במקום הנעלם",
          explanation: `נציב במקום <span class="math-dir">x</span> את השארית עצמה (<span class="math-dir">x = ${rem}</span>): <span class="math-dir">${mult}x = ${mult * rem}</span>. נחלק את ${mult * rem} ב-${div} ונקבל שארית ${newRem}.`
        };
      }
      if (lvl <= 5) {
        const maxRem = div - 1;
        return {
          prompt: `מחלקים מספר שלם וחיובי ב-${div} ומקבלים שארית הגדולה מ-0. מהו ההפרש בין השארית הגדולה ביותר האפשרית לבין השארית הקטנה ביותר האפשרית?`,
          ...buildOptions(maxRem - 1, [maxRem, div, maxRem - 2]),
          quickTip: "השארית הקטנה ביותר (כשיש שארית) = 1; השארית הגדולה ביותר = המחלק פחות 1!",
          techniqueUsed: "גבולות השארית (1 עד N-1)",
          explanation: `בחלוקה ב-${div}, השארית הגדולה ביותר האפשרית היא <span class="math-dir">${div} − 1 = ${maxRem}</span>, והשארית הקטנה ביותר (השונה מ-0) היא 1. ההפרש ביניהן הוא <span class="math-dir">${maxRem} − 1 = ${maxRem - 1}</span>.`
        };
      }
      const ansRem = (rem * rem + 2 * rem) % div;
      return {
        prompt: `המספר השלם והחיובי <span class="math-dir">n</span> משאיר שארית ${rem} בחלוקה ל-${div}. מה תהיה השארית בחלוקת הביטוי <span class="math-dir">n² + 2n</span> ל-${div}?`,
        ...buildOptions(ansRem, [(ansRem + 1) % div, (ansRem + 2) % div, rem]),
        quickTip: "הציבו n = השארית עצמה ישירות בתוך הביטוי הריבועי!",
        techniqueUsed: "אריתמטיקה של שאריות בביטוי ריבועי (רמה 6–7)",
        explanation: `נציב <span class="math-dir">n = ${rem}</span>: <span class="math-dir">n² + 2n = ${rem}² + 2·${rem} = ${rem * rem + 2 * rem}</span>. בחלוקה ל-${div} מתקבלת שארית ${ansRem}.`
      };
    }

    case "ratios": {
      const r1 = randInt(2, 5), r2 = randInt(3, 7);
      const scale = randInt(4, 12);
      if (lvl <= 2) {
        const total = (r1 + r2) * scale;
        const part1 = r1 * scale;
        return {
          prompt: `היחס בין מספר התפוחים למספר האגסים בסלסילה הוא <span class="math-dir">${r1} : ${r2}</span>. אם בסלסילה יש בסך הכל ${total} פירות, כמה תפוחים יש בה?`,
          ...buildOptions(part1, [r2 * scale, part1 + r1, total - r1]),
          quickTip: "שיטת מקדם ההכפלה: חברו את יחידות היחס ובדקו פי כמה גדל הסכום במציאות.",
          techniqueUsed: "שיטת מקדם ההכפלה ביחסים",
          explanation: `סכום יחידות היחס הוא <span class="math-dir">${r1} + ${r2} = ${r1 + r2}</span>. מקדם ההכפלה מהיחס למציאות הוא <span class="math-dir">${total} / ${r1 + r2} = ${scale}</span>. לכן מספר התפוחים הוא <span class="math-dir">${r1} × ${scale} = ${part1}</span>.`
        };
      }
      if (lvl <= 4) {
        const sumUnits = r1 + r2 + (r1 === r2 ? 1 : 0);
        const validTotal = sumUnits * randInt(5, 9);
        return {
          prompt: `היחס בין מספר הבנים למספר הבנות במגמה הוא <span class="math-dir">${r1} : ${sumUnits - r1}</span>. איזה מהמספרים הבאים יכול להיות המספר הכולל של תלמידים במגמה?`,
          ...buildOptions(validTotal, [validTotal + 1, validTotal + 2, validTotal - 1]),
          quickTip: "בשאלות יחס על שלמים (אנשים) — הסכום הכולל חייב להתחלק בסכום יחידות היחס ללא שארית!",
          techniqueUsed: "תנאי התחלקות בסכום יחידות היחס",
          explanation: `סכום יחידות היחס הוא <span class="math-dir">${sumUnits}</span>. מאחר שמספר תלמידים חייב להיות שלם, סך התלמידים חייב להתחלק ב-${sumUnits} ללא שארית. רק ${validTotal} מקיים זאת.`
        };
      }
      const mult = randInt(2, 5);
      return {
        prompt: `בחברה היחס בין מספר המהנדסים למספר המעצבים הוא <span class="math-dir">2 : 3</span>, והיחס בין מספר המעצבים למספר אנשי השיווק הוא <span class="math-dir">4 : 5</span>. אם בחברה יש ${15 * mult} אנשי שיווק, כמה מהנדסים עובדים בה?`,
        ...buildOptions(8 * mult, [6 * mult, 10 * mult, 12 * mult]),
        quickTip: "איחוד יחסים — סדרו בטבלה בת 3 עמודות והשוו את הגורם המשותף (המעצבים)!",
        techniqueUsed: "טבלת איחוד יחסים + מקדם הכפלה (רמה 5–7)",
        explanation: `נשווה את יחידות המעצבים (המשותפים לשני היחסים) למכנה משותף 12: היחס המאוחד (מהנדסים : מעצבים : שיווק) הוא <span class="math-dir">8 : 12 : 15</span>. מקדם ההכפלה על אנשי השיווק הוא ${mult} (<span class="math-dir">15 × ${mult} = ${15 * mult}</span>), ולכן מספר המהנדסים הוא <span class="math-dir">8 × ${mult} = ${8 * mult}</span>.`
      };
    }

    case "averages": {
      if (lvl <= 2) {
        const first = randInt(10, 24);
        const middle = first + 4;
        return {
          prompt: `מהו הממוצע של 5 המספרים העוקבים בקפיצות של 2: <span class="math-dir">${first}, ${first + 2}, ${first + 4}, ${first + 6}, ${first + 8}</span>?`,
          ...buildOptions(middle, [middle + 1, middle - 2, first + 3]),
          quickTip: "בסדרה בעלת הפרשים קבועים הממוצע שווה בדיוק לאיבר האמצעי!",
          techniqueUsed: "ממוצע סדרה חשבונית = איבר אמצעי",
          explanation: `בסדרה בעלת הפרשים קבועים, הממוצע הוא בדיוק האיבר האמצעי (או ממוצע הראשון והאחרון): <span class="math-dir">${middle}</span>.`
        };
      }
      if (lvl <= 5) {
        const n = randInt(4, 8);
        const oldAvg = randInt(70, 84);
        const boost = randInt(2, 4);
        const newScore = oldAvg + (n + 1) * boost;
        return {
          prompt: `ממוצע הציונים של ${n} מבחנים של ${person} היה ${oldAvg}. לאחר שניגש למבחן ה-${n + 1}, עלה ממוצע הציונים שלו ב-${boost} נקודות. מה היה ציונו במבחן ה-${n + 1}?`,
          ...buildOptions(newScore, [oldAvg + boost, oldAvg + n * boost, newScore + boost]),
          quickTip: `שיטת הפיזור הקבוצתי: הציון החדש הביא את הממוצע הישן + תוספת של ${boost} נקודות לכל אחד מ-${n + 1} המבחנים!`,
          techniqueUsed: "שיטת הפיזור הקבוצתי בממוצעים",
          explanation: `כדי להעלות את הממוצע של כל ${n + 1} המבחנים ב-${boost} נקודות, המבחן החדש צריך להביא את הממוצע הקודם (${oldAvg}) ועוד <span class="math-dir">${n + 1} × ${boost} = ${(n + 1) * boost}</span> נקודות: <span class="math-dir">${oldAvg} + ${(n + 1) * boost} = ${newScore}</span>.`
        };
      }
      const avgA = 70, avgB = 90;
      const ratioA = 3;
      return {
        prompt: `בכיתה א' ממוצע הציונים הוא ${avgA}, ובכיתה ב' ממוצע הציונים הוא ${avgB}. אם מספר התלמידים בכיתה א' גדול פי ${ratioA} ממספר התלמידים בכיתה ב', מהו הממוצע המשוקלל של שתי הכיתות יחד?`,
        ...buildOptions(75, [80, 85, 78]),
        quickTip: "ציר ממוצע משוקלל: פסלו מיד את 80 ו-85 כי הממוצע חייב להיות קרוב יותר לכיתה א' הגדולה פי 3!",
        techniqueUsed: "ציר ממוצע משוקלל ויחס הפוך של מרחקים (רמה 6–7)",
        explanation: `המרחק בין ${avgA} ל-${avgB} הוא 20, והוא מתחלק ל-<span class="math-dir">3 + 1 = 4</span> חלקים (כל חלק שווה 5 נקודות). מאחר שכיתה א' גדולה פי 3, הממוצע המשוקלל קרוב אליה פי 3: <span class="math-dir">70 + 5 = 75</span>.`
      };
    }

    case "percentages": {
      if (lvl <= 2) {
        const base = pick([200, 300, 400, 500]);
        const pct = pick([15, 20, 25, 30]);
        const ans = (base * pct) / 100;
        return {
          prompt: `בספרייה יש ${base} ספרים, ומהם ${pct}% הם ספרי מדע בדיוני. כמה ספרי מדע בדיוני יש בספרייה?`,
          ...buildOptions(ans, [ans + 10, base - ans, pct * 2]),
          quickTip: "חישוב אחוז משלם: (אחוז × שלם) חלקי 100.",
          techniqueUsed: "חישוב אחוז ישיר משלם",
          explanation: `נחשב <span class="math-dir">${pct}%</span> מתוך ${base}: <span class="math-dir">(${pct} / 100) × ${base} = ${ans}</span>.`
        };
      }
      if (lvl <= 4) {
        const p = pick([10, 20, 30]);
        const lossPct = (p * p) / 100;
        return {
          prompt: `מחירו של מוצר הועלה ב-${p}%, וכעבור חודש הוזל המחיר החדש ב-${p}%. מה קרה למחיר המוצר לעומת מחירו ההתחלתי?`,
          ...buildOptions(`ירד ב-${lossPct}%`, ["לא השתנה (0%)", `עלה ב-${lossPct}%`, `ירד ב-${p / 2}%`]),
          quickTip: "הצבת שלם מדומה (100) + כלל יסוד: התייקרות והוזלה באותו אחוז תמיד מובילות לירידה!",
          techniqueUsed: "הצבת שלם מדומה (100) בשינויים רצופים",
          explanation: `נציב מחיר התחלתי 100: אחרי עלייה של ${p}% המחיר הוא ${100 + p}. ירידה של ${p}% מתוך ${100 + p} היא הורדה של <span class="math-dir">${(100 + p) * p / 100}</span>, ולכן המחיר החדש הוא <span class="math-dir">${100 - lossPct}</span> — כלומר ירידה של ${lossPct}%.`
        };
      }
      const pairs = [
        { up: 25, down: "20%", n: 4 },
        { up: 50, down: "33.33% (שליש)", n: 2 },
        { up: 20, down: "16.67% (שישית)", n: 5 }
      ];
      const chosen = pick(pairs);
      return {
        prompt: `מחירו של כרטיס טיסה התייקר ב-${chosen.up}%. בכמה אחוזים יש להוזיל את המחיר החדש כדי לחזור בדיוק למחיר המקורי?`,
        ...buildOptions(chosen.down, [`${chosen.up}%`, `${chosen.up - 2}%`, `${chosen.up + 5}%`]),
        quickTip: "חוק הקיזוז ההפוך: כשעולים ב- 1/n יורדים ב- 1/(n+1) כדי לחזור לשלם המקורי!",
        techniqueUsed: "חוק הקיזוז ההפוך 1/n ↔ 1/(n+1) (רמה 5–7)",
        explanation: `עלייה של ${chosen.up}% היא עלייה של <span class="math-dir">1/${chosen.n}</span>. כדי לחזור לשלם המקורי יש לרדת ב-<span class="math-dir">1/(${chosen.n}+1) = 1/${chosen.n + 1}</span>, שהם בדיוק ${chosen.down}.`
      };
    }

    case "word_equations": {
      const sonNow = randInt(8, 14);
      const multNow = randInt(3, 4);
      const dadNow = sonNow * multNow;
      const years = sonNow * (multNow - 2);
      if (lvl <= 3) {
        return {
          prompt: `היום גילו של האב גדול פי ${multNow} מגילו של בנו. סכום גיליהם היום הוא ${dadNow + sonNow}. בן כמה הבן היום?`,
          ...buildOptions(sonNow, [dadNow, sonNow + 2, sonNow - 2]),
          quickTip: `הגדרת נעלם מרכזי: סמנו את גיל הבן ב-x ואת גיל האב ב-${multNow}x.`,
          techniqueUsed: "הגדרת נעלם מרכזי",
          explanation: `נסמן את גיל הבן ב-<span class="math-dir">x</span>, ואז גיל האב הוא <span class="math-dir">${multNow}x</span>. סכומם: <span class="math-dir">${multNow + 1}x = ${dadNow + sonNow}</span> ולכן <span class="math-dir">x = ${sonNow}</span>.`
        };
      }
      return {
        prompt: `גילו של אב היום הוא ${dadNow}, וגילו של בנו הוא ${sonNow}. בעוד כמה שנים יהיה גיל האב גדול פי 2 מגיל בנו?`,
        ...buildOptions(years, [years + 2, years - 2, Math.floor(dadNow / 2)]),
        quickTip: "טבלת ציר זמן + איזון האגף הקטן: בחלוף x שנים שניהם מתבגרים ב-x! הכפילו את גיל הבן העתידי ב-2.",
        techniqueUsed: "ציר זמן + איזון האגף הקטן",
        explanation: `בעוד <span class="math-dir">x</span> שנים האב יהיה בן <span class="math-dir">${dadNow} + x</span> והבן יהיה בן <span class="math-dir">${sonNow} + x</span>. נכפול את גיל הבן (האגף הקטן) ב-2: <span class="math-dir">${dadNow} + x = 2(${sonNow} + x)</span> ⟹ <span class="math-dir">x = ${years}</span>.`
      };
    }

    case "overlapping_sets": {
      const total = 100;
      const groupA = randInt(58, 76);
      const groupB = randInt(52, 74);
      const minOverlap = groupA + groupB - total;
      const maxOverlap = Math.min(groupA, groupB);
      if (lvl <= 4) {
        return {
          prompt: `בסקר בקרב ${total} עובדים נמצא כי ${groupA} עובדים שותים קפה בבוקר ו-${groupB} עובדים שותים תה. מהו המספר המינימלי האפשרי של עובדים השותים גם קפה וגם תה?`,
          ...buildOptions(minOverlap, [maxOverlap, total - groupA, maxOverlap - minOverlap]),
          quickTip: "חפיפה מינימלית = סכום שתי הקבוצות פחות השלם!",
          techniqueUsed: "נוסחת חפיפה מינימלית",
          explanation: `לפי כלל החפיפה המינימלית: סכום הקבוצות פחות השלם = <span class="math-dir">${groupA} + ${groupB} − ${total} = ${minOverlap}</span>.`
        };
      }
      const diffMaxMin = maxOverlap - minOverlap;
      return {
        prompt: `בשכבה של ${total} תלמידים, ${groupA} רשומים לחוג שחייה ו-${groupB} רשומים לחוג ריצה. מהו ההפרש בין המספר המקסימלי האפשרי לבין המספר המינימלי האפשרי של תלמידים הרשומים לשני החוגים גם יחד?`,
        ...buildOptions(diffMaxMin, [minOverlap, maxOverlap, 100 - maxOverlap]),
        quickTip: "חשבו חפיפה מקסימלית (גודל הקבוצה הקטנה) וחפיפה מינימלית (סכום פחות השלם) וחסרו ביניהן!",
        techniqueUsed: "טווח קצוות חפיפה (מקסימום פחות מינימום — רמה 5–7)",
        explanation: `החפיפה המקסימלית היא גודל הקבוצה הקטנה: <span class="math-dir">${maxOverlap}</span>. החפיפה המינימלית היא <span class="math-dir">${groupA} + ${groupB} − 100 = ${minOverlap}</span>. ההפרש ביניהן הוא <span class="math-dir">${maxOverlap} − ${minOverlap} = ${diffMaxMin}</span>.`
      };
    }

    case "rate_motion_work": {
      if (lvl <= 3) {
        const v1 = randInt(50, 70), v2 = randInt(40, 60);
        const hours = randInt(2, 4);
        const dist = (v1 + v2) * hours;
        return {
          prompt: `שתי מכוניות יוצאות באותו זמן מאותה צומת ונוסעות בכיוונים מנוגדים. מהירות האחת ${v1} קמ"ש ומהירות השנייה ${v2} קמ"ש. תוך כמה שעות יהיה המרחק ביניהן ${dist} ק"מ?`,
          ...buildOptions(hours, [hours + 1, hours * 2, Math.round(dist / v1)]),
          quickTip: "בתנועה בכיוונים מנוגדים (או זה לקראת זה) — מחברים את המהירויות!",
          techniqueUsed: "מהירות יחסית בחיבור מהירויות",
          explanation: `קצב ההתרחקות המשותף הוא סכום המהירויות: <span class="math-dir">${v1} + ${v2} = ${v1 + v2}</span> קמ"ש. הזמן הדרוש לעבור ${dist} ק"מ הוא <span class="math-dir">${dist} / ${v1 + v2} = ${hours}</span> שעות.`
        };
      }
      const pairs = [[60, 40], [30, 60], [20, 30], [90, 60]];
      const [v1, v2] = pick(pairs);
      const harmAvg = (2 * v1 * v2) / (v1 + v2);
      const arithTrap = (v1 + v2) / 2;
      return {
        prompt: `${person} נסע מעיר א' לעיר ב' במהירות קבועה של ${v1} קמ"ש, וחזר מיד באותה הדרך במהירות של ${v2} קמ"ש. מה הייתה מהירותו הממוצעת (בקמ"ש) לאורך הנסיעה כולה?`,
        ...buildOptions(harmAvg, [arithTrap, harmAvg + 2, arithTrap + 5]),
        quickTip: "מלכודת המהירות הממוצעת: הזמן הוא הקובע ולא הדרך! הממוצע תמיד נמוך מהממוצע החשבוני הפשוט.",
        techniqueUsed: "ממוצע הרמוני במהירות הלוך-חזור (רמה 4–7)",
        explanation: `הנהג שהה זמן רב יותר במהירות האיטית, ולכן המהירות הממוצעת נמוכה מ-${arithTrap} קמ"ש. לפי נוסחת הממוצע ההרמוני: <span class="math-dir">2·${v1}·${v2} / (${v1}+${v2}) = ${harmAvg}</span> קמ"ש.`
      };
    }

    case "combinatorics_prob": {
      if (lvl <= 3) {
        const n = randInt(4, 6);
        const fact = [1, 1, 2, 6, 24, 120, 720][n];
        return {
          prompt: `בכמה אופנים שונים ניתן לסדר ${n} ספרים שונים בשורה על מדף?`,
          ...buildOptions(fact, [n * n, fact / 2, n * (n - 1)]),
          quickTip: "סידור N איברים שונים בשורה = N! (עקרון הכפל בשלבים).",
          techniqueUsed: "עקרון הכפל בשלבים וסידור בשורה (N!)",
          explanation: `למקום הראשון יש ${n} אפשרויות, לשני ${n - 1} וכן הלאה: <span class="math-dir">${n}! = ${fact}</span> אפשרויות.`
        };
      }
      const half = pick([4, 5, 6]);
      const total = half * 2;
      const ans = `${half - 1}/${total - 1}`;
      return {
        prompt: `בכד יש ${half} כדורים כחולים ו-${half} כדורים צהובים (${total} בסך הכול). מוציאים באקראי שני כדורים בזה אחר זה ללא החזרה. מה ההסתברות ששני הכדורים יהיו באותו הצבע?`,
        ...buildOptions(ans, [`${half}/${total - 1}`, `1/2`, `${half - 1}/${total}`]),
        quickTip: "טכניקת זוג זהה: בבחירה הראשונה כל צבע מתאים (הסתברות 1), ורק הכדור השני צריך להתאים לצבע של הראשון!",
        techniqueUsed: "טכניקת זוג זהה ללא החזרה (רמה 4–7)",
        explanation: `הכדור הראשון יכול להיות בכל צבע (הסתברות 1). לאחר שיצא, נותרו בכד <span class="math-dir">${total - 1}</span> כדורים, ומהם <span class="math-dir">${half - 1}</span> בצבע של הכדור הראשון. לכן ההסתברות לזוג באותו צבע היא <span class="math-dir">${ans}</span>.`
      };
    }

    case "geometry_graphs":
    default: {
      if (lvl <= 3) {
        const triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13]];
        const [a, b, c] = pick(triples);
        const area = c * c;
        const svg = `<svg viewBox="0 0 210 170" width="210" height="170" class="rounded-xl border border-slate-200 bg-slate-50 shadow-2xs">
          <rect x="40" y="18" width="130" height="130" fill="none" stroke="#0f172a" stroke-width="2.2"/>
          <polygon points="170,18 170,148 110,92" fill="#e0e7ff" stroke="#4f46e5" stroke-width="2"/>
          <text x="26" y="24" font-size="12" font-weight="bold">A</text>
          <text x="176" y="24" font-size="12" font-weight="bold">B</text>
          <text x="176" y="156" font-size="12" font-weight="bold">C</text>
          <text x="26" y="156" font-size="12" font-weight="bold">D</text>
          <text x="95" y="95" font-size="12" font-weight="bold" fill="#4f46e5">E</text>
          <text x="128" y="52" font-size="11" font-weight="bold" fill="#3730a3">${a}</text>
          <text x="128" y="132" font-size="11" font-weight="bold" fill="#3730a3">${b}</text>
          <text x="116" y="95" font-size="10" fill="#3730a3">90°</text>
        </svg>`;
        return {
          prompt: `בסרטוט שלפניכם ריבוע <span class="math-dir">ABCD</span> ובתוכו משולש ישר-זווית <span class="math-dir">BEC</span> (<span class="math-dir">∠BEC = 90°</span>). אם <span class="math-dir">BE = ${a}</span> ס"מ ו-<span class="math-dir">EC = ${b}</span> ס"מ, מהו שטח הריבוע <span class="math-dir">ABCD</span> (בסמ"ר)?`,
          svg,
          ...buildOptions(area, [a * b, (a * b) / 2, c * 4]),
          quickTip: "זהו שלשה פיתגורית מוכרת (3:4:5 או 5:12:13) כדי למצוא את צלע הריבוע BC מיד!",
          techniqueUsed: "שלשות פיתגוריות ומעבר ישיר לשטח ריבוע",
          explanation: `היתר במשולש ישר-הזווית <span class="math-dir">BEC</span> הוא צלע הריבוע <span class="math-dir">BC</span>. לפי שלשה פיתגורית <span class="math-dir">BC = ${c}</span>, ולכן שטח הריבוע הוא <span class="math-dir">${c}² = ${area}</span> סמ"ר.`
        };
      }
      const k = randInt(2, 4);
      const smallArea = randInt(5, 12);
      const bigArea = smallArea * k * k;
      const trapArea = bigArea - smallArea;
      const svg = `<svg viewBox="0 0 220 165" width="220" height="165" class="rounded-xl border border-slate-200 bg-slate-50 shadow-2xs">
        <polygon points="110,18 30,145 190,145" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>
        <polygon points="110,18 70,82 150,82" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <text x="106" y="14" font-size="12" font-weight="bold">A</text>
        <text x="55" y="84" font-size="12" font-weight="bold" fill="#b45309">D</text>
        <text x="155" y="84" font-size="12" font-weight="bold" fill="#b45309">E</text>
        <text x="16" y="150" font-size="12" font-weight="bold">B</text>
        <text x="195" y="150" font-size="12" font-weight="bold">C</text>
      </svg>`;
      return {
        prompt: `במשולש <span class="math-dir">ABC</span> שבסרטוט, הקטע <span class="math-dir">DE</span> מקביל לבסיס <span class="math-dir">BC</span>. ידוע כי <span class="math-dir">BC = ${k} · DE</span> וכי שטח המשולש הקטן <span class="math-dir">ADE</span> הוא ${smallArea} סמ"ר. מהו שטח הטרפז <span class="math-dir">BCED</span> (בסמ"ר)?`,
        svg,
        ...buildOptions(trapArea, [bigArea, smallArea * k, smallArea * (k - 1)]),
        quickTip: "חוק הדמיון: (יחס קווי)² = יחס שטחים! ובסוף לא לשכוח שביקשו את הטרפז (הפרש השטחים).",
        techniqueUsed: "יחס שטחים בדמיון (k²) וחיסור צורות (רמה 4–7)",
        explanation: `המשולשים <span class="math-dir">ADE</span> ו-<span class="math-dir">ABC</span> דומים עם יחס קווי <span class="math-dir">1 : ${k}</span>. לכן יחס השטחים הוא <span class="math-dir">1² : ${k}² = 1 : ${k * k}</span>. שטח המשולש הגדול <span class="math-dir">ABC</span> הוא <span class="math-dir">${smallArea} × ${k * k} = ${bigArea}</span> סמ"ר. שטח הטרפז הוא ההפרש: <span class="math-dir">${bigArea} − ${smallArea} = ${trapArea}</span> סמ"ר.`
      };
    }
  }
}

if (typeof module !== "undefined") {
  module.exports = { COURSE_TOPICS, LEVEL_DESCRIPTIONS, generateQuestionForTopic };
}
