let trollsList = [];

// Saves options to chrome.storage
const saveOptions = () => {
    const isDeletionMode = document.getElementById('deletion').checked;
    const subtext = document.getElementById('subtext').value;

    chrome.storage.sync.set(
        { trollsList, isDeletionMode, subtext },
        () => {
            // Notifies the user that the options have been saved
            const status = document.getElementById('status');
            status.textContent = 'Options saved';
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
            trollsList: ['Pieroc Nation', 'Morten_Knudsen'],
            isDeletionMode: false,
            subtext: '[redacted]'
        },
        (items) => {
            trollsList = items.trollsList;
            document.getElementById('deletion').checked = items.isDeletionMode;
            document.getElementById('subtext').value = items.subtext;

            loadList();
        }
    );
};

// Censorship mode
const flipMode = (ev) => {
    const section = document.getElementById('subtextSection');
    if (section) {
        section.style.display = ev.target.checked ? 'none' : 'initial';
    }
};

// Trolls list handling
const addTroll = () => {
    const newTrollCtrl = document.getElementById('newTroll');
    const newTroll = newTrollCtrl.value;

    if (newTroll === "m0loch") {
        alert("NOPE");
        return;
    }

    trollsList.push(newTroll);
    newTrollCtrl.value = "";

    loadList();
}

const removeTroll = troll => {
    trollsList = trollsList.filter(item => item !== troll);
    loadList();
}

const trolls = document.getElementById('trolls');

const loadList = () => {
    trolls.innerHTML = "";
    trollsList.map(troll => {
        const li = document.createElement("li");
        li.setAttribute('id', troll);
        const text = document.createTextNode(troll);
        li.appendChild(text);
        const removeBtn = document.createElement("input");
        removeBtn.type = "button";
        removeBtn.value = "-";
        removeBtn.addEventListener("click", () => removeTroll(troll));
        li.appendChild(removeBtn);
        trolls.appendChild(li);
    })
}

document.getElementById('deletion').addEventListener('click', flipMode);
document.getElementById('addTrollBtn').addEventListener('click', addTroll);
document.getElementById('newTroll').addEventListener('keypress',
    event => {
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById('addTrollBtn').click();
        }
    });

// Chrome storage handling
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);