import { type ClassValue, clsx } from "clsx"
import { ISODateString } from "next-auth"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ExtentedUser {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    id?: string | null
  }
  expires: ISODateString
}