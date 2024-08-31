import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from '../config/app.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  message: string = ''

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private appService: AppService) {
    this.setMessage()
  }

  setMessage() {
    this.appService.getMessage().pipe(takeUntil(this.destroy$)).subscribe((message: any) => {
        this.message = message.message
        let synth = speechSynthesis;
        let utterance = new SpeechSynthesisUtterance(this.message);
        let voice = synth.getVoices()
        utterance.voice = voice[5]
        synth.speak(utterance);

    });
    setTimeout(() => { this.setMessage()}, 30000)
  }

  animate() : string {
    let cont = document.getElementById("container");
    cont?.clientWidth
    let mes = document.getElementById("message");
    mes?.clientWidth
    return cont!.clientWidth < mes!.clientWidth ? "animate": ""
  }

  containerheight(): number {
    return this.message == ""? 0 : 4.9
  }
}
