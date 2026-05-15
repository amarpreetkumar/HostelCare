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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-root px-4">
      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: "radial-gradient(ellipse 600px 500px at 50% 0%, rgba(255,107,53,0.07) 0%, transparent 70%)" }} />
      <div className="animate-fadeup relative z-10 w-full max-w-sm rounded-2xl border border-border-soft bg-elevated p-8 shadow-card shadow-inner-soft">
        <div className="mb-8 text-center">
          <h1 className="font-display text-xl font-bold" style={{ background: "linear-gradient(135deg,#FF6B35,#FFAA00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            HostelCare
          </h1>
          <p className="mt-1 text-sm text-text-mid">Streamline hostel complaints with ease</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-low">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border-soft bg-subtle px-4 py-2.5 text-sm text-text-high outline-none transition-all duration-150 placeholder:text-text-low focus:border-primary focus:ring-2 focus:ring-[rgba(255,107,53,0.15)]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-low">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border-soft bg-subtle px-4 py-2.5 pr-11 text-sm text-text-high outline-none transition-all duration-150 placeholder:text-text-low focus:border-primary focus:ring-2 focus:ring-[rgba(255,107,53,0.15)]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-text-mid transition-all duration-150 hover:text-text-high active:scale-[0.97]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl py-2.5 font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: "linear-gradient(135deg,#FF6B35,#E85A25)", boxShadow: "0 2px 12px rgba(255,107,53,0.3)" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-text-mid">
            Don't have an account?{" "}
            <a href="/register" className="font-medium text-primary underline-offset-2 hover:text-[#E85A25]">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
