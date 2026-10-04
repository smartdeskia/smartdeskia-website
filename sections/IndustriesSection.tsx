export default function IndustriesSection() {
  const sources = ["Instagram", "Facebook", "Website", "Email", "Phone"];
  const questions = ["Has someone replied?", "Was the customer contacted?", "Was a quote sent?", "Does the quote need following up?", "Was the job won or lost?"];
  return <section className="industries sd-section enquiry-problem" id="enquiries"><div className="source-row" aria-label="Common enquiry sources">{sources.map(source => <span key={source}>{source}</span>)}</div><div className="problem-grid"><div><p className="mono coral">ONE CLEAR WORKFLOW</p><h2>Your enquiries are everywhere.<br /><em>Your follow-up shouldn&apos;t be.</em></h2><p className="body-copy">Receiving an enquiry is only the start. SmartDeskia gives each opportunity a clear next step, wherever it first arrived.</p></div><div className="question-list">{questions.map((question, index) => <p key={question}><span>0{index + 1}</span>{question}</p>)}</div></div></section>;
}
