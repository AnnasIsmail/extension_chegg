document.getElementById('open-window').addEventListener('click', () => {
    chrome.windows.create({
      url: 'errorWindow2.html',
      type: 'popup',
      width: 400,
      height: 300
    });
  });
  