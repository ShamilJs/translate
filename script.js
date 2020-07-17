'use strict';

const API_KEY = 'trnsl.1.1.20190704T212630Z.c409bb9604ae7251.df09dbd89372575b02298ed0970f8e45c749648b';
const SERVER = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
let lang1 = 'ru', 
    lang2 = 'en';

const input = document.querySelector('.input-text'),
    output = document.querySelector('.output-text'),
    button = document.querySelector('.button');

const postData = () => {
    return fetch(`${SERVER}?key=${API_KEY}&text=${input.value}&lang=${lang1}-${lang2}&format=plain&`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
};
   
const select = document.querySelectorAll('select');
const selectValue = () => {
    select.forEach(item => {
        item.addEventListener('change', (event) => {
            
            
            if (event.target.closest('.input')) {
                input.value = '';
                input.placeholder = item.value;
                if (item.value === "Русский") {
                    lang1 = 'ru';
                } else {
                    lang1 = 'en';
                }
            }
            if (event.target.closest('.output')) {
                output.value = '';
                output.placeholder = item.value;
                if (item.value === "Русский") {
                    lang2 = 'ru';
                } else {
                    lang2 = 'en';
                }
            }
        });
    });
};
selectValue();

// const placeholder = () => {
//     if (input.placeholder === output.placeholder === 'Русский') {
//                 lang = 'ru-ru';
//             }
//               if (input.placeholder === output.placeholder === 'Английский') {
//                 lang = 'en-en';
//             }
//             if (input.placeholder === 'Русский' &&
//                 output.placeholder === 'Английский') {
//                 lang = 'ru-en';
//             }  if (input.placeholder === 'Английский' &&
//                 output.placeholder === 'Русский') {
//                 lang = 'en-ru';
//             }
//         };

button.addEventListener('click', () => {
    if(input.value) {
        output.value = '';
         console.log(`${lang1}-${lang2}`);
        postData()
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Что-то пошло не так...');
            }
            fetch(`${response.url}`)
            .then(() => {
                response.json().then((data)=>{
                    output.value = data.text[0];
                });
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
});



