"use client"

import Link from "next/link"


const TopPage = () => {
  return (
      <div className=" top-0 left-0 z-20 pointer-events-none inline-block">
        <h1 className="m-4 font-bold text-6xl text-white pointer-events-auto">
          Takeda Syuri
        </h1>
        <ul className="ml-4 mt-20 grid gap-6  font-semibold text-4xl text-white  pointer-events-auto " >
          <Link href="profile " className="hover:text-blue-700 duration-500  w-fit" >プロフィール</Link>
          <Link href="portfolio" className="hover:text-blue-700 duration-500  w-fit" >ポートフォリオ</Link>
          <Link href="archive" className="hover:text-blue-700 duration-500  w-fit" >アーカイブ</Link>
        </ul>
      </div>
  )
}

export default TopPage