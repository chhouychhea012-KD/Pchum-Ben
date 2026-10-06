export type Locale = "km" | "en";
export type ThemeMode = "light" | "dark";
export type TransportType = "car" | "bus" | "van" | "motorbike" | "train" | "flight" | "other";
export type EventType = "travel" | "pagoda" | "family" | "shopping" | "preparation" | "ceremony" | "other";
export type EventStatus = "planned" | "completed" | "cancelled";
export type ChecklistCategory = "travel" | "family" | "pagoda" | "shopping" | "personal" | "other";

export interface LocalProfile {
  displayName?: string;
  nickname?: string;
  hometownProvince?: string;
  currentCity?: string;
  locale: Locale;
  createdAt: string;
  updatedAt: string;
}

export interface HomecomingPlan {
  id: string;
  departureDate: string;
  departureTime?: string;
  daysBeforePchumBen?: number;
  origin?: string;
  destination?: string;
  transportType?: TransportType;
  ticketBooked: boolean;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FestivalEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  type: EventType;
  status: EventStatus;
  reminder?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  category: ChecklistCategory;
  completed: boolean;
  dueDate?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PagodaVisit {
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

export interface AppSettings {
  locale: Locale;
  theme: ThemeMode;
  khmerNumerals: boolean;
  reminders: boolean;
  welcomeSeen: boolean;
}
