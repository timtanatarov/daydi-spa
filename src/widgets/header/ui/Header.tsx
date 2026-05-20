import { BurgerMenuButton } from "@/shared/ui/burger-button";

export function Header() {
  return (
    <header className="w-full border-b bg-black/85">
      <div className="flex w-full items-center justify-end px-4 py-4">
        <BurgerMenuButton />
      </div>
    </header>
  );
}
