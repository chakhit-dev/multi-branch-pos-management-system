import { SessionProvider } from "next-auth/react";

export default function OwnerLayout({ children }:Readonly<{
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
