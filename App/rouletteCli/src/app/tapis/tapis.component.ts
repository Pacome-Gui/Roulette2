import { Component, Input } from '@angular/core';
import { NumberRoulette } from '../models/number';
import { MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-tapis',
  templateUrl: './tapis.component.html',
  styleUrls: ['./tapis.component.scss'],
  standalone: true,
  imports: [
    MatTooltipModule
  ],
})

export class TapisComponent {
  @Input() lastNumber:NumberRoulette = {
    number: "-1",
    color: "NONE"
  }

  firstRow = [3, 6, 9,12,15,18,21,24,27,30,33,36]
  secondRow = [2,5,8,11,14,17,20,23,26,29,32,35]
  thirdRow = [1,4,7,10,13,16,19,22,25,28,31,34]


  toOpacity(show: Boolean) {
    return show ?  1 : 0.3;
  }
  renderNumber(number: string) {
    return this.toOpacity(number == this.lastNumber.number)
  }

  renderTwoToOne(row: number[]) {
    return this.toOpacity(row.includes(Number(this.lastNumber.number)))
  }

  renderBetween(min:number, max:number) {
    var number = Number(this.lastNumber.number)
    return this.toOpacity(number >= min && number <= max)
  }

  renderOdd() {
    return this.toOpacity((!["0","00"].includes(this.lastNumber.number)) && (Number(this.lastNumber.number)%2 == 1))
  }

  renderEven() {
    return this.toOpacity( this.excludeZeros() && (Number(this.lastNumber.number)%2 == 0))
  }

  excludeZeros() {
    return !["0","00"].includes(this.lastNumber.number)
  }
}
