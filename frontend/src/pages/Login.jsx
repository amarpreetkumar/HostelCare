import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-primary px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,126,247,0.18),transparent_38%)]" />
      <div className="animate-fade relative w-full max-w-sm rounded-2xl border border-border-dark bg-bg-card p-8 shadow-card">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-accent-blue to-accent-teal bg-clip-text font-display text-3xl font-semibold text-transparent">
            HostelCare
          </h1>
          <p className="mt-2 text-sm text-text-muted">Streamline hostel complaints with ease</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border-dark bg-bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border-dark bg-bg-surface px-4 py-3 pr-11 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-all duration-150 hover:text-text-primary active:scale-[0.97]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple py-3 font-medium text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-text-muted">
            Don't have an account?{" "}
            <a href="/register" className="font-medium text-accent-blue">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
