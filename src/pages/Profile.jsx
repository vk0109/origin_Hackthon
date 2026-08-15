import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { API_URL } from "../config";
import { User, Phone, MapPin, Shield, CheckCircle, X } from "lucide-react";

function Profile({ onClose, onLogout }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", location: "", role: "CITIZEN" });

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setMessage("");

      const current = auth.currentUser;
      if (!current) {
        setMessage("You must be signed in to view your profile.");
        setLoading(false);
        if (onClose) onClose();
        return;
      }

      try {
        const token = await current.getIdToken(true);
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          setMessage("Your session has expired. Please login again.");
          await auth.signOut();
          if (onClose) onClose();
          return;
        }

        if (res.status === 404) {
          // If profile missing, register automatically in MongoDB
          const regRes = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: current.displayName || current.email.split("@")[0] || "ResQ User",
              email: current.email,
              role: "CITIZEN",
              emailVerified: current.emailVerified,
            }),
          });
          const regData = await regRes.json();
          if (regRes.ok) {
            setUser(regData.user);
            setForm({
              name: regData.user.name || "",
              phone: regData.user.phone || "",
              location: regData.user.location || "",
              role: regData.user.role || "CITIZEN",
            });
            localStorage.setItem("resq_user", JSON.stringify(regData.user));
          } else {
            setMessage("Profile not found in database.");
          }
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data.user);
        setForm({
          name: data.user.name || "",
          phone: data.user.phone || "",
          location: data.user.location || "",
          role: data.user.role || "CITIZEN",
        });
        localStorage.setItem("resq_user", JSON.stringify(data.user));
      } catch (error) {
        console.error("PROFILE LOAD ERROR:", error);
        setMessage(error.message || "Unable to load profile from server.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [onClose]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!user) return;
    setMessage("");

    try {
      setSaving(true);
      const current = auth.currentUser;
      if (!current) throw new Error("Not authenticated");

      const token = await current.getIdToken(true);

      const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          location: form.location,
          role: form.role,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to update profile in MongoDB");

      setUser(data.user);
      localStorage.setItem("resq_user", JSON.stringify(data.user));
      setEditing(false);
      setMessage("Profile updated successfully in MongoDB! ✅");
    } catch (error) {
      console.error("PROFILE SAVE ERROR:", error);
      setMessage(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("resq_user");
    localStorage.removeItem("resq_pending_profile");
    if (onLogout) onLogout();
    if (onClose) onClose();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06100c] text-[#d9ff4f]">
        Loading your ResQ Profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06100c] text-white px-6">
        <div className="max-w-md text-center rounded-2xl border border-white/10 bg-[#0c1512] p-8">
          <p className="mb-6 text-gray-400">{message || "Profile not available."}</p>
          <button
            onClick={onClose}
            className="rounded-lg bg-[#d9ff4f] px-6 py-3 font-bold text-black hover:brightness-95"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#06100c] text-white py-16 px-6">
      <div className="mx-auto max-w-3xl">
        {/* TOP NAV BAR */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            Res<span className="text-[#d9ff4f]">Q</span> Profile
          </h1>
          {onClose && (
            <button onClick={onClose} className="rounded-lg border border-white/10 p-2 hover:border-white/30">
              <X size={20} />
            </button>
          )}
        </div>

        {/* CARD CONTAINER */}
        <div className="rounded-2xl border border-white/10 bg-[#0c1512]/95 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
          {/* HEADER ROW */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[#d9ff4f] text-black grid place-items-center font-black text-2xl">
                {user.name ? user.name.charAt(0).toUpperCase() : "R"}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-sm text-gray-400">{user.email}</p>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="rounded bg-[#d9ff4f]/10 px-2 py-0.5 text-[#d9ff4f] font-semibold border border-[#d9ff4f]/20">
                    {user.role}
                  </span>
                  {user.emailVerified && (
                    <span className="flex items-center gap-1 text-green-400">
                      <CheckCircle size={13} /> Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setEditing(!editing);
                  setMessage("");
                }}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium hover:border-[#d9ff4f] hover:text-[#d9ff4f] transition"
              >
                {editing ? "Cancel Edit" : "Edit Profile"}
              </button>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600/80 px-4 py-2 text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* EDIT / VIEW FORM */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Full Name</label>
              <div className="relative mt-1">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full rounded-lg border border-white/10 bg-[#06120f] py-3 pl-9 pr-3 text-sm text-white disabled:opacity-75 focus:border-[#d9ff4f] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Phone Number</label>
              <div className="relative mt-1">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Add phone number"
                  className="w-full rounded-lg border border-white/10 bg-[#06120f] py-3 pl-9 pr-3 text-sm text-white disabled:opacity-75 focus:border-[#d9ff4f] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Location / City</label>
              <div className="relative mt-1">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Add location"
                  className="w-full rounded-lg border border-white/10 bg-[#06120f] py-3 pl-9 pr-3 text-sm text-white disabled:opacity-75 focus:border-[#d9ff4f] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Role</label>
              <div className="relative mt-1">
                <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                {editing ? (
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/10 bg-[#06120f] py-3 pl-9 pr-3 text-sm text-white focus:border-[#d9ff4f] outline-none"
                  >
                    <option value="CITIZEN">Citizen</option>
                    <option value="VOLUNTEER">Volunteer</option>
                  </select>
                ) : (
                  <div className="w-full rounded-lg border border-white/10 bg-[#06120f] py-3 pl-9 pr-3 text-sm text-white opacity-75">
                    {user.role}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-full border-t border-white/10 pt-4 mt-2">
              <div className="flex flex-wrap gap-6 text-xs text-gray-400">
                <div>
                  <span className="font-semibold text-gray-300">Database Source:</span> MongoDB
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Auth Method:</span> {user.authProvider || "Firebase Auth"}
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Joined:</span>{" "}
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recent"}
                </div>
              </div>
            </div>
          </div>

          {/* MESSAGE ALERT */}
          {message && (
            <div className="mt-5 rounded-lg border border-[#d9ff4f]/20 bg-[#d9ff4f]/5 px-4 py-3 text-sm text-[#d9ff4f]">
              {message}
            </div>
          )}

          {/* SAVE BUTTONS */}
          {editing && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-[#d9ff4f] px-6 py-3 text-sm font-bold text-black hover:brightness-95 disabled:opacity-50"
              >
                {saving ? "Saving to MongoDB..." : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setMessage("");
                }}
                className="rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold hover:border-white/30"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;