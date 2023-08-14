chrome.storage.sync.get(
    {
        trollsList: ['Pieroc Nation', 'Morten_Knudsen'],
        isDeletionMode: false,
        subcontent: '[redacted]'
},
    (opts) => {
        // Remove VIPs from the list of trolls
        const safe = Array.from(
                document.getElementsByClassName("username")
            )
            .filter(user => user.querySelector("[itemprop='name']")?.classList?.length > 0)
            .map(user => user.childNodes[0].innerText);

        opts.trollsList = opts.trollsList.filter(troll => !safe.includes(troll));

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
                            content.innerHTML = opts.subcontent
                        }
                    })
                }
            }
        );

        // Handle quotes
        Array.from(document.getElementsByClassName("bbCodeBlock--quote")).forEach(
            quote => {
                if (opts.trollsList.includes(quote.getAttribute('data-quote'))) {
                    if (opts.isDeletionMode) {
                        quote.remove();
                    } else {
                        quote.querySelector('.bbCodeBlock-expandContent').innerHTML = opts.subcontent;
                    }
                }
            }
        )
    }
);

