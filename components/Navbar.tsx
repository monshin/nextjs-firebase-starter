'use client';

import Link from 'next/link';
import { Menu, Search } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import ButtonLogout from './login/button/ButtonLogout';
import ButtonLogin from './login/button/ButtonLogin';

import {
  useAuthHadCheckLogin,
  useAuthToken,
} from '@/store/features/auth/hooks';

export default function Navbar() {
  const token = useAuthToken();
  const hadCheckLogin = useAuthHadCheckLogin();

  return (
    <header className="sticky w-screen top-0 left-0 z-[5000] px-6 py-4">
      <nav className="flex justify-between items-center gap-4 w-full">
        <div className="flex justify-between items-center gap-4">
          <div className="md:hidden">
            <button
              type="button"
              className="relative flex justify-center items-center text-gray-800 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent"
              aria-expanded="false"
              aria-controls="navbar"
              aria-label="Toggle navigation"
              data-hs-collapse="#navbar"
            >
              <Menu size={24} />
            </button>
          </div>
          <Link className="text-3xl" href="/">
            Logo
          </Link>
        </div>
        <div className="relative max-md:hidden">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/about">關於我們</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/contact">常見問題</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger hiddenIcon>
                  <Search size={16} />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute" placement="right">
                  <div className="">輸入框</div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  {token ? <ButtonLogout /> : hadCheckLogin && <ButtonLogin />}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
}
