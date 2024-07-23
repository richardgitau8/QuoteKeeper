document.addEventListener('DOMContentLoaded', () => {
    const quoteInput = document.getElementById('quote');
    const authorInput = document.getElementById('author');
    const addQuoteButton = document.getElementById('addQuoteButton');
    const quotesContainer = document.getElementById('quotesContainer');
    const prefix = 'quote_';  // Prefix for quote keys in localStorage

    addQuoteButton.addEventListener('click', addQuote);
    quotesContainer.addEventListener('click', removeQuote);

    function addQuote() {
        const quote = quoteInput.value.trim();
        const author = authorInput.value.trim();

        if (quote === '' || author === '') {
            alert('Please enter both a quote and an author');
            return;
        }

        const quoteObject = {
            quote: quote,
            author: author,
            id: prefix + new Date().getTime().toString()
        };

        const quoteString = JSON.stringify(quoteObject);
        localStorage.setItem(quoteObject.id, quoteString);
        displayQuotes();
        quoteInput.value = '';
        authorInput.value = '';
    }

    function displayQuotes() {
        quotesContainer.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(prefix)) {
                const quoteObject = JSON.parse(localStorage.getItem(key));
                const quoteElement = document.createElement('div');
                quoteElement.className = 'quote';
                quoteElement.innerHTML = `
                    <p>"${quoteObject.quote}"</p>
                    <p>- ${quoteObject.author}</p>
                    <button data-id="${quoteObject.id}">Remove</button>
                `;
                quotesContainer.appendChild(quoteElement);
            }
        }
    }

    function removeQuote(e) {
        if (e.target.tagName === 'BUTTON') {
            const id = e.target.getAttribute('data-id');
            localStorage.removeItem(id);
            displayQuotes();
        }
    }

    displayQuotes();
});
