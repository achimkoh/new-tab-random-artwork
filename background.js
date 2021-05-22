window.onload = async function () {
    const API_URL = 'https://fjnl05lewl.execute-api.ap-northeast-2.amazonaws.com/artwork';
    const res = await fetch(API_URL);
    const data = await res.json();

    const link = document.querySelector('#link');

    let textMaxLength = 140;
    if (window.innerWidth > 1440) {
        textMaxLength = 400;
    } else if (window.innerWidth > 1024) {
        textMaxLength = 300;
    } else if (window.innerWidth > 768) {
        textMaxLength = 200;
    }

    if (data.text.length > textMaxLength) {
        link.innerText = `${data.text.slice(0, textMaxLength)}... [이어서 읽기]`;
    } else {
        link.innerText = data.text
    }

    link.setAttribute('href', data.url);

    // const background = document.querySelector('#background-img');
    // const imgUrl = `data:image/jpeg;base64,${data.imgBase64}`
    // background.setAttribute('src', imgUrl)

    const background = document.querySelector('#background');
    const imgUrl = `url(data:image/jpeg;base64,${data.imgBase64})`
    background.style.setProperty('background-image', imgUrl)

    const refresh = document.querySelector('#refresh');
    refresh.addEventListener('click', function () { window.location.reload() } );

    const container = document.querySelector('#container');
    container.classList.add('loaded');
    background.classList.add('loaded');
    window.setTimeout( () => {
        const description = document.querySelector('#description');
        description.classList.add('loaded');
    }, 3000);
    window.setTimeout( () => refresh.classList.add('loaded'), 5000);
};