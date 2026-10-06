import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import Providers from "@/components/Providers";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "ពិធីបុណ្យភ្ជុំបិណ្ឌ ២០២៦ | Pchum Ben Festival 2026",
  description: "រាប់ថយក្រោយដល់ពិធីបុណ្យភ្ជុំបិណ្ឌ មើលប្រតិទិនកាន់បិណ្ឌ ១៥ ថ្ងៃ និងរៀបចំផែនការធ្វើដំណើរទៅស្រុក។ Count down to Pchum Ben 2026 and plan your journey home.",
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="km" data-scroll-behavior="smooth" suppressHydrationWarning><body suppressHydrationWarning><AppRouterCacheProvider><Providers><AppShell>{children}</AppShell></Providers></AppRouterCacheProvider></body></html>}
