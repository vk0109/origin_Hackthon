import { useEffect, useState } from "react";
import { auth } from "../firebase";

const API_URL = "http://localhost:5000";

function Profile({ onClose, onLogout }) {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", location: "" });

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setMessage("");

      const current = auth.currentUser;

      if (!current) {
        setMessage("You must be signed in to view your profile.");
        setLoading(false);
        // Close profile to prompt login
        onClose && onClose();
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
          setMessage("Your session is invalid. Please login again.");
          await auth.signOut();
          onClose && onClose();
          return;
        }

        if (res.status === 404) {
          setMessage("Profile not found. Please complete your profile.");
          setLoading(false);
          return;
        }

        const data = await res.json();

        setUser(data.user);
        setForm({ name: data.user.name || "", phone: data.user.phone || "", location: data.user.location || "" });

      } catch (error) {
        console.error("PROFILE LOAD ERROR:", error);
        setMessage(error.message || "Unable to load profile.");
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
      const current = auth.currentUser;
      if (!current) throw new Error("Not authenticated");

      const token = await current.getIdToken(true);

      const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: form.name, phone: form.phone, location: form.location, role: user.role }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Unable to update profile");

      setUser(data.user);
      setEditing(false);
    } catch (error) {
      console.error("PROFILE SAVE ERROR:", error);
      setMessage(error.message || "Failed to update profile");
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("resq_user");
    localStorage.removeItem("resq_pending_profile");
    onLogout && onLogout();
    onClose && onClose();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06100c] text-[#d9ff4f]">Loading profile...</div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06100c] text-[#d9ff4f]">
        <div className="max-w-xl text-center">
          <p className="mb-4">{message || "Profile not available."}</p>
          <button onClick={onClose} className="rounded-lg bg-[#d9ff4f] px-6 py-3 font-bold text-black">Return</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#06100c] text-white">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="rounded-2xl border border-white/10 bg-[#0c1512]/95 p-7 shadow-2xl backdrop-blur-xl">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[#d9ff4f] text-black grid place-items-center font-bold text-xl">{user.name ? user.name.charAt(0).toUpperCase() : "R"}</div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setEditing(!editing)} className="rounded-lg border border-white/10 px-4 py-2 text-sm">{editing ? "Cancel" : "Edit Profile"}</button>
              <button onClick={handleLogout} className="rounded-lg bg-red-600 px-4 py-2 text-sm">Logout</button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="col-span-1">
              <label className="text-sm text-gray-400">Name</label>
              <input name="name" value={form.name} onChange={handleChange} disabled={!editing} className="w-full rounded-lg border border-white/10 bg-[#06120f] py-3 px-3 text-white" />
            </div>

            <div>
              <label className="text-sm text-gray-400">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} disabled={!editing} className="w-full rounded-lg border border-white/10 bg-[#06120f] py-3 px-3 text-white" />
            </div>

            <div>
              <label className="text-sm text-gray-400">Location</label>
              <input name="location" value={form.location} onChange={handleChange} disabled={!editing} className="w-full rounded-lg border border-white/10 bg-[#06120f] py-3 px-3 text-white" />
            </div>

            <div>
              <label className="text-sm text-gray-400">Role</label>
              <div className="w-full rounded-lg border border-white/10 bg-[#06120f] py-3 px-3 text-white">{user.role}</div>
            </div>

            <div className="col-span-full mt-4">
              <label className="text-sm text-gray-400">Account status</label>
              <div className="w-full rounded-lg border border-white/10 bg-[#06120f] py-3 px-3 text-white">{user.createdAt ? `Member since ${new Date(user.createdAt).toLocaleDateString()}` : "Unknown"}</div>
            </div>
          </div>

          {message && (
            <div className="mt-4 text-sm text-red-400">{message}</div>
          )}

          {editing && (
            <div className="mt-6 flex gap-3">
              <button onClick={handleSave} className="rounded-lg bg-[#d9ff4f] px-6 py-3 font-bold text-black">Save</button>
              <button onClick={() => setEditing(false)} className="rounded-lg border border-white/10 px-6 py-3">Cancel</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Profile;