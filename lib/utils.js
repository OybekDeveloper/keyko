import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navLink = [
  {
    href: "/user/services",
    text: "XIZMATLAR",
  },
  {
    href: "/user/courses",
    text: "KURSLAR",
  },
  {
    href: "/user/portfolio",
    text: "PORTFOLIO",
  },
  {
    href: "/user/reviews",
    text: "SHARHLAR",
  },
];

const menuItems = [
  {
    icon: "🔴",
    title: "Jonli efir",
    subtitle: "Saytda efirni boshlash",
    path: "/admin/broadcast",
  },
  {
    icon: "➕",
    title: "Xizmat",
    subtitle: "Ro'yxatga xizmat qo'shing",
    path: "/admin/services",
  },
  {
    icon: "➕",
    title: "Kurs",
    subtitle: "Ro'yxatga kurs qo'shing",
    path: "/admin/courses",
  },
  {
    icon: "➕",
    title: "Sharh",
    subtitle: "Sharh qo'shing",
    path: "/admin/reviews",
  },
];

export { navLink, menuItems };

export const APPWRITE_PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
export const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
export const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
export const MY_WORK_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_MY_WORK_COLLECTION_ID;
export const COLLECTION_ID_SERVICES =
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_SERVICES;
export const REVIEWS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID;
export const COLLECTION_ID_USERS =
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USERS;
export const COLLECTION_ID_STREAM =
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_STREAM;
export const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
export const STREAM_API_SECRET = process.env.NEXT_PUBLIC_STREAM_API_SECRET;
export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
