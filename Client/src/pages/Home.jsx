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
        Because Some Conversations Can't Wait 
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

 

</div>

);
}