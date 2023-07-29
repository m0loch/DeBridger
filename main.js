Array.from(document.getElementsByClassName("message--post")).forEach(
    post => {
        if (post.getAttribute('data-author') === 'Pieroc Nation') {
            Array.from(post.getElementsByClassName('bbWrapper')).forEach(content => content.innerText = "i suck")
        }
    }
);