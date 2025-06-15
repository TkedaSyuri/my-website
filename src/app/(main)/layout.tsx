import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Takeda Syuri - Blog",
  description: "This is Takeda Syuri Blog",
};


 const PortfolioLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div >
      {children}
    </div>
  );
};

export default PortfolioLayout;
