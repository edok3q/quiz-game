import { Component } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

@Component({
  selector: 'app-quiz-game',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss']
})
export class QuizGameComponent {
  questions: Question[] = [
    {
      id: 1,
      question: 'Яка столиця Франції?',
      options: ['Париж', 'Лондон', 'Берлін', 'Рим'],
      correctAnswer: 'Париж'
    },
    {
      id: 2,
      question: 'Яка найбільша планета в Сонячній системі?',
      options: ['Юпітер', 'Сатурн', 'Уран', 'Нептун'],
      correctAnswer: 'Юпітер'
    },
    // Добавьте остальные вопросы здесь...
  ];

  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedOption: string = '';
  timeLeft: number = 15;
  timer: any;
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;

  currentPage: string = 'home'; // Устанавливаем домашнюю страницу по умолчанию

  ngOnInit() {
    this.startTimer();
  }

  navigateTo(page: string) {
    this.currentPage = page;
    if (page === 'quiz') {
      this.resetTimer();
    } else {
      clearInterval(this.timer); // Остановить таймер при переходе на другие страницы
    }
  }

  startTimer() {
    this.timeLeft = 15;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        this.handleSkipQuestion();
      }
    }, 1000);
  }

  resetTimer() {
    clearInterval(this.timer);
    this.startTimer();
  }

  handleOptionChange(option: string) {
    this.selectedOption = option;
  }

  handleNextQuestion() {
    if (this.selectedOption === this.questions[this.currentQuestionIndex].correctAnswer) {
      this.score++;
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }
    this.moveToNextQuestion();
  }

  handleSkipQuestion() {
    this.incorrectAnswers++;
    this.moveToNextQuestion();
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
    this.selectedOption = '';
    this.resetTimer();
  }

  handleRestart() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.selectedOption = '';
    this.navigateTo('quiz'); // При перезапуске возвращаемся к игре
    this.resetTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
