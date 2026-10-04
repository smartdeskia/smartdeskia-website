export default function AdToJobSection() {
  return <section className="ad-to-job sd-section" id="how-it-works">
    <div className="ad-to-job-layout">
      <div className="ad-to-job-intro">
        <p className="mono coral">One complete customer journey</p>
        <h2>An enquiry came in. The quote didn&apos;t get forgotten.</h2>
        <p className="ad-to-job-lead">Your enquiries may come from ads, your website, WhatsApp or calls. SmartDeskia captures them and keeps every quote and follow-up visible.</p>
      </div>
      <div className="ad-flow">
        <article className="ad-stage">
          <div className="ad-stage-mark"><span>01</span><i aria-hidden="true" /></div>
          <div>
            <h3>Enquiry source</h3>
            <div className="enquiry-sources" aria-label="Possible enquiry sources"><span>Facebook / Instagram ads</span><span>Website / landing page</span><span>WhatsApp</span><span>Phone</span></div>
            <p className="source-note">The source and type of enquiry can change depending on your business.</p>
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
      <p className="ad-to-job-setup">The business generated the enquiry and sent the quote. SmartDeskia kept the next action visible until the owner recorded the outcome.</p>
    </div>
  </section>;
}
