import { useState } from "react";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  ScanSearch,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import apiClient from "./api/client";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Screening from "./pages/Screening";
import Candidates from "./pages/Candidates";
import Analytics from "./pages/Analytics";

import "./App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await apiClient.post("/api/auth/login", {
        username: email.trim(),
        password,
      });

      const { access_token, token_type, role } = response.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("token_type", token_type || "bearer");
      localStorage.setItem("role", role || "HR");

      setSuccess("Login successful.");
      setPassword("");

      // Go to Dashboard after successful login
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        "Unable to sign in. Please check your credentials and try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="background-shape background-shape-one" />
      <div className="background-shape background-shape-two" />
      <div className="background-shape background-shape-three" />

      <section className="login-card">
        <div className="brand-icon" aria-hidden="true">
          <ScanSearch size={22} strokeWidth={2.2} />
        </div>

        <h1>SmartScreen AI</h1>

        <p className="subtitle">Authorized Personnel Portal</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="field-group">
            <label htmlFor="email">Email Address</label>

            <div className="input-wrapper">
              <Mail size={15} aria-hidden="true" />

              <input
                id="email"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your corporate email"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="field-group">
            <div className="password-label-row">
              <label htmlFor="password">Password</label>

              <button
                type="button"
                className="forgot-button"
                onClick={() =>
                  setError("Password reset is not configured yet.")
                }
              >
                Forgot?
              </button>
            </div>

            <div className="input-wrapper">
              <LockKeyhole size={15} aria-hidden="true" />

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="message message-error">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="message message-success">
              <CheckCircle2 size={15} />
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            className="access-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="spinner" size={16} />
                Signing in...
              </>
            ) : (
              <>
                Access Portal
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="card-divider" />

        <p className="security-note">
          System access is restricted to authorized HR personnel.
        </p>
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Main application */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/screening" element={<Screening />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        {/* Unknown URL → Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;