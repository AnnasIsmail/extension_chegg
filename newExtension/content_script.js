// Fungsi untuk menampilkan popup error
function showErrorPopup(title, message) {
    const errorPopup = document.createElement('div');
    errorPopup.style.position = 'fixed';
    errorPopup.style.top = '10%';
    errorPopup.style.left = '50%';
    errorPopup.style.transform = 'translateX(-50%)';
    errorPopup.style.backgroundColor = '#f8d7da';
    errorPopup.style.color = '#721c24';
    errorPopup.style.padding = '20px';
    errorPopup.style.borderRadius = '8px';
    errorPopup.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
    errorPopup.style.zIndex = '10000';
  
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    titleElement.style.margin = '0 0 10px 0';
  
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.style.margin = '0';
  
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.style.backgroundColor = '#f5c6cb';
    closeButton.style.border = 'none';
    closeButton.style.padding = '5px 10px';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
  
    closeButton.addEventListener('click', () => {
      document.body.removeChild(errorPopup);
    });
  
    errorPopup.appendChild(titleElement);
    errorPopup.appendChild(messageElement);
    errorPopup.appendChild(closeButton);
    document.body.appendChild(errorPopup);
  }

// Fungsi utama untuk mencari elemen terakhir di daftar pesan dan menangani kondisi "berhasil" atau "error"
function findLastElement() {
    // Ambil semua elemen pesan di daftar, dengan class .messageListItem_d5deea
    const messages = document.querySelectorAll('.messageListItem_d5deea');
    const lastMessage = messages[messages.length - 1]; // Ambil elemen terakhir
  
    if (lastMessage) {
      console.log('Pesan terakhir ditemukan:', lastMessage);
  
      // Cek apakah ini adalah pesan error berdasarkan ikon ⚠️ atau teks tertentu di dalam pesan
      const isErrorElement = lastMessage.querySelector('.emojiContainer_bae8cb img[aria-label="⚠️"]') ||
                             lastMessage.textContent.includes("'NoneType' object has no attribute 'group'");
  
      if (isErrorElement) {
        // Jika elemen terakhir adalah pesan error, tampilkan popup error
        showErrorPopup("Error Message", "An error occurred: 'NoneType' object has no attribute 'group'");
        return; // Hentikan eksekusi di sini jika ini pesan error
      }
  
      // Jika bukan error, cek apakah pesan mengandung teks "sistemmanufaktur"
      const authorElement = lastMessage.querySelector('.embedAuthorName_b0068a');
      if (authorElement && authorElement.textContent.trim() === 'sistemmanufaktur') {
        console.log('Elemen terakhir dengan teks "sistemmanufaktur" ditemukan:', lastMessage);
  
        // Cari tombol "View Answer" di dalam elemen terakhir yang ditemukan
        const button = lastMessage.querySelector('button.button_dd4f85.lookFilled_dd4f85.colorPrimary_dd4f85.sizeSmall_dd4f85.grow_dd4f85');
        if (button) {
          console.log('Tombol "View Answer" ditemukan:', button);
  
          // Fokuskan tombol
          button.focus();
  
          // Simulasikan klik pada tombol
          button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
          button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
          button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  
          console.log('Event klik telah berhasil disimulasikan.');
        } else {
          console.log('Tombol "View Answer" tidak ditemukan di dalam elemen yang sesuai.');
        }
      } else {
        console.log('Pesan terakhir tidak mengandung teks "sistemmanufaktur".');
      }
    } else {
      console.log('Tidak ada elemen pesan yang ditemukan.');
    }
  }
  
  
  
  
  // Mendengarkan pesan dari popup.js untuk menjalankan fungsi
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'findLastElement') {
        findLastElement();  // Jalankan fungsi ketika pesan diterima
        sendResponse({ status: 'success', message: 'findLastElement executed successfully' });
    }
  });

  console.log("Content script loaded on Discord");

  // Fungsi untuk mengubah teks dan menekan Enter
  function fieldText(newText) {
    const textBox = document.querySelector('.markup_f8f345.editor_a552a6.slateTextArea_e52116');
  
    if (textBox) {
      console.log('Textbox ditemukan:', textBox);
  
      // Setel teks baru
      textBox.innerHTML = `<div data-slate-node="element"><span data-slate-node="text"><span data-slate-leaf="true" class=""><span data-slate-string="true">${newText}</span></span></span></div>`;
  
      // Simulasikan tekan tombol Enter
      textBox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
      textBox.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
      textBox.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
  
      console.log(`Teks baru "${newText}" telah disetel dan tombol Enter ditekan.`);
    } else {
      console.log('Textbox tidak ditemukan.');
    }
  }
  
  // Mendengarkan pesan dari popup.js
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fieldText' && message.text) {
      fieldText(message.text);  // Jalankan fieldText dengan teks yang diberikan
      sendResponse({ status: 'success', message: 'Teks berhasil diubah dan Enter ditekan.' });
    }
  });
  
  
// setTimeout(() => {
//     // Cek keberadaan elemen setiap 1 detik
//     const intervalId = setInterval(() => {
//       const checkElement = document.querySelector('.embedAuthorName_b0068a');
      
//       if (checkElement) {
//         // Jika elemen ditemukan, jalankan fungsi utama dan hentikan interval
//         findLastElement();
//         clearInterval(intervalId);  // Menghentikan interval agar fungsi tidak berjalan lagi
//       } else {
//         console.log('Menunggu elemen .embedAuthorName_b0068a muncul...');
//       }
//     }, 1000);  // 1000 ms = 1 detik
// }, 5000);

