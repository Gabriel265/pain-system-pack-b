// src/components/sections/HomePage.js
export default function HomePage() {
  return (
    <div>
      <section className="hero bg-blue-500 text-white p-8">
        <h1 className="text-4xl font-bold">Welcome to Pain System</h1>
        <p className="mt-4">Your trusted partner in achieving excellence.</p>
      </section>
      <section id="about" className="about bg-white text-black p-8">
        <h2 className="text-3xl font-bold">About Us</h2>
        <p className="mt-4">We are committed to providing top-notch services with a focus on trust and accessibility.</p>
      </section>
      <section className="services-preview bg-gray-100 text-black p-8">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <p className="mt-4">Discover how we can help you succeed.</p>
      </section>
      <section id="contact" className="contact bg-white text-black p-8">
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p className="mt-4">Get in touch with us to learn more about our offerings.</p>
      </section>
    </div>
  );
}
