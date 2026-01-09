"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { z } from "zod";

const schema = z.object({
  email: z.string().email("Некорректный email"),
  telegram: z.string().min(2, "Юзернейм слишком короткий").optional(),
  // Храним только 10 цифр номера (без +7) и валидируем длину, если поле заполнено
  phone: z
    .string()
    .optional()
    .refine((v) => !v || v.replace(/\D/g, "").length === 10, "Некорректный номер телефона"),
  name: z.string().min(2, "Слишком короткое имя"),
});

type FormData = z.infer<typeof schema>;

export function ContactsPage() {
  const [phoneFocused, setPhoneFocused] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      phone: "",
      telegram: "",
      name: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const telegram = data.telegram
      ? data.telegram.startsWith("@")
        ? data.telegram
        : `@${data.telegram}`
      : "";
    const digits = (data.phone ?? "").replace(/\D/g, "");
    const phoneNormalized = digits ? `+7${digits}` : "";
    const payload = { ...data, telegram, phone: phoneNormalized };
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.error || "Не удалось отправить форму");
        }
      })
      .then(() => {
        console.log("FORM SENT TO GOOGLE SHEETS", payload);
      })
      .catch((err) => {
        console.error("FORM SEND ERROR", err);
      });
  };

  return (
    <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className="text-2xl font-bold">Свяжитесь со мной!</h3>
      </div>
      <div className="mt-2 w-full max-w-sm min-w-50">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            @
          </span>
          <input
            {...register("telegram", {
              setValueAs: (v) => (typeof v === "string" ? v.replace(/^@+/, "") : v),
            })}
            placeholder="telegram"
            onFocus={(e) => e.currentTarget.select()}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md pl-7 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow text-md"
          />
        </div>
        {errors.telegram && <span className="text-red-500">{errors.telegram.message}</span>}
      </div>
      <div className="mt-2 w-full max-w-sm min-w-50">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <input
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                const raw = e.target.value;
                // Мягкая "маска": убираем пробелы, приводим к нижнему регистру, фильтруем недопустимые символы
                const lowered = raw.toLowerCase().replace(/\s+/g, "");
                // Разрешаем символы email и единственный '@'
                let sanitized = lowered.replace(/[^a-z0-9@._%+\-]/g, "");
                const firstAt = sanitized.indexOf("@");
                if (firstAt !== -1) {
                  // Удаляем все последующие '@'
                  sanitized =
                    sanitized.slice(0, firstAt + 1) +
                    sanitized.slice(firstAt + 1).replace(/@/g, "");
                }
                field.onChange(sanitized);
              }}
              onFocus={(e) => {
                e.currentTarget.select();
              }}
              placeholder="Ваш email"
              inputMode="email"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700  border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow text-md"
            />
          )}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>
      <div className="mt-2 w-full max-w-sm min-w-50">
        <Controller
          control={control}
          name="phone"
          render={({ field }) => {
            const formatPhone = (digitsOnly: string) => {
              const d = digitsOnly.replace(/\D/g, "").slice(0, 10);
              const p1 = d.slice(0, 3);
              const p2 = d.slice(3, 6);
              const p3 = d.slice(6, 8);
              const p4 = d.slice(8, 10);
              let out = "+7";
              out += p1 ? ` (${p1}` : " (";
              out += p1 && p1.length === 3 ? ")" : "";
              out += p2 ? ` ${p2}` : "";
              out += p3 ? ` ${p3}` : "";
              out += p4 ? `-${p4}` : "";
              return out;
            };

            const digitsVal = field.value ?? "";
            const showMask = phoneFocused || !!digitsVal;

            return (
              <input
                value={showMask ? formatPhone(digitsVal) : ""}
                onFocus={(e) => {
                  setPhoneFocused(true);
                  const el = e.currentTarget;
                  // Дождёмся появления маски и затем выделим (избегаем пула событий React)
                  setTimeout(() => {
                    el && el.select();
                  }, 0);
                }}
                onBlur={() => {
                  if (!digitsVal) setPhoneFocused(false);
                }}
                onChange={(e) => {
                  const raw = e.target.value;
                  const all = raw.replace(/\D/g, "");
                  let digits = all;
                  // Если отображается маска с +7, исключаем ведущую 7 из хранимого значения
                  if (raw.trim().startsWith("+7")) {
                    digits = digits.replace(/^7/, "");
                  }
                  // Нормализуем до 10 цифр (на случай, если пользователь ввёл 7/8 перед номером)
                  if (digits.length > 10) {
                    digits = digits.slice(-10);
                  }
                  // Если пользователь удалил служебный символ (скобка/пробел) — цифры не меняются.
                  // В таком случае при backspace удаляем последнюю цифру для предсказуемого поведения.
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const inputType = (e.nativeEvent as any)?.inputType as string | undefined;
                  if (inputType === "deleteContentBackward" && (digitsVal || "") === digits) {
                    digits = (digitsVal || "").slice(0, -1);
                  }
                  field.onChange(digits);
                }}
                placeholder="Ваш номер телефона"
                inputMode="tel"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700  border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow text-md"
              />
            );
          }}
        />
        {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
      </div>
      <div className="mt-2 w-full max-w-sm min-w-50">
        <input
          {...register("name")}
          placeholder="Ваше имя"
          onFocus={(e) => e.currentTarget.select()}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700  border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow text-md"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>
      <div>
        <button
          type="submit"
          className="mt-2 w-full max-w-sm min-w-50 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease"
        >
          Отправить
        </button>
      </div>
    </form>
  );
}
