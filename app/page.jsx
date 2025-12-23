// import React from 'react'
// we are using jsx so already imported react

import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Harness the Power of
      <br className="max-md:hidden" />
      <span className="animate-gradient-flow text-center">Promptmon</span>
    </h1>
    <p className="desc text-center">
      Build & share exceptional AI prompts. Collaborate with creators worldwide and unlock the full potential of AI.
    </p>

    {/* Feed Components */}
    <Feed />
  </section>
);

export default Home;
