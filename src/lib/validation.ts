import { z } from "zod";
export const registerSchema = z.object({ name:z.string().trim().min(2).max(60), email:z.string().trim().email().max(254).transform(v=>v.toLowerCase()), password:z.string().min(8).max(72) });
export const loginSchema = z.object({ email:z.string().trim().email().max(254).transform(v=>v.toLowerCase()), password:z.string().min(1).max(72) });
export const habitSchema = z.object({ name:z.string().trim().min(1).max(80), description:z.string().trim().max(300).default(""), color:z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#D9F279"), icon:z.string().max(24).default("sparkles"), frequency:z.enum(["daily","weekdays","weekly"]).default("daily") });
