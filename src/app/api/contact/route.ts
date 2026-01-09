import { NextResponse } from "next/server";
import { appendToSheet } from "@/server/googleSheets";

export const runtime = "nodejs"; // googleapis требует Node.js runtime
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, telegram } = body as {
      name?: string;
      email?: string;
      phone?: string;
      telegram?: string;
    };

    if (!email && !phone && !telegram) {
      return NextResponse.json(
        { ok: false, error: "Заполните хотя бы один контакт" },
        { status: 400 },
      );
    }

    // Формат для Google Sheets, который парсится как дата: yyyy-MM-dd HH:mm (без Z)
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const ts = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;

    await appendToSheet([ts, name ?? "", email ?? "", phone ?? "", telegram ?? ""]);

    return NextResponse.json({ ok: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("/api/contact error", e);
    return NextResponse.json({ ok: false, error: e?.message ?? "Server error" }, { status: 500 });
  }
}
