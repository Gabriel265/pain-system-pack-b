// src/app/website/services/page.js

import Link from 'next/link';

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Corporate Governance</h2>
          <p className="mb-4">
            Our corporate governance services are designed to ensure that your organization operates with integrity and accountability. We provide frameworks and tools to help you maintain compliance and foster trust with stakeholders.
          </p>
          <Link href="/projects-hub">
            <a className="text-blue-600 hover:underline">Learn more about Corporate Governance</a>
          </Link>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Painverse Creative Tools</h2>
          <p className="mb-4">
            Explore our Painverse creative tools that empower individuals and teams to innovate and create with ease. These tools are designed to enhance creativity and streamline the creative process.
          </p>
          <Link href="/business-in-a-box">
            <a className="text-blue-600 hover:underline">Learn more about Painverse Creative Tools</a>
          </Link>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Children/Education Tools</h2>
          <p className="mb-4">
            Our educational tools for children are crafted to support learning and development in a fun and engaging way. We focus on creating resources that are both educational and enjoyable.
          </p>
          <Link href="/education-tools">
            <a className="text-blue-600 hover:underline">Learn more about Children/Education Tools</a>
          </Link>
        </section>
      </div>
    </div>
  );
}
