document.addEventListener('click', (e) => {
    
    if (e.target.closest('.dropdown-trigger')) {
        const currentMenu = e.target.closest('.dropdown-container').querySelector('.dropdown-menu');
        
        
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (menu !== currentMenu) menu.classList.remove('active');
        });

        currentMenu.classList.toggle('active');
        e.stopPropagation();
    } else {
        
        document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('active'));
    }

    
    if (e.target.closest('.btn-upload')) {
        const input = e.target.closest('.upload-container').querySelector('.file-input-field');
        input.click();
    }
});

 
document.querySelectorAll('.file-input-field').forEach(input => {
    input.addEventListener('change', function() {
        if(this.files[0]) {
            console.log("File Selected:", this.files[0].name);
            alert("Uploaded: " + this.files[0].name);
        }
    });
});