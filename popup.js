// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

const moveTab = (query) => {
  chrome.windows.create((window) => {
    chrome.tabs.query(query, function (tabs) {
      console.log(tabs, query);
      chrome.tabs.move(
        tabs.map((i) => i.id),
        { windowId: window.id, index: 0 },
        (e) => {
          console.log(e, "callback");
        }
      );
    });
    chrome.tabs.query({ title: "New Tab" }, (tabs) => {
      chrome.tabs.remove(tabs.map((i) => i.id));
    });
  });
};

let giveaways = document.querySelector("#giveaways");
giveaways.addEventListener("click", () => {
  moveTab({
    url: [
      "https://gleam.io/*",
      "https://playr.gg/giveaway/*",
      "https://www.rafflecopter.com/*",
      "https://kingsumo.com/*",
      "https://swps.me/*",
      "https://sweepsdb.com/*",
      "https://*/giveaways/*",
      "file:///*/bookmarks*",
    ],
  });
});

let others = document.querySelector("#others");
others.addEventListener("click", () => {
  moveTab({
    url: [
      "https://discord.com/*",
      "https://twitter.com/*",
      "https://www.youtube.com/*",
      "https://www.bookbub.com/*",
    ],
  });
});

let gleam = document.querySelector("#gleam");
gleam.addEventListener("click", () => {
  moveTab({ url: "https://gleam.io/*" });
});

let discord = document.querySelector("#discord");
discord.addEventListener("click", () => {
  moveTab({ url: "https://discord.com/*" });
});

let twitter = document.querySelector("#twitter");
twitter.addEventListener("click", () => {
  moveTab({ url: "https://twitter.com/*" });
});

let playr = document.querySelector("#playr");
playr.addEventListener("click", () => {
  moveTab({ url: "https://playr.gg/giveaway/*" });
});

let rafflecopter = document.querySelector("#rafflecopter");
rafflecopter.addEventListener("click", () => {
  moveTab({ url: "https://www.rafflecopter.com/*" });
});

let bookbub = document.querySelector("#bookbub");
bookbub.addEventListener("click", () => {
  moveTab({ url: "https://www.bookbub.com/*" });
});

let youtube = document.querySelector("#youtube");
youtube.addEventListener("click", () => {
  moveTab({ url: "https://www.youtube.com/*" });
});

let kingsumo = document.querySelector("#kingsumo");
kingsumo.addEventListener("click", () => {
  moveTab({ url: "https://kingsumo.com/*" });
});

let cycleTabs = document.querySelector("#cycleTabs");
cycleTabs.addEventListener("click", () => {
  chrome.runtime.sendMessage({ msg: "startCycleTabs" });
});
