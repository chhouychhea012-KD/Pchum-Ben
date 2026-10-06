"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import type { AppSettings, ChecklistItem, FestivalEvent, HomecomingPlan, LocalProfile, PagodaVisit } from "@/types";

const now = () => new Date().toISOString();
const id = () => typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

const defaultChecklist: ChecklistItem[] = [
  ["Request leave","travel"], ["Book transportation","travel"], ["Prepare luggage","travel"], ["Check departure time","travel"], ["Prepare transportation cost","travel"],
  ["Call family","family"], ["Confirm family gathering","family"], ["Prepare gifts","family"],
  ["Choose pagoda","pagoda"], ["Prepare offerings","pagoda"], ["Prepare food","pagoda"], ["Prepare candles/incense","pagoda"],
  ["Finish work","personal"], ["Charge phone","personal"], ["Prepare clothes","personal"], ["Prepare cash","personal"],
].map(([title, category], order) => ({ id: `default-${order}`, title, category: category as ChecklistItem["category"], completed: false, order, createdAt: now(), updatedAt: now() }));

interface State {
  hydrated: boolean;
  profile: LocalProfile | null;
  homecoming: HomecomingPlan | null;
  events: FestivalEvent[];
  checklist: ChecklistItem[];
  pagodaVisits: PagodaVisit[];
  settings: AppSettings;
  setHydrated(v: boolean): void;
  setProfile(p: Omit<LocalProfile, "createdAt" | "updatedAt">): void;
  setHomecoming(p: Omit<HomecomingPlan, "id" | "createdAt" | "updatedAt">): void;
  clearHomecoming(): void;
  addEvent(e: Omit<FestivalEvent, "id" | "createdAt" | "updatedAt">): void;
  updateEvent(idv: string, patch: Partial<FestivalEvent>): void;
  deleteEvent(idv: string): void;
  addChecklist(i: Omit<ChecklistItem, "id" | "order" | "createdAt" | "updatedAt">): void;
  updateChecklist(idv: string, patch: Partial<ChecklistItem>): void;
  deleteChecklist(idv: string): void;
  reorderChecklist(idv: string, direction: -1 | 1): void;
  addPagoda(v: Omit<PagodaVisit, "id" | "createdAt" | "updatedAt">): void;
  updatePagoda(idv: string, patch: Partial<PagodaVisit>): void;
  deletePagoda(idv: string): void;
  setSettings(patch: Partial<AppSettings>): void;
  replaceData(data: Partial<Pick<State,"profile"|"homecoming"|"events"|"checklist"|"pagodaVisits"|"settings">>): void;
  clearAll(): void;
}

const defaultSettings: AppSettings = { locale: "km", theme: "light", khmerNumerals: true, reminders: true, welcomeSeen: false };

export const useAppStore = create<State>()(persist((set, get) => ({
  hydrated: false,
  profile: null,
  homecoming: null,
  events: [],
  checklist: defaultChecklist,
  pagodaVisits: [],
  settings: defaultSettings,
  setHydrated: (hydrated) => set({ hydrated }),
  setProfile: (p) => set((s) => ({ profile: { ...p, createdAt: s.profile?.createdAt ?? now(), updatedAt: now() } })),
  setHomecoming: (p) => set((s) => ({ homecoming: { ...p, id: s.homecoming?.id ?? id(), createdAt: s.homecoming?.createdAt ?? now(), updatedAt: now() } })),
  clearHomecoming: () => set({ homecoming: null }),
  addEvent: (e) => set((s) => ({ events: [...s.events, { ...e, id: id(), createdAt: now(), updatedAt: now() }] })),
  updateEvent: (idv, patch) => set((s) => ({ events: s.events.map((x) => x.id === idv ? { ...x, ...patch, updatedAt: now() } : x) })),
  deleteEvent: (idv) => set((s) => ({ events: s.events.filter((x) => x.id !== idv) })),
  addChecklist: (i) => set((s) => ({ checklist: [...s.checklist, { ...i, id: id(), order: s.checklist.length, createdAt: now(), updatedAt: now() }] })),
  updateChecklist: (idv, patch) => set((s) => ({ checklist: s.checklist.map((x) => x.id === idv ? { ...x, ...patch, updatedAt: now() } : x) })),
  deleteChecklist: (idv) => set((s) => ({ checklist: s.checklist.filter((x) => x.id !== idv).map((x, order) => ({ ...x, order })) })),
  reorderChecklist: (idv, direction) => set((s) => {
    const list = [...s.checklist].sort((a,b)=>a.order-b.order); const i = list.findIndex((x)=>x.id===idv); const j=i+direction;
    if (i<0 || j<0 || j>=list.length) return {};
    [list[i],list[j]]=[list[j],list[i]]; return { checklist: list.map((x, order)=>({...x,order})) };
  }),
  addPagoda: (v) => set((s) => ({ pagodaVisits: [...s.pagodaVisits, { ...v, id: id(), createdAt: now(), updatedAt: now() }] })),
  updatePagoda: (idv, patch) => set((s) => ({ pagodaVisits: s.pagodaVisits.map((x) => x.id===idv ? {...x,...patch,updatedAt:now()} : x) })),
  deletePagoda: (idv) => set((s) => ({ pagodaVisits: s.pagodaVisits.filter((x) => x.id!==idv) })),
  setSettings: (patch) => { const next={...get().settings,...patch}; Cookies.set("pchumben_locale", next.locale, { expires: 365 }); Cookies.set("pchumben_theme", next.theme, { expires: 365 }); set({ settings: next }); },
  replaceData: (data) => set((s)=>({ ...s, ...data, hydrated: true })),
  clearAll: () => set({ profile:null, homecoming:null, events:[], checklist:defaultChecklist, pagodaVisits:[], settings:defaultSettings, hydrated:true }),
}), {
  name: "pchumben.app.v1",
  version: 1,
  migrate: (persisted) => persisted as State,
  storage: createJSONStorage(() => localStorage),
  skipHydration: true,
  partialize: (s) => ({ profile:s.profile, homecoming:s.homecoming, events:s.events, checklist:s.checklist, pagodaVisits:s.pagodaVisits, settings:s.settings }),
  onRehydrateStorage: () => (state) => state?.setHydrated(true),
}));
