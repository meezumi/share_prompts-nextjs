// import React from 'react'
import '@styles/globals.css';
import { Children } from 'react';

export const metadata = {
  title: "promptmon",
  description: "a place to discover AI prompts" 
}

const Rootlayout = ({ children }) => {
  return (
    <html>
      <body>
        <div className='main'>
        {/* inside the main body of the website */}
          <div className='gradient'/>
          {/* this will give it the bg */}
        </div>

        <main className='app'>
        {/* actual main part of the application */}
          { children }
        </main>
      </body>
    </html>
  );
}

export default Rootlayout;