import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "차세대 FaSS 플랫폼 구축 6월 중간 보고",
    template: "%s | FaSS 중간 보고",
  },
  description: "(주)제때 차세대 FaSS 플랫폼 구축 6월 중간 보고 자료",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.2.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
