"use strict";

function showPopup(name) {
  console.log(name)
    chrome.windows.create({
        url: chrome.runtime.getURL(`${name}.html`), 
        type: "popup",
        width: 400,
        height: 300
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'errorWindow') {
    showPopup("errorLink")
  }
  if (request.action === 'notAnswerWindow') {
    showPopup("notAnswered")
  }
});

chrome.commands.onCommand.addListener((command) => {
  console.log("Click");
});


// const allowedUrls = [
//     "discord.com"
// ];

chrome.action.onClicked.addListener(
  function(tab)
  {
      chrome.storage.local.get(null,
      function(local)
      {
          // initiateAction(local["options-buttonactiontype"],local["options-buttonactionitems"],false,null,false,false,local);
          console.log("Click");
      });
  });


// chrome.action.onClicked.addListener(
// function(tab)
// {
//     window.close();
//     console.log("Click");
    // chrome.tabs.sendMessage(tabs[0].id, { action: 'findLastElement', text: inputText }, (response) => {
    //     if (chrome.runtime.lastError) {
    //       console.error("Content script tidak ditemukan di tab aktif:", chrome.runtime.lastError.message);
    //       alert("Content script tidak ditemukan di tab aktif. Pastikan Anda berada di halaman yang sesuai.");
    //     } else if (response && response.status === 'success') {
    //       console.log(response.message);
    //     } else {
    //       console.log('Pesan gagal dikirim atau tidak ada respons.');
    //     }
    //   });
// });

chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
    console.log("onDOMContentLoaded triggered");

    // if (details.frameId === 0) {
    //     console.log("Main frame loaded");

    //     const urlIsAllowed = allowedUrls.some((allowedUrl) => details.url.includes(allowedUrl));

    //     if (urlIsAllowed) {
    //         showPopup();
    //     } else {
    //         console.log("URL is not allowed:", details.url);
    //     }
    // } else {
    //     console.log("Not main frame:", details.frameId);
    // }
});

// Listener untuk klik icon extension
// chrome.action.onClicked.addListener((tab) => {
//     // Mengirim pesan ke content script di tab aktif
//     chrome.tabs.sendMessage(tab.id, { action: 'findLastElement' });
//   });
  
  // Listener untuk shortcut keyboard yang didefinisikan di manifest.json
  chrome.commands.onCommand.addListener((command) => {
    // if (command === '_execute_action') {
    //   // Mengambil tab aktif untuk mengirim pesan ke content script
    //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //     if (tabs[0]) {
    //       chrome.tabs.sendMessage(tabs[0].id, { action: 'findLastElement' });
    //     }
    //   });
    // }
  });
  