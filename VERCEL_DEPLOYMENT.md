# Vercel-এ ডেপ্লয় গাইড

অ্যাপটি Vercel-এ বিল্ড হলে স্বয়ংক্রিয়ভাবে Vercel সার্ভার মোডে তৈরি হয় (`vite.config.ts` দেখুন)। আলাদা কোনো কোড বদলাতে হবে না।

## ১. Vercel প্রজেক্ট সেটিংস
- Framework Preset: **Other**
- Build Command: `npm run build`
- Output Directory: খালি রাখুন
- Install Command: `npm install`
- Node.js Version: **22.x**

## ২. Environment Variables (Settings → Environment Variables)
Production, Preview, Development তিনটিতেই টিক দিন:

| Key | কোথা থেকে পাবেন |
|---|---|
| `VITE_SUPABASE_URL` | ডাটাবেসের Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | ডাটাবেসের publishable/anon key |
| `VITE_SUPABASE_PROJECT_ID` | Project ID (URL-এর প্রথম অংশ) |
| `SUPABASE_URL` | `VITE_SUPABASE_URL`-এর একই মান |
| `SUPABASE_PUBLISHABLE_KEY` | `VITE_SUPABASE_PUBLISHABLE_KEY`-এর একই মান |
| `SUPABASE_SERVICE_ROLE_KEY` | শুধু নিজস্ব Supabase প্রজেক্টে পাওয়া যায় (স্টাফ আইডি তৈরি/মোছার জন্য দরকার) |

`NITRO_PRESET` দেওয়ার দরকার নেই — Vercel নিজেই `VERCEL=1` সেট করে।

## ৩. ডাটাবেস
Vercel যে ডাটাবেসের কি ব্যবহার করবে, সেখানে অ্যাপের সব টেবিল, ফাংশন ও অ্যাডমিন রোল থাকতে হবে। খালি নতুন ডাটাবেসে লগইন হলেও ড্যাশবোর্ড লোড হবে না।

## ৪. রিডিপ্লয়
ভেরিয়েবল বদলালে Deployments → ••• → **Redeploy** করুন (cache ছাড়া)।
