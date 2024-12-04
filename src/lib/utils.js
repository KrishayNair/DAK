import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function buildImageUrl(path) {
  if (path.startsWith("http")) {
    return path;
  }
  
  const base = process.env.NEXT_PUBLIC_API_URL + "media/";
  return base + path;
}