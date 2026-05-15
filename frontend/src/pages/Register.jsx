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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-root px-4">
      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: "radial-gradient(ellipse 600px 500px at 50% 0%, rgba(255,107,53,0.07) 0%, transparent 70%)" }} />
      <div className="animate-fadeup relative z-10 w-full max-w-sm rounded-2xl border border-border-soft bg-elevated p-8 shadow-card shadow-inner-soft">
        <div className="mb-8 text-center">
          <h1 className="font-display text-xl font-bold" style={{ background: "linear-gradient(135deg,#FF6B35,#FFAA00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            HostelCare
          </h1>
          <p className="mt-1 text-sm text-text-mid">Create a new account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {[
            ["Full Name", "text", name, setName, "Enter your full name"],
            ["Email", "email", email, setEmail, "Enter your email"],
            ["Password", "password", password, setPassword, "Create a password"],
          ].map(([label, type, value, setter, placeholder]) => (
            <div key={label}>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-low">
                {label}
              </label>
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-border-soft bg-subtle px-4 py-2.5 text-sm text-text-high outline-none transition-all duration-150 placeholder:text-text-low focus:border-primary focus:ring-2 focus:ring-[rgba(255,107,53,0.15)]"
              />
            </div>
          ))}

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-low">
              Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["student", "staff"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRole(option)}
                  className={`cursor-pointer rounded-xl border px-4 py-3 text-sm capitalize transition-all duration-150 active:scale-[0.97] ${
                    role === option
                      ? "border-primary bg-primary text-white"
                      : "border-border-soft bg-subtle text-text-mid hover:text-text-high"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl py-2.5 font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
            style={{ background: "linear-gradient(135deg,#FF6B35,#E85A25)", boxShadow: "0 2px 12px rgba(255,107,53,0.3)" }}
          >
            Register
          </button>

          <p className="text-center text-sm text-text-mid">
            Already have an account?{" "}
            <a href="/" className="font-medium text-primary underline-offset-2 hover:text-[#E85A25]">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
