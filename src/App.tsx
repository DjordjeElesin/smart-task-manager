import { QueryClient, QueryClientProvider } from "react-query";
import { FirebaseProvider } from "./context/FirebaseProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//layouts
import DashboardLayout from "./layouts/DashboardLayout";
import DeafultLayout from "./layouts/DeafultLayout";
//pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/routes/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <DeafultLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
  { path: "login", element: <Login /> },
  { path: "signup", element: <SignUp /> },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Dashboard /> }],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
