function utc(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}
const diff = (a, b) => Math.round((utc(a) - utc(b)) / 86400000);
function status(date) {
  const start = "2026-09-27";
  const end = "2026-10-11";
  const during = date >= start && date <= end;
  return { kan: during ? diff(date, start) + 1 : null, isPchumBen: date === end };
}
function before(days) {
  const d = new Date(Date.UTC(2026, 9, 11));
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}
const percent = (completed, total) => (total ? Math.round((completed / total) * 100) : 0);
const checks = [
  ["Kan Ben #1", status("2026-09-27").kan, 1],
  ["Kan Ben #9", status("2026-10-05").kan, 9],
  ["Pchum Ben #15", status("2026-10-11").kan, 15],
  ["Pchum Ben flag", status("2026-10-11").isPchumBen, true],
  ["Five days before Pchum Ben", before(5), "2026-10-06"],
  ["Checklist 8/10", percent(8, 10), 80],
];
let failed = false;
for (const [name, actual, expected] of checks) {
  const pass = actual === expected;
  console.log(`${pass ? "PASS" : "FAIL"} ${name}: ${actual}`);
  failed ||= !pass;
}
if (failed) process.exit(1);
