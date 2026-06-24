# Email Signup Backend

Use this when you want the live GitHub Pages app to collect signups from every visitor into one private master list and show owner-only traffic analytics.

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
- Public visits are counted anonymously in a separate `VisitEvents` sheet.
- The owner page uses your private `OWNER_TOKEN` to load the full central list.
- The same owner token loads the private traffic chart in owner mode.
- The token is not committed into this repo. You paste it into owner mode on your own browser.
- Old signups made before this backend is connected cannot be recovered from other browsers/devices.

## Owner Mode

Open:

```text
https://lormaigai.github.io/chinese-tutor/?owner=1
```

Then paste the `OWNER_TOKEN` into the owner email panel and click `Load central list`.

Owner mode also includes a `网站流量` panel. Click `Load traffic` to see the latest 30 days of anonymous visits.

## Troubleshooting Owner Token Errors

If owner mode says `OWNER_TOKEN is not set in Apps Script`, the live web app deployment is still running a version where `OWNER_TOKEN` is blank or still set to a placeholder.

1. In Apps Script, open `Code.gs`.
2. Confirm `OWNER_TOKEN` is a private value you invented, not `OWNER_TOKEN`, `CHANGE_ME_TO_A_PRIVATE_TOKEN`, or `PASTE_A_PRIVATE_OWNER_TOKEN_HERE`.
3. Click `Save`.
4. Open `Deploy > Manage deployments`.
5. Edit the existing web app deployment.
6. Set `Version` to `New version`.
7. Click `Deploy`.

The owner panel needs the token value between the quotes. Never use your Google password.
