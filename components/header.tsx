import { MainNav } from "./main-nav";
import UserButton from "./user-button";

export default function Header() {
  return (
    <header className="w-full border-b-[1.1px] border-gray-700">
      <div className="flex items-center justify-between w-full h-16 max-w-5xl px-4 mx-auto sm:px-6">
        <MainNav />
        <UserButton />
      </div>
    </header>
  );
}
