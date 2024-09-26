import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
const Header = () => {
  return (
    <nav className="mx-auto py-2 px-4 flex justify-between bg-slate-400 shadow-md bottom-2">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          width={150}
          height={60}
          alt="logo"
          className="h-16 w-auto"
        ></Image>
      </Link>
      <div className='flex gap-2 items-center justify-center'>
        <Link href={"/events?create=true"}>
          <Button variant="link" className="bg-green-950 font-semibold text-yellow-300">
            <PenBox size={18}></PenBox>
            Create an Event
          </Button>
        </Link>

        <Button variant="outline" className="bg-blue-700 font-semibold  hover:bg-blue-600 text-white">
          Log In
        </Button>
      </div>
    </nav>
  );
}

export default Header
