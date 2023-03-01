function loadHeader () {
    const header = document.createElement('div');
    header.classList.add('header');
    header.textContent = "BATTLESHIP";
    document.body.appendChild(header);
}

module.exports = {
    loadHeader,
}