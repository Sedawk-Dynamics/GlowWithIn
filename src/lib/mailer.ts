import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { contact } from "./links";

let cached: Transporter | null = null;

export function mailerConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter(): Transporter {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT === "465",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return cached;
}

const FROM = process.env.SMTP_FROM || `GlowWithin <${contact.email}>`;
const TO = process.env.CONTACT_TO || contact.email;

export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

interface SendArgs {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

/** Sends when SMTP is configured; no-ops with a warning otherwise (local dev). */
export async function sendMail({ subject, html, text, replyTo }: SendArgs): Promise<void> {
  if (!mailerConfigured()) {
    console.warn("[mailer] SMTP not configured — skipping send. Set SMTP_* env vars to enable email.");
    return;
  }
  await getTransporter().sendMail({ from: FROM, to: TO, replyTo, subject, html, text });
}

/** Tiny in-memory rate limiter (per serverless instance). */
const hits = new Map<string, number[]>();
export function rateLimited(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  return arr.length > limit;
}
