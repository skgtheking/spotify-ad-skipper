# Spotify Ad Skipper & Muter

Automatically mutes (and attempts to skip) audio ads on [open.spotify.com](https://open.spotify.com/).

---

## Description

This Chrome extension watches for “Advertisement” labels in the Spotify Web Player and, when detected, mutes the `<audio>` element and attempts to click the skip-forward button. After the ad finishes, it unmutes your Spotify audio.

---

## Installation

1. **Clone or download** this repository to your local machine:

   ```
   git clone https://github.com/skgtheking/spotify-ad-skipper.git
   ```
2. **Open Chrome** (or any Chromium-based browser) and navigate to:

   ```
   chrome://extensions/
   ```
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the cloned `spotify-ad-skipper/` folder.
5. The extension “Spotify Ad Skipper & Muter” should now appear in your list and be enabled by default.

---

## Usage

1. Go to [open.spotify.com](https://open.spotify.com/) and log into your Free-tier account.
2. Start playing any track or playlist.
3. When an ad plays, you should see in the Developer Console (F12 → Console):

   ```
   [AdSkipper] 👉 content.js is running
   [AdSkipper] Spotify Ad Blocker extension loaded.
   [AdSkipper] Spotify audio muted by extension.
   [AdSkipper] Skip button clicked.
   [AdSkipper] Spotify audio unmuted by extension.
   ```
4. If the extension successfully detects an ad, it will mute your audio. If Spotify’s skip button is active, it will click “Skip.” Once the ad ends, it will unmute your audio.

---

## File Overview

* **manifest.json**
  Declares MV3 manifest version, permissions for `https://open.spotify.com/*`, and injects `content.js` on page load.

* **content.js**
  Defines CSS selectors for the ad banner and skip button.
  Implements `getSpotifyAudioElement()` to locate `<audio>` inside a shadow DOM or fallback to top-level `<audio>`.
  Polls every second (`setInterval`) to check for ads.
  Mutes audio and clicks skip during ads, then unmutes afterward.

---

## Customization

* **Changing the ad selector**
  If Spotify’s DOM changes, update the `AD_BANNER_SELECTOR` value at the top of `content.js`:

  ```js
  const AD_BANNER_SELECTOR = '[data-testid="context-item-info-ad-subtitle"]';
  ```

  Adjust to any new attribute or class wrapping the “Advertisement” label.

* **Adjusting the polling interval**
  By default, the script polls once per second (`setInterval(checkForAdAndHandle, 1000)`). To react faster or slower, modify the `1000` (milliseconds) value.

---

## Troubleshooting

* **No logs in Console**

  1. Reload the extension at `chrome://extensions/`.
  2. Refresh the Spotify page (`F5`).
  3. Confirm you see:

     ```
     [AdSkipper] 👉 content.js is running
     [AdSkipper] Spotify Ad Blocker extension loaded.
     ```
  4. If not, verify that `manifest.json` and `content.js` are in the same directory, and that `"js": ["content.js"]` is correct.

* **Ads aren’t muted**

  1. While an ad is playing, run in Console:

     ```js
     document.querySelector('[data-testid="context-item-info-ad-subtitle"]')
     ```

     If it returns `null`, Spotify’s ad banner selector changed. Inspect the “Advertisement” element and update `AD_BANNER_SELECTOR` accordingly.

  2. If `document.querySelector('audio')` returns `null`, Spotify moved the `<audio>` element into a shadow host. Use DevTools to locate the correct shadow host (e.g., `spotify-player`) and adjust `getSpotifyAudioElement()`.

---

## License

This project is released under the MIT License. See `LICENSE` for details.

---

## Acknowledgments

* Inspired by the need to bypass Spotify Free-tier audio ads.
* Thanks to the open-source community for Chrome Extension documentation.
