import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail, esc, rateLimited } from "@/lib/mailer";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
  website: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (rateLimited(`contact:${ip}`)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please complete all required fields with a valid email address." }, { status: 400 });
  }

  const { name, email, phone, subject, message, website } = parsed.data;
  if (website && website.trim()) return NextResponse.json({ ok: true }); // honeypot tripped

  try {
    await sendMail({
      subject: `GlowWithin website enquiry: ${subject}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nSubject: ${subject}\n\n${message}`,
      html: `<h2 style="font-family:Georgia,serif">New enquiry from glowwithin.co.in</h2>
<p><strong>Name:</strong> ${esc(name)}</p>
<p><strong>Email:</strong> ${esc(email)}</p>
<p><strong>Phone:</strong> ${esc(phone || "-")}</p>
<p><strong>Subject:</strong> ${esc(subject)}</p>
<p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] send failed", e);
    return NextResponse.json({ ok: false, error: "We couldn't send your message. Please email us directly." }, { status: 500 });
  }
}
