export default function AdToJobSection() {
  return <section className="ad-to-job sd-section" id="ad-to-job">
    <div className="ad-to-job-layout">
      <div className="ad-to-job-intro">
        <p className="mono coral">From first contact</p>
        <h2>From ad to booked job — nothing slips through.</h2>
        <p className="ad-to-job-lead">Leads come from your ads, website, WhatsApp or calls. SmartDeskia makes sure none of them are forgotten.</p>
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
            <h3>Enquiry</h3>
            <div className="ad-enquiry">
              <header><span>Enquiries</span><small className="example-data">Example data</small></header>
              <div>
                <strong>Sarah M.</strong>
                <span>Air-conditioning service</span>
                <span>via Facebook ad</span>
                <b>NEW</b>
              </div>
            </div>
          </div>
        </article>
        <article className="ad-stage">
          <div className="ad-stage-mark"><span>03</span><i aria-hidden="true" /></div>
          <div>
            <h3>Follow-up</h3>
            <div className="ad-outcome">
              <small className="example-data">Example data</small>
              <p className="followup-due">Follow-up due: Sarah M. — €2,800 quote sent 3 days ago</p>
              <p className="followup-won"><b>WON</b><strong>€2,800</strong></p>
            </div>
          </div>
        </article>
      </div>
      <p className="ad-to-job-setup">Setup includes a professional short video ad, already connected to your follow-up workflow — so every enquiry it brings gets followed up.</p>
    </div>
  </section>;
}
