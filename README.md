# Tally

A single-page app. Everything a person enters stays in that browser on that device; nothing is uploaded.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app |
| `manifest.webmanifest` | Name, colors and icons used when it is installed |
| `sw.js` | Lets the installed app open without a connection |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | App icons |

Keep all of them in the same folder.

## Publish on GitHub Pages

1. Create a repository and upload every file in this folder to its top level.
2. In the repository, open Settings, then Pages. Under "Build and deployment", choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
3. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.
4. Open that address in Chrome and install it as an app.

## Updating

Upload the new `index.html` over the old one. Installed copies pick it up the next time they open with a connection; GitHub can take about ten minutes to serve the new file.

## Good to know

- Each device keeps its own data. To move it, use Settings, then Backup, on one device and restore on the other.
- The Travel map loads its country shapes from the internet the first time it opens. After that it is kept on the device and works offline.
- The optional PIN, and Face ID or Touch ID, are set in Settings on each device. They close the app to someone holding the device; they do not encrypt the data.
- The optional second layer, a password, is also set in Settings and is asked for after the PIN or Face ID.
- Baby mode (Fun, then Turn on baby mode) shows only the learning games. Leaving it takes the PIN, or a three-second hold when no PIN is set.
- The address is public, so anyone with the link can open the app and see the example profiles. They get an empty copy, never your entries.
