# Chinese Tutor Daily Immersion App
Mobile-first PWA prototype for Singapore-Cambridge GCE O-Level Higher Chinese 1116 students.

try it live: https://lormaigai.github.io/chinese-tutor/ 

Do let me know your suggestions + feedback! 

## What is implemented

- Daily news-linked immersion lesson with source attribution.
- Multi-article reading library with topic filters and a `Next article` flow.
- Larger seed database with recent-news-inspired lessons across every topic.
- Free profile prompt before reading the "today" article flow, with local-only profile storage by default.  
  Set `PROFILE_LEAD_ENDPOINT` in `app.js` to a backend endpoint (e.g. Formspree, Supabase edge function, Airtable, Google Apps Script webhook) to collect name/email sign-ups for your user list.
- Daily/weekly news refresh cadence preference for the future content pipeline.
- Recommended source articles across news channels, linked to specific source pages.
- Longer original Chinese practice articles based on real news themes without copying source text.
- Hanzi-first reading with optional tone-marked pinyin and English rescue hints.
- Vocabulary, contextual 成语, daily 俗语, and 好词好句.
- Save-to-review flow with simple spaced repetition.
- Dictation recall, sentence-building notes, and saved-word library.
- Local email lead list export from profile form (CSV download).
- Higher Chinese oral report prompt, two-minute timer, outline, and discussion questions.
- PWA manifest and service worker for install/offline app-shell behavior.
- Prototype content pipeline health check for allowed RSS/source metadata with fallback lesson seed.
- Warm minimalist UI with a generated hero cover image.

## How to run

Open `index.html` directly, or serve the folder locally for PWA behavior:

```powershell
python -m http.server 5173
```

Then visit `http://localhost:5173`.

### Deploy / update

- For local edits, save `app.js` and hard refresh the page (`Ctrl/Cmd + Shift + R`).  
  If the app still looks old, remove old service worker cache once by doing a browser hard reload.
- If this repo is published via GitHub Pages, push your commit to the Pages source branch (`main` by default).  
  After the action finishes, open `https://lormaigai.github.io/chinese-tutor/`.

### Where email leads are stored right now

- They are currently stored locally in `localStorage` under:
  - `chinese-tutor-prototype-v2` → `leads` array
  - `chinese-tutor-anon-visits-v1` (anonymous visitor counts)
- Open Profile tab and click **导出用户列表（CSV）** to export all local emails.
- Anonymous-only global view count is optional by setting `ANONYMOUS_VISITOR_ENDPOINT` in `app.js`; the default behavior stays private/local-only.

## Prototype notes

The app does not train a custom AI model yet. In this MVP, the reading library is a structured prototype seed that demonstrates the exact content shape expected from a future AI generation pipeline. The source pipeline is intentionally conservative: it links to news sources and generates original learning material instead of reproducing full publisher articles.

Email collection is prototype-only until you configure `PROFILE_LEAD_ENDPOINT`: details are stored in the browser with `localStorage` and can be mirrored to your backend.
Recommended production setup:
- Use a secure webhook endpoint that validates email format and user consent.
- Send a double opt-in confirmation before adding to a newsletter list.
- Provide unsubscribe/delete and export tools for data rights.
- Keep `localStorage` retention local-only as backup, not as your source of truth.

Current local workflow:
- The latest profile signup list is shown in Profile -> account form (desktop/mobile).
- Duplicate emails are deduped and the list is sorted by latest update; max retention is 2000 local entries.
- The "导出CSV" button downloads all locally collected leads.
- Anonymous visits are tracked locally by default (`chinese-tutor-anon-visits-v1` in `localStorage`) and shown in Profile as "anonymous visits (local)".
- To get real global page-view counts, set `ANONYMOUS_VISITOR_ENDPOINT` in `app.js` to your own endpoint and post only minimal anonymous metadata (no email/name required).

Formspree pricing note (as of latest Formspree docs): free tier starts at 50 submissions/month; paid plans are required for higher monthly volume.
