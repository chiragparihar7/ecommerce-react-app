import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "./Footer";

export const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main content grows to fill space */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;
