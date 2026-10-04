const navigation = ["Home", "Enquiries", "Quotes", "Activity"];
const summaries = [["3", "New enquiries"], ["4", "Follow-ups due"], ["€18,450", "Quotes outstanding"], ["€12,700", "Won this month"]];
const attention = [
  { name: "Sarah M.", job: "Air-conditioning installation", value: "€2,800 quotation", meta: "Sent 4 days ago", status: "FOLLOW-UP DUE" },
  { name: "Daniel R.", job: "Kitchen renovation", value: "New enquiry · Instagram", meta: "Received today", status: "NEW" },
];
const recent = [["Maria C.", "Bathroom renovation", "Website", "CONTACTED"], ["Joseph B.", "Aluminium works", "Email", "QUOTE SENT"], ["Leanne T.", "Electrical work", "Facebook", "WON"], ["Peter G.", "Painting enquiry", "Phone", "LOST"]];

export default function DashboardPreview() {
  return <div className="dashboard" id="platform"><header><div><span className="mock-logo">SMART<span>DESK</span>IA<b>.</b></span> <span>/ TODAY</span></div><small>PRODUCT PREVIEW · DEMO DATA</small></header><div className="dash-layout"><nav className="dash-nav" aria-label="Dashboard preview navigation">{navigation.map((item, index) => <span className={index === 0 ? "active" : ""} key={item}>{item}</span>)}</nav><div className="dash-content"><div className="dash-toolbar"><div><small>TODAY</small><h3>Good morning, James.</h3><p>Here&apos;s what needs your attention.</p></div><span>MARKETING PREVIEW</span></div><div className="dash-stats">{summaries.map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}</div><div className="attention-list"><span>NEEDS ATTENTION</span>{attention.map((item, index) => <article className={index === 0 ? "priority" : ""} key={item.name}><div><strong>{item.name}</strong><small>{item.job}</small></div><div><strong>{item.value}</strong><small>{item.meta}</small><b>{item.status}</b></div></article>)}</div><div className="recent-list"><span>RECENT ACTIVITY</span>{recent.map(([name, job, source, status]) => <p key={name}><strong>{name}</strong><span>{job}</span><small>{source}</small><b className={`status-${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</b></p>)}</div></div></div></div>;
}
