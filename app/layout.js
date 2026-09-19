import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (not fetched from Google Fonts at build time) so the build
// never depends on reaching fonts.googleapis.com. Both are variable fonts
// under the SIL Open Font License \u2014 see app/fonts/*-OFL.txt.
const manrope = localFont({
  src: "./fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/Inter-Variable.ttf",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Online Marketing HQ \u2014 Performance Marketing That Proves Itself",
    template: "%s \u2013 Online Marketing HQ",
  },
  description:
    "Online Marketing HQ runs Meta, TikTok and Google Ads, SEO, and ecommerce builds for brands who want to see the numbers, not just hear the pitch.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
