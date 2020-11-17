// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

("use strict");
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  if (request.msg == "startCycleTabs") {
    hancleCycleTabs();
  }
});

const hancleCycleTabs = () => {
  let list = [];
  chrome.tabs.query({ active: false, currentWindow: true }, function (tabs) {
    console.log(tabs);
    function start() {
      if (list.length === 0) return false;

      const tab = list.pop();
      chrome.tabs.get(tab.id, function (tab) {
        try {
          chrome.tabs.highlight({ tabs: tab.index }, function () {
            setTimeout(start, 300);
          });
        } catch (err) {
          console.log(err);
        }
      });
    }

    list = tabs;
    start();
  });
};

// chrome.browserAction.onClicked.addListener(function () {
//   console.log("click");
//   let list = [];
//   chrome.tabs.query({ active: false }, function (tabs) {
//     function start() {
//       if (list.length === 0) return false;

//       const tab = list.pop();
//       chrome.tabs.get(tab.id, function (tab) {
//         try {
//           chrome.tabs.highlight({ tabs: tab.index }, function () {
//             setTimeout(start, 1000);
//           });
//         } catch (err) {
//           console.log(err);
//         }
//       });
//     }

//     list = tabs;
//     console.log(tabs);
//     start();
//   });
// });
