/** Заглушка для viewport шире 480px */
export function DesktopComingSoon() {
  return (
    <main className="hidden min-h-screen min-[481px]:flex flex-col items-center justify-center bg-[#f6f5f1] px-8 text-center text-[#49301c]">
      <p className="max-w-md text-[28px] leading-snug font-semibold">
        Откройте сайт с телефона
      </p>
      <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-[#49301c]/75">
        Версия для компьютера в разработке
      </p>
    </main>
  );
}
