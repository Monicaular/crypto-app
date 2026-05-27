import { HomeSubnav } from "@/components/navbar/HomeSubnav";

export default async function CoinsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HomeSubnav />
      {children}
    </div>
  );
}
