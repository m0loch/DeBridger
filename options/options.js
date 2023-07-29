// Saves options to chrome.storage
const saveOptions = () => {
    const target = document.getElementById('target').value;
    const isDeletionMode = document.getElementById('deletion').checked;
    const subtext = document.getElementById('subtext').value;

    chrome.storage.sync.set(
        { target, isDeletionMode, subtext },
        () => {
            // Notifies the user that the options have been saved
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 5000);
        }
    );
};

// Restores the options stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        {
            target: 'Pieroc Nation',
            isDeletionMode: false,
            subtext: 'i suck'
        },
        (items) => {
            document.getElementById('target').value = items.target;
            document.getElementById('deletion').checked = items.isDeletionMode;
            document.getElementById('subtext').value = items.subtext;
        }
    );
};

const flipMode = (ev) => {
    const section = document.getElementById('subtextSection');
    if (section) {
        section.style.display = ev.target.checked ? 'none' : 'initial';
    }
};

document.getElementById('deletion').addEventListener('click', flipMode);

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);