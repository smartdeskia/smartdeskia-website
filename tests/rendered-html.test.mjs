import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

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
  assert.match(html, /<title>SmartDeskia \| Your phone, answered\.<\/title>/i);
  assert.match(html, /Your phone,/);
  assert.match(html, /Simulated live conversation/);
  assert.doesNotMatch(html, /DentaDesk/i);
  assert.match(html, /Chat with Sofia/);
  assert.match(html, /Privacy Policy/);
});

test("keeps the handoff structure and routes available", async () => {
  const required = ["../components/Header.tsx", "../components/Footer.tsx", "../components/SofiaChat.tsx", "../components/DashboardPreview.tsx", "../sections/HeroSection.tsx", "../sections/IndustriesSection.tsx", "../data/industries.ts", "../styles/enhancements.css", "../.env.example", "../README.md"];
  await Promise.all(required.map(path => access(new URL(path, import.meta.url))));
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /SmartDeskiaHome/);
  assert.ok(page.split("\n").length < 12, "route file should remain a thin composition entry");
  for (const pathname of ["/login", "/contact", "/privacy", "/terms", "/cookies"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render`);
  }
});
