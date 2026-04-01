function Hero() {
  return (
    <section
      className="relative z-0 flex flex-col items-center justify-center
                 min-h-[70vh] text-center px-8
                 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/hero-bg.jpg")',
      }}
    >
      <h1>Capturing Moments That Last Forever</h1>
      <p>Professional photography services for every occasion.</p>
    </section>
  );
}

export default Hero;
