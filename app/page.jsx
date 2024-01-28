// import React from 'react'
// we are using jsx so already imported react

import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover & Share
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center"> AI-Powered Prompts</span>
    </h1>
    <p className="desc text-center">
      Promptmon is an open-source AI prompting tool for modern world to
      discover, create and share creative prompts :)
    </p>

    {/* Feed Components */}
    <Feed />
  </section>
);

export default Home;
