import '../App.css';
import '../index.css';

export default function Home() {
  return (
    <div className="itshome">
      {/* Section 1 - Sundarta yhi pe shuru yhi pe khatam */}
      <section className="relative h-screen opacity-90">
  <video
    className="absolute inset-0 w-full h-full object-cover"
    src="../assets/home.mp4"
    type="video/mp4"
    autoPlay
    loop
    muted
    playsInline
  />
  <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
    <div>
      <h1
        className="text-4xl md:text-9xl font-bold italic text-indigo-900 animate-fadeInH1"
        style={{ fontFamily: "'Playfair Display', italic" }}
      >
        UnTaboo.
      </h1>
      <p className="mt-4 text-xl md:text-2xl text-black animate-fadeInP">
        Your tagline or description goes here.
      </p>
    </div>
  </div>

  {/* Chatbot Button */}
  <div className="fixed bottom-5 right-5 z-50 pointer-events-auto">
  <button
    onClick={() => {
      // ChatBOT onclick logic 
    }}
    aria-label="Chat with us"
  >
    <i className="fa fa-comment" aria-hidden="true"></i>
  </button>
</div>
</section>

   

  {/* Section 2 */}
  <section className="h-192 bg-center bg-cover bg-white flex flex-col items-start justify-center text-center snap-start pt-16">

  
  </section>

  {/* Section 3 */}
  <section className="h-screen bg-center bg-cover flex items-start justify-start text-center ">
  
<video
        autoPlay
        muted
        loop
        className="absolute inset-0 h-full w-full object-cover opacity-50 z-0"
      >
        <source src="your-video-url.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Section */}
      <div className="mt-22  text-gray-800 flex-col z-10">
        <h2 className="text-7xl font-bold md:text-5xl">Podcasts and Content</h2>
      </div>

      {/* Black Strip with Videos */}
      
          {/* Video Thumbnails with Hover Effects */}
         
           
      
      
</section>

  {/* Section 4 */}
  <section className="h-screen bg-center bg-cover bg-gray-600 flex items-center justify-center text-center snap-start">
    <div className="text-gray-800">
      <h2 className="text-3xl font-bold md:text-5xl">Join the Community</h2>
      <p className="mt-4 text-lg md:text-xl">
        Connect with others, share your story, and break the silence around womens health.
      </p>
      <a href="#community" className="mt-8 inline-block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-500 transition duration-300">
        Join Us
      </a>
    </div>
  </section>
</div>

);
}