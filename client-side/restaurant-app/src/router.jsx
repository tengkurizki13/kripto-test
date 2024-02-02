import {
    createBrowserRouter,redirect
  } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
      loader: async () => {
        if (localStorage.access_token) {
            return redirect("/")
        }else{
            return null
        }
      },
    },
    {
      path:"/register",
      element: <RegisterPage />
    },
    {
        element: <App />,

        children:[
            {
                path:"/",
                element: <HomePage />,
                loader: async () => {
                  if (!localStorage.access_token) {
                      return redirect("/login")
                  }else{
                      return null
                  }
                },
            },
            {
              path:"/items/:id",
              element: <DetailPage />,
              loader: async () => {
                if (!localStorage.access_token) {
                    return redirect("/login")
                }else{
                    return null
                }
              },
            },
            {
              path:"/contact",
              element: <ContactPage />,
              loader: async () => {
                if (!localStorage.access_token) {
                    return redirect("/login")
                }else{
                    return null
                }
              },
            },
            {
              path:"/logout",
              element: <ContactPage />,
              loader: async () => {
                    await localStorage.clear();
                    return redirect("/login")
              },
            },
        ]
      },
  ]);


  export default router