import { Component, EventEmitter, Output, LOCALE_ID, Inject } from '@angular/core';
import { RouletteNumberComponent } from './roulette-number/roulette-number.component';
import { NumberRoulette } from './models/number';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from './config/app.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  numbers: NumberRoulette[] = [];
  numbersToDisplay: NumberRoulette[] = [];
  redOdd:Number = 0;
  blackOdd:Number = 0;
  now: String = formatDate(new Date(), 'HH:mm' ,this.locale);
  lessNumbers: NumberRoulette[] = [{number: "?", color: "none"}]
  mostNumbers: NumberRoulette[] = [{number: "?", color: "none"}]

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(@Inject(LOCALE_ID) public locale: string, private appService: AppService) {
    this.setNumbers()
    setInterval(() => {
      this.now = formatDate(new Date(), 'HH:mm' ,this.locale);
    }, 1000);
  }

  setNumbers() {
    this.appService.getNumber().pipe(takeUntil(this.destroy$)).subscribe((numbers: any) => {
        this.numbers = numbers.items;
        this.numbersToDisplay = this.numbers.slice(-69).reverse();

        this.redOdd = this.numbers.filter(number => number.color == "RED").length / this.numbers.length * 100 || 0;
        this.blackOdd = this.numbers.filter(number => number.color == "BLACK").length / this.numbers.length * 100 || 0;

        this.mostNumbers = this.mode(this.numbers).slice(0,6);
        this.lessNumbers = this.mode(this.numbers).slice(-6).reverse();
    });
    setTimeout(() => { this.setNumbers()}, 1000)
  }

  mode(array:NumberRoulette[]) {
    if(array.length == 0)
        return [{number: "?", color: "red"}];
    var modeMap = new Map<string,number>();
    modeMap.set("00",0);
    for(var i = 0; i<=36;i++)
      modeMap.set(i.toString(),0);
    var maxEl = array[0]
    for(var i = 0; i < array.length; i++) {
        var el = array[i];
        if(modeMap.get(el.number) == null)
            modeMap.set(el.number,1);
        else
          modeMap.set(el.number, modeMap.get(el.number)!+1);
    }
    var sortNumber = Array.from(modeMap).sort(function(a, b){return b[1] - a[1]})
    return this.doubleArrayToArrayNumberRoulette(sortNumber);
  }

  doubleArrayToArrayNumberRoulette(array:[string,number][]) {
    var result = []
    var red = ["1","3","5","7","9","12","14","16","18","19","21","23","25","27","30","32","34","36"]
    for (var i = 0; i < array.length; i++) {
      var color = "BLACK";
      if (["0","00"].includes(array[i][0].toString())) color = "GREEN"
      if (red.includes(array[i][0].toString())) color = "RED"
      result.push({number: array[i][0], color: color})
    }
    return result
  }
}