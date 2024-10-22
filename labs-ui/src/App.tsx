import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Lab2Page from "./pages/Lab2Page.tsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/lab-2",
            element: <Lab2Page />
        }
    ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
