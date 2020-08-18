// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let list = [];
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

  function start() {
    const tab = list.pop();
    chrome.tabs.get(tab.id, function (tab) {
      chrome.tabs.highlight({ tabs: tab.index }, function () {
        setTimeout(start, 1000);
      });
    });
  }

  chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.query({ active: false }, function (tabs) {
      list = tabs;
      start();
    });
  });
});
