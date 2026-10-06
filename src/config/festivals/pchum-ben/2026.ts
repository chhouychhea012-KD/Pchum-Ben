export const pchumBen2026 = {
  year: 2026,
  timezone: "Asia/Phnom_Penh",
  observanceStart: "2026-09-27",
  observanceEnd: "2026-10-11",
  pchumBenDate: "2026-10-11",
  pchumBenTarget: "2026-10-11T00:00:00+07:00",
  officialHolidayStart: "2026-10-10",
  officialHolidayEnd: "2026-10-12",
  publicHolidays: [
    { date: "2026-01-01", nameEn: "International New Year's Day", nameKm: "ទិវាចូលឆ្នាំសកល" },
    { date: "2026-01-07", nameEn: "Victory Day over Genocide", nameKm: "ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍" },
    { date: "2026-03-08", nameEn: "International Women's Day", nameKm: "ទិវានារីអន្តរជាតិ" },
    { date: "2026-04-14", nameEn: "Khmer New Year", nameKm: "ពិធីបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ" },
    { date: "2026-04-15", nameEn: "Khmer New Year", nameKm: "ពិធីបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ" },
    { date: "2026-04-16", nameEn: "Khmer New Year", nameKm: "ពិធីបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ" },
    { date: "2026-05-01", nameEn: "International Labour Day", nameKm: "ទិវាពលកម្មអន្តរជាតិ" },
    { date: "2026-05-01", nameEn: "Visak Bochea Day", nameKm: "ពិធីបុណ្យវិសាខបូជា" },
    { date: "2026-05-05", nameEn: "Royal Ploughing Ceremony", nameKm: "ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល" },
    { date: "2026-05-14", nameEn: "King Norodom Sihamoni's Birthday", nameKm: "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្មព្រះមហាក្សត្រ" },
    { date: "2026-06-18", nameEn: "Queen Mother's Birthday", nameKm: "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្មសម្តេចព្រះមហាក្សត្រី ព្រះវររាជមាតាជាតិខ្មែរ" },
    { date: "2026-09-24", nameEn: "Constitutional Day", nameKm: "ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ" },
    { date: "2026-10-10", nameEn: "Pchum Ben Festival", nameKm: "ពិធីបុណ្យភ្ជុំបិណ្ឌ" },
    { date: "2026-10-11", nameEn: "Pchum Ben Festival", nameKm: "ពិធីបុណ្យភ្ជុំបិណ្ឌ" },
    { date: "2026-10-12", nameEn: "Pchum Ben Festival", nameKm: "ពិធីបុណ្យភ្ជុំបិណ្ឌ" },
    { date: "2026-10-15", nameEn: "Commemoration Day of the King Father", nameKm: "ទិវាប្រារព្ធពិធីគោរពព្រះវិញ្ញាណក្ខន្ធព្រះបរមរតនកោដ្ឋ" },
    { date: "2026-10-29", nameEn: "King Norodom Sihamoni's Coronation Day", nameKm: "ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិរបស់ព្រះមហាក្សត្រ" },
    { date: "2026-11-09", nameEn: "National Independence Day", nameKm: "ទិវាបុណ្យឯករាជ្យជាតិ" },
    { date: "2026-11-23", nameEn: "Water Festival", nameKm: "ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ អកអំបុក" },
    { date: "2026-11-24", nameEn: "Water Festival", nameKm: "ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ អកអំបុក" },
    { date: "2026-11-25", nameEn: "Water Festival", nameKm: "ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ អកអំបុក" },
    { date: "2026-12-29", nameEn: "Peace Day in Cambodia", nameKm: "ទិវាសន្តិភាពនៅកម្ពុជា" },
  ],
  totalDays: 15,
  kanBenDays: Array.from({ length: 15 }, (_, index) => {
    const start = new Date(Date.UTC(2026, 8, 27));
    start.setUTCDate(start.getUTCDate() + index);
    return {
      number: index + 1,
      date: start.toISOString().slice(0, 10),
      isPchumBen: index === 14,
      lunarLabelKm: `${index + 1} រោច ខែភទ្របទ`,
    };
  }),
} as const;

export type FestivalConfig = typeof pchumBen2026;
