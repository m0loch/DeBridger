chrome.storage.sync.get(
    {
        trollsList: ['Pieroc Nation', 'Morten_Knudsen'],
        isDeletionMode: false,
        subtext: '[redacted]'
},
    (opts) => {
        console.log(opts);

        Array.from(document.getElementsByClassName("message--post")).forEach(
            post => {
                if (opts.trollsList.includes(post.getAttribute('data-author'))) {
                    Array.from(post.getElementsByClassName('bbWrapper')).forEach(content => {
                        if (opts.isDeletionMode) {
                            // up 8 levels - the code we need, not the one we deserve
                            content
                                .parentElement
                                .parentElement
                                .parentElement
                                .parentElement
                                .parentElement
                                .parentElement
                                .parentElement
                                .parentElement
                                .remove();
                        } else {
                            content.innerText = opts.subtext
                        }
                    })
                }
            }
        );
    }
);

