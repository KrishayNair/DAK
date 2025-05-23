import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function buildImageUrl(path) {
  if (!path) return null;

  if (path.startsWith("http")) {
    return path;
  }
  
  const base = process.env.NEXT_PUBLIC_API_URL;
  return base.slice(0, -1) + path;
}