'use client'

import Link from 'next/link';
// this is goinf to allow us to move to other pages.

import Image from 'next/image';
// this will automatically optimise images for us.

import { useState, useEffect } from 'react'; 
// importing react hooks

import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
// for authentication, signing in, signing out, or staying logged in 


const Nav = () => {
  
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
  // initially providers is set to null

  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    // the setProviders func, gets the update value from getProviders (from next-auth)
    const setProviders = async () => {
      const responce = await getProviders();

      setProviders(responce);
    }
    setProviders(); // then the function is called
  })

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="promptmon logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptmon</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {/* this means that if small device, its visible, else hidden */}
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/icons/profile.jpg"
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
                  onClick={() => signIn(provider.id)}
                  className="balck_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/icons/profile.jpg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
              // this will toggle the state of dropdown on click
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type='button'
                  onClick={ () => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
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
                  onClick={() => signIn(provider.id)}
                  className="balck_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  ); 
}

export default Nav