import Link from "next/link";
import {wkndIconFont} from "@/lib/fonts";

export default async function Social() {
    return (
        <div className="">
            <Link href="#facebookwknd" className={wkndIconFont.className + " inline-block w-10 h-10 bg-black hover:bg-yellow text-amber-50 pt-1"}></Link>
            <Link href="#twitter/" className={wkndIconFont.className + " inline-block w-10 h-10 bg-black hover:bg-yellow text-amber-50 pt-1"}></Link>
            <Link href="#instagram/" className={wkndIconFont.className + " inline-block w-10 h-10 bg-black hover:bg-yellow text-amber-50 pt-1"}></Link>
        </div>
    )
}
