# d2jsp Post Text Color Remover Chrome Extension

This Chrome extension removes colored text from posts made by the user **Taurean** on forums.d2jsp.org topics.

## How it works
- Checks each post for the author "Taurean"
- Removes color styling from all spans in their posts

## Installation
1. Go to `chrome://extensions/`
2. Enable Developer mode
3. Click "Load unpacked" and select this folder

## File Overview
- `manifest.json`: Extension manifest
- `content.js`: Main logic

## Bookmarklet for mobile

```js
javascript:(function(){function r(){document.querySelectorAll("dd").forEach(dd=>{const a=dd.querySelector(".pU a[href^='user.php']");if(a&&a.textContent.trim()==="Taurean"){const c=dd.querySelector(".bts");if(c){c.querySelectorAll("span[style*='color']").forEach(s=>s.style.color=null);c.querySelectorAll("span[style*='font-family']").forEach(s=>s.style.fontFamily=null);}}})}r();const o=new MutationObserver(r);o.observe(document.body,{childList:true,subtree:true});})();
```

### Android (Chrome)
1. Bookmark any page
2. Open your bookmarks, find the bookmark, and edit it
3. Replace the URL with the full `javascript:...` code above
4. Navigate to a d2jsp topic, then open bookmarks and tap the bookmarklet

### iOS (Safari)
Safari blocks `javascript:` bookmarklets from the address bar, so use this workaround:
1. Bookmark any page
2. Edit that bookmark and replace the URL with the full `javascript:...` code above
3. Navigate to a d2jsp topic, then open bookmarks and tap the bookmarklet

> **Note:** If tapping the bookmarklet doesn't work in Safari, copy the code, tap the address bar, paste it, and hit Go.
