import { FirebaseProvider } from "./context/FirebaseProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import DeafultLayout from "./layouts/DeafultLayout";
import AboutUs from "./pages/AboutUs";
import Pricing from "./pages/Pricing";
import DashboardLayout from "./layouts/DashboardLayout";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DeafultLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about", element: <AboutUs /> },
      { path: "pricing", element: <Pricing /> },
      
    ],
  },
  { path: "login", element: <Login /> },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {index: true, element: <Dashboard/>}
    ]
  },

]);

function App() {
  return (
    <FirebaseProvider>
      <RouterProvider router={router} />
      <ToastContainer 
        pauseOnFocusLoss
        pauseOnHover
        position="top-right"
        newestOnTop
        draggable
      />
    </FirebaseProvider>
  );
}

export default App;
