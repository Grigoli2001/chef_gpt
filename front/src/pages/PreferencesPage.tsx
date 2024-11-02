import { Navigate } from "react-router-dom";
import { useState } from "react";
import PreferencesForm from "../components/PreferencesForm";
import { useAuth } from "../context/UseAuth";

export default function PreferencesPage() {
  const preferences = localStorage.getItem("preferences");
  const [page, setPage] = useState(0);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (!preferences) {
    return <Navigate to="/" />;
  }

  return (
    <div className="transition-all">
      <h1>Preferences</h1>
      <p>Page: {page}</p>
      <PreferencesForm page={page} setPage={setPage} />
    </div>
  );
}
