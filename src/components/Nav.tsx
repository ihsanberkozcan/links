"use client";

import { signIn, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProfileMenu from "./ProfileMenu";
import { provideType } from "@/types/types";


export default function Nav() {
  const { data: session } = useSession();

  const [provider, setProvider] = useState<provideType>();
  const [menu, setMenu] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      setProvider(res);
    })();
  }, []);
  const openMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="py-6 w-full flex justify-between align-middle">
      <div className="flex items-center">
        <a className="text-3xl font-semibold text-black h-[40px]" href="/">
          Links
        </a>
        <div className="hidden lg:flex ml-12">
          {session?.user ? (
            <a href="/my" className="py-2 px-5 mx-2 hover:bg-white rounded">
              My
            </a>
          ) : null}
          <a href="/pricing" className="py-2 px-5 mx-2 hover:bg-white rounded">
            Pricing
          </a>
          <a href="/about" className="py-2 px-5 mx-2 hover:bg-white rounded">
            About Us
          </a>
          <a href="/career" className="py-2 px-5 mx-2 hover:bg-white rounded">
            Career
          </a>
        </div>
      </div>
      {session?.user ? (
        <div className="relative">
          <button type="button" onClick={() => openMenu()}>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            />
          </button>
          {menu ? <ProfileMenu /> : null}
        </div>
      ) : (
        <>
   
          {provider && (
            <button
              type="button"
              key={provider.name}
              onClick={() => {
                signIn(provider.id);
              }}
              className="bg-black py-2 px-5 rounded text-white"
            >
              Sign in
            </button>
          )}
        </>
      )}
    </div>
  );
}
