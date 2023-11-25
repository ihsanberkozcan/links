import Provider from "@/components/Provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Links",
  description: "Links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className="min-h-screen bg-gray-100 flex justify-center">
            <div className="w-10/12">{children}</div>
          </main>
        </Provider>
      </body>
      <Script id="show-banner" strategy="lazyOnload">
        {`
          const links = document.getElementsByClassName("link");
          const name = document.getElementById("name");
          
          Array.from(links).forEach((link) => {
            link.addEventListener("click", handleClick);
          });
          function handleClick() {
            const linkID = this.id;
            const data = {
              username: name.innerText.substring(1),
              id: linkID,
            };
            const username = name.innerText;
            fetch("/api/click", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
          }          
        `}
      </Script>
    </html>
  );
}
