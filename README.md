# d2jsp Post Text Color Remover

Removes colored text from posts made by **Taurean** on forums.d2jsp.org topics.

## How it works
- Checks each post for the author "Taurean"
- Removes color and font-family styling from all spans in their posts

## Desktop — Chrome Extension

### Installation
1. Go to `chrome://extensions/`
2. Enable Developer mode
3. Click "Load unpacked" and select this folder

## Mobile

### Kiwi Browser (Android) — Easiest
[Kiwi Browser](https://kiwibrowser.com/) supports Chrome extensions natively with no modifications needed.
1. Install Kiwi Browser
2. Open `kiwi://extensions/`
3. Enable Developer mode
4. Tap `+` and select this extension folder

### Orion Browser (iOS) — Easiest
[Orion](https://browser.kagi.com/) supports Chrome and Firefox extensions natively.
1. Install Orion
2. Go to Settings → Extensions → Add Extension
3. Load this extension folder

### Tampermonkey Userscript (Android & iOS)
Works on Firefox for Android (with Tampermonkey) and iOS (with Orion or Safari + [Userscripts app](https://apps.apple.com/us/app/userscripts/id1463298887)).
1. Install Tampermonkey for your browser
2. Open the Tampermonkey dashboard and create a new script
3. Replace the default contents with the contents of [userscript.user.js](userscript.user.js)
4. Save — it will run automatically on any `forums.d2jsp.org/topic.php` page

### Bookmarklet (any mobile browser)

```js
javascript:(function(){function r(){document.querySelectorAll("dd").forEach(dd=>{const a=dd.querySelector(".pU a[href^='user.php']");if(a&&a.textContent.trim()==="Taurean"){const c=dd.querySelector(".bts");if(c){c.querySelectorAll("span[style*='color']").forEach(s=>s.style.removeProperty('color'));c.querySelectorAll("span[style*='font-family']").forEach(s=>s.style.removeProperty('font-family'));}}});document.querySelectorAll(".bts .quote1").forEach(q=>{const a=q.querySelector("a");if(a&&a.textContent.trim().startsWith("Taurean")){const q2=q.nextElementSibling;if(q2&&q2.classList.contains("quote2")){q2.querySelectorAll("span[style*='color']").forEach(s=>s.style.removeProperty('color'));q2.querySelectorAll("span[style*='font-family']").forEach(s=>s.style.removeProperty('font-family'));}}});}r();const o=new MutationObserver(r);o.observe(document.body,{childList:true,subtree:true});})();
```

**Android (Chrome)**
1. Bookmark any page
2. Open your bookmarks, find the bookmark, and edit it
3. Replace the URL with the full `javascript:...` code above
4. Navigate to a d2jsp topic, then open bookmarks and tap the bookmarklet

**iOS (Safari)**
1. Bookmark any page
2. Edit that bookmark and replace the URL with the full `javascript:...` code above
3. Navigate to a d2jsp topic, then open bookmarks and tap the bookmarklet

> **Note:** If tapping the bookmarklet doesn't work in Safari, copy the code, tap the address bar, paste it, and hit Go.

<!-- **Debug version** — injects a visible overlay so you can see results even if alerts are blocked:

```
javascript:(function(){try{var dds=document.querySelectorAll("dd");var matched=0;var spans=0;dds.forEach(function(dd){var a=dd.querySelector(".pU a[href^='user.php']");if(a&&a.textContent.trim()==="Taurean"){matched++;var c=dd.querySelector(".bts");if(c){var s=c.querySelectorAll("span[style*='color']");spans+=s.length;s.forEach(function(s){s.style.removeProperty('color');});c.querySelectorAll("span[style*='font-family']").forEach(function(s){s.style.removeProperty('font-family');});}}});var msg="d2jsp debug\ndd elements: "+dds.length+"\nTaurean posts: "+matched+"\nColor spans cleared: "+spans;}catch(e){var msg="Error: "+e.message;}var el=document.createElement('div');el.setAttribute('style','position:fixed;top:10px;left:10px;right:10px;z-index:999999;background:#000;color:#fff;font-size:14px;padding:12px;border-radius:6px;white-space:pre;font-family:monospace;');el.textContent=msg;var btn=document.createElement('button');btn.textContent='X';btn.setAttribute('style','float:right;background:none;border:none;color:#fff;font-size:16px;cursor:pointer;');btn.onclick=function(){el.remove();};el.prepend(btn);document.body.appendChild(el);})();
```

The overlay will show how many `dd` elements exist, how many Taurean posts matched, and how many color spans were cleared. If the overlay itself doesn't appear, the bookmarklet is being blocked entirely by the browser before execution. -->

## File Overview
- `manifest.json`: Extension manifest
- `content.js`: Main logic
- `userscript.user.js`: Tampermonkey userscript

<!-- ## CI/CD — Chrome Web Store Publishing

Pushing a tag matching `v*` (e.g. `v1.1`) triggers the [release workflow](.github/workflows/release.yml), which zips the extension and publishes it to the Chrome Web Store automatically.

### Required GitHub secrets
| Secret | Where to get it |
|---|---|
| `EXTENSION_ID` | The ID in your Chrome Web Store developer dashboard |
| `CLIENT_ID` | Google Cloud Console → OAuth 2.0 credentials |
| `CLIENT_SECRET` | Google Cloud Console → OAuth 2.0 credentials |
| `REFRESH_TOKEN` | Run the OAuth flow once with `chrome-webstore-upload-cli` |

See the [chrome-webstore-upload-cli docs](https://github.com/nickvdyck/chrome-webstore-upload-cli) for step-by-step OAuth setup. -->
