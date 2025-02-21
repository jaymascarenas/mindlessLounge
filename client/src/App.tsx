import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main className="container pt-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
