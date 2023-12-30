const braveSearchUrl = "https://search.brave.com/search?q=";

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);
    
    if (url.hostname === "example.com") {
      const searchQuery = url.searchParams.get("s");
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      const redirectUrl = braveSearchUrl + encodedSearchQuery;

      // Add a 5ms delay before redirecting. This makes it so the URL shows instead of the search term(s).
      setTimeout(() => {
        chrome.tabs.update(details.tabId, { url: redirectUrl });
      }, 5);

      return { cancel: true };
    }
  },
  {
    urls: ["<all_urls>"],
    types: ["main_frame"]
  },
  ["blocking"]
);
