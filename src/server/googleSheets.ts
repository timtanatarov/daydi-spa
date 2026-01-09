import { google } from "googleapis";

export async function appendToSheet(row: (string | number | null)[], options?: { range?: string }) {
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, GOOGLE_SHEETS_ID } =
    process.env as Record<string, string | undefined>;

  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !GOOGLE_SHEETS_ID) {
    throw new Error(
      "Missing Google Sheets env vars: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, GOOGLE_SHEETS_ID",
    );
  }

  const privateKey = GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Если имя листа локализовано (напр., "Лист1"), задайте GOOGLE_SHEETS_RANGE=Лист1!A1
  // Важно: пустая строка в .env приводит к недопустимому ":append". Нормализуем до "A1".
  const envRangeRaw = process.env.GOOGLE_SHEETS_RANGE;
  const envRange = envRangeRaw && envRangeRaw.trim() ? envRangeRaw.trim() : undefined;
  const range = options?.range ?? envRange ?? "A1";

  // Автоинициализация шапки/формата при первой записи
  const sheetTitle = parseSheetTitle(range);
  await maybeInitHeadersOnce(sheets, GOOGLE_SHEETS_ID, sheetTitle);

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEETS_ID,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

function parseSheetTitle(rangeOrTitle?: string): string | undefined {
  if (!rangeOrTitle) return undefined;
  if (rangeOrTitle.includes("!")) return rangeOrTitle.split("!")[0];
  // Если передан адрес ячейки/диапазона без названия листа (например, "A1" или "A1:E1"),
  // не считаем это названием листа
  const cellOrRange = /^[A-Za-z]+\d+(?::[A-Za-z]+\d+)?$/i;
  if (cellOrRange.test(rangeOrTitle)) return undefined;
  return rangeOrTitle;
}

async function ensureSheetId(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  sheetTitle?: string,
): Promise<number | undefined> {
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const list = meta.data.sheets || [];
  if (!sheetTitle) return (list[0]?.properties?.sheetId ?? undefined) as number | undefined;
  const found = list.find((s) => s.properties?.title === sheetTitle);
  return (found?.properties?.sheetId ?? undefined) as number | undefined;
}

async function maybeInitHeadersOnce(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  sheetTitle?: string,
) {
  // Проверяем, есть ли что-то в A1:E1; если пусто — инициализируем красиво
  const prefix = sheetTitle ? sheetTitle + "!" : "";
  const headerRange = `${prefix}A1:E1`;
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: headerRange });
  const row = res.data.values?.[0];
  const isEmpty = !row || row.every((c) => !c || String(c).trim() === "");
  if (isEmpty) {
    await initSheet({
      headers: ["Создано", "Имя", "Email", "Телефон", "Телеграм"],
      range: `${prefix}A1`,
    });
  }
}

export async function initSheet(options?: {
  headers?: string[];
  range?: string; // e.g., "Лист1!A1" — берём название листа из части до '!'
}) {
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, GOOGLE_SHEETS_ID } =
    process.env as Record<string, string | undefined>;

  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !GOOGLE_SHEETS_ID) {
    throw new Error(
      "Missing Google Sheets env vars: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, GOOGLE_SHEETS_ID",
    );
  }

  const privateKey = GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n");
  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const sheetTitle = parseSheetTitle(options?.range ?? process.env.GOOGLE_SHEETS_RANGE);
  const sheetId = await ensureSheetId(sheets, GOOGLE_SHEETS_ID, sheetTitle);

  const headers = options?.headers ?? ["Создано", "Имя", "Email", "Телефон", "Телеграм"];

  // 1) Запишем заголовки в A1:E1
  await sheets.spreadsheets.values.update({
    spreadsheetId: GOOGLE_SHEETS_ID,
    range: `${sheetTitle ? sheetTitle + "!" : ""}A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [headers] },
  });

  // 2) Применим форматирование: жирный, фон, белый текст, заморозка 1 строки, автоширина столбцов, формат даты в A
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requests: any[] = [];
  // Пастельные цвета для каждой колонки заголовков (A1..)
  const pastel = [
    { red: 0.98, green: 0.91, blue: 0.67 }, // мягкий жёлтый
    { red: 0.82, green: 0.95, blue: 0.82 }, // мятный
    { red: 0.75, green: 0.86, blue: 0.98 }, // голубой
    { red: 0.98, green: 0.81, blue: 0.9 }, // розовый
    { red: 0.87, green: 0.84, blue: 0.99 }, // сиреневый
  ];
  for (let i = 0; i < headers.length; i++) {
    const bg = pastel[i % pastel.length];
    requests.push({
      repeatCell: {
        range: {
          sheetId,
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: i,
          endColumnIndex: i + 1,
        },
        cell: {
          userEnteredFormat: {
            textFormat: { bold: true, foregroundColor: { red: 0.12, green: 0.15, blue: 0.2 } }, // тёмный текст
            backgroundColor: bg,
            horizontalAlignment: "LEFT",
          },
        },
        fields: "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)",
      },
    });
  }

  // Заморозка строки заголовка
  requests.push({
    updateSheetProperties: {
      properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
      fields: "gridProperties.frozenRowCount",
    },
  });

  // Формат даты для колонки A (Created At)
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 },
      cell: {
        userEnteredFormat: { numberFormat: { type: "DATE_TIME", pattern: "yyyy-mm-dd hh:mm" } },
      },
      fields: "userEnteredFormat.numberFormat",
    },
  });

  // Автоширина столбцов A..E
  requests.push({
    autoResizeDimensions: {
      dimensions: { sheetId, dimension: "COLUMNS", startIndex: 0, endIndex: headers.length },
    },
  });

  // Явно зададим ширину столбцов (пиксели) для удобства копирования/чтения
  const widths = [180, 200, 260, 180, 180];
  widths.slice(0, headers.length).forEach((px, i) => {
    requests.push({
      updateDimensionProperties: {
        range: { sheetId, dimension: "COLUMNS", startIndex: i, endIndex: i + 1 },
        properties: { pixelSize: px },
        fields: "pixelSize",
      },
    });
  });

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: GOOGLE_SHEETS_ID,
    requestBody: { requests },
  });
}
