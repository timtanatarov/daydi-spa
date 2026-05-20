/** Круглая кнопка «бургер» — телесный фон, коричневые полоски */

type Props = { className?: string };

export function BurgerMenuButton({ className }: Props) {
  return (
    <button
      aria-label="Меню"
      type="button"
      className={
        [
          "flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full bg-[#e3dfda] text-[#49301c] shadow-[0_2px_8px_rgba(73,48,28,0.12)] transition-colors hover:bg-[#d9d4cf] active:scale-95",
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
