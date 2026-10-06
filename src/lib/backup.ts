import { z } from "zod";

const locale = z.enum(["km", "en"]);
const theme = z.enum(["light", "dark"]);
const transport = z.enum(["car", "bus", "van", "motorbike", "train", "flight", "other"]);
const eventType = z.enum(["travel", "pagoda", "family", "shopping", "preparation", "ceremony", "other"]);
const eventStatus = z.enum(["planned", "completed", "cancelled"]);
const checklistCategory = z.enum(["travel", "family", "pagoda", "shopping", "personal", "other"]);

const profileSchema = z.object({
  displayName: z.string().optional(),
  nickname: z.string().optional(),
  hometownProvince: z.string().optional(),
  currentCity: z.string().optional(),
  locale,
  createdAt: z.string(),
  updatedAt: z.string(),
}).nullable();

const homecomingSchema = z.object({
  id: z.string(),
  departureDate: z.string(),
  departureTime: z.string().optional(),
  daysBeforePchumBen: z.number().int().min(0).max(365).optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  transportType: transport.optional(),
  ticketBooked: z.boolean(),
  note: z.string().max(1000).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).nullable();

const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  date: z.string(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  type: eventType,
  status: eventStatus,
  reminder: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const checklistSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100),
  category: checklistCategory,
  completed: z.boolean(),
  dueDate: z.string().optional(),
  order: z.number().int().min(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const pagodaSchema = z.object({
  id: z.string(),
  pagodaName: z.string().min(1).max(150),
  province: z.string().optional(),
  district: z.string().optional(),
  visitDate: z.string(),
  visitTime: z.string().optional(),
  familyMembers: z.array(z.string()).optional(),
  offerings: z.array(z.string()).optional(),
  note: z.string().max(1000).optional(),
  visited: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const settingsSchema = z.object({
  locale,
  theme,
  khmerNumerals: z.boolean(),
  reminders: z.boolean(),
  welcomeSeen: z.boolean(),
});

export const backupSchema = z.object({
  appVersion: z.string(),
  exportedAt: z.string(),
  profile: profileSchema,
  homecoming: homecomingSchema,
  events: z.array(eventSchema),
  checklist: z.array(checklistSchema),
  pagodaVisits: z.array(pagodaSchema),
  settings: settingsSchema,
});

export function validateBackup(data: unknown) {
  return backupSchema.safeParse(data);
}
