const questions = [
    {
        question: '2+2',
        answer: [
            '4',
            '6',
            '8',
            '7'
        ],
        rightAnswer: 4
    },
    {
        question: '3+3',
        answer: [
            '4',
            '6',
            '8',
            '9'
        ],
        rightAnswer: 6
    },
    {
        question: '4+3',
        answer: [
            '4',
            '6',
            '7',
            '9'
        ],
        rightAnswer: 7
    },
];

const indexBlock = document.querySelector('.footer__content'),
      question = document.querySelector('#head'),
      buttons = document.querySelectorAll('button'),
      option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4'),
      modal = document.querySelector('.modal');

let indexOfQuestion = 0,
    right = 0, 
    wrong = 0;

function load() {
    if(indexOfQuestion >= questions.length){
        endModal();
    } else {
        question.innerHTML = questions[indexOfQuestion].question;

        option1.innerHTML = questions[indexOfQuestion].answer[0];
        option2.innerHTML = questions[indexOfQuestion].answer[1];
        option3.innerHTML = questions[indexOfQuestion].answer[2];
        option4.innerHTML = questions[indexOfQuestion].answer[3];
    
        resetBtnClass();
        setQuestionIndex();
    }   
}

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.textContent == questions[indexOfQuestion].rightAnswer) {
            btn.classList.add('button_correct');
            right++;
        } else {
            btn.classList.add('button_wrong');
            wrong++;
        }
        indexOfQuestion++;

        setTimeout(load, 200);
    });    
});

function setQuestionIndex() {
    indexBlock.innerHTML = `
    ${indexOfQuestion + 1} / ${questions.length}
    `;
}

function endModal() {
    const counter = document.createElement('div');
    counter.classList.add('modal__content');
    counter.innerHTML = `
    <div class="modal__title">
        Вы ответили на ${right} вопросов из ${questions.length}
    </div>
    <button  class="btn btn_dark btn_min">Начать заново</button>
    `;
    modal.classList.remove('hide');
    modal.classList.add('show');
    modal.append(counter);
    startAgain();
}

function resetBtnClass() {
    buttons.forEach((btn) => {
        btn.classList.remove('button_correct');
        btn.classList.remove('button_wrong');
    });
}

function startAgain() {
    const startBtn = document.querySelector('.btn');
    startBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.classList.add('hide');
        indexOfQuestion = 0;
        right = 0;
        wrong = 0;
        document.querySelector('.modal__content').remove();
        load();
    });
}

load();