import React from "react";

import Link from "next/link";

export default function Header(props) {
  return (
    <div className="flex justify-center items-center bg-red-300 h-auto w-auto py-2 px-10 z-10 ">
      <Link href="/" passHref>
        <div
          className=" h-24 w-48 bg-contain bg-no-repeat cursor-pointer bg-green-300"
          style={{ backgroundImage: `url(${props.logoImg})` }}
        ></div>
      </Link>
    </div>
  );
}
