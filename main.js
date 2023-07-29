chrome.storage.sync.get(
    {
        target: 'Pieroc Nation',
        isDeletionMode: false,
        subtext: 'i suck'
    },
    (opts) => {
        console.log(opts);

        Array.from(document.getElementsByClassName("message--post")).forEach(
            post => {
                if (post.getAttribute('data-author') === opts.target) {
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

