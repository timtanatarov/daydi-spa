/** Кнопка «бургер» для компактной шапки/подвала без текста */

type Props = { className?: string };

export function BurgerMenuButton({ className }: Props) {
  return (
    <button
      aria-label="Меню"
      type="button"
      className={
        [
          "flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md border border-white/20 text-[#f6f5f1] hover:bg-white/10",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      }
    >
      <span aria-hidden className="block h-0.5 w-5 rounded-full bg-current" />
      <span aria-hidden className="block h-0.5 w-5 rounded-full bg-current" />
      <span aria-hidden className="block h-0.5 w-5 rounded-full bg-current" />
    </button>
  );
}
