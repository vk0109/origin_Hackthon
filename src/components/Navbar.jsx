function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#08120f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#d9ff4f] text-xl font-black text-[#08120f]">
            ✦
          </div>

          <div>
            <h1 className="font-['Manrope'] text-xl font-extrabold text-white">
              ResQ<span className="text-[#d9ff4f]">.</span>
            </h1>

            <p className="text-[7px] tracking-[2px] text-gray-400">
              DISASTER RESPONSE
            </p>
          </div>
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            className="text-sm font-medium text-white transition hover:text-[#d9ff4f]"
          >
            Home
          </a>

          <a
            href="#mission"
            className="text-sm font-medium text-gray-400 transition hover:text-[#d9ff4f]"
          >
            Mission
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-400 transition hover:text-[#d9ff4f]"
          >
            How It Works
          </a>

          <a
            href="#resources"
            className="text-sm font-medium text-gray-400 transition hover:text-[#d9ff4f]"
          >
            Resources
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-gray-400 transition hover:text-[#d9ff4f]"
          >
            Contact
          </a>
        </div>

        {/* Button */}
        <button className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#d9ff4f] hover:bg-[#d9ff4f] hover:text-[#08120f]">
          Get Started ↗
        </button>
      </div>
    </nav>
  );
}

export default Navbar;