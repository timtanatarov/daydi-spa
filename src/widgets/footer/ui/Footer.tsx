import { BurgerMenuButton } from "@/shared/ui/burger-button";

export function Footer() {
  return (
    <footer className="w-full border-t bg-black/85">
      <div className="flex w-full items-center justify-end px-4 py-4">
        <BurgerMenuButton />
      </div>
    </footer>
  );
}
