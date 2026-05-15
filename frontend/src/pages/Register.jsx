import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", { name, email, password, role });
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-primary px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,92,252,0.18),transparent_38%)]" />
      <div className="animate-fade relative w-full max-w-sm rounded-2xl border border-border-dark bg-bg-card p-8 shadow-card">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-accent-blue to-accent-teal bg-clip-text font-display text-3xl font-semibold text-transparent">
            HostelCare
          </h1>
          <p className="mt-2 text-sm text-text-muted">Create a new account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {[
            ["Full Name", "text", name, setName, "Enter your full name"],
            ["Email", "email", email, setEmail, "Enter your email"],
            ["Password", "password", password, setPassword, "Create a password"],
          ].map(([label, type, value, setter, placeholder]) => (
            <div key={label}>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                {label}
              </label>
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-border-dark bg-bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30"
              />
            </div>
          ))}

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["student", "staff"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRole(option)}
                  className={`rounded-xl border px-4 py-3 text-sm capitalize transition-all duration-150 active:scale-[0.97] ${
                    role === option
                      ? "border-accent-blue bg-accent-blue text-white"
                      : "border-border-dark bg-bg-surface text-text-muted hover:text-text-primary"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple py-3 font-medium text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
          >
            Register
          </button>

          <p className="text-center text-sm text-text-muted">
            Already have an account?{" "}
            <a href="/" className="font-medium text-accent-blue">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
