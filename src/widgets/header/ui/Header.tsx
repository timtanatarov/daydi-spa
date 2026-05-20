import { BurgerMenuButton } from "@/shared/ui/burger-button";

export function Header() {
  return (
    <header className="pointer-events-none fixed top-4 right-4 z-50">
      <div className="pointer-events-auto">
        <BurgerMenuButton />
      </div>
    </header>
  );
}
