import { SessionProvider } from "next-auth/react";

export default function UsersLayout({ children }:Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <SessionProvider>
            {children}
        </SessionProvider>
    </div>
  );
}
