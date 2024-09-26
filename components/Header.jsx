import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <nav className="mx-auto py-2 px-4 flex justify-between items-center bg-slate-400 shadow-md">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          width={150}
          height={60}
          alt="MeetMate Logo"
          className="h-16 w-auto"
        />
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/events?create=true">
          <Button
            variant="link"
            className="bg-green-950 font-semibold text-yellow-300 flex items-center gap-1"
          >
            <PenBox size={18} aria-hidden="true" />
            Create an Event
          </Button>
        </Link>
        <SignedOut>
          <SignInButton redirectUrl="/dashboard">
            <Button
              variant="outline"
              className="bg-blue-700 font-semibold hover:bg-blue-600 text-white"
            >
              Log In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
