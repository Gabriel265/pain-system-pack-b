import React from 'react';
import Link from 'next/link';

export default function BIABPreview() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Business in a Box</h2>
        <p className="text-gray-700 mb-4">Discover our all-in-one solution for starting and managing your business efficiently.</p>
        <Link href="/business-in-a-box">
          <a className="text-blue-500 hover:underline">Learn more</a>
        </Link>
      </div>
    </section>
  );
}
