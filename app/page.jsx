// import React from 'react'
// we are using jsx so already imported react 

import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center"> 
        Discover & Share 
        <br className="max-md:hidden" />
        <span className="orange_gradient"> AI-powered Prompts </span>

      </h1>
      <p className="desc text-center">
        Promptmon, an open source AI prompting tool, to discover, create and share them around :) 
      </p>

      {/* Feed Components */}
      <Feed />
    </section>
    
  )
}

export default Home