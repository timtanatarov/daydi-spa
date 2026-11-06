import { SideMenu } from "./SideMenu";

export function Header() {
  return (
    <header className="pointer-events-none fixed top-4 right-4 z-50">
      <div className="pointer-events-auto">
        <SideMenu />
      </div>
    </header>
  );
}
