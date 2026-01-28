// src/app/website/page.js
export default function HomePage() {
  return (
    <div>
      <section id="hero" className="bg-blue-500 text-white p-8">
        <h1>Welcome to Pain System</h1>
        <p>Your trusted partner in accessibility and corporate solutions.</p>
      </section>
      <section id="about" className="p-8">
        <h2>About Us</h2>
        <p>Pain System is dedicated to providing accessible and reliable solutions for all your corporate needs.</p>
      </section>
      <section id="services" className="p-8">
        <h2>Our Services</h2>
        <p>Explore our range of services designed to enhance your business operations.</p>
      </section>
      <section id="contact" className="p-8">
        <h2>Contact Us</h2>
        <p>Get in touch with us for more information about our services.</p>
      </section>
    </div>
  );
}
