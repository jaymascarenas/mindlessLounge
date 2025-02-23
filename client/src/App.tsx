import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <main className="container pt-5">
        <Outlet />
      </main>
    </>
  );
}

export default App;
