# Pchum Ben Festival Website
## Full Bilingual Frontend-Only MVP Specification
### ពិធីបុណ្យភ្ជុំបិណ្ឌ — ប្រព័ន្ធរាប់ថយក្រោយ ប្រតិទិន និងផែនការធ្វើដំណើរទៅស្រុក

---

# 1. Project Overview

Build a modern, culturally respectful, responsive bilingual website dedicated to:

> **ពិធីបុណ្យភ្ជុំបិណ្ឌ — Pchum Ben Festival**

The application must help Cambodian users:

- Understand the Pchum Ben festival.
- See the current Kan Ben/Pchum Ben day.
- Count down to Pchum Ben.
- Explore the full 15-day Kan Ben timeline.
- View a Khmer-focused calendar.
- Plan when they will return to their hometown.
- See a separate countdown to their hometown departure.
- Create personal preparation tasks.
- Create pagoda visit plans.
- Create family schedules.
- Track preparation completion.
- Store everything locally without requiring a backend.
- Switch between Khmer and English.
- Use the application on desktop, tablet, and mobile.

The experience should feel like a combination of:

- Cultural festival website
- Personal holiday planner
- Khmer lunar-calendar experience
- Countdown application
- Festival timeline
- Family homecoming planner

The product must be simple enough for normal users while maintaining modern professional UI/UX standards.

---

# 2. 2026 Festival Date Foundation

For the initial MVP, configure the 2026 season as:

```text
Kan Ben 1:
September 27, 2026

Kan Ben 15 / Pchum Ben:
October 11, 2026

Observance period:
September 27 – October 11, 2026

Official public-holiday period:
October 10 – October 12, 2026
```

The first day, September 27, 2026, corresponds to **១រោច ខែភទ្របទ**, and the 15-day observance continues through October 11.

Cambodia's official 2026 holiday calendars list October 10–12 as the Pchum Ben public-holiday period.

Important:

Do not treat the public-holiday range and the religious lunar-calendar festival date as the same thing.

Store them separately.

Example:

```ts
export const PCHUM_BEN_2026 = {
  year: 2026,

  observance: {
    startDate: "2026-09-27",
    endDate: "2026-10-11",
  },

  pchumBenDate: "2026-10-11",

  officialHoliday: {
    startDate: "2026-10-10",
    endDate: "2026-10-12",
  },

  timezone: "Asia/Phnom_Penh",
};
```

This architecture allows the dates to be updated for future years without modifying application logic.

---

# 3. Main Product Goal

The main goal is to answer these questions immediately:

```text
ថ្ងៃនេះជាបិណ្ឌទីប៉ុន្មាន?
What Kan Ben day is today?

នៅសល់ប៉ុន្មានថ្ងៃទៀតដល់ភ្ជុំបិណ្ឌ?
How many days until Pchum Ben?

ខ្ញុំនឹងទៅស្រុកនៅថ្ងៃណា?
When am I going home?

នៅសល់ប៉ុន្មានថ្ងៃទៀតដល់ថ្ងៃទៅស្រុក?
How many days until I return home?

ខ្ញុំបានត្រៀមអ្វីខ្លះហើយ?
What have I prepared?

តើមានអ្វីខ្លះដែលត្រូវធ្វើមុនទៅស្រុក?
What remains to be prepared?
```

These should be visible without making the application complicated.

---

# 4. Target Users

## 4.1 Cambodian Workers

People working in Phnom Penh or another province who plan to return to their hometown.

They need:

- Homecoming countdown
- Travel preparation
- Transport reminder
- Leave planning
- Checklist

---

## 4.2 Students

Students planning to return to their family.

They need:

- Pchum Ben countdown
- Calendar
- Personal plan
- Preparation checklist

---

## 4.3 Families

Families coordinating:

- Pagoda visits
- Family gathering
- Cooking
- Offerings
- Travel
- Ceremony schedules

---

## 4.4 Cambodian People Abroad

Users interested in:

- Pchum Ben date
- Meaning of the festival
- Festival timeline
- Cambodian cultural information

---

# 5. Languages

The entire application must support:

```text
ខ្មែរ
English
```

Default language:

```text
Khmer
```

Store language preference locally.

Example:

```json
{
  "locale": "km"
}
```

Supported locales:

```ts
type Locale = "km" | "en";
```

URLs may remain simple for the MVP:

```text
/
```

or optionally:

```text
/km
/en
```

For the frontend-only MVP, language state can be stored globally without requiring localized routes.

---

# 6. Main Navigation

Desktop header:

```text
Logo
Home
Calendar
15-Day Timeline
My Plan
About Pchum Ben

                       ខ្មែរ | English
                       Theme
```

Khmer:

```text
ទំព័រដើម
ប្រតិទិន
បិណ្ឌទាំង ១៥ ថ្ងៃ
ផែនការរបស់ខ្ញុំ
អំពីបុណ្យភ្ជុំបិណ្ឌ
```

Mobile:

Use a bottom navigation for important features:

```text
Home
Calendar
Plan
Timeline
More
```

Khmer:

```text
ដើម
ប្រតិទិន
ផែនការ
បិណ្ឌ
ផ្សេងៗ
```

---

# 7. Application Modules

The MVP should contain the following major modules.

```text
01. Festival Home Dashboard
02. Pchum Ben Countdown
03. Today's Kan Ben Status
04. 15-Day Kan Ben Timeline
05. Khmer Calendar
06. Homecoming Planner
07. Homecoming Countdown
08. Personal Festival Schedule
09. Preparation Checklist
10. Pagoda Visit Planner
11. Festival Information
12. Local Profile
13. Settings
14. Data Backup / Restore
```

---

# 8. Module 1 — Home Dashboard

Route:

```text
/
```

This is the main festival landing page.

The first screen should immediately communicate:

```text
ពិធីបុណ្យភ្ជុំបិណ្ឌ
Pchum Ben Festival

១៥ ថ្ងៃនៃការរំលឹកគុណបុព្វការីជន
15 Days of Remembrance, Family and Tradition
```

---

# 9. Hero Section

Hero structure:

```text
---------------------------------------------------
                 decorative Khmer motif

              ពិធីបុណ្យភ្ជុំបិណ្ឌ
               Pchum Ben Festival

             Sunday • 11 October 2026

                  នៅសល់

          05 Days : 07 Hours : 42 Min

               ដល់ថ្ងៃភ្ជុំបិណ្ឌ

              [ រៀបចំថ្ងៃទៅស្រុក ]

---------------------------------------------------
```

English:

```text
PCHUM BEN FESTIVAL

Sunday, October 11, 2026

05 Days
07 Hours
42 Minutes
18 Seconds

Until Pchum Ben

[ Plan My Journey Home ]
```

Countdown must update every second.

---

# 10. Countdown Business Logic

Primary target:

```ts
2026-10-11T00:00:00+07:00
```

Timezone:

```text
Asia/Phnom_Penh
```

Calculate:

```ts
difference = pchumBenDate - currentDate
```

Expose:

```ts
days
hours
minutes
seconds
isToday
isPast
```

States:

### Before festival

```text
នៅសល់ ៦ ថ្ងៃទៀត
6 days until Pchum Ben
```

### Festival day

```text
ថ្ងៃនេះជាថ្ងៃភ្ជុំបិណ្ឌ
Today is Pchum Ben
```

### After festival

```text
ពិធីបុណ្យភ្ជុំបិណ្ឌឆ្នាំ ២០២៦ បានបញ្ចប់ហើយ
Pchum Ben 2026 has ended
```

Never show negative countdown values.

---

# 11. Today's Festival Status

Under the main countdown display:

```text
ថ្ងៃនេះ
៥ តុលា ២០២៦

បិណ្ឌទី ៩
9th Kan Ben Day

នៅសល់ ៦ ថ្ងៃដល់ថ្ងៃភ្ជុំបិណ្ឌ
```

The current Kan Ben number should be determined automatically.

Business logic:

```ts
if date >= kanBenStart && date <= pchumBenDate {
   kanBenNumber =
      differenceInCalendarDays(date, kanBenStart) + 1;
}
```

Example:

```text
September 27 = Kan Ben 1
September 28 = Kan Ben 2
September 29 = Kan Ben 3
September 30 = Kan Ben 4
October 1 = Kan Ben 5
October 2 = Kan Ben 6
October 3 = Kan Ben 7
October 4 = Kan Ben 8
October 5 = Kan Ben 9
October 6 = Kan Ben 10
October 7 = Kan Ben 11
October 8 = Kan Ben 12
October 9 = Kan Ben 13
October 10 = Kan Ben 14
October 11 = Kan Ben 15 / Pchum Ben
```

---

# 12. Full 15-Day Timeline

Route:

```text
/timeline
```

Title:

```text
១៥ ថ្ងៃនៃពិធីកាន់បិណ្ឌ និងភ្ជុំបិណ្ឌ
15 Days of Kan Ben & Pchum Ben
```

Display all days as a timeline.

Example:

```text
✓ បិណ្ឌទី ១
  27 Sep

✓ បិណ្ឌទី ២
  28 Sep

✓ បិណ្ឌទី ៣
  29 Sep

...

● បិណ្ឌទី ៩
  TODAY
  05 Oct

○ បិណ្ឌទី ១០
  06 Oct

○ បិណ្ឌទី ១១
  07 Oct

...

★ បិណ្ឌទី ១៥
  11 Oct
  ពិធីបុណ្យភ្ជុំបិណ្ឌ
```

Statuses:

```ts
type FestivalDayStatus =
  | "completed"
  | "today"
  | "upcoming"
  | "pchum-ben";
```

Progress example:

```text
Festival Progress

████████████████░░░░░

9 / 15 Days
60%
```

---

# 13. Timeline Cards

Each timeline day contains:

```text
Kan Ben number
Khmer lunar label
Gregorian date
Status
Short meaning / recommended activity
Personal events count
```

Example:

```text
បិណ្ឌទី ១១

ថ្ងៃពុធ
៧ តុលា ២០២៦

11th Kan Ben

Your plans:
• Buy offerings
• Call family

[ View Day ]
```

---

# 14. Khmer Calendar Module

Route:

```text
/calendar
```

The calendar must show:

- Gregorian date
- Khmer date label
- Festival date
- Kan Ben day
- Public holiday
- Personal plans

For MVP, the festival lunar mapping should come from configuration data.

Do not attempt to invent astronomical lunar-calendar calculations.

Architecture:

```text
calendar/
  festival-2026.ts
  holidays-2026.ts
  lunar-labels-2026.ts
```

Future lunar/calendar data can later come from an API.

---

# 15. Calendar Month View

Default focus:

```text
September 2026
October 2026
```

Festival dates receive special decoration.

Example:

```text
SUN MON TUE WED THU FRI SAT

              1   2   3
4   5   6   7   8   9  10
                         ● B14

11  12  13  14  15  16  17
★PB
```

Legend:

```text
● Kan Ben
★ Pchum Ben
■ Official Holiday
• Personal Event
```

---

# 16. Calendar Day Detail

Clicking a date opens:

```text
Monday
5 October 2026

បិណ្ឌទី ៩

Festival status:
Kan Ben Day 9

My Plan:
• Buy bus ticket — 6:00 PM
• Call Mother — 7:30 PM

[ + Add Plan ]
```

Use MUI `Drawer` on mobile.

Use MUI `Dialog` or right-side panel on desktop.

---

# 17. Homecoming Planner

This is one of the most important features.

Route:

```text
/my-plan
```

Primary CTA:

```text
កំណត់ថ្ងៃទៅស្រុក
Plan My Journey Home
```

Users have two methods.

---

# 18. Homecoming Method A — Choose Exact Date

Example:

```text
When will you return home?

[ 08 October 2026 ]

Departure time

[ 05:30 PM ]

Leaving from

[ Phnom Penh ]

Going to

[ Kampong Cham ]

Transport

[ Bus ▼ ]

[ Save My Plan ]
```

---

# 19. Homecoming Method B — Days Before Pchum Ben

This directly supports the requested use case:

> "I will go home 5 days before Pchum Ben."

UI:

```text
តើអ្នកចង់ទៅស្រុកមុនភ្ជុំបិណ្ឌប៉ុន្មានថ្ងៃ?

[ - ] 5 Days [ + ]

Your return-home date will be:

Tuesday
6 October 2026

[ Save Plan ]
```

Formula:

```ts
homecomingDate =
  subtractDays(pchumBenDate, daysBeforeFestival);
```

Example:

```text
Pchum Ben:
October 11

5 days before:

October 6
```

---

# 20. Homecoming Countdown

After the user saves a plan, show a personalized card on the homepage.

```text
🏠 ដំណើរទៅស្រុករបស់ខ្ញុំ

អ្នកនឹងទៅស្រុកនៅ
៦ តុលា ២០២៦
ម៉ោង ៥:៣០ ល្ងាច

នៅសល់

00 DAYS
18 HOURS
43 MINUTES

Phnom Penh
↓
Kampong Cham

[ View Plan ]
```

English:

```text
MY JOURNEY HOME

You are returning home on

October 6, 2026
5:30 PM

18 hours remaining

Phnom Penh
↓
Kampong Cham

[ View My Plan ]
```

---

# 21. Homecoming Countdown States

Before departure:

```text
2 days until you go home
```

Within 24 hours:

```text
Tomorrow is the day!
```

Same day:

```text
You're going home today ❤️
```

After departure:

```text
Welcome home ❤️
សូមស្វាគមន៍មកផ្ទះ
```

The system should never display negative values.

---

# 22. Homecoming Plan CRUD

Users must be able to:

```text
Create Plan
View Plan
Update Plan
Delete Plan
```

Fields:

```ts
interface HomecomingPlan {
  id: string;

  departureDate: string;
  departureTime?: string;

  daysBeforePchumBen?: number;

  origin?: string;
  destination?: string;

  transportType?:
    | "car"
    | "bus"
    | "van"
    | "motorbike"
    | "train"
    | "flight"
    | "other";

  ticketBooked: boolean;

  note?: string;

  createdAt: string;
  updatedAt: string;
}
```

For MVP:

Only one active primary homecoming plan is required.

Optionally retain previous plans in history.

---

# 23. Personal Festival Planner

Users should create events related to their Pchum Ben activities.

Examples:

```text
Buy bus ticket
Prepare food
Buy fruit
Prepare offerings
Visit parents
Visit pagoda
Family dinner
Travel to hometown
Return to Phnom Penh
```

CRUD:

```text
Create
Read
Update
Delete
Complete
```

---

# 24. Personal Plan Data Model

```ts
interface FestivalEvent {
  id: string;

  title: string;
  description?: string;

  date: string;
  startTime?: string;
  endTime?: string;

  type:
    | "travel"
    | "pagoda"
    | "family"
    | "shopping"
    | "preparation"
    | "ceremony"
    | "other";

  status:
    | "planned"
    | "completed"
    | "cancelled";

  reminder?: boolean;

  createdAt: string;
  updatedAt: string;
}
```

---

# 25. Schedule UI

Route:

```text
/my-plan/schedule
```

Views:

```text
Timeline
Calendar
List
```

Example:

```text
OCTOBER 6

08:00 AM
Buy offerings

12:00 PM
Finish work

05:30 PM
Leave Phnom Penh

08:00 PM
Arrive home
```

---

# 26. Preparation Checklist

Route:

```text
/my-plan/checklist
```

Provide default tasks.

### Travel

```text
☐ Request leave
☐ Book transportation
☐ Prepare luggage
☐ Check departure time
☐ Prepare transportation cost
```

### Family

```text
☐ Call family
☐ Confirm family gathering
☐ Prepare gifts
```

### Pagoda

```text
☐ Choose pagoda
☐ Prepare offerings
☐ Prepare food
☐ Prepare candles/incense
```

### Personal

```text
☐ Finish work
☐ Charge phone
☐ Prepare clothes
☐ Prepare cash
```

Users can create their own checklist items.

---

# 27. Checklist CRUD

Each task allows:

```text
Create
Edit
Delete
Complete
Uncomplete
Reorder
```

Schema:

```ts
interface ChecklistItem {
  id: string;

  title: string;

  category:
    | "travel"
    | "family"
    | "pagoda"
    | "shopping"
    | "personal"
    | "other";

  completed: boolean;

  dueDate?: string;

  order: number;

  createdAt: string;
  updatedAt: string;
}
```

---

# 28. Preparation Score

Calculate:

```ts
completedTasks / totalTasks * 100
```

Example:

```text
ការត្រៀមខ្លួនរបស់អ្នក

72%

18 of 25 completed

██████████████░░░░
```

Messages:

```text
0–24%
ចាប់ផ្តើមរៀបចំបានហើយ!
Let's start preparing.

25–49%
កំពុងដំណើរការ
Good start.

50–74%
ជិតរួចរាល់ហើយ
You're getting ready.

75–99%
ត្រៀមជិតរួចរាល់
Almost ready!

100%
រួចរាល់សម្រាប់ភ្ជុំបិណ្ឌ ❤️
Ready for Pchum Ben!
```

---

# 29. Pagoda Visit Planner

Allow users to create a list of pagoda visits.

No online map API is necessary for MVP.

Fields:

```text
Pagoda name
Province
District
Visit date
Visit time
Family members
Offerings
Notes
Visited status
```

Schema:

```ts
interface PagodaVisit {
  id: string;

  pagodaName: string;

  province?: string;
  district?: string;

  visitDate: string;
  visitTime?: string;

  familyMembers?: string[];

  offerings?: string[];

  note?: string;

  visited: boolean;

  createdAt: string;
  updatedAt: string;
}
```

---

# 30. Pagoda Visit UI

Example card:

```text
វត្ត __________

8 October 2026
6:30 AM

Kampong Cham

Family:
4 people

Offerings:
• Food
• Fruit
• Incense

[ Mark Visited ]

Edit
Delete
```

---

# 31. About Pchum Ben

Route:

```text
/about
```

Sections:

```text
What is Pchum Ben?
តើបុណ្យភ្ជុំបិណ្ឌជាអ្វី?

Why Cambodians celebrate it
ហេតុអ្វីប្រជាជនខ្មែរប្រារព្ធពិធីនេះ?

Kan Ben
កាន់បិណ្ឌ

Pchum Ben
ភ្ជុំបិណ្ឌ

Family & ancestors
គ្រួសារ និងបុព្វការីជន

Pagoda traditions
ប្រពៃណីទៅវត្ត

15-Day Festival
រយៈពេល ១៥ ថ្ងៃ
```

Content should be respectful and educational.

Avoid presenting unverified folklore as factual history.

---

# 32. Local User Profile

No authentication is needed.

Allow users to create a lightweight local profile.

```text
Your Name
Nickname
Hometown Province
Current City
Preferred Language
```

Schema:

```ts
interface LocalProfile {
  displayName?: string;

  hometownProvince?: string;
  currentCity?: string;

  locale: "km" | "en";

  createdAt: string;
  updatedAt: string;
}
```

Example personalized greeting:

```text
សួស្តី សុខា 👋

នៅសល់ ៦ ថ្ងៃទៀតដល់ភ្ជុំបិណ្ឌ
ហើយ ១ ថ្ងៃទៀតអ្នកនឹងទៅស្រុក ❤️
```

English:

```text
Hello Sokha 👋

6 days until Pchum Ben
and only 1 day until you go home ❤️
```

---

# 33. Storage Architecture

There is no backend.

Do not use:

```text
REST API
Database
Authentication server
Firebase
Supabase
Node API
Next.js database
```

All user-created data remains in the browser.

Use:

```text
LocalStorage
SessionStorage
Cookies
```

for different purposes.

---

# 34. LocalStorage

Use LocalStorage for persistent data.

Store:

```text
profile
homecoming plan
personal schedule
checklists
pagoda visits
language
theme
app settings
```

Recommended keys:

```text
pchumben.profile.v1
pchumben.homecoming.v1
pchumben.events.v1
pchumben.checklist.v1
pchumben.pagodaVisits.v1
pchumben.settings.v1
pchumben.version
```

---

# 35. SessionStorage

Use SessionStorage for temporary UI state.

Examples:

```text
current calendar date
selected timeline day
temporary form drafts
active filter
active tab
wizard step
```

Example:

```text
pchumben.session.calendarMonth
pchumben.session.selectedDay
pchumben.session.homecomingDraft
```

Do not use SessionStorage for important long-term data.

---

# 36. Cookies

Use cookies only for lightweight preferences such as:

```text
locale
theme
cookie-consent
```

Example:

```text
pchumben_locale=km
pchumben_theme=light
```

Do not place entire plans or private personal data inside cookies.

---

# 37. Zustand State Management

Recommended state architecture:

```text
Zustand
+
persist middleware
+
LocalStorage
```

Stores:

```text
useProfileStore
useFestivalStore
useHomecomingStore
useEventStore
useChecklistStore
usePagodaStore
useSettingsStore
```

Example:

```ts
interface AppSettingsStore {
  locale: "km" | "en";
  theme: "light" | "dark";
  festivalYear: number;

  setLocale: (locale: Locale) => void;
  setTheme: (theme: ThemeMode) => void;
}
```

Use selectors to avoid unnecessary rerenders.

---

# 38. Local Data Migration

Every stored object must have a schema version.

Example:

```json
{
  "version": 1,
  "data": {}
}
```

When future versions are introduced:

```text
v1 -> v2 migration
v2 -> v3 migration
```

Do not break existing user's saved plans after an application upgrade.

---

# 39. Backup and Restore

Settings page:

```text
ទិន្នន័យរបស់ខ្ញុំ
My Data

[ Export Backup ]

[ Import Backup ]

[ Clear My Data ]
```

Export all personal data as:

```text
pchum-ben-backup-2026.json
```

Backup example:

```json
{
  "appVersion": "1.0.0",
  "exportedAt": "...",
  "profile": {},
  "homecoming": {},
  "events": [],
  "checklist": [],
  "pagodaVisits": [],
  "settings": {}
}
```

Import must validate the schema before replacing data.

---

# 40. Clear Data

Require confirmation:

```text
លុបទិន្នន័យទាំងអស់?

This will permanently remove your locally stored
plans and preferences from this browser.

[ Cancel ]

[ Delete Everything ]
```

Do not clear data accidentally.

---

# 41. Main Dashboard Layout

Desktop:

```text
┌────────────────────────────────────────────┐
│ HEADER                                     │
├────────────────────────────────────────────┤
│                                            │
│              HERO / COUNTDOWN              │
│                                            │
├──────────────────────┬─────────────────────┤
│ TODAY                │ MY JOURNEY HOME     │
│ Kan Ben #9           │ 1 day remaining     │
├──────────────────────┴─────────────────────┤
│                                            │
│ 15-DAY FESTIVAL PROGRESS                   │
│                                            │
├──────────────────────┬─────────────────────┤
│ PREPARATION          │ NEXT EVENT          │
│ 72%                  │ Buy bus ticket      │
├──────────────────────┴─────────────────────┤
│                                            │
│ FESTIVAL CALENDAR                          │
│                                            │
├────────────────────────────────────────────┤
│ ABOUT PCHUM BEN                            │
├────────────────────────────────────────────┤
│ FOOTER                                     │
└────────────────────────────────────────────┘
```

---

# 42. Mobile Dashboard

Mobile hierarchy:

```text
Header

Festival Hero

Countdown

Today
Kan Ben #9

My Journey Home

Preparation Progress

Upcoming Plans

15-Day Timeline

Mini Calendar

Festival Story

Footer
```

Primary information must appear before educational content.

---

# 43. Design Direction

The visual identity should combine:

```text
Khmer cultural heritage
+
modern editorial design
+
clean modern web application
```

Do not make it feel like:

```text
government administration system
generic SaaS dashboard
old calendar website
over-decorated temple poster
```

The design should feel:

```text
warm
calm
spiritual
family-focused
respectful
premium
Cambodian
modern
```

---

# 44. Color Palette

Primary Burgundy:

```text
#7A263A
```

Deep Burgundy:

```text
#521927
```

Ceremonial Gold:

```text
#C99A2E
```

Soft Gold:

```text
#E7C66A
```

Warm Ivory:

```text
#FFF9EE
```

Sand:

```text
#F5EAD6
```

White:

```text
#FFFFFF
```

Dark Text:

```text
#251F1D
```

Secondary Text:

```text
#736B65
```

Success:

```text
#3F7D58
```

Use gold carefully as an accent, not as the main background everywhere.

---

# 45. Dark Theme

Optional but recommended:

```text
Background:
#171311

Surface:
#221C19

Burgundy:
#A84660

Gold:
#E0B84C

Text:
#FFF8EC
```

The theme toggle should be available in Settings and optionally header.

---

# 46. Typography

Khmer:

```text
Noto Sans Khmer
```

Optional Khmer display heading:

```text
Noto Serif Khmer
```

English:

```text
Inter
or
Public Sans
```

Typography hierarchy:

```text
Hero Khmer title:
40–64px desktop
32–40px mobile

Page title:
32px

Section title:
24px

Card title:
18px

Body:
14–16px

Caption:
12–13px
```

Khmer text needs increased line height:

```css
line-height: 1.7;
```

Avoid compressed Khmer typography.

---

# 47. Decorative Visual Language

Use subtle elements inspired by:

```text
Khmer ornamental geometry
lotus
temple silhouette
traditional border pattern
rice grain
candle
incense
moon
pagoda
family journey
```

Use them as:

```text
subtle SVG backgrounds
section separators
icons
watermarks
decorative corners
```

Do not overwhelm content.

---

# 48. Hero Background

Recommended hero:

```text
Warm ivory background

Very subtle Khmer ornamental pattern

Large faint golden moon / circle

Pagoda silhouette near lower edge

Lotus decorative accents

Countdown centered

Plenty of negative space
```

Avoid large text over busy photography.

---

# 49. Card Design

Use:

```text
border-radius: 16px
```

Important hero cards:

```text
20–24px
```

Cards:

```css
border: 1px solid rgba(...)
box-shadow: subtle
background: white
```

Avoid excessive shadows.

---

# 50. Countdown Component

Desktop:

```text
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│    06    │ │    07    │ │    21    │ │    13    │
│   Days   │ │  Hours   │ │ Minutes  │ │ Seconds  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

Khmer:

```text
ថ្ងៃ
ម៉ោង
នាទី
វិនាទី
```

Mobile:

Use four compact cells in one horizontal row where possible.

---

# 51. Timeline Visual Design

Use a vertical timeline on mobile.

Desktop can use horizontal scrolling.

Example:

```text
1 ── 2 ── 3 ── 4 ── ... ── 9 ── ... ── 15
✓    ✓    ✓    ✓          ●             ★
```

Colors:

```text
Completed = muted gold
Today = burgundy
Upcoming = neutral
Pchum Ben = ceremonial gold
```

---

# 52. Festival Progress Ring

Dashboard card:

```text
      60%

    9 / 15

Festival Progress
```

Use MUI `CircularProgress` with a central label.

---

# 53. Homecoming Planner UX

Use a guided 3-step wizard.

### Step 1

```text
When are you going home?
```

Choose:

```text
Exact date

or

Days before Pchum Ben
```

### Step 2

```text
Journey details
```

### Step 3

```text
Confirm plan
```

Then show:

```text
Your journey is planned ❤️
```

---

# 54. Homecoming Setup Example

Khmer:

```text
កំណត់ថ្ងៃទៅស្រុក

តើអ្នកចង់ទៅស្រុកមុនថ្ងៃភ្ជុំបិណ្ឌ
ប៉ុន្មានថ្ងៃ?

[ – ]    ៥ ថ្ងៃ    [ + ]

ថ្ងៃទៅស្រុករបស់អ្នក

ថ្ងៃអង្គារ
៦ តុលា ២០២៦

[ បន្ត ]
```

English:

```text
Plan Your Journey Home

How many days before Pchum Ben
will you return home?

[ – ]    5 Days    [ + ]

Your departure date:

Tuesday
October 6, 2026

[ Continue ]
```

---

# 55. Empty States

Example schedule empty state:

```text
មិនទាន់មានផែនការទេ

Create your first plan for Pchum Ben.

[ + Add Plan ]
```

Homecoming:

```text
តើអ្នកនឹងទៅស្រុកថ្ងៃណា? ❤️

Set your departure date and
we'll count down with you.

[ Plan My Journey ]
```

Checklist:

```text
Start preparing for Pchum Ben

[ Create Checklist ]
```

---

# 56. Notifications

Because this is frontend-only, MVP should use in-app reminders.

Examples:

```text
Your journey home is tomorrow.
You still have 3 preparation tasks.
Pchum Ben is in 3 days.
Your pagoda visit is tomorrow.
```

Optional enhancement:

Browser Notification API.

Never require notification permission to use the site.

Only request permission after the user explicitly enables reminders.

---

# 57. Festival Reminder Rules

Possible events:

```ts
festival_7_days
festival_5_days
festival_3_days
festival_tomorrow
festival_today

homecoming_3_days
homecoming_tomorrow
homecoming_today
```

Use these for in-app banners.

---

# 58. Dashboard Smart Message

Generate contextual messages.

Example:

```ts
if (homecomingDays === 1) {
  return "ថ្ងៃស្អែកអ្នកនឹងទៅស្រុក ❤️";
}
```

Other examples:

```text
Only 5 days until Pchum Ben.

Today is Kan Ben #9.

You're 72% prepared.

You still have 4 tasks before leaving.

Tomorrow is your trip home.
```

---

# 59. Important Business Logic

## Rule 1

Pchum Ben target date and government public holidays must be separate.

## Rule 2

All date calculations use:

```text
Asia/Phnom_Penh
```

## Rule 3

Countdown must never become negative.

## Rule 4

Homecoming date may not automatically exceed the user's selected festival period unless the user explicitly chooses it.

## Rule 5

Deleting a plan requires confirmation.

## Rule 6

Imported backup files must be validated.

## Rule 7

Changing language must not remove user data.

## Rule 8

Changing theme must not reset plans.

## Rule 9

Refreshing the browser must preserve LocalStorage data.

## Rule 10

Closing the browser must preserve persistent plan data.

---

# 60. Festival Configuration Architecture

Create:

```text
src/config/festivals/pchum-ben/2026.ts
```

Example:

```ts
export const pchumBen2026 = {
  year: 2026,

  timezone: "Asia/Phnom_Penh",

  observanceStart: "2026-09-27",
  pchumBenDate: "2026-10-11",

  officialHolidayStart: "2026-10-10",
  officialHolidayEnd: "2026-10-12",

  totalDays: 15,

  kanBenDays: [
    {
      number: 1,
      date: "2026-09-27",
    },
    {
      number: 2,
      date: "2026-09-28",
    },

    // ...

    {
      number: 15,
      date: "2026-10-11",
      isPchumBen: true,
    },
  ],
};
```

Do not scatter hard-coded festival dates across UI components.

---

# 61. Future-Year Architecture

Eventually support:

```text
2026
2027
2028
...
```

Configuration:

```text
src/config/festivals/pchum-ben/
├── 2026.ts
├── 2027.ts
├── 2028.ts
└── index.ts
```

For MVP:

Only 2026 is required.

But implementation must support adding future config easily.

---

# 62. Recommended Technology Stack

Core:

```text
Next.js
TypeScript
React
Material UI
Emotion
```

Recommended versions:

```text
Next.js current stable version
React supported by selected Next.js version
TypeScript latest stable
MUI current stable
```

Useful libraries:

```text
@mui/material
@mui/icons-material

zustand

dayjs

zod

uuid
or
crypto.randomUUID()

js-cookie
```

Optional:

```text
framer-motion
```

Use animation carefully.

---

# 63. Do Not Need

Do not build:

```text
Backend
Database
Login API
User registration API
Admin dashboard
Payment
CMS
Cloud storage
Complex authentication
Server-side personal data
```

The MVP is intentionally frontend-only.

---

# 64. Next.js Architecture

Use:

```text
App Router
```

Suggested:

```text
src/
├── app/
│   ├── page.tsx
│   ├── calendar/
│   │   └── page.tsx
│   ├── timeline/
│   │   └── page.tsx
│   ├── my-plan/
│   │   ├── page.tsx
│   │   ├── schedule/
│   │   ├── checklist/
│   │   └── pagodas/
│   ├── about/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
│
├── components/
├── features/
├── config/
├── stores/
├── hooks/
├── lib/
├── types/
├── locales/
└── theme/
```

---

# 65. Feature-Based Architecture

Recommended:

```text
features/
├── countdown/
├── festival-calendar/
├── timeline/
├── homecoming/
├── planner/
├── checklist/
├── pagoda/
├── profile/
├── backup/
└── settings/
```

Each module:

```text
components/
hooks/
types.ts
utils.ts
store.ts
schema.ts
```

---

# 66. Components

Reusable components:

```text
AppHeader
MobileNavigation
Footer

FestivalHero
FestivalCountdown
CountdownUnit

TodayFestivalCard
FestivalProgress
FestivalStatusChip

KanBenTimeline
KanBenDayCard

FestivalCalendar
CalendarDayCell
CalendarLegend

HomecomingCard
HomecomingCountdown
HomecomingWizard

PreparationProgress
ChecklistCard
ChecklistForm

ScheduleTimeline
EventCard
EventForm

PagodaVisitCard
PagodaVisitForm

LanguageSwitcher
ThemeSwitcher

ConfirmDialog
EmptyState
SectionHeader
PageContainer
```

---

# 67. Countdown Hook

Create:

```ts
useCountdown(targetDate)
```

Returns:

```ts
{
  days,
  hours,
  minutes,
  seconds,
  totalMilliseconds,
  isFinished
}
```

Must automatically clean intervals when component unmounts.

---

# 68. Festival Hook

```ts
useFestivalStatus()
```

Returns:

```ts
{
  today,

  isBeforeFestival,
  isDuringFestival,
  isPchumBen,
  isAfterFestival,

  kanBenNumber,

  daysUntilPchumBen,

  progressPercentage
}
```

---

# 69. Homecoming Hook

```ts
useHomecomingStatus()
```

Returns:

```ts
{
  plan,
  hasPlan,

  daysRemaining,
  hoursRemaining,

  isToday,
  isPast,

  preparationPercentage
}
```

---

# 70. Internationalization Files

```text
locales/
├── km.json
└── en.json
```

Example:

```json
{
  "festival": {
    "title": "ពិធីបុណ្យភ្ជុំបិណ្ឌ",
    "countdown": "រាប់ថយក្រោយដល់ថ្ងៃភ្ជុំបិណ្ឌ",
    "today": "ថ្ងៃនេះ",
    "daysRemaining": "នៅសល់ {{count}} ថ្ងៃទៀត"
  }
}
```

English:

```json
{
  "festival": {
    "title": "Pchum Ben Festival",
    "countdown": "Countdown to Pchum Ben",
    "today": "Today",
    "daysRemaining": "{{count}} days remaining"
  }
}
```

Never hard-code bilingual labels repeatedly inside components.

---

# 71. Khmer Number Display

Optional user setting:

```text
លេខខ្មែរ
Khmer Numerals
```

Example:

```text
1 → ១
2 → ២
3 → ៣
4 → ៤
5 → ៥
6 → ៦
7 → ៧
8 → ៨
9 → ៩
0 → ០
```

Utility:

```ts
toKhmerNumerals(value)
```

Khmer interface can use Khmer numerals for:

```text
dates
countdown
Kan Ben numbers
progress
```

Allow users to disable it if preferred.

---

# 72. Date Presentation

Khmer:

```text
ថ្ងៃអាទិត្យ ទី១១ ខែតុលា ឆ្នាំ២០២៦
```

English:

```text
Sunday, October 11, 2026
```

Do not show raw ISO date strings to normal users.

---

# 73. Responsive Requirements

Breakpoints:

```text
xs
sm
md
lg
xl
```

Mobile:

```text
320px+
```

Tablet:

```text
768px+
```

Desktop:

```text
1200px+
```

No horizontal page scrolling.

Timeline may use internal horizontal scrolling only where appropriate.

---

# 74. Accessibility

Required:

```text
Semantic headings
Keyboard navigation
Visible focus states
ARIA labels
Accessible dialogs
Sufficient color contrast
Minimum touch target ~44px
Reduced-motion support
```

Do not rely on color alone to communicate:

```text
completed
today
upcoming
holiday
```

Use icon + text.

---

# 75. Form Validation

Use:

```text
Zod
```

Validate:

```text
required titles
valid dates
valid time
allowed enum values
reasonable note lengths
valid backup schema
```

Example limits:

```text
Title:
1–100 characters

Description:
0–1000 characters

Note:
0–1000 characters
```

---

# 76. Local Privacy

Because this application uses browser storage:

Display:

```text
Your personal plans stay on this device.

We do not require an account and your local
planning information is not sent to a server.
```

Khmer:

```text
ទិន្នន័យផែនការផ្ទាល់ខ្លួនរបស់អ្នក
ត្រូវបានរក្សាទុកនៅលើឧបករណ៍នេះ។
```

Do not store:

```text
passwords
banking details
government ID
sensitive identity documents
```

---

# 77. Error Handling

Handle:

```text
corrupted LocalStorage
invalid JSON backup
unsupported backup version
missing dates
browser storage unavailable
invalid homecoming configuration
```

Provide user-friendly UI instead of application crashes.

Example:

```text
We couldn't read your saved plan.

[ Reset Plan ]
[ Try Again ]
```

---

# 78. First Visit Experience

First-time visitor:

```text
សូមស្វាគមន៍មកកាន់
ពិធីបុណ្យភ្ជុំបិណ្ឌ ២០២៦

Keep track of Kan Ben,
count down to Pchum Ben,
and plan your journey home.

[ ចាប់ផ្តើម ]
Start
```

Then optionally ask:

```text
When are you going home?

[ Set Now ]

[ Later ]
```

Do not force setup.

---

# 79. Returning User Experience

If a plan exists:

Homepage immediately displays:

```text
Hello Dara 👋

Today
Kan Ben #9

6 days until Pchum Ben

1 day until you go home

Preparation
72%
```

This personalized dashboard is the core experience.

---

# 80. Page Structure

Final sitemap:

```text
/
├── Home
│
├── /calendar
│   └── Festival Calendar
│
├── /timeline
│   └── 15-Day Timeline
│
├── /my-plan
│   ├── Journey Home
│   ├── /schedule
│   ├── /checklist
│   └── /pagodas
│
├── /about
│   └── About Pchum Ben
│
└── /settings
    ├── Profile
    ├── Language
    ├── Theme
    ├── Khmer Numbers
    ├── Data Backup
    └── Reset Data
```

---

# 81. Homepage Final Layout

```text
HEADER

HERO
Pchum Ben Festival
Countdown

TODAY'S STATUS
Kan Ben #__

MY JOURNEY HOME
Countdown

FESTIVAL PROGRESS
__ / 15

PREPARATION
__%

UPCOMING EVENT

15-DAY TIMELINE PREVIEW

FESTIVAL CALENDAR PREVIEW

ABOUT PCHUM BEN

FOOTER
```

---

# 82. Footer

Khmer:

```text
ពិធីបុណ្យភ្ជុំបិណ្ឌ

រក្សាវប្បធម៌ ប្រពៃណី
និងការជួបជុំគ្រួសារខ្មែរ។

ប្រតិទិន
បិណ្ឌ ១៥ ថ្ងៃ
អំពីភ្ជុំបិណ្ឌ
```

English:

```text
Pchum Ben Festival

Celebrating Cambodian culture,
tradition, remembrance and family.

Calendar
15-Day Festival
About Pchum Ben
```

---

# 83. Animations

Use subtle motion only.

Recommended:

```text
Countdown number change
Timeline reveal
Progress animation
Card entrance
Festival-day highlight
Modal transition
```

Duration:

```text
150–350ms
```

Avoid:

```text
constant floating objects
large parallax
aggressive zoom
flashing elements
```

Respect:

```css
prefers-reduced-motion
```

---

# 84. Optional Cultural Micro-interactions

Possible:

When checklist reaches 100%:

```text
រួចរាល់សម្រាប់ភ្ជុំបិណ្ឌ ❤️
```

Small lotus animation.

When homecoming day arrives:

```text
សូមធ្វើដំណើរដោយសុវត្ថិភាព ❤️
Have a safe journey home.
```

When Pchum Ben begins:

```text
សូមអនុមោទនាពិធីបុណ្យភ្ជុំបិណ្ឌ
Happy Pchum Ben Day
```

Keep these elegant rather than playful.

---

# 85. SEO

Even though personal modules are client-side, public pages should have metadata.

Title:

```text
ពិធីបុណ្យភ្ជុំបិណ្ឌ ២០២៦ | Pchum Ben Festival 2026
```

Description:

```text
រាប់ថយក្រោយដល់ពិធីបុណ្យភ្ជុំបិណ្ឌ
មើលប្រតិទិនកាន់បិណ្ឌ ១៥ ថ្ងៃ
និងរៀបចំផែនការធ្វើដំណើរទៅស្រុក។
```

English:

```text
Count down to Pchum Ben 2026,
explore the 15-day Kan Ben calendar,
and plan your journey home.
```

---

# 86. Performance Requirements

Target:

```text
Lighthouse Performance: 90+
Accessibility: 90+
Best Practices: 90+
SEO: 90+
```

Use:

```text
Next/Image
lazy loading
optimized SVG
tree-shaken icons
dynamic imports where appropriate
```

Do not ship oversized decorative images.

---

# 87. Empty / Loading / Hydration Safety

Because LocalStorage is browser-only:

Do not directly access:

```ts
window.localStorage
```

during server rendering.

Use:

```ts
"use client"
```

where needed.

Handle Zustand persisted-store hydration properly.

Avoid server/client content mismatch for:

```text
countdown
language
theme
personal plans
```

Use a mounted/hydrated state when necessary.

---

# 88. Testing

Unit tests should cover:

```text
festival date calculations
Kan Ben day number
countdown calculations
days-before-Pchum-Ben calculation
progress percentage
Khmer numeral conversion
storage migration
backup validation
checklist percentage
```

---

# 89. Important Test Cases

### Case 1

Date:

```text
2026-09-27
```

Expected:

```text
Kan Ben #1
```

### Case 2

Date:

```text
2026-10-05
```

Expected:

```text
Kan Ben #9
```

### Case 3

Date:

```text
2026-10-11
```

Expected:

```text
Kan Ben #15
Pchum Ben
```

### Case 4

Pchum Ben:

```text
2026-10-11
```

User selects:

```text
5 days before
```

Expected homecoming date:

```text
2026-10-06
```

### Case 5

Checklist:

```text
8 completed
10 total
```

Expected:

```text
80%
```

### Case 6

Refresh browser.

Expected:

```text
User plan remains.
```

---

# 90. Main Acceptance Criteria

The MVP is complete only when:

- [ ] Khmer language works.
- [ ] English language works.
- [ ] Language can switch instantly.
- [ ] Pchum Ben countdown works.
- [ ] Countdown uses Cambodia timezone.
- [ ] Countdown stops at zero.
- [ ] 15 festival days display correctly.
- [ ] Current Kan Ben day is highlighted.
- [ ] Festival progress is calculated.
- [ ] Calendar works.
- [ ] Personal events appear on calendar.
- [ ] User can set an exact homecoming date.
- [ ] User can choose "5 days before Pchum Ben".
- [ ] Homecoming date calculates automatically.
- [ ] Homecoming countdown works.
- [ ] Homecoming plan CRUD works.
- [ ] Personal event CRUD works.
- [ ] Checklist CRUD works.
- [ ] Checklist progress works.
- [ ] Pagoda visit CRUD works.
- [ ] LocalStorage persistence works.
- [ ] SessionStorage works where appropriate.
- [ ] Preference cookies work.
- [ ] Backup export works.
- [ ] Backup import works.
- [ ] Data reset works.
- [ ] Mobile responsive design works.
- [ ] Tablet layout works.
- [ ] Desktop layout works.
- [ ] Accessible forms and dialogs work.
- [ ] Refreshing the page does not erase data.
- [ ] No backend is required.

---

# 91. MVP Priorities

## Priority P0 — Required

```text
Bilingual website
Homepage
Pchum Ben countdown
15-day timeline
Calendar
Homecoming planner
Homecoming countdown
Personal events
Checklist
LocalStorage
Responsive layout
```

## Priority P1 — Strongly Recommended

```text
Pagoda planner
Profile
Preparation score
Backup/restore
Khmer numerals
Dark theme
In-app reminders
```

## Priority P2 — Future

```text
Browser notifications
PWA/offline installation
Shareable festival cards
Map integration
Real lunar-calendar API
Multiple festival years
Cloud account synchronization
Family shared plan
Transport integration
```

---

# 92. Development Order

Build in this order:

```text
Phase 1
Project foundation
Theme
Layout
i18n

Phase 2
Festival configuration
Date utilities
Countdown engine

Phase 3
Homepage
Festival hero
Today status
15-day progress

Phase 4
Full timeline

Phase 5
Festival calendar

Phase 6
Homecoming planner
Homecoming countdown

Phase 7
Personal schedule

Phase 8
Checklist
Preparation score

Phase 9
Pagoda planner

Phase 10
Settings
Profile
Backup/restore

Phase 11
Responsive improvements
Accessibility
Testing
Performance
```

---

# 93. Recommended Homepage Copy

Khmer:

```text
ពិធីបុណ្យភ្ជុំបិណ្ឌ

ពេលវេលានៃការជួបជុំគ្រួសារ
ការដឹងគុណបុព្វការីជន
និងការថែរក្សាប្រពៃណីខ្មែរ។

រាប់ថយក្រោយដល់ថ្ងៃភ្ជុំបិណ្ឌ
និងរៀបចំដំណើរត្រឡប់ទៅស្រុករបស់អ្នក។
```

English:

```text
Pchum Ben Festival

A time for family, remembrance,
gratitude and Cambodian tradition.

Count down to Pchum Ben
and plan your journey home.
```

---

# 94. Core UX Principle

The application must always answer four questions first:

```text
1. What festival day is today?
2. How long until Pchum Ben?
3. When am I going home?
4. What do I still need to prepare?
```

Everything else is secondary.

Do not turn this into a complicated management system.

---

# 95. Final MVP Experience

The desired final experience should look conceptually like:

```text
────────────────────────────────────────────

           ពិធីបុណ្យភ្ជុំបិណ្ឌ

          ១១ តុលា ២០២៦

              នៅសល់

        ០៦ ថ្ងៃ  ០៧ ម៉ោង

       [ រៀបចំថ្ងៃទៅស្រុក ]

────────────────────────────────────────────

ថ្ងៃនេះ

បិណ្ឌទី ៩
៥ តុលា ២០២៦

────────────────────────────────────────────

🏠 ទៅស្រុករបស់ខ្ញុំ

៦ តុលា ២០២៦

នៅសល់ ១ ថ្ងៃទៀត ❤️

Phnom Penh → Kampong Cham

────────────────────────────────────────────

ការត្រៀមខ្លួន

72%

18 / 25 Completed

────────────────────────────────────────────

បិណ្ឌទាំង ១៥ ថ្ងៃ

1 ✓  2 ✓  3 ✓  ...  9 ●  ... 15 ★

────────────────────────────────────────────

Upcoming

Buy Bus Ticket
Today • 6:00 PM

────────────────────────────────────────────

October 2026

Festival Calendar

────────────────────────────────────────────
```

---

# 96. Definition of Done

The project is considered MVP-ready when a user can:

1. Open the site without creating an account.
2. Immediately see the Pchum Ben countdown.
3. Know which Kan Ben day it is.
4. Browse all 15 festival days.
5. View the festival calendar.
6. Select "I will go home 5 days before Pchum Ben."
7. Automatically receive the calculated travel date.
8. See a personalized countdown to going home.
9. Add personal preparation activities.
10. Create and complete a checklist.
11. Plan pagoda visits.
12. Switch between Khmer and English.
13. Refresh or close the browser without losing their saved information.
14. Export their data as a backup.
15. Import that data later.
16. Use the same experience comfortably on mobile, tablet, and desktop.

---

# 97. Product Vision

This should not only be a countdown website.

The MVP should feel like a small digital companion for Pchum Ben:

> **Know the day.  
> Remember the tradition.  
> Prepare for the festival.  
> Plan the journey.  
> Return home to family.**

Khmer:

> **ដឹងថ្ងៃបុណ្យ  
> ចងចាំប្រពៃណី  
> រៀបចំខ្លួន  
> គ្រោងដំណើរ  
> ត្រឡប់ទៅជួបជុំគ្រួសារ។**

That is the central experience all design and development decisions should support.

---

# 98. Final Instruction to the Development Agent

Build the complete application, not static mockups.

Every CTA, dialog, form, calendar interaction, local-storage operation, language switch, countdown, checklist action, edit action, delete action and responsive state must function.

Use:

```text
Next.js
React
TypeScript
Material UI
Zustand
Day.js
Zod
LocalStorage
SessionStorage
Cookies
```

Do not introduce a backend.

Do not use dummy buttons.

Do not leave non-functional UI controls.

Do not hard-code personal user data.

Keep all festival configuration separate from component code.

Prioritize:

```text
cultural respect
correct date logic
Khmer-first UX
clean responsive design
simple navigation
frontend reliability
local privacy
accessibility
maintainable architecture
```

The finished product should be suitable for a real public-facing Cambodian Pchum Ben festival website and personal festival planning experience.