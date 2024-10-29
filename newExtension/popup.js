document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const openButton = document.getElementById('openUrl');
  
    if (urlInput) {
      urlInput.focus();
    }
  
    urlInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        openButton.click();
      }
    });
  
    openButton.addEventListener('click', () => {
      const inputText = urlInput.value;
  
      if (inputText) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'findLastElement'}, (response) => {
              if (chrome.runtime.lastError) {
                console.error("Content script tidak ditemukan di tab aktif:", chrome.runtime.lastError.message);
                alert("Content script tidak ditemukan di tab aktif. Pastikan Anda berada di halaman yang sesuai.");
              } else if (response && response.status === 'success') {
                console.log(response.message);
              } else {
                console.log('Pesan gagal dikirim atau tidak ada respons.');
              }
              window.close();
            });
          }
        });
      } else {
        alert("Mohon masukkan teks yang valid.");
      }
    });
  });
  
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].url.includes("discord.com")) {  // Periksa apakah URL mengandung "discord.com"
      chrome.tabs.sendMessage(tabs[0].id, { action: 'findLastElement' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Content script tidak ditemukan di tab aktif:", chrome.runtime.lastError);
          alert("Content script tidak ditemukan di tab aktif. Pastikan Anda berada di halaman Discord.");
        } else if (response && response.status === 'success') {
          console.log(response.message);
        }
      });
    } else {
      alert("Harap buka halaman Discord sebelum menggunakan extension ini.");
    }
  });
  