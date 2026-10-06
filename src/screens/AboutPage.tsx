"use client";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useAppStore } from "@/stores/app-store";

const content = { km: [
  ["តើបុណ្យភ្ជុំបិណ្ឌជាអ្វី?", "ភ្ជុំបិណ្ឌជាពិធីបុណ្យប្រពៃណីខ្មែរដែលផ្តោតលើការរំលឹកគុណបុព្វការីជន ការធ្វើបុណ្យ ការទៅវត្ត និងការជួបជុំគ្រួសារ។"],
  ["កាន់បិណ្ឌ", "រយៈពេលកាន់បិណ្ឌមាន ១៥ ថ្ងៃ។ ប្រជាពលរដ្ឋរៀបចំចង្ហាន់ និងគ្រឿងសក្ការៈទៅវត្តតាមថ្ងៃដែលគ្រួសារបានរៀបចំ។"],
  ["ភ្ជុំបិណ្ឌ", "ថ្ងៃទី ១៥ ជាថ្ងៃភ្ជុំបិណ្ឌ ដែលជាថ្ងៃសំខាន់បំផុតនៃរដូវកាលនេះ។"],
  ["គ្រួសារ និងបុព្វការីជន", "ពិធីនេះជាឱកាសសម្រាប់សមាជិកគ្រួសារត្រឡប់ទៅស្រុក ជួបជុំគ្នា និងចូលរួមសកម្មភាពប្រពៃណីដោយការគោរព។"],
  ["ប្រពៃណីទៅវត្ត", "អ្នកប្រើប្រាស់គួរគោរពតាមទំនៀមទម្លាប់របស់វត្ត និងគ្រួសាររបស់ខ្លួន។ គេហទំព័រនេះមិនបង្ហាញរឿងព្រេងដែលមិនបានផ្ទៀងផ្ទាត់ជាប្រវត្តិសាស្ត្រពិតទេ។"]], en: [
  ["What is Pchum Ben?", "Pchum Ben is a Cambodian traditional observance centered on remembrance of ancestors, merit-making, pagoda visits and family reunion."],
  ["Kan Ben", "The Kan Ben period lasts 15 days. Families prepare food and offerings and visit pagodas according to their family schedules and local practice."],
  ["Pchum Ben", "The 15th day is Pchum Ben, the principal day of the observance."],
  ["Family & ancestors", "The festival is an important time for relatives to return home, gather as a family and participate in cultural practices respectfully."],
  ["Pagoda traditions", "Visitors should respect the customs of each pagoda and their family tradition. This site avoids presenting unverified folklore as established history."]] };
export default function AboutPage() {const s = useAppStore((x) => x.settings);return <Container maxWidth="md" sx={{ py: 5 }}><Typography variant="overline" color="secondary.main" sx={{ fontWeight: 800 }}>CULTURE & TRADITION</Typography><Typography variant="h3" sx={{ fontWeight: 900 }}>{s.locale === "km" ? "អំពីបុណ្យភ្ជុំបិណ្ឌ" : "About Pchum Ben"}</Typography><Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>{s.locale === "km" ? "ខ្លឹមសារសង្ខេបដោយការគោរព និងផ្តោតលើបទពិសោធន៍គ្រួសារ។" : "A respectful, concise introduction focused on family and cultural observance."}</Typography><Box sx={{ display: "grid", gap: 2 }}>{content[s.locale].map(([title, body]) => <Card key={title}><CardContent><Typography variant="h5" sx={{ fontWeight: 900 }}>{title}</Typography><Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.9 }}>{body}</Typography></CardContent></Card>)}</Box></Container>;}
