// Content script to remove colored text from Taurean's posts

function removeColorFromTaureanPosts() {
  document.querySelectorAll("dd").forEach(dd => {
    const userAnchor = dd.querySelector(".pU a[href^='user.php']");
    if (userAnchor && userAnchor.textContent.trim() === "Taurean") {
      const postContent = dd.querySelector(".bts");
      if (postContent) {
        postContent.querySelectorAll("span[style*='color']").forEach(span => {
          span.style.removeProperty('color');
        });
        postContent.querySelectorAll("span[style*='font-family']").forEach(span => {
          span.style.removeProperty('font-family');
        });
      }
    }
  });

  document.querySelectorAll(".bts .quote1").forEach(quote1 => {
    const link = quote1.querySelector("a");
    if (link && link.textContent.trim().startsWith("Taurean")) {
      const quote2 = quote1.nextElementSibling;
      if (quote2 && quote2.classList.contains("quote2")) {
        quote2.querySelectorAll("span[style*='color']").forEach(span => {
          span.style.removeProperty('color');
        });
        quote2.querySelectorAll("span[style*='font-family']").forEach(span => {
          span.style.removeProperty('font-family');
        });
      }
    }
  });
}

// Run on page load
removeColorFromTaureanPosts();
// Optionally, observe for dynamic content
const observer = new MutationObserver(removeColorFromTaureanPosts);
observer.observe(document.body, { childList: true, subtree: true });
