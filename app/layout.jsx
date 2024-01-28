// import React from 'react'
import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

// layout is how the various components of the application all have the same layout, like navigation bar, footer etc., so we import them here.

export const metadata = {
  title: "Promptmon",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          {/* inside the main body of the website */}
          <div className="gradient" />
          {/* this will give it the bg */}
        </div>

        <main className="app">
          {/* actual main part of the application */}
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
