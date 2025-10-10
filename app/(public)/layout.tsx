import { Footer } from "@/components/shared/layout/footer";
import { Header } from "@/components/shared/layout/header";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PublicLayout;
