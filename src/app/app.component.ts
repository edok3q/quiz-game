import { Component } from '@angular/core';
import { QuizGameComponent } from './quiz-game/quiz-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuizGameComponent],
  template: `<app-quiz-game></app-quiz-game>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
