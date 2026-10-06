"use client";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  LinearProgress,
  Stack,
  Typography } from
"@mui/material";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import RadioButtonCheckedRounded from "@mui/icons-material/RadioButtonCheckedRounded";
import RadioButtonUncheckedRounded from "@mui/icons-material/RadioButtonUncheckedRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import { activeFestival } from "@/config/festivals/pchum-ben";
import { formatDate, getFestivalStatus, toKhmerNumerals } from "@/lib/festival";
import { useAppStore } from "@/stores/app-store";

export default function TimelinePage() {
  const settings = useAppStore((x) => x.settings);
  const events = useAppStore((x) => x.events);
  const status = getFestivalStatus();
  const num = (v: number) =>
  settings.locale === "km" && settings.khmerNumerals ? toKhmerNumerals(v) : v;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="overline" color="secondary.main" sx={{ fontWeight: 800 }}>
        KAN BEN 2026
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: 900 }}>
        {settings.locale === "km" ?
        "១៥ ថ្ងៃនៃពិធីកាន់បិណ្ឌ និងភ្ជុំបិណ្ឌ" :
        "15 Days of Kan Ben & Pchum Ben"}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        {formatDate(activeFestival.observanceStart, settings.locale, settings.khmerNumerals)} —{" "}
        {formatDate(activeFestival.pchumBenDate, settings.locale, settings.khmerNumerals)}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
            <Typography sx={{ fontWeight: 800 }}>
              {settings.locale === "km" ? "វឌ្ឍនភាពពិធីបុណ្យ" : "Festival Progress"}
            </Typography>
            <Typography sx={{ fontWeight: 900 }}>
              {num(status.kanBenNumber ?? (status.isAfterFestival ? 15 : 0))} / {num(15)} •{" "}
              {num(status.progressPercentage)}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={status.progressPercentage}
            sx={{ height: 10, borderRadius: 8, mt: 2 }} />
          
        </CardContent>
      </Card>

      <Stack spacing={2}>
        {activeFestival.kanBenDays.map((day) => {
          const isToday = day.date === status.today;
          const isPast = day.date < status.today;
          const personalPlans = events.filter((event) => event.date === day.date).length;

          let Icon = RadioButtonUncheckedRounded;
          let label = settings.locale === "km" ? "នឹងមកដល់" : "Upcoming";
          let color: "default" | "primary" | "secondary" | "success" = "default";

          if (day.isPchumBen) {
            Icon = StarRounded;
            label = settings.locale === "km" ? "ថ្ងៃភ្ជុំបិណ្ឌ" : "Pchum Ben";
            color = "secondary";
          } else if (isToday) {
            Icon = RadioButtonCheckedRounded;
            label = settings.locale === "km" ? "ថ្ងៃនេះ" : "Today";
            color = "primary";
          } else if (isPast) {
            Icon = CheckCircleRounded;
            label = settings.locale === "km" ? "បានកន្លងផុត" : "Completed";
            color = "success";
          }

          return (
            <Card
              key={day.date}
              sx={{ borderColor: isToday ? "primary.main" : day.isPchumBen ? "secondary.main" : "divider" }}>
              
              <CardContent>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: { sm: "center" } }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: isToday ? "primary.main" : day.isPchumBen ? "secondary.main" : "action.hover",
                      color: isToday || day.isPchumBen ? "white" : "text.secondary"
                    }}>
                    
                    <Icon />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" sx={{ flexWrap: "wrap", alignItems: "center", gap: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        {settings.locale === "km" ? "បិណ្ឌទី" : "Kan Ben #"}
                        {num(day.number)}
                      </Typography>
                      <Chip size="small" color={color} label={label} />
                      {personalPlans > 0 &&
                      <Chip
                        size="small"
                        variant="outlined"
                        label={`${num(personalPlans)} ${settings.locale === "km" ? "ផែនការ" : "plans"}`} />

                      }
                    </Stack>
                    <Typography color="text.secondary">
                      {formatDate(day.date, settings.locale, settings.khmerNumerals)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {day.isPchumBen ?
                      settings.locale === "km" ?
                      "ថ្ងៃសំខាន់សម្រាប់ជួបជុំគ្រួសារ គោរពបុព្វការីជន និងទៅវត្ត។" :
                      "The principal day for family gathering, remembrance and pagoda observance." :
                      settings.locale === "km" ?
                      "ថ្ងៃកាន់បិណ្ឌ — អាចរៀបចំអាហារ គ្រឿងសក្ការៈ និងផែនការគ្រួសារ។" :
                      "Kan Ben observance day — prepare offerings, family plans and pagoda activities."}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>);

        })}
      </Stack>
    </Container>);

}
