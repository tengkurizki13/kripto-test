import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

  const router = createBrowserRouter([
    {
        element: <App />,
        children:[
            {
                path:"/",
                element: <HomePage />
            },
            {
              path:"/contact",
              element: <ContactPage />
          }
        ]
      },
  ]);


  export default router