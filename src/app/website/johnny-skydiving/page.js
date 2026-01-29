// src/app/website/johnny-skydiving/page.js

import React from 'react';

export default function JohnnySkydiving() {
  return (
    <div>
      <section id="home">
        <h1>Extreme Brand Visibility</h1>
        <video src="/path/to/hero-video.mp4" controls />
        <p>We put your brand in the sky.</p>
      </section>

      <section id="portfolio">
        <h2>Portfolio / Showcase</h2>
        <div>Past jumps gallery</div>
        <div>Before / after edits</div>
        <div>Client logos displayed</div>
        <div>Highlight reels</div>
      </section>

      <section id="packages">
        <h2>Packages / Sponsorship Tiers</h2>
        <ul>
          <li>Helmet Logo Drop</li>
          <li>Suit Branding</li>
          <li>Banner Jump</li>
          <li>Multi-Jump Campaign</li>
          <li>Event Appearances</li>
        </ul>
      </section>

      <section id="media-vault">
        <h2>Media Vault (For Clients)</h2>
        <div>Downloadable footage</div>
        <div>Raw clips</div>
        <div>Edited videos</div>
        <div>Social-ready formats</div>
      </section>

      <section id="proposal-builder">
        <h2>Proposal Builder</h2>
        <form>
          <label>Brand name</label>
          <input type="text" name="brand-name" />
          <label>Logo upload</label>
          <input type="file" name="logo-upload" />
          <label>Campaign goal</label>
          <input type="text" name="campaign-goal" />
          <label>Budget range</label>
          <input type="text" name="budget-range" />
          <label>Location preference</label>
          <input type="text" name="location-preference" />
        </form>
      </section>

      <section id="safety">
        <h2>Safety & Credibility</h2>
        <div>Certifications</div>
        <div>Insurance proof</div>
        <div>Equipment standards</div>
        <div>Experience timeline</div>
      </section>

      <section id="admin-tools">
        <h2>Admin / Creator Tools</h2>
        <div>Client list</div>
        <div>Logo archive</div>
        <div>Jump schedule</div>
        <div>Media delivery tracker</div>
        <div>Invoice / agreement templates</div>
      </section>

      <section id="social">
        <h2>Social & Virality</h2>
        <div>Instagram feed embed</div>
        <div>TikTok reels</div>
        <div>YouTube highlights</div>
        <div>Share buttons</div>
      </section>
    </div>
  );
}
