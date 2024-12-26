import Link from "next/link";
import React from "react";

const NavbarAdmin = () => {
  return (
    <nav className="h-20 bg-primary text-background py-4 px-8 flex justify-between items-center">
      {/* Logo */}
      <div className="font-bold text-3xl">
        keykomania<sup>®</sup>
      </div>

      {/* Links */}
      <div className="flex justify-center gap-10">
        <Link
          href="/admin/"
          className="font-Open_Sans font-semibold text-[15px] leading-[20px] text-background"
        >
          Asosiy
        </Link>
        <Link
          href="/admin/broadcast"
          className="font-Open_Sans font-semibold text-[15px] leading-[20px] text-background"
        >
          Jonli efir
        </Link>
        <Link
          href="/admin/users"
          className="font-Open_Sans font-semibold text-[15px] leading-[20px] text-background"
        >
          Foydalanuvchilar
        </Link>
        <Link
          href="/admin/services"
          className="font-Open_Sans font-semibold text-[15px] leading-[20px] text-background"
        >
          Xizmatlar
        </Link>
        <Link
          href="/admin/courses"
          className="font-Open_Sans font-semibold text-[15px] leading-[20px] text-background"
        >
          Kurslar
        </Link>
        <Link
          href="/admin/reviews"
          className="font-Open_Sans font-semibold text-[15px] leading-[20px] text-background"
        >
          Sharhlar
        </Link>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
