"use client";

import { Bricolage_Grotesque, Nunito_Sans } from "next/font/google";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
  const { data: session, status } = useSession();

  return (
    <div
      className={`py-8 px-24 max-xl:px-40 h-[8vh] text-slate-700 flex max-sm:justify-center items-center text-[15px] flex-row justify-between`}
    >
      <div
        className={`flex align-middle text-sm items-center font-normal space-x-8 text-slate-800`}
      >
        <a href="/" className={` hover:text-slate-600`}>
          Home
        </a>
        <a href="/applications" className={`hover:text-slate-600`}>
          Applications
        </a>
        <a href="/reviewer" className={`hover:text-slate-600`}>
          Reviewer
        </a>
        <a href="/admin" className={`hover:text-slate-600`}>
          Admin
        </a>
      </div>
      <div>
      {status === "loading" ? (
          <Button
            onClick={() => signOut()}
            className="px-12 bg-transparent text-emerald-400 hover:bg-emerald-800/40"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline mr-2 w-4 h-4 text-dark-200 animate-spin dark:text-dark-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#3c7d5e"
              ></path>
            </svg>
            <span>Loading</span>
          </Button>
        ) : session ? (
          <Button
            onClick={() => signOut()}
            className="px-12 bg-transparent text-slate-800 hover:bg-transparent"
          >
            <span>Sign out -{">"}</span>
          </Button>
        ) : (
          <Button
            onClick={() => signIn("discord")}
            className="px-12 bg-transparent text-slate-800 hover:bg-transparent"
          >
            <span>Sign in -{">"}</span>
          </Button>
        )}
      </div>
    </div>
  );
};
