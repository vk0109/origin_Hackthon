function Footer() {
  return (
    <footer className="bg-[#09130f] px-6 py-16 text-white">

      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#d9ff4f] text-xl text-[#0b1713]">
              ✦
            </div>

            <div>
              <strong className="font-['Manrope'] text-xl">
                ResQ<span className="text-[#d9ff4f]">.</span>
              </strong>

              <small className="block text-[7px] tracking-[2px] text-gray-500">
                DISASTER RESPONSE
              </small>
            </div>
          </div>

          <p className="mt-5 max-w-xs text-xs leading-6 text-gray-500">
            Technology that brings communities, volunteers and
            resources together when they matter most.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h4 className="text-[9px] font-bold tracking-[1.5px] text-[#d9ff4f]">
            PLATFORM
          </h4>

          <div className="mt-4 flex flex-col gap-3 text-xs text-gray-500">
            <a href="#mission" className="transition hover:text-white">
              Mission
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-white"
            >
              How It Works
            </a>

            <a href="#resources" className="transition hover:text-white">
              Resources
            </a>
          </div>
        </div>

        {/* Get involved */}
        <div>
          <h4 className="text-[9px] font-bold tracking-[1.5px] text-[#d9ff4f]">
            GET INVOLVED
          </h4>

          <div className="mt-4 flex flex-col gap-3 text-xs text-gray-500">
            <a href="#home" className="transition hover:text-white">
              Request Help
            </a>

            <a href="#home" className="transition hover:text-white">
              Volunteer
            </a>

            <a href="#contact" className="transition hover:text-white">
              Organizations
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[9px] font-bold tracking-[1.5px] text-[#d9ff4f]">
            CONTACT
          </h4>

          <div className="mt-4 flex flex-col gap-3 text-xs text-gray-500">
            <span>support@origin.org</span>
            <span>Available 24/7</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-[#26352f] pt-5 text-[9px] text-gray-600 sm:flex-row">
        <span>© 2026 Origin — Disaster Response</span>

        <span>Built for better disaster response.</span>
      </div>
    </footer>
  );
}

export default Footer;