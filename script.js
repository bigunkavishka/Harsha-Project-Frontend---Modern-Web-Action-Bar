 const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownList = document.getElementById('dropdownList');

// Dropdown එක toggle කරන්න
dropdownBtn.addEventListener('click', (e) => {
    dropdownList.classList.toggle('show');
    e.stopPropagation();
});

// පිටත click කරොත් dropdown එක වහන්න
window.addEventListener('click', () => {
    dropdownList.classList.remove('show');
});

// File එකක් තෝරපු ගමන් දැනුම් දෙන්න
document.getElementById('fileInput').addEventListener('change', function() {
    if(this.files[0]) {
        alert("Selected: " + this.files[0].name);
    }
});