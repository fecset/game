// Контейнер div для квадратов
const div = document.createElement('div');
div.classList.add('container');
document.body.appendChild(div);

let count = 5; // Попытки
let prize = 50 // Призы
let array = []; // Массив с загаданными числами

// Cчётчик попыток
const counter = document.createElement('h2');
const counterText = document.createTextNode(`Попытки: ${count}`);
counter.classList.add('counter');
counter.appendChild(counterText);
document.body.appendChild(counter);

// Кнопка рестарта
const restart = document.createElement('button');
const restartText = document.createTextNode('Новая игра');
restart.classList.add('restart-btn');
restart.appendChild(restartText);


// Кол-во призов
const prizes = document.createElement('h2');
const prizesText = document.createTextNode(`Призов: ${prize}`);
prizes.classList.add('prizes');
prizes.appendChild(prizesText);
document.body.appendChild(prizes);

// Создание модального окна
let modal = document.createElement('div');
modal.classList.add('modal');

// Создание содержимого модального окна
let modalContent = document.createElement('div');
modalContent.classList.add('modal-content');

// Создание кнопки для закрытия модального окна
let closeBtn = document.createElement('span');
closeBtn.classList.add('close');
closeBtn.innerHTML = "&times;";

// Создание текста в модальном окне
let modalText = document.createElement('p');
modalText.id = "modalText";

// Добавление элементов в модальное окно
modalContent.appendChild(closeBtn);
modalContent.appendChild(modalText);
modalContent.appendChild(restart)
modal.appendChild(modalContent);
document.body.appendChild(modal);

// Закрытие модального окна при клике на кнопку закрытия
closeBtn.onclick = function() {
  modal.style.display = "none";
}

//Перезагрузка страницы
restart.addEventListener('click', () => {
    location.reload();
});


// Рендер квадратов
for (i = 0; i < 400; i++){
    const btn = document.createElement('button');
    const btnText = document.createTextNode(i+1);
    btn.appendChild(btnText);
    div.appendChild(btn);
    btn.classList.add('buttons');
};

// Генератор случайных чисел без повторений
let generatedValues = new Set();
function getRandomInt(max) {
    let random;
    do {
    random = Math.floor(Math.random() * max) + 1;
    } while (generatedValues.has(random));
    generatedValues.add(random);
    return random;
};


// Загаданные числа
for (i = 0; i < prize; i++){
    let randomInt = getRandomInt(400);
    array.push(randomInt);
};

// Остановка игры
function stopGame(){
    for (let i = 0; i < square.length; i++) {
        if (array.includes(parseInt(square[i].textContent))) {
          square[i].style.backgroundColor = '#4CAF50';
          square[i].textContent = '🎁';
        };
        square[i].setAttribute('disabled', '');
        square[i].style.pointerEvents = "none";
    };
};

console.log('array: ', array); 

const square = document.querySelectorAll('.buttons');

// Механика победы и поражения
for (let i = 0; i < square.length; i++){
    square[i].addEventListener('click', () => {
        if (square[i].textContent === '🎁') {
            return;
        }
        if (array.includes(parseInt(square[i].textContent))){
            square[i].style.backgroundColor = '#4CAF50';
            square[i].textContent = '🎁';
            modal.style.display = "block";
            modalText.textContent = "Поздравляем! Вы выиграли приз!";
            stopGame();

        }else{
            count--
            counter.textContent = `Попытки: ${count}`;
            square[i].style.backgroundColor = 'red';
            square[i].textContent = '✖';
            square[i].setAttribute('disabled', '');
            if (count < 1){
                stopGame();
                modal.style.display = "block";
                modalText.textContent = "Игра окончена! Вы проиграли!";
            }
        }
    });
};


