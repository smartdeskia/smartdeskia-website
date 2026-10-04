import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { calculateQuoteFollowUp } from "../lib/missed-call-calculator.ts";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the SmartDeskia homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>SmartDeskia \| Enquiry and Quote Follow-Up<\/title>/i);
  assert.match(html, /You sent the quote/);
  assert.match(html, /Did anyone follow it up/);
  assert.match(html, /Example data/);
  assert.match(html, /WhatsApp, website and phone enquiries/);
  assert.match(html, /Built for AC, plumbing, electrical, renovation and property-maintenance businesses in Malta and Gozo/);
  assert.match(html, /Chat on WhatsApp/);
  assert.match(html, /One complete customer journey/i);
  assert.match(html, /An enquiry came in/);
  assert.match(html, /CAPTURED BY SMARTDESKIA/);
  assert.match(html, /QUOTE SENT BY OWNER/);
  assert.match(html, /OWNER FOLLOWED UP/);
  assert.match(html, /Founding pilot — 3 places/);
  assert.match(html, /Quote Follow-Up Calculator/i);
  assert.match(html, /How much quoted work could be sitting unfollowed/);
  assert.match(html, /Do you follow up every quote/);
  assert.match(html, /Rough estimate — not guaranteed revenue/);
  assert.doesNotMatch(html, /How we estimate this/);
  assert.doesNotMatch(html, /5% of that quoted value is/);
  assert.doesNotMatch(html, /Follow-up consistency/);
  assert.doesNotMatch(html, /Winning back even 5%/);
  assert.match(html, /Sample call — AI-generated audio/);
  assert.match(html, /Need help getting enquiries into the system/);
  assert.doesNotMatch(html, /Example SmartDeskia workflow activity/);
  assert.doesNotMatch(html, /RECORDED DEMONSTRATION/);
  assert.doesNotMatch(html, /DEMO DATA/);
  assert.doesNotMatch(html, /MARKETING PREVIEW/);
  assert.doesNotMatch(html, /ONE REAL WORKFLOW/);
  assert.doesNotMatch(html, /DentaDesk/i);
  assert.match(html, /Ask SmartDeskia/);
  assert.doesNotMatch(html, /Chat with Sofia/);
  assert.match(html, /Privacy Policy/);
});

test("calculates simplified quote follow-up examples", () => {
  const half = calculateQuoteFollowUp({ quotationsPerMonth: 15, averageQuotationValue: 2000, followUpPercentage: 50 });
  assert.equal(half.monthlyValueWithoutConsistentFollowUp, 15000);
  assert.equal(half.annualValueWithoutConsistentFollowUp, 180000);
  const most = calculateQuoteFollowUp({ quotationsPerMonth: 10, averageQuotationValue: 1000, followUpPercentage: 75 });
  assert.equal(most.monthlyValueWithoutConsistentFollowUp, 2500);
  assert.equal(most.annualValueWithoutConsistentFollowUp, 30000);
  const always = calculateQuoteFollowUp({ quotationsPerMonth: 10, averageQuotationValue: 1000, followUpPercentage: 100 });
  assert.equal(always.monthlyValueWithoutConsistentFollowUp, 0);
  assert.equal(always.annualValueWithoutConsistentFollowUp, 0);
});

test("keeps the handoff structure and routes available", async () => {
  const required = ["../components/Header.tsx", "../components/Footer.tsx", "../components/AskSmartDeskia.tsx", "../components/DashboardPreview.tsx", "../sections/HeroSection.tsx", "../sections/IndustriesSection.tsx", "../data/industries.ts", "../styles/enhancements.css", "../README.md"];
  await Promise.all(required.map(path => access(new URL(path, import.meta.url))));
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /SmartDeskiaHome/);
  assert.ok(page.split("\n").length < 12, "route file should remain a thin composition entry");
  for (const pathname of ["/login", "/contact", "/privacy", "/terms", "/cookies"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render`);
  }
});
