# Chinese Tutor Daily Immersion App
Mobile-first PWA prototype for Singapore-Cambridge GCE O-Level Higher Chinese 1116 students.

try it live: https://lormaigai.github.io/chinese-tutor/ 

Do let me know your suggestions + feedback! 

## What is implemented

- Daily news-linked immersion lesson with source attribution.
- Multi-article reading library with topic filters and a `Next article` flow.
- Recommended source articles across news channels, linked to specific source pages.
- Longer original Chinese practice articles based on real news themes without copying source text.
- Hanzi-first reading with optional tone-marked pinyin and English rescue hints.
- Vocabulary, contextual 成语, daily 俗语, and 好词好句.
- Save-to-review flow with simple spaced repetition.
- Dictation recall, sentence-building notes, and saved-word library.
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

## Prototype notes

The app does not train a custom AI model yet. In this MVP, the reading library is a structured prototype seed that demonstrates the exact content shape expected from a future AI generation pipeline. The source pipeline is intentionally conservative: it links to news sources and generates original learning material instead of reproducing full publisher articles.
