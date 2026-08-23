import Link from "next/link";

export default function InfoPage({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <main className="info-page"><header><Link className="sd-logo" href="/">SMART<span>DESK</span>IA<i></i></Link><Link href="/">← Back home</Link></header><section><p className="mono coral">{eyebrow}</p><h1>{title}</h1><p>{description}</p><Link className="coral-button" href="/">Return to SmartDeskia <b>↗</b></Link></section></main>;
}
