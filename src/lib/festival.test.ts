import { describe, expect, it } from "vitest";
import { checklistPercentage, daysBeforePchumBen, getFestivalStatus, getPublicHolidays, toKhmerNumerals } from "./festival";
import { calculateCountdown } from "@/features/countdown/useCountdown";

describe("Pchum Ben business logic", () => {
  it("detects Kan Ben #1", () => expect(getFestivalStatus("2026-09-27").kanBenNumber).toBe(1));
  it("detects Kan Ben #9", () => expect(getFestivalStatus("2026-10-05").kanBenNumber).toBe(9));
  it("detects Pchum Ben on day 15", () => {
    const status = getFestivalStatus("2026-10-11");
    expect(status.kanBenNumber).toBe(15);
    expect(status.isPchumBen).toBe(true);
  });
  it("calculates five days before Pchum Ben", () => expect(daysBeforePchumBen(5)).toBe("2026-10-06"));
  it("calculates checklist percentage", () => expect(checklistPercentage(8, 10)).toBe(80));
  it("finds Cambodia public holidays", () => expect(getPublicHolidays("2026-10-29")[0]?.nameEn).toContain("Coronation"));
  it("converts Khmer numerals", () => expect(toKhmerNumerals("2026")).toBe("២០២៦"));
  it("never returns negative countdown", () => {
    const countdown = calculateCountdown("2020-01-01T00:00:00Z", Date.now());
    expect(countdown.totalMilliseconds).toBe(0);
    expect(countdown.days).toBe(0);
  });
});
