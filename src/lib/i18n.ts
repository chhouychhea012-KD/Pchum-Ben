import type { Locale } from "@/types";

const dict = {
  km: {
    navHome: "ទំព័រដើម", navCalendar: "ប្រតិទិន", navTimeline: "បិណ្ឌ ១៥ ថ្ងៃ", navPlan: "ផែនការរបស់ខ្ញុំ", navAbout: "អំពីភ្ជុំបិណ្ឌ", navSettings: "ការកំណត់",
    festivalTitle: "ពិធីបុណ្យភ្ជុំបិណ្ឌ", subtitle: "ពេលវេលានៃការជួបជុំគ្រួសារ ការដឹងគុណបុព្វការីជន និងការថែរក្សាប្រពៃណីខ្មែរ។",
    countdownLabel: "រាប់ថយក្រោយដល់ថ្ងៃភ្ជុំបិណ្ឌ", days: "ថ្ងៃ", hours: "ម៉ោង", minutes: "នាទី", seconds: "វិនាទី",
    today: "ថ្ងៃនេះ", festivalProgress: "វឌ្ឍនភាពពិធីបុណ្យ", preparation: "ការត្រៀមខ្លួន", upcoming: "ផែនការបន្ទាប់", myJourney: "ដំណើរទៅស្រុករបស់ខ្ញុំ",
    planJourney: "រៀបចំថ្ងៃទៅស្រុក", viewPlan: "មើលផែនការ", noPlan: "មិនទាន់មានផែនការទៅស្រុកទេ", addPlan: "បង្កើតផែនការ",
    completed: "រួចរាល់", save: "រក្សាទុក", cancel: "បោះបង់", edit: "កែប្រែ", delete: "លុប", add: "បន្ថែម", close: "បិទ",
  },
  en: {
    navHome: "Home", navCalendar: "Calendar", navTimeline: "15-Day Timeline", navPlan: "My Plan", navAbout: "About Pchum Ben", navSettings: "Settings",
    festivalTitle: "Pchum Ben Festival", subtitle: "A time for family, remembrance, gratitude and Cambodian tradition.",
    countdownLabel: "Countdown to Pchum Ben", days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
    today: "Today", festivalProgress: "Festival Progress", preparation: "Preparation", upcoming: "Upcoming", myJourney: "My Journey Home",
    planJourney: "Plan My Journey Home", viewPlan: "View My Plan", noPlan: "No journey planned yet", addPlan: "Create Plan",
    completed: "Completed", save: "Save", cancel: "Cancel", edit: "Edit", delete: "Delete", add: "Add", close: "Close",
  },
} as const;

export function t(locale: Locale, key: keyof typeof dict.en) { return dict[locale][key]; }
