import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NumberRoulette } from '../models/number';

@Component({
  selector: 'app-roulette-number',
  templateUrl: './roulette-number.component.html',
  styleUrls: ['./roulette-number.component.scss']
})

export class RouletteNumberComponent  {
  popup = false;
  selectedNumber: NumberRoulette | undefined
  selectedCount: number = 0;
  @Input() numbersToDisplay: NumberRoulette[] = [];
  @Input() numbers: NumberRoulette[] = [];

  lastNumbers() {
    return this.numbersToDisplay.length > 1? this.numbersToDisplay.slice(-this.numbersToDisplay.length+1) : []
  }

  getNumberPopup(selectedNumber: NumberRoulette) {
    this.selectedNumber = selectedNumber;
    let counter = 0;
    for (let num of this.numbers) {
      if (num.number == selectedNumber.number) {
            counter++;
        }
    };
    this.selectedCount = counter;
    this.popup = true
  }
}
