import {
  ArrowUpRight,
  ShieldCheck,
  Users,
  Target,
} from "lucide-react";

function Mission() {
  return (
    <section
      id="mission"
      className="relative min-h-[750px] overflow-hidden bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/6647008/pexels-photo-6647008.jpeg?auto=compress&cs=tinysrgb&w=1800')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06100c]/95 via-[#06100c]/80 to-[#06100c]/45" />

      {/* Green Glow */}
      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#d9ff4f]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-[750px] max-w-7xl items-center px-6 py-28">

        <div className="w-full">

          {/* Top Label */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-[#d9ff4f]" />

            <span className="text-xs font-bold tracking-[3px] text-[#d9ff4f]">
              OUR MISSION
            </span>
          </div>

          {/* Heading */}
          <h2 className="max-w-4xl font-['Manrope'] text-5xl font-extrabold leading-[1] tracking-[-3px] sm:text-6xl lg:text-7xl">
            Turning disaster
            <br />
            into{" "}
            <span className="text-[#d9ff4f]">
              coordinated action.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-8 text-gray-300">
            Origin connects affected communities, volunteers,
            organizations and critical resources through one
            intelligent disaster response network.
          </p>

          {/* Features */}
          <div className="mt-12 grid max-w-4xl gap-4 md:grid-cols-3">

            {/* Card 1 */}
            <div className="group rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#d9ff4f]/40 hover:bg-black/30">

              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#d9ff4f] text-[#08120e]">
                  <ShieldCheck size={20} />
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-gray-500 transition group-hover:text-[#d9ff4f]"
                />
              </div>

              <h3 className="mt-6 text-lg font-bold">
                Faster Response
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Get critical information to the right people
                without unnecessary delays.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#d9ff4f]/40 hover:bg-black/30">

              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#d9ff4f] text-[#08120e]">
                  <Users size={20} />
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-gray-500 transition group-hover:text-[#d9ff4f]"
                />
              </div>

              <h3 className="mt-6 text-lg font-bold">
                Connected People
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Bring volunteers, NGOs and communities
                together on one platform.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#d9ff4f]/40 hover:bg-black/30">

              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#d9ff4f] text-[#08120e]">
                  <Target size={20} />
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-gray-500 transition group-hover:text-[#d9ff4f]"
                />
              </div>

              <h3 className="mt-6 text-lg font-bold">
                Right Resources
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Match essential resources with the people
                and locations that need them most.
              </p>
            </div>

          </div>

          {/* Bottom Stats */}
          <div className="mt-12 flex flex-wrap gap-10 border-t border-white/10 pt-7">

            <div>
              <strong className="block font-['Manrope'] text-3xl text-[#d9ff4f]">
                24/7
              </strong>

              <span className="text-[10px] tracking-[1px] text-gray-400">
                RESPONSE NETWORK
              </span>
            </div>

            <div>
              <strong className="block font-['Manrope'] text-3xl text-[#d9ff4f]">
                1.2K+
              </strong>

              <span className="text-[10px] tracking-[1px] text-gray-400">
                VOLUNTEERS
              </span>
            </div>

            <div>
              <strong className="block font-['Manrope'] text-3xl text-[#d9ff4f]">
                85+
              </strong>

              <span className="text-[10px] tracking-[1px] text-gray-400">
                ORGANIZATIONS
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[9px] tracking-[3px] text-gray-400 md:flex">
        <span className="h-8 w-px bg-[#d9ff4f]" />
        OUR IMPACT
      </div>
    </section>
  );
}

export default Mission;