import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";

  const router = createBrowserRouter([
    {
        element: <App />,
        children:[
            {
                path:"/",
                element: <HomePage />
            },
            {
              path:"/items/:id",
              element: <DetailPage />
            },
            {
              path:"/contact",
              element: <ContactPage />
            }
        ]
      },
  ]);


  export default router