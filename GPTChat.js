const chat = document.getElementById('chat');
chat.scrollTop = chat.scrollHeight - chat.clientHeight;

let textInput = document.querySelector('.textInput');
let btn = document.querySelector('.btn');
let load = document.querySelector('.load');
let answer = document.querySelector('.answer');
let scroll = document.querySelector('.scroll');

function checkForEnter(e) {
    if (e.keyCode == 13) {
        btn.click();
    }
}

function scrol() {
    scroll.scrollIntoView({
        block: 'center',
        behavior: 'smooth', // и плавно 
    });
}
btn.addEventListener("click", () => {
    let textValue = textInput.value;
    if (!textValue) return alert("Введите текст или в поле для ввода");
    load.classList.remove('hidden');
    textInput.value = '';
    scrol();
    fetch('https://chat-gpt-example.vercel.app/makeRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            question: textValue
        })
    })
        .then(response => {
            return response.json()
        })
        .then(res => { answer.innerHTML += `<div class="message gpt"><pre> ${res.answer} </pre></div>` })
        .then(() => {
            load.classList.add('hidden');
            scrol();
        })
        .catch((err) => {
            answer.innerHTML += `<div class="message gpt"><pre> Извините я не могу обработать данный запрос </pre></div>`;
            load.classList.add('hidden');
            scrol();
        });
    answer.innerHTML += `<div class="message you"> ${textValue} </div>`;
    scrol();
});
