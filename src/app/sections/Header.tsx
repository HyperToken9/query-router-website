import Image from "next/image";

import routerIcon from "~/assets/images/router-icon.png";

export default function Header() {
  return (
    <header
      className="border-b-1 border-neutral-200 
        w-full bg-white z-10
        fixed top-0 flex justify-center sm:justify-start items-center py-2"
    >
      <div className="flex items-center px-8 py-3">
        <Image src={routerIcon} alt="Router Icon" width={30} height={30} />
        <div className="ml-[10px] text-2xl text-gray-900 font-bold">
          TheQueryRouter
        </div>
      </div>
      {/* <button className="ml-auto" onClick={() => console.log("WOowowo")}>
                  Plh Button
                </button> */}
    </header>
  );
}
