import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import PreferencesPage from "./pages/PreferencesPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<PublicRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="preferences" element={<PreferencesPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="chat" element={<ChatPageWithKey />} />
        </Route>
      </Route>
    </Route>
  )
);

function ChatPageWithKey() {
  const location = useLocation();
  return <ChatPage key={location.key} />;
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
