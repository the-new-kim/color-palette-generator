import { Suspense } from "react";
import { Outlet } from "react-router-dom";

// import Header from "./components/Header";

function Layout() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        {/* <Header /> */}
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
export default Layout;
