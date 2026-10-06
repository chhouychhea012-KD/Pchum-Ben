"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AppBar, Box, BottomNavigation, BottomNavigationAction, Button, Container, IconButton, Stack, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import HomeRounded from "@mui/icons-material/HomeRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import TimelineRounded from "@mui/icons-material/TimelineRounded";
import EventNoteRounded from "@mui/icons-material/EventNoteRounded";
import InfoRounded from "@mui/icons-material/InfoRounded";
import SettingsRounded from "@mui/icons-material/SettingsRounded";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import { useAppStore } from "@/stores/app-store";
import { t } from "@/lib/i18n";
import enIcon from "@/image/logo/en.png";
import khIcon from "@/image/logo/kh.png";
import logo from "@/image/logo/logo-removebg.png";

const nav = [
["/", "navHome", HomeRounded], ["/calendar", "navCalendar", CalendarMonthRounded], ["/timeline", "navTimeline", TimelineRounded], ["/my-plan", "navPlan", EventNoteRounded], ["/about", "navAbout", InfoRounded]] as
const;

export default function AppShell({ children }: {children: React.ReactNode;}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const pathname = usePathname();const settings = useAppStore((s) => s.settings);const setSettings = useAppStore((s) => s.setSettings);const theme = useTheme();const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const selected = nav.findIndex(([href]) => href === "/" ? pathname === "/" : pathname.startsWith(href));
  if (!mounted) return <Box sx={{ minHeight: "100vh" }} />;
  return <Box sx={{ minHeight: "100vh", pb: mobile ? 10 : 0 }}>
    <AppBar position="sticky" elevation={0} color="inherit" sx={{ borderBottom: 1, borderColor: "divider", backdropFilter: "blur(16px)", backgroundColor: "rgba(var(--mui-palette-background-paperChannel) / .88)" }}>
      <Container maxWidth="xl"><Toolbar disableGutters sx={{ minHeight: 72, gap: 2 }}>
        <Stack component={Link} href="/" direction="row" spacing={1.2} sx={{ alignItems: "center", textDecoration: "none", color: "inherit", mr: "auto" }}>
          <Box sx={{ width: 52, height: 52, display: "grid", placeItems: "center", flexShrink: 0 }}>
            <Image src={logo} alt="Pchum Ben logo" width={52} height={52} priority style={{ width: "52px", height: "52px", objectFit: "contain" }} />
          </Box>
          <Box><Typography sx={{ fontWeight: 800, lineHeight: 1.1 }}>ភ្ជុំបិណ្ឌ</Typography><Typography variant="caption" color="text.secondary">Pchum Ben 2026</Typography></Box>
        </Stack>
        {!mobile && <Stack direction="row" spacing={.5}>{nav.map(([href, key]) => <Button key={href} component={Link} href={href} color={pathname === href || href !== "/" && pathname.startsWith(href) ? "primary" : "inherit"}>{t(settings.locale, key)}</Button>)}</Stack>}
        <IconButton aria-label={`current language ${settings.locale === "km" ? "Khmer" : "English"}`} onClick={() => setSettings({ locale: settings.locale === "km" ? "en" : "km" })} sx={{ width: 44, height: 44 }}>
          <Image src={settings.locale === "km" ? khIcon : enIcon} alt={settings.locale === "km" ? "Khmer" : "English"} width={28} height={28} style={{ width: "28px", height: "28px", objectFit: "contain" }} />
        </IconButton>
        <IconButton aria-label="switch theme" onClick={() => setSettings({ theme: settings.theme === "light" ? "dark" : "light" })}>{settings.theme === "light" ? <DarkModeRounded /> : <LightModeRounded />}</IconButton>
        <IconButton component={Link} href="/settings" aria-label="settings"><SettingsRounded /></IconButton>
      </Toolbar></Container>
    </AppBar>
    <main>{children}</main>
    {!mobile && <Box component="footer" sx={{ mt: 8, py: 5, borderTop: 1, borderColor: "divider" }}><Container maxWidth="lg"><Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", gap: 2 }}><Box><Typography sx={{ fontWeight: 800 }}>ពិធីបុណ្យភ្ជុំបិណ្ឌ</Typography><Typography color="text.secondary" sx={{ maxWidth: 480 }}>{settings.locale === "km" ? "រក្សាវប្បធម៌ ប្រពៃណី និងការជួបជុំគ្រួសារខ្មែរ។" : "Celebrating Cambodian culture, tradition, remembrance and family."}</Typography></Box><Typography variant="body2" color="text.secondary">Frontend-only • Your plans stay on this device.</Typography></Stack></Container></Box>}
    {mobile && <BottomNavigation showLabels value={selected < 0 ? 0 : selected} sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1200, borderTop: 1, borderColor: "divider", height: 68 }}>{nav.slice(0, 5).map(([href, key, Icon]) => <BottomNavigationAction key={href} component={Link} href={href} label={t(settings.locale, key)} icon={<Icon />} />)}</BottomNavigation>}
  </Box>;
}
