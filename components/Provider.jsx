'use client';

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
  // <div>Provider</div>
)

export default Provider;

// all the providers go to the layout.js 