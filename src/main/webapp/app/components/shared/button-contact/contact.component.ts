import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  questions: Question[] = [];
  answers: { index: number; answer: string }[] = [];
  currentQuestionIdx = 0;

  constructor(private modalService: NgbModal, private translateService: TranslateService) {
    this.questions = this.createQuestions();

    console.log(this.questions);
  }

  openModalContact(content: TemplateRef<any>): void {
    this.modalService.open(content, { centered: true, size: 'xl' });
  }

  public answerQuestion(index: number, answer: string): void {
    this.answers.push({ index, answer });
    this.nextQuestion();
  }

  public nextQuestion(): void {
    this.currentQuestionIdx++;
    console.log(this.answers);
  }

  public previousQuestion(): void {
    this.currentQuestionIdx--;
  }

  public closeModal(): void {
    this.modalService.dismissAll();
  }

  private createQuestions(): Question[] {
    const questions: Question[] = [];

    const question1 = this.translateService.instant('contact.questions.step1.question'); // Want to get in touch? That’s great! \n In regards to...
    const question1_Answer1 = this.translateService.instant('contact.questions.step1.answer1'); // WebSite
    const question1_Answer2 = this.translateService.instant('contact.questions.step1.answer2'); // Branding
    const question1_Answer3 = this.translateService.instant('contact.questions.step1.answer3'); // WebSite & Branding

    const question2 = this.translateService.instant('contact.questions.step2.question'); // Awesome! Can you give a few details about what you need?
    const question2_Input = this.translateService.instant('contact.questions.step2.input'); // Please share some project details
    const question2_InputDetail1 = new InputDetail('textarea', question2_Input);

    const question3 = this.translateService.instant('contact.questions.step3.question'); // What type of budget are you looking to invest in this project?
    const question3_Answer1 = this.translateService.instant('contact.questions.step3.answer1'); // <5K
    const question3_Answer2 = this.translateService.instant('contact.questions.step3.answer2'); // 5K-10K
    const question3_Answer3 = this.translateService.instant('contact.questions.step3.answer3'); // 10K-15K
    const question3_Answer4 = this.translateService.instant('contact.questions.step3.answer4'); // +15K

    const question4 = this.translateService.instant('contact.questions.step4.question'); // And what’s your timeframe?
    const question4_Answer1 = this.translateService.instant('contact.questions.step4.answer1'); // Whenever
    const question4_Answer2 = this.translateService.instant('contact.questions.step4.answer2'); // Within 2 months
    const question4_Answer3 = this.translateService.instant('contact.questions.step4.answer3'); // Within 3 months
    const question4_Answer4 = this.translateService.instant('contact.questions.step4.answer4'); // Within 6 months

    const question5 = this.translateService.instant('contact.questions.step5.question'); // Lastly, could you please share a few more details?
    const question5_Input1 = this.translateService.instant('contact.questions.step5.input1'); // Your name
    const question5_Input2 = this.translateService.instant('contact.questions.step5.input2'); // Your email
    const question5_Input3 = this.translateService.instant('contact.questions.step5.input3'); // Any additional details? Existing website?
    const question5_InputDetail1 = new InputDetail('input', question5_Input1);
    const question5_InputDetail2 = new InputDetail('input', question5_Input2);
    const question5_InputDetail3 = new InputDetail('textarea', question5_Input3);

    questions.push(new Question(question1, [question1_Answer1, question1_Answer2, question1_Answer3]));
    questions.push(new Question(question2, [], [question2_InputDetail1]));
    questions.push(new Question(question3, [question3_Answer1, question3_Answer2, question3_Answer3, question3_Answer4]));
    questions.push(new Question(question4, [question4_Answer1, question4_Answer2, question4_Answer3, question4_Answer4]));
    questions.push(new Question(question5, [], [question5_InputDetail1, question5_InputDetail2, question5_InputDetail3]));

    return questions;
  }
}

export class Question {
  constructor(public question: string, public answers: string[] = [], public inputs: InputDetail[] = []) {}
}

export class InputDetail {
  constructor(public type: string, public placeholder: string) {}
}
