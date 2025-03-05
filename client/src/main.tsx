import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import PostForm from "./pages/PostForm.tsx";
import Signup from "./pages/Signup.tsx";
import Profile from "./pages/Profile.tsx";
import Feed from "./pages/Feed.tsx";
import NavWrapper from "./components/NavWrapper.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/post",
        element: (
          <NavWrapper>
            <PostForm />
          </NavWrapper>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/feed",
        element: (
          <NavWrapper>
            <Feed />
          </NavWrapper>
        ),
      },
      {
        path: "/profile",
        element: (
          <NavWrapper>
            <Profile />
          </NavWrapper>
        ),
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
