import Link from "next/link";
import Image from "next/image";
import DesktopLogo from "../../public/Group 427320181.png";
import MobileLogo from "../../public/Group 427320182.png";
import { UserNav } from "./UserNav";
import { SearchModalComponent } from "./SearchComponent";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="w-32 hidden lg:block"
          />
          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className="block w-8 lg:hidden"
          />
        </Link>

        <SearchModalComponent />

        <UserNav />
      </div>
    </nav>
  );
}
