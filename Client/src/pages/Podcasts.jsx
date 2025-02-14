import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const podcasts = [
  {
    title: "Breaking Taboos: Women's Health",
    description: "Discussing gynecological health, PCOS, and breaking myths.",
    image: "https://source.unsplash.com/400x250/?health,podcast",
  },
  {
    title: "The Hormonal Balance",
    description: "Understanding hormonal health and wellness for women.",
    image: "https://source.unsplash.com/400x250/?women,wellness",
  },
  {
    title: "PCOS & You",
    description: "Insights on PCOS, symptoms, and managing lifestyle changes.",
    image: "https://source.unsplash.com/400x250/?doctor,stethoscope",
  },
  {
    title: "Pregnancy & Beyond",
    description:
      "A deep dive into pregnancy care, diet, and emotional well-being.",
    image: "https://source.unsplash.com/400x250/?motherhood,baby",
  },
];

const Podcasts = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.from(".podcast-card", {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.from(".podcasts-title", {
      duration: 1,
      opacity: 0,
      y: -20,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-12"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden flex justify-center">
        <div className="w-[50vw] h-[50vh] bg-purple-600 opacity-30 blur-3xl rounded-full"></div>
      </div>

      <h1 className="podcasts-title text-4xl md:text-5xl font-bold mb-12 text-center tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
        Explore Our Podcasts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {podcasts.map((podcast, index) => (
          <div
            key={index}
            className="podcast-card relative bg-gray-800/90 rounded-xl overflow-hidden shadow-lg backdrop-blur-lg transform transition duration-300 hover:scale-105 hover:shadow-purple-400/40"
          >
            {/* Podcast Image */}
            <img
              src={podcast.image}
              alt={podcast.title}
              className="w-full h-52 object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-500"
            />

            {/* Podcast Content */}
            <div className="p-6 flex flex-col items-center text-center">
              <h2 className="text-lg font-semibold text-white">
                {podcast.title}
              </h2>
              <p className="mt-2 text-gray-300 text-sm">
                {podcast.description}
              </p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium tracking-wide transition-all duration-300 hover:scale-105">
                Listen Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcasts;
