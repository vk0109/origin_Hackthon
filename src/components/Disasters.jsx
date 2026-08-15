import {
  Waves,
  Building2,
  Wind,
  Mountain,
  Flame,
  Sun,
  ArrowUpRight,
} from "lucide-react";

import floodImage from "../assets/disasters/flood.jpg";
import earthquakeImage from "../assets/disasters/earthquake.jpg";
import cycloneImage from "../assets/disasters/cyclone.jpg";
import landslideImage from "../assets/disasters/landslide.jpg";
import wildfireImage from "../assets/disasters/wildfire.jpg";
import droughtImage from "../assets/disasters/drought.jpg";

function Disasters() {
  const disasters = [
    {
      title: "Flood",
      icon: Waves,
      image: floodImage,
      description:
        "Coordinate evacuation, shelter, food, water and emergency assistance during floods.",
    },
    {
      title: "Earthquake",
      icon: Building2,
      image: earthquakeImage,
      description:
        "Connect affected communities with rescue teams and essential resources.",
    },
    {
      title: "Cyclone",
      icon: Wind,
      image: cycloneImage,
      description:
        "Support evacuation, emergency response and post-storm recovery.",
    },
    {
      title: "Landslide",
      icon: Mountain,
      image: landslideImage,
      description:
        "Coordinate rescue teams and resources in affected areas.",
    },
    {
      title: "Wildfire",
      icon: Flame,
      image: wildfireImage,
      description:
        "Support evacuation and emergency relief operations.",
    },
    {
      title: "Drought",
      icon: Sun,
      image: droughtImage,
      description:
        "Coordinate water, food and essential resources for communities.",
    },
  ];

  return (
    <section
      id="disasters"
      className="relative overflow-hidden bg-[#06100c] py-28 text-white"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#d9ff4f]" />

            <span className="text-xs font-bold tracking-[3px] text-[#d9ff4f]">
              DISASTER RESPONSE
            </span>
          </div>

          <h2 className="font-['Manrope'] text-5xl font-extrabold leading-none tracking-[-3px] md:text-7xl">
            Ready for
            <br />
            <span className="text-[#d9ff4f]">
              every emergency.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-400">
            Explore the different emergencies ResQ helps communities
            prepare for and respond to.
          </p>
        </div>

        {/* Disaster Cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {disasters.map((disaster, index) => {
            const Icon = disaster.icon;

            return (
              <article
                key={disaster.title}
                className="group relative h-[400px] overflow-hidden rounded-2xl border border-white/10"
              >
                {/* Image */}
                <img
                  src={disaster.image}
                  alt={`${disaster.title} disaster`}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06100c] via-black/30 to-transparent" />

                {/* Top */}
                <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[2px] text-[#d9ff4f]">
                    0{index + 1}
                  </span>

                  <div className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md">
                    <Icon size={19} className="text-[#d9ff4f]" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mb-4 h-px w-10 bg-[#d9ff4f] transition-all duration-500 group-hover:w-20" />

                  <h3 className="font-['Manrope'] text-3xl font-extrabold">
                    {disaster.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-gray-300">
                    {disaster.description}
                  </p>

                  <button className="mt-5 flex items-center gap-2 text-xs font-bold text-[#d9ff4f]">
                    Explore
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Disasters;