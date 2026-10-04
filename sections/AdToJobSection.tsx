export default function AdToJobSection() {
  return <section className="ad-to-job sd-section" id="ad-to-job">
    <div className="ad-to-job-layout">
      <div className="ad-to-job-intro">
        <p className="mono coral">From first contact</p>
        <h2>From ad to booked job — nothing slips through.</h2>
        <p className="ad-to-job-lead">Your enquiries may come from ads, your website, WhatsApp or calls. SmartDeskia captures them and keeps every quote and follow-up visible.</p>
      </div>
      <div className="ad-flow">
        <article className="ad-stage">
          <div className="ad-stage-mark"><span>01</span><i aria-hidden="true" /></div>
          <div>
            <h3>Ad</h3>
            <div className="demo-ad">
              <div className="demo-ad-phone">
                <div className="demo-ad-screen">
                  <small className="example-data">Example ad</small>
                  {/* Visual slot only. A real demo video can replace .demo-ad-still later without changing this section's layout. */}
                  <div className="demo-ad-video">
                    <div className="demo-ad-still" aria-hidden="true">
                      <span className="demo-ad-sky" />
                      <span className="demo-ad-room" />
                      <span className="demo-ad-unit" />
                      <b>▶</b>
                    </div>
                  </div>
                  <p className="demo-ad-brand"><strong>Harbour Cooling</strong><span>Air-conditioning installation · Malta &amp; Gozo</span></p>
                  <a className="coral-button demo-ad-cta" href="#request-demo">Get a Quote</a>
                </div>
              </div>
              <p className="demo-ad-note">This is a demo ad — tap to see how it would work for your business.</p>
            </div>
          </div>
        </article>
        <article className="ad-stage">
          <div className="ad-stage-mark"><span>02</span><i aria-hidden="true" /></div>
          <div>
            <h3>Customer enquiry</h3>
            <div className="ad-enquiry">
              <header><span>Enquiry captured</span><small className="example-data">Example data</small></header>
              <div>
                <strong>Sarah M.</strong>
                <span>Air-conditioning service</span>
                <span>From Facebook ad</span>
                <b>CAPTURED BY SMARTDESKIA</b>
              </div>
            </div>
          </div>
        </article>
        <article className="ad-stage">
          <div className="ad-stage-mark"><span>03</span><i aria-hidden="true" /></div>
          <div>
            <h3>Quote and follow-up</h3>
            <div className="ad-outcome">
              <small className="example-data">Example data</small>
              <div className="ad-progress">
                <p><b>QUOTE SENT BY OWNER</b><span>€2,800 quote sent to Sarah M.</span></p>
                <p className="due"><b>FOLLOW-UP DUE · SMARTDESKIA</b><span>No reply after three days</span></p>
                <p><b>OWNER FOLLOWED UP</b><span>Follow-up sent today</span></p>
                <p className="won"><b>WON</b><span>Sarah accepted the €2,800 quote</span></p>
              </div>
            </div>
          </div>
        </article>
      </div>
      <p className="ad-to-job-setup">The launch kit can include a short video ad connected to the same follow-up workflow. The ad brings in the enquiry; SmartDeskia keeps the next steps visible.</p>
    </div>
  </section>;
}
