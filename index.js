const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
    try {
        infoTextEl.style.display = "block";
        meaningContainer.style.display = "none";
        infoTextEl.innerText = `Searching the meaning of "${word}"...`;

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if (response.ok && data && data.length > 0) {
            infoTextEl.style.display = "none";
            meaningContainer.style.display = "block";

            titleEl.innerText = data[0].word;
            meaningEl.innerText = data[0].meanings[0].definitions[0].definition || "No meaning found.";

            const phonetics = data[0].phonetics.find(p => p.audio);
            if (phonetics && phonetics.audio) {
                audioEl.src = phonetics.audio;
                audioEl.style.display = "inline";
            } else {
                audioEl.style.display = "none";
            }
        } else {
            infoTextEl.innerText = `No definition found for "${word}".`;
        }
    } catch (error) {
        console.error(error);
        infoTextEl.innerText = "An error occurred, please try again later.";
    }
}

inputEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const word = e.target.value.trim();
        if (word) {
            fetchAPI(word);
        }
    }
});
