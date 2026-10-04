export default function HeroSection() {
  return <section className="sd-hero workflow-hero" id="top">
      <div className="hero-grid" />
      <div className="hero-composition">
        <div className="hero-message">
          <h1>You sent the quote.<br /><span>Did anyone follow it up?</span></h1>
          <p>SmartDeskia keeps your WhatsApp, website and phone enquiries, quotes and follow-ups moving — so you always know what needs your attention next.</p>
          <p className="hero-audience">Built for AC, plumbing, electrical, renovation and property-maintenance businesses in Malta and Gozo.</p>
          <div className="hero-actions">
            <a href="#how-it-works" className="coral-button">See how it works</a>
            {/* PLACEHOLDER NUMBER: 35600000000 MUST be replaced before production. This is a normal chat link, not a WhatsApp API integration. */}
            <a className="ghost-button" href="https://wa.me/35600000000?text=Hi%2C%20I%27d%20like%20to%20see%20how%20SmartDeskia%20could%20work%20for%20my%20business" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>;
}
