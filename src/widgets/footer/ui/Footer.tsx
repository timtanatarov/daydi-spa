import { Button } from "@/shared/ui/button";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 text-sm">
        <div>© {new Date().getFullYear()} Daydi</div>
        <div className="flex items-center gap-2">
          <Button>Кнопка A</Button>
          <Button>Кнопка B</Button>
        </div>
      </div>
    </footer>
  );
}
