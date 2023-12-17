import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/navbar";
import { ReactQueryProvider } from "./react-query-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prompts",
  description: "Create your thughts",
  icons:"/vercel.svg"
};

export default async function RootLayout({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ClerkProvider>
        <html lang="en">
          <body className="body">
            <NavBar />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
