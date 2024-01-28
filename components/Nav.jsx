"use client";

import Link from "next/link";
// this is goinf to allow us to move to other pages.

import Image from "next/image";
// this will automatically optimise images for us.


import { useEffect, useState } from "react";
// importing react hooks

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
// for authentication, signing in, signing out, or staying logged in 


const Nav = () => {
  // const isUserLoggedIn = true;
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  // initially providers is set to null

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    // the setProviders func, gets the update value from getProviders (from next-auth)
    (async () => {
      const res = await getProviders();
      setProviders(res); // then the function is called
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptmon</p>
      </Link>

      {/* {alert(session?.user)}  */}
      {/* currently its undefined, cause we really dont have any user. */}

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {/* this means that if small device, its visible, else hidden */}

        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                // for this to work, will have to add 'lh3.googleusercontent.com' in next.config.js
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {/* provider here would be google auth, the steps to set up google authentication using next-auth.*/}
            {/* if we have access to the providers */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
              // this will toggle the state of dropdown on click
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* provider here would be google auth, the steps to set up google authentication using next-auth.*/}
            {/* if we have access to the providers */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
