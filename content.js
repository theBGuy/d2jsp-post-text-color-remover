// Content script to remove colored text from Taurean's posts

function removeColorFromTaureanPosts() {
  // Find all post containers
  document.querySelectorAll("dd").forEach(dd => {
    const userAnchor = dd.querySelector(".pU a[href^='user.php']");
    if (userAnchor && userAnchor.textContent.trim() === "Taurean") {
      // Find the post content container
      const postContent = dd.querySelector(".bts");
      if (postContent) {
        // Find all spans with a color style and remove the color
        postContent.querySelectorAll("span[style*='color']").forEach(span => {
          span.style.color = null;
        });
        // remove the font-family style if it exists
        postContent.querySelectorAll("span[style*='font-family']").forEach(span => {
          span.style.fontFamily = null;
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
