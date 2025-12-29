import { Button } from "@/shared/ui/button";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <div className="text-lg font-semibold">Daydi</div>
        <div className="flex items-center gap-2">
          <Button>Кнопка 1</Button>
          <Button>Кнопка 2</Button>
        </div>
      </div>
    </header>
  );
}
