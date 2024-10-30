document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('popupButton');
    button.addEventListener('click', closePopup);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            closePopup();
        }
    });
});

function closePopup() {
    window.close();
}
