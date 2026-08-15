import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  ShieldCheck,
  X,
} from "lucide-react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";

import { auth } from "../firebase";

const API_URL = "http://localhost:5000";

const BG_IMAGE =
  "https://i.pinimg.com/736x/c5/d8/3d/c5d83d423e14ff97e16607f39ecc1d8d.jpg";

// Fake/example domains
const blockedDomains = [
  "example.com",
  "example.org",
  "example.net",
  "test.com",
  "localhost",
  "invalid.com",
  "mailinator.com",
];

function isValidEmail(email) {
  const value = email.trim().toLowerCase();

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!regex.test(value)) return false;

  const domain = value.split("@")[1];

  if (blockedDomains.includes(domain)) {
    return false;
  }

  return true;
}

function Signup({ onLogin, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
  });

  const [role, setRole] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setMessage("");
  };

  // =====================================================
  // EMAIL SIGNUP
  // =====================================================

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!form.name.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!role) {
      setMessage("Please select Citizen or Volunteer.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setMessage(
        "Please enter a valid personal email address."
      );
      return;
    }

    if (form.password.length < 6) {
      setMessage(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (!agree) {
      setMessage(
        "Please accept the Terms of Service and Privacy Policy."
      );
      return;
    }

    try {
      setLoading(true);

      // 1. Create Firebase account
      const credential =
        await createUserWithEmailAndPassword(
          auth,
          form.email.trim().toLowerCase(),
          form.password
        );

      // 2. Send verification email
      await sendEmailVerification(
        credential.user
      );

      // 3. Save temporary profile information
      // We intentionally don't create MongoDB profile
      // until email is verified and user logs in.

      localStorage.setItem(
        "resq_pending_profile",
        JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          location: form.location.trim(),
          role,
        })
      );

      // 4. Sign out until email is verified
      await auth.signOut();

      setMessage(
        "Account created successfully! Please verify your email, then login."
      );

    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      if (
        error.code ===
        "auth/email-already-in-use"
      ) {
        setMessage(
          "This email is already registered. Please login instead."
        );
      } else if (
        error.code === "auth/invalid-email"
      ) {
        setMessage(
          "Please enter a valid email address."
        );
      } else if (
        error.code === "auth/weak-password"
      ) {
        setMessage(
          "Password must contain at least 6 characters."
        );
      } else {
        setMessage(
          error.message ||
            "Unable to create account."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE SIGNUP
  // =====================================================

  const handleGoogleSignup = async () => {
    setMessage("");

    if (!role) {
      setMessage(
        "Please select Citizen or Volunteer first."
      );
      return;
    }

    if (!agree) {
      setMessage(
        "Please accept the Terms of Service and Privacy Policy."
      );
      return;
    }

    try {
      setLoading(true);

      const provider =
        new GoogleAuthProvider();

      const credential =
        await signInWithPopup(
          auth,
          provider
        );

      const firebaseUser =
        credential.user;

      const token =
        await firebaseUser.getIdToken();

      // Create MongoDB profile
      const response = await fetch(
        `${API_URL}/api/auth/profile`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name:
              firebaseUser.displayName ||
              "ResQ User",

            phone: "",

            location: "",

            role,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Profile creation failed."
        );
      }

      console.log(
        "MongoDB profile:",
        data.user
      );

      // Store user locally if needed
      localStorage.setItem(
        "resq_user",
        JSON.stringify(data.user)
      );

      // SUCCESS → LANDING PAGE
      onClose();

    } catch (error) {
      console.error(
        "GOOGLE SIGNUP ERROR:",
        error
      );

      setMessage(
        error.message ||
          "Google signup failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(3,10,8,.97) 0%,
            rgba(3,10,8,.88) 45%,
            rgba(3,10,8,.72) 100%
          ),
          url(${BG_IMAGE})
        `,
      }}
    >

      {/* HEADER */}

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7">

        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Res
            <span className="text-[#d9ff4f]">
              Q.
            </span>
          </h1>

          <p className="text-[9px] tracking-[3px] text-gray-500">
            DISASTER RESPONSE
          </p>
        </div>

        <div className="flex items-center gap-5">

          <p className="hidden text-sm text-gray-400 sm:block">
            Already have an account?
          </p>

          <button
            type="button"
            onClick={onLogin}
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#d9ff4f] hover:bg-[#d9ff4f] hover:text-black"
          >
            Login
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 transition hover:text-white"
            >
              <X size={22} />
            </button>
          )}

        </div>
      </div>

      {/* CONTENT */}

      <div className="mx-auto flex min-h-[calc(100vh-100px)] w-full max-w-7xl items-center px-6 py-10">

        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div className="hidden lg:block">

            <p className="mb-5 text-sm font-semibold uppercase tracking-[4px] text-[#d9ff4f]">
              Join the response
            </p>

            <h2 className="max-w-xl text-6xl font-black leading-[1.02] tracking-tight text-white xl:text-7xl">
              Be ready.
              <br />

              <span className="text-[#d9ff4f]">
                Be ResQ.
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-lg leading-8 text-gray-400">
              Connect with people, volunteers
              and emergency resources when your
              community needs help the most.
            </p>

            <div className="mt-10 flex items-center gap-3 text-sm text-gray-400">

              <ShieldCheck
                size={20}
                className="text-[#d9ff4f]"
              />

              Secure authentication powered
              by Firebase
            </div>

          </div>

          {/* RIGHT CARD */}

          <div className="ml-auto w-full max-w-xl">

            <div className="rounded-2xl border border-white/10 bg-[#0c1512]/95 p-7 shadow-2xl backdrop-blur-xl sm:p-9">

              <div className="mb-7">

                <h2 className="text-3xl font-bold text-white">
                  Create your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Join ResQ as a citizen or volunteer.
                </p>

              </div>

              {/* MESSAGE */}

              {message && (
                <div className="mb-5 rounded-lg border border-[#d9ff4f]/20 bg-[#d9ff4f]/5 px-4 py-3 text-sm leading-5 text-[#d9ff4f]">
                  {message}
                </div>
              )}

              <form
                onSubmit={handleSignup}
                className="space-y-4"
              >

                <div className="grid gap-4 sm:grid-cols-2">

                  <Input
                    icon={<User size={18} />}
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                  />

                  <Input
                    icon={<Mail size={18} />}
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <PasswordInput
                    value={form.password}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        password:
                          e.target.value,
                      }))
                    }
                    show={showPassword}
                    setShow={setShowPassword}
                  />

                  <Input
                    icon={<Phone size={18} />}
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                  />

                </div>

                <Input
                  icon={<MapPin size={18} />}
                  name="location"
                  placeholder="City / Location"
                  value={form.location}
                  onChange={handleChange}
                />

                {/* ROLE */}

                <div className="pt-3">

                  <p className="mb-3 text-sm font-semibold text-white">
                    Choose your role
                  </p>

                  <div className="grid grid-cols-2 gap-3">

                    <RoleCard
                      selected={
                        role === "CITIZEN"
                      }
                      onClick={() =>
                        setRole("CITIZEN")
                      }
                      icon={
                        <User size={20} />
                      }
                      title="Citizen"
                      text="Request emergency help"
                    />

                    <RoleCard
                      selected={
                        role === "VOLUNTEER"
                      }
                      onClick={() =>
                        setRole("VOLUNTEER")
                      }
                      icon={
                        <Users size={20} />
                      }
                      title="Volunteer"
                      text="Help people in need"
                    />

                  </div>

                </div>

                {/* TERMS */}

                <label className="flex cursor-pointer gap-3 pt-2">

                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) =>
                      setAgree(
                        e.target.checked
                      )
                    }
                    className="mt-1 h-4 w-4 accent-[#d9ff4f]"
                  />

                  <span className="text-xs leading-5 text-gray-500">
                    I agree to the{" "}
                    <span className="text-gray-300">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-gray-300">
                      Privacy Policy
                    </span>
                    .
                  </span>

                </label>

                {/* CREATE ACCOUNT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d9ff4f] py-3.5 font-bold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {loading
                    ? "Creating account..."
                    : "Create Account"}

                  {!loading && (
                    <ArrowRight size={18} />
                  )}

                </button>

              </form>

              {/* DIVIDER */}

              <div className="my-6 flex items-center gap-4">

                <div className="h-px flex-1 bg-white/10" />

                <span className="text-[10px] tracking-widest text-gray-600">
                  OR
                </span>

                <div className="h-px flex-1 bg-white/10" />

              </div>

              {/* GOOGLE */}

              <button
                type="button"
                onClick={
                  handleGoogleSignup
                }
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] py-3 text-sm font-semibold text-white transition hover:border-[#d9ff4f]/40 disabled:opacity-50"
              >

                <span className="text-lg font-bold">
                  G
                </span>

                Continue with Google

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

/* INPUT */

function Input({
  icon,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative">

      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
        {icon}
      </span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-lg border border-white/10 bg-[#121b18] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#d9ff4f]"
      />

    </div>
  );
}

/* PASSWORD */

function PasswordInput({
  value,
  onChange,
  show,
  setShow,
}) {
  return (
    <div className="relative">

      <Lock
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
      />

      <input
        type={
          show ? "text" : "password"
        }
        placeholder="Password"
        value={value}
        onChange={onChange}
        minLength={6}
        required
        className="w-full rounded-lg border border-white/10 bg-[#121b18] py-3.5 pl-11 pr-11 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#d9ff4f]"
      />

      <button
        type="button"
        onClick={() =>
          setShow(!show)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
      >
        {show ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>

    </div>
  );
}

/* ROLE CARD */

function RoleCard({
  selected,
  onClick,
  icon,
  title,
  text,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border p-4 text-left transition ${
        selected
          ? "border-[#d9ff4f] bg-[#d9ff4f]/5"
          : "border-white/10 bg-[#121b18] hover:border-white/20"
      }`}
    >

      <div className="flex items-center gap-3">

        <div
          className={`grid h-5 w-5 place-items-center rounded border ${
            selected
              ? "border-[#d9ff4f] bg-[#d9ff4f] text-black"
              : "border-gray-600"
          }`}
        >
          {selected && (
            <span className="text-xs font-black">
              ✓
            </span>
          )}
        </div>

        <div
          className={
            selected
              ? "text-[#d9ff4f]"
              : "text-gray-500"
          }
        >
          {icon}
        </div>

        <div>

          <p className="text-sm font-semibold text-white">
            {title}
          </p>

          <p className="mt-0.5 text-[11px] text-gray-600">
            {text}
          </p>

        </div>

      </div>

    </button>
  );
}

export default Signup;