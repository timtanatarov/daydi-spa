"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { inter, playfairDisplay } from "@/shared/fonts/course";
import { BurgerMenuButton } from "@/shared/ui/burger-button";

/** Разделы лендинга: id блоков страницы и подписи в меню. */
const LINKS = [
  { id: "about", label: "Обо мне" },
  { id: "steps", label: "Как накручивают цены" },
  { id: "prices", label: "Сравнение цен" },
  { id: "results", label: "Что даст курс" },
  { id: "roadmap", label: "Дорожная карта курса" },
  { id: "buy", label: "Тарифы" },
] as const;

/**
 * Кнопка-бургер и боковое меню. Меню — модальный <dialog>: браузер сам держит фокус внутри,
 * закрывает по Esc и возвращает фокус на кнопку. Панель выезжает справа; в ней только разделы
 * страницы — пункт прокручивает к разделу и закрывает меню.
 */
export function SideMenu() {
  const menuId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  // состояние обновит событие close: оно приходит и при Esc
  const close = () => dialogRef.current?.close();

  // пока меню открыто, страница под ним не прокручивается, а края экрана телефона (зоны под
  // строкой состояния и под панелью браузера, их красит фон страницы) — цвета панели меню:
  // см. правило html[data-menu-open] в globals.css
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    root.setAttribute("data-menu-open", "");
    return () => {
      root.style.overflow = previous;
      root.removeAttribute("data-menu-open");
    };
  }, [open]);

  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    // раздела на этой странице нет — пусть сработает обычная ссылка
    if (!target) return;
    event.preventDefault();
    close();
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // после закрытия: окно возвращает фокус кнопке, прокрутку начинаем следующим кадром
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    });
  };

  return (
    <>
      <BurgerMenuButton
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={show}
      />
      <dialog
        ref={dialogRef}
        id={menuId}
        aria-label="Меню"
        onClose={() => setOpen(false)}
        // щелчок по затемнению вокруг панели приходит на сам dialog, по панели — на её содержимое
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className={`${inter.variable} ${playfairDisplay.variable} fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(20rem,86vw)] max-w-none overflow-y-auto overscroll-contain bg-[#F6F5F1] p-0 text-[#49301C] shadow-[-8px_0_32px_rgba(42,31,24,0.25)] transition-[translate] duration-300 ease-out backdrop:bg-black/60 motion-reduce:transition-none starting:open:translate-x-full`}
      >
        <div className="px-7 pt-4 pb-8">
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={close}
            className="-mr-3 ml-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded-full outline-none hover:bg-[#49301C]/10 focus-visible:outline-2 focus-visible:outline-[#49301C]"
          >
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            >
              <path d="M3 3l14 14M17 3L3 17" />
            </svg>
          </button>

          <nav aria-label="Разделы страницы" className="mt-4">
            <ul role="list" className="flex flex-col gap-4">
              {LINKS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(event) => go(event, id)}
                    className="font-playfair block text-[22px] leading-[1.2] underline-offset-4 outline-none hover:underline focus-visible:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
