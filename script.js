const ALLOWED_EXT = ['.pdf', '.doc', '.docx'];
const fileStore = { medical: [], vehicle: [], travel: [] };

const ext = (name) => name.slice(name.lastIndexOf('.')).toLowerCase();
const fmt = (b) => {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
    return (b / 1048576).toFixed(1) + ' MB';
};

function renderFiles(id) {
    const container = document.getElementById(`files-${id}`);
    const files = fileStore[id];

    if (files.length === 0) {
        container.innerHTML = `<div class="files-empty">No documents uploaded yet<br><small>PDF, DOC, DOCX ONLY</small></div>`;
        return;
    }

    container.innerHTML = files.map((f, i) => `
        <div class="file-item">
            <i class='bx bxs-file-pdf' style="font-size:26px;color:#EF4444;"></i>
            <div class="file-info">
                <div class="file-name">${f.name}</div>
                <div class="file-meta">${ext(f.name).toUpperCase().replace('.', '')} • ${fmt(f.size)}</div>
            </div>
            <div class="file-actions">
                <button class="file-btn btn-down" onclick="downloadFile(${i}, '${id}')">
                    <i class='bx bx-download'></i>
                </button>
                <button class="file-btn btn-del" onclick="removeFile('${id}', ${i})">
                    <i class='bx bx-trash'></i>
                </button>
            </div>
        </div>
    `).join('');
}

function removeFile(id, i) {
    fileStore[id].splice(i, 1);
    renderFiles(id);
}

function downloadFile(index, id) {
    const file = fileStore[id][index];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function togglePanel(id) {
    const panel = document.getElementById(`panel-${id}`);
    const arrow = document.getElementById(`arrow-${id}`);
    const isOpen = panel.classList.contains('open');

    // Close others
    document.querySelectorAll('.dropdown-panel').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('.arrow-btn').forEach(a => a.classList.remove('open'));

    if (!isOpen) {
        panel.classList.add('open');
        arrow.classList.add('open');
    }
}

function triggerUpload(id) {
    document.getElementById(`input-${id}`).click();
}

// Event Listeners
['medical', 'vehicle', 'travel'].forEach(id => {
    const input = document.getElementById(`input-${id}`);
    input.addEventListener('change', function () {
        let blocked = [];
        Array.from(this.files).forEach(f => {
            if (ALLOWED_EXT.includes(ext(f.name))) {
                fileStore[id].push(f);
            } else {
                blocked.push(f.name);
            }
        });

        renderFiles(id);

        if (blocked.length) {
            const error = document.createElement('div');
            error.className = 'error-msg';
            error.innerHTML = `⚠ Invalid format (PDF/DOC/DOCX only): ${blocked.join(', ')}`;
            document.getElementById(`files-${id}`).after(error);
            setTimeout(() => error.remove(), 4000);
        }

        document.getElementById(`panel-${id}`).classList.add('open');
        document.getElementById(`arrow-${id}`).classList.add('open');
        this.value = '';
    });
});