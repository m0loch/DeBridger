chrome.storage.sync.get(
    {
        trollsList: ['Pieroc Nation', 'Morten_Knudsen'],
        isDeletionMode: false,
        subtext: '[redacted]'
},
    (opts) => {
        // Handle posts
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

        // Hangle quotes
        Array.from(document.getElementsByClassName("bbCodeBlock--quote")).forEach(
            quote => {
                if (opts.trollsList.includes(quote.getAttribute('data-quote'))) {
                    if (opts.isDeletionMode) {
                        quote.remove();
                    } else {
                        quote.querySelector('.bbCodeBlock-expandContent').innerText = opts.subtext;
                    }
                }
            }
        )
    }
);

