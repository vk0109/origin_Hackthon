import {
  Droplets,
  Package,
  Pill,
  Home,
  Truck,
  Users,
  ArrowUpRight,
} from "lucide-react";

function Resources() {
  const resources = [
    {
      icon: Droplets,
      title: "Water & Hydration",
      description:
        "Clean drinking water and hydration supplies for affected communities.",
      number: "01",
    },
    {
      icon: Package,
      title: "Food & Essentials",
      description:
        "Food packages and essential supplies for emergency situations.",
      number: "02",
    },
    {
      icon: Pill,
      title: "Medical Support",
      description:
        "Medical kits and essential healthcare supplies for relief operations.",
      number: "03",
    },
    {
      icon: Home,
      title: "Emergency Shelter",
      description:
        "Temporary shelter and safe spaces for displaced communities.",
      number: "04",
    },
    {
      icon: Truck,
      title: "Rescue & Transport",
      description:
        "Transport and logistics support for emergency response teams.",
      number: "05",
    },
    {
      icon: Users,
      title: "Volunteer Support",
      description:
        "Connect skilled volunteers with active disaster relief operations.",
      number: "06",
    },
  ];

  return (
    <section
      id="resources"
      className="relative overflow-hidden bg-cover bg-center py-32 text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=2000')",
      }}
    >
      {/* Dark image overlay */}
      <div className="absolute inset-0 bg-[#06100c]/75" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06100c]/95 via-[#06100c]/75 to-[#06100c]/40" />

      {/* Glow */}
      <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#d9ff4f]/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="max-w-3xl">

          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-[#d9ff4f]" />

            <span className="text-xs font-bold tracking-[3px] text-[#d9ff4f]">
              RELIEF RESOURCES
            </span>
          </div>

          <h2 className="font-['Manrope'] text-5xl font-extrabold leading-[1] tracking-[-3px] sm:text-6xl lg:text-7xl">
            Everything needed
            <br />
            <span className="text-[#d9ff4f]">
              to respond.
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-gray-300">
            Origin brings essential resources, logistics and people
            together so communities can receive the right support
            when they need it most.
          </p>

        </div>

        {/* Resource Cards */}
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <div
                key={resource.number}
                className="group relative min-h-[250px] overflow-hidden rounded-2xl border border-white/15 bg-black/25 p-7 backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:border-[#d9ff4f]/50 hover:bg-black/40"
              >

                {/* Number */}
                <div className="flex items-center justify-between">
                  <span className="font-['Manrope'] text-xs font-bold text-gray-500">
                    {resource.number}
                  </span>

                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#d9ff4f] text-[#07110d] transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-12">

                  <h3 className="font-['Manrope'] text-xl font-bold">
                    {resource.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-xs leading-6 text-gray-400">
                    {resource.description}
                  </p>

                </div>

                {/* Arrow */}
                <div className="absolute bottom-7 right-7 grid h-9 w-9 place-items-center rounded-full border border-white/15 text-gray-500 transition duration-300 group-hover:border-[#d9ff4f] group-hover:bg-[#d9ff4f] group-hover:text-[#07110d]">
                  <ArrowUpRight size={16} />
                </div>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d9ff4f] transition-all duration-500 group-hover:w-full" />

              </div>
            );
          })}

        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-black/30 p-7 backdrop-blur-md md:flex-row md:items-center">

          <div className="flex items-center gap-5">

            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#d9ff4f] text-[#07110d]">
              <Truck size={20} />
            </div>

            <div>
              <h3 className="text-sm font-bold">
                Need emergency resources?
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Submit a request and let the response network take it from there.
              </p>
            </div>

          </div>

          <button className="flex w-fit items-center gap-3 rounded-lg bg-[#d9ff4f] px-6 py-3.5 text-xs font-bold text-[#07110d] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d9ff4f]/10">
            Request Resources
            <ArrowUpRight size={15} />
          </button>

        </div>

      </div>
    </section>
  );
}

export default Resources;