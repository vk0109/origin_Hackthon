import { ArrowUpRight, UserRound, LogOut } from "lucide-react";

function Navbar({
  user,
  onLogin,
  onProfile,
  onLogout,
}) {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#08120f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <a
          href="/"
          className="flex items-center gap-3"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#d9ff4f] text-xl font-black text-[#08120f]">
            ✦
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">
              ResQ<span className="text-[#d9ff4f]">.</span>
            </h1>

            <p className="text-[7px] font-medium tracking-[2px] text-gray-400">
              DISASTER RESPONSE
            </p>
          </div>
        </a>

        {/* NAVIGATION */}
        <div className="hidden items-center gap-8 md:flex">

          <a href="/" className="text-sm font-medium text-white hover:text-[#d9ff4f]">
            Home
          </a>

          <a href="/#mission" className="text-sm font-medium text-gray-400 hover:text-[#d9ff4f]">
            Mission
          </a>

          <a href="/#disasters" className="text-sm font-medium text-gray-400 hover:text-[#d9ff4f]">
            Disasters
          </a>

          <a href="/#how-it-works" className="text-sm font-medium text-gray-400 hover:text-[#d9ff4f]">
            How It Works
          </a>

          <a href="/#resources" className="text-sm font-medium text-gray-400 hover:text-[#d9ff4f]">
            Resources
          </a>

          <a href="/#reviews" className="text-sm font-medium text-gray-400 hover:text-[#d9ff4f]">
            Reviews
          </a>

          <a href="/#contact" className="text-sm font-medium text-gray-400 hover:text-[#d9ff4f]">
            Contact
          </a>

        </div>

        {/* AUTH BUTTON */}
        {!user ? (
          <button
            onClick={onLogin}
            className="group flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#d9ff4f] hover:bg-[#d9ff4f] hover:text-[#08120f]"
          >
            Login

            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        ) : (
          <div className="flex items-center gap-2">

            <button
              onClick={onProfile}
              className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#d9ff4f] hover:text-[#d9ff4f]"
            >
              <UserRound size={17} />

              Profile
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-gray-400 transition hover:border-red-400/40 hover:text-red-400"
              title="Logout"
            >
              <LogOut size={17} />
            </button>

          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;