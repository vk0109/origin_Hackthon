import { useState } from "react";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase";

const API_URL = "http://localhost:5000";

const BG_IMAGE =
  "https://i.pinimg.com/736x/c5/d8/3d/c5d83d423e14ff97e16607f39ecc1d8d.jpg";

function Login({ onSignup, onClose }) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [remember, setRemember] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // =====================================================
  // EMAIL LOGIN
  // =====================================================

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setMessage("");

    // 1. Firebase login
    const credential = await signInWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password
    );

    const firebaseUser = credential.user;

    // 2. Email verification check
    if (!firebaseUser.emailVerified) {
      setMessage(
        "Please verify your email before logging in."
      );

      await auth.signOut();
      return;
    }

    // 3. Get Firebase token
    const token = await firebaseUser.getIdToken();

    // 4. Get role saved during signup
    const savedRole =
      localStorage.getItem("resq_role") || "CITIZEN";

    // 5. Create / update MongoDB profile
    const profileResponse = await fetch(
      "http://localhost:5000/api/auth/profile",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          name:
            firebaseUser.displayName ||
            firebaseUser.email.split("@")[0],

          phone:
            localStorage.getItem("resq_phone") || "",

          location:
            localStorage.getItem("resq_location") || "",

          role: savedRole,
        }),
      }
    );

    const profileData = await profileResponse.json();

    console.log("PROFILE RESPONSE:", profileData);

    if (!profileResponse.ok) {
      throw new Error(
        profileData.message ||
        "Unable to create your profile."
      );
    }

    // 6. Profile successfully created
    localStorage.setItem(
      "resq_user",
      JSON.stringify(profileData.user)
    );

    // 7. Clear temporary signup data
    localStorage.removeItem("resq_role");
    localStorage.removeItem("resq_phone");
    localStorage.removeItem("resq_location");

    console.log("Login + MongoDB profile successful ✅");

    // 8. Go to landing page
    onClose();

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      setMessage("The email or password is incorrect.");
    } else if (
      error.code === "auth/too-many-requests"
    ) {
      setMessage(
        "Too many attempts. Please try again later."
      );
    } else {
      setMessage(
        error.message ||
        "Unable to login. Please try again."
      );
    }
  } finally {
    setLoading(false);
  }
};

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const handleGoogleLogin =
    async () => {
      try {
        setLoading(true);
        setMessage("");

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
          await firebaseUser.getIdToken(
            true
          );

        // Check MongoDB profile
        const profileResponse =
          await fetch(
            `${API_URL}/api/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        // =================================================
        // Google user already exists
        // =================================================

        if (profileResponse.ok) {
          const data =
            await profileResponse.json();

          localStorage.setItem(
            "resq_user",
            JSON.stringify(
              data.user
            )
          );

          onClose();

          return;
        }

        // =================================================
        // Google user is new
        // =================================================

        if (
          profileResponse.status ===
          404
        ) {
          // Default role for Google login
          // Change this if you want a role selection page.
          const createResponse =
            await fetch(
              `${API_URL}/api/auth/profile`,
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",

                  Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify({
                  name:
                    firebaseUser.displayName ||
                    "ResQ User",

                  phone: "",

                  location: "",

                  role: "CITIZEN",
                }),
              }
            );

          const createData =
            await createResponse.json();

          if (!createResponse.ok) {
            throw new Error(
              createData.message ||
                "Unable to create profile."
            );
          }

          localStorage.setItem(
            "resq_user",
            JSON.stringify(
              createData.user
            )
          );

          onClose();

          return;
        }

        throw new Error(
          "Unable to verify your profile."
        );

      } catch (error) {
        console.error(
          "GOOGLE LOGIN ERROR:",
          error
        );

        setMessage(
          error.message ||
            "Google login failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  const handleForgotPassword =
    async () => {
      setMessage("");

      if (!email.trim()) {
        setMessage(
          "Enter your email address first."
        );

        return;
      }

      try {
        await sendPasswordResetEmail(
          auth,
          email.trim().toLowerCase()
        );

        setMessage(
          "Password reset email has been sent."
        );

      } catch (error) {
        console.error(error);

        setMessage(
          "Unable to send password reset email."
        );
      }
    };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(3,10,8,.97),
            rgba(3,10,8,.82)
          ),
          url(${BG_IMAGE})
        `,
      }}
    >

      {/* HEADER */}

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">

        <div>

          <h1 className="text-2xl font-black text-white">
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
            Don't have an account?
          </p>

          <button
            type="button"
            onClick={onSignup}
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#d9ff4f] hover:bg-[#d9ff4f] hover:text-black"
          >
            Sign Up
          </button>

        </div>

      </div>

      {/* CONTENT */}

      <div className="mx-auto flex min-h-[calc(100vh-100px)] max-w-7xl items-center px-6 py-10">

        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div className="hidden lg:block">

            <p className="mb-5 text-sm font-semibold uppercase tracking-[4px] text-[#d9ff4f]">
              Welcome back
            </p>

            <h2 className="text-6xl font-black leading-[1.02] text-white xl:text-7xl">
              Stay
              <br />

              <span className="text-[#d9ff4f]">
                connected.
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-lg leading-8 text-gray-400">
              Access emergency response
              services, coordinate support
              and stay connected with your
              community.
            </p>

            <div className="mt-10 flex items-center gap-3 text-sm text-gray-400">

              <ShieldCheck
                size={20}
                className="text-[#d9ff4f]"
              />

              Secure authentication with
              email verification

            </div>

          </div>

          {/* CARD */}

          <div className="ml-auto w-full max-w-xl">

            <div className="rounded-2xl border border-white/10 bg-[#0c1512]/95 p-7 shadow-2xl backdrop-blur-xl sm:p-9">

              <h2 className="text-3xl font-bold text-white">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Sign in to continue to ResQ.
              </p>

              {/* MESSAGE */}

              {message && (
                <div className="mt-5 rounded-lg border border-[#d9ff4f]/20 bg-[#d9ff4f]/5 px-4 py-3 text-sm leading-5 text-[#d9ff4f]">
                  {message}
                </div>
              )}

              <form
                onSubmit={handleLogin}
                className="mt-7 space-y-4"
              >

                {/* EMAIL */}

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    required
                    className="w-full rounded-lg border border-white/10 bg-[#121b18] py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#d9ff4f]"
                  />

                </div>

                {/* PASSWORD */}

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                    className="w-full rounded-lg border border-white/10 bg-[#121b18] py-3.5 pl-11 pr-11 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#d9ff4f]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                {/* OPTIONS */}

                <div className="flex items-center justify-between">

                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-500">

                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) =>
                        setRemember(
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 accent-[#d9ff4f]"
                    />

                    Remember me

                  </label>

                  <button
                    type="button"
                    onClick={
                      handleForgotPassword
                    }
                    className="text-sm text-[#d9ff4f] hover:underline"
                  >
                    Forgot Password?
                  </button>

                </div>

                {/* LOGIN */}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d9ff4f] py-3.5 font-bold text-black transition hover:brightness-95 disabled:opacity-50"
                >

                  {loading
                    ? "Signing in..."
                    : "Login"}

                  {!loading && (
                    <ArrowRight
                      size={18}
                    />
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
                  handleGoogleLogin
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

export default Login;