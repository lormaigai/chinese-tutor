# Email Signup Backend

Use this when you want the live GitHub Pages app to collect signups from every visitor into one private master list.

## Google Sheets + Apps Script Setup

1. Create a new Google Sheet named `Chinese Tutor Signups`.
2. In the sheet, open `Extensions > Apps Script`.
3. Replace the default script with the contents of `google-apps-script.js`.
4. In Apps Script, change `OWNER_TOKEN` inside `google-apps-script.js` to a private random value, for example `ct-owner-2026-long-secret`. Do not commit the real token to GitHub.
5. In Apps Script, open `Project Settings` and enable `Show "appsscript.json" manifest file in editor`.
6. Open `appsscript.json` in the editor and replace it with the contents of `appsscript.json` from this folder. This limits the Sheets permission to the current spreadsheet.
7. Click `Deploy > New deployment`.
8. Choose `Web app`.
9. Set `Execute as` to `Me`.
10. Set `Who has access` to `Anyone`.
11. Deploy and copy the Web app URL ending in `/exec`.
12. Paste that URL into `profile-lead-config.js` as `profileLeadEndpoint`.
13. Commit and push the app again.

## How It Works

- Public visitors can create a profile and send their name/email into the sheet.
- The owner page uses your private `OWNER_TOKEN` to load the full central list.
- The token is not committed into this repo. You paste it into owner mode on your own browser.
- Old signups made before this backend is connected cannot be recovered from other browsers/devices.

## Owner Mode

Open:

```text
https://lormaigai.github.io/chinese-tutor/?owner=1
```

Then paste the `OWNER_TOKEN` into the owner email panel and click `Load central list`.
