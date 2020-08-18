chrome.runtime.onMessage.addListener(function (message) {
  console.log("from content");
  if (message.action === "REPLACE_TEXT") {
    replaceText();
  }
});
