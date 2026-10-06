"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, Card, CardContent, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import { formatDate, getPublicHolidays, kanBenForDate, toKhmerNumerals } from "@/lib/festival";
import { useAppStore } from "@/stores/app-store";

export default function CalendarPage() {
  const s = useAppStore((x) => x.settings);
  const events = useAppStore((x) => x.events);
  const [month, setMonth] = useState("2026-10");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = sessionStorage.getItem("pchumben.session.calendarMonth");
      if (saved) setMonth(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const move = (delta: number) => {
    const nextMonth = dayjs(`${month}-01`).add(delta, "month").format("YYYY-MM");
    setMonth(nextMonth);
    sessionStorage.setItem("pchumben.session.calendarMonth", nextMonth);
  };

  const start = dayjs(`${month}-01`);
  const cells = useMemo(() => {
    const base = dayjs(`${month}-01`);
    const monthDays = base.daysInMonth();
    const firstWeekday = base.day();
    return Array.from({ length: Math.ceil((firstWeekday + monthDays) / 7) * 7 }, (_, index) => {
      const day = index - firstWeekday + 1;
      return day >= 1 && day <= monthDays ? base.date(day).format("YYYY-MM-DD") : null;
    });
  }, [month]);

  const val = (value: number | string) => s.locale === "km" && s.khmerNumerals ? toKhmerNumerals(value) : value;
  const selectedEvents = selected ? events.filter((event) => event.date === selected) : [];
  const selectedHolidays = selected ? getPublicHolidays(selected) : [];

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="overline" color="secondary.main" sx={{ fontWeight: 800 }}>
        FESTIVAL CALENDAR
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: 900 }}>
        {s.locale === "km" ? "ប្រតិទិនភ្ជុំបិណ្ឌ" : "Pchum Ben Calendar"}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        {s.locale === "km" ? "បង្ហាញថ្ងៃកាន់បិណ្ឌ ថ្ងៃឈប់សម្រាក និងផែនការផ្ទាល់ខ្លួន។" : "Shows Kan Ben days, official holidays and your personal plans."}
      </Typography>

      <Card>
        <CardContent>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <IconButton onClick={() => move(-1)} aria-label="previous month">
              <ChevronLeftRounded />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              {new Intl.DateTimeFormat(s.locale === "km" ? "km-KH" : "en-US", { month: "long", year: "numeric" }).format(start.toDate())}
            </Typography>
            <IconButton onClick={() => move(1)} aria-label="next month">
              <ChevronRightRounded />
            </IconButton>
          </Stack>

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: { xs: .5, sm: 1 } }}>
            {(s.locale === "km" ? ["អា", "ច", "អ", "ព", "ព្រ", "សុ", "ស"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]).map((day) => (
              <Typography key={day} align="center" variant="caption" color="text.secondary" sx={{ fontWeight: 800, py: 1 }}>
                {day}
              </Typography>
            ))}

            {cells.map((date, index) => {
              if (!date) return <Box key={`blank-${index}`} />;
              const kb = kanBenForDate(date);
              const holidays = getPublicHolidays(date);
              const isHoliday = holidays.length > 0;
              const count = events.filter((event) => event.date === date).length;

              return (
                <Box
                  component="button"
                  key={date}
                  onClick={() => setSelected(date)}
                  aria-label={date}
                  sx={{
                    appearance: "none",
                    font: "inherit",
                    textAlign: "left",
                    minHeight: { xs: 88, sm: 116 },
                    p: { xs: .75, sm: 1 },
                    border: "1px solid",
                    borderColor: kb?.isPchumBen ? "secondary.main" : isHoliday ? "error.main" : kb ? "primary.light" : "divider",
                    backgroundColor: isHoliday ? "rgba(211,47,47,.07)" : kb ? "rgba(122,38,58,.04)" : "background.paper",
                    color: "text.primary",
                    cursor: "pointer",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: .5 }}>
                    <Typography sx={{ fontWeight: 900 }}>{val(dayjs(date).date())}</Typography>
                    {isHoliday && <Chip size="small" color="error" label={s.locale === "km" ? "ឈប់" : "Off"} />}
                  </Stack>
                  {kb && (
                    <Chip
                      size="small"
                      color={kb.isPchumBen ? "secondary" : "primary"}
                      label={kb.isPchumBen ? "★ PB" : `${s.locale === "km" ? "ប" : "B"}${val(kb.number)}`}
                      sx={{ mt: .5, maxWidth: "100%" }}
                    />
                  )}
                  {isHoliday && (
                    <Typography variant="caption" color="error.main" sx={{ fontWeight: 800, display: "block", mt: .5 }}>
                      {holidays[0][s.locale === "km" ? "nameKm" : "nameEn"]}
                    </Typography>
                  )}
                  {count > 0 && (
                    <Typography variant="caption" color="success.main" sx={{ fontWeight: 800, display: "block" }}>
                      • {val(count)} {s.locale === "km" ? "ផែនការ" : "plan"}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>

          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 2, mt: 2 }}>
            <Typography variant="caption">● Kan Ben</Typography>
            <Typography variant="caption">★ Pchum Ben</Typography>
            <Typography variant="caption" color="error.main">ឈប់ / Day off</Typography>
            <Typography variant="caption">• Personal Event</Typography>
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onClose={() => setSelected(null)} fullWidth maxWidth="sm">
        <DialogTitle>{selected && formatDate(selected, s.locale, s.khmerNumerals)}</DialogTitle>
        <DialogContent>
          {selected && (
            <>
              {kanBenForDate(selected) && (
                <AlertLine text={`${s.locale === "km" ? "បិណ្ឌទី" : "Kan Ben #"}${val(kanBenForDate(selected)!.number)}${kanBenForDate(selected)?.isPchumBen ? " • Pchum Ben" : ""}`} />
              )}
              {selectedHolidays.map((holiday) => (
                <AlertLine key={`${holiday.date}-${holiday.nameEn}`} tone="holiday" text={`${s.locale === "km" ? "ឈប់សម្រាក៖ " : "Day off: "}${holiday[s.locale === "km" ? "nameKm" : "nameEn"]}`} />
              ))}
              <Typography sx={{ fontWeight: 800, mt: 2, mb: 1 }}>
                {s.locale === "km" ? "ផែនការរបស់ខ្ញុំ" : "My Plan"}
              </Typography>
              {selectedEvents.length ? selectedEvents.map((event) => (
                <Box key={event.id} sx={{ py: 1, borderBottom: 1, borderColor: "divider" }}>
                  <Typography sx={{ fontWeight: 700 }}>{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{event.startTime || ""} • {event.status}</Typography>
                </Box>
              )) : (
                <Typography color="text.secondary">
                  {s.locale === "km" ? "មិនមានផែនការសម្រាប់ថ្ងៃនេះ។" : "No plans for this day."}
                </Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelected(null)}>{s.locale === "km" ? "បិទ" : "Close"}</Button>
          <Button component={Link} href={`/my-plan/schedule?date=${selected || ""}`} startIcon={<AddRounded />} variant="contained">
            {s.locale === "km" ? "បន្ថែមផែនការ" : "Add Plan"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function AlertLine({ text, tone = "default" }: { text: string; tone?: "default" | "holiday" }) {
  return (
    <Box sx={{ p: 1.2, bgcolor: tone === "holiday" ? "rgba(211,47,47,.08)" : "action.hover", color: tone === "holiday" ? "error.main" : "text.primary", mb: 1 }}>
      <Typography sx={{ fontWeight: 800 }}>{text}</Typography>
    </Box>
  );
}
