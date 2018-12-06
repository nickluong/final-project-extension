// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

// chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//   // chrome.declarativeContent.onPageChanged.addRules([
//   //   {
//   //     conditions: [
//   //       new chrome.declarativeContent.PageStateMatcher({
//   //         // pageUrl: { hostEquals: "www.netflix.com", pathContains: "watch" }
//   //         pageUrl: { hostEquals: "http://localhost:3001/" }
//   //       })
//   //     ],
//   //     actions: [new chrome.declarativeContent.ShowPageAction()]
//   //   }
//   // ]);
// });

// chrome.declarativeContent.onPageChanged
chrome.storage.sync.get(["username"], result => {
  console.log("background" + result.username);
});
