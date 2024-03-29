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
        // check token
        if (localStorage.access_token) {
          // rediret to home if have token
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
        loader: async () => {
          // check token
          if (!localStorage.access_token) {
            // rediretn to login
              return redirect("/login")
          }else{
              return null
          }
        },
        children:[
            {
                path:"/",
                element: <HomePage />,
                loader: async () => {
                  // check token
                  if (!localStorage.access_token) {
                    // rediretn to login
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
                // check token
                if (!localStorage.access_token) {
                  // redirect to login
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
                // check token
                if (!localStorage.access_token) {
                  // redirect to login
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
                  // clear storage
                    await localStorage.clear();
                    return redirect("/login")
              },
            },
        ]
      },
  ]);


  export default router