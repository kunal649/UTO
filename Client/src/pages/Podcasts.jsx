import { useEffect } from "react";
import { gsap } from "gsap";
import "./Podcasts.css";

const podcasts = [
  {
    title: "Podcast Episode 1",
    description: "Description for podcast episode 1",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Podcast Episode 2",
    description: "Description for podcast episode 2",
    image: "https://via.placeholder.com/150",
  },
  // Add more podcast episodes here
];

const Podcasts = () => {
  useEffect(() => {
    gsap.from(".podcast-card", {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.3,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="podcasts-container">
      <h1 className="podcasts-title">Podcasts</h1>
      <div className="podcasts-grid">
        {podcasts.map((podcast, index) => (
          <div key={index} className="podcast-card">
            <img
              src={podcast.image}
              alt={podcast.title}
              className="podcast-image"
            />
            <h2 className="podcast-title">{podcast.title}</h2>
            <p className="podcast-description">{podcast.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcasts;
