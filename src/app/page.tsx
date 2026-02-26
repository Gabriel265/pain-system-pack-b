import React from 'react';

export default function HomePage() {
  return (
    <div className="container">
      <header className="sticky top-0 bg-[var(--ps-surface)] shadow-md">
        <nav className="flex justify-between items-center py-4">
          <div className="text-lg font-bold">PainSystem</div>
          <div className="space-x-4">
            <a href="#" className="text-[var(--ps-text)]">Home</a>
            <a href="#" className="text-[var(--ps-text)]">BIAB</a>
            <a href="#" className="text-[var(--ps-text)]">Contact</a>
          </div>
        </nav>
      </header>

      <main className="py-10">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">A platform for everyone</h1>
          <p className="mb-6">Empowering businesses with innovative solutions.</p>
          <div className="space-x-4">
            <button>Get started</button>
            <button className="bg-transparent border border-[var(--ps-accent)] text-[var(--ps-accent)]">Explore BIAB</button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[var(--ps-surface)] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Delivery Spine</h2>
            <p>Streamline your operations with our integrated delivery solutions.</p>
          </div>
          <div className="bg-[var(--ps-surface)] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Business-in-a-Box</h2>
            <p>All the tools you need to start and grow your business.</p>
          </div>
          <div className="bg-[var(--ps-surface)] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Accessibility & Levelling Up</h2>
            <p>Ensure your business is accessible and ready for the future.</p>
          </div>
        </section>

        <section className="bg-[var(--ps-surface)] p-6 rounded-lg shadow-lg text-center mb-10">
          <p className="text-lg font-medium">Governed. Evidence-logged. Deployable.</p>
        </section>

        <section className="bg-[var(--ps-surface)] p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
          <form className="flex justify-center">
            <input type="email" placeholder="Enter your email" className="p-2 rounded-l-lg border border-[var(--ps-border)]" />
            <button type="submit" className="rounded-r-lg">Subscribe</button>
          </form>
        </section>
      </main>

      <footer className="bg-[var(--ps-surface)] py-4 text-center">
        <p className="text-[var(--ps-muted)]">© 2023 PainSystem. All rights reserved.</p>
      </footer>
    </div>
  );
}
