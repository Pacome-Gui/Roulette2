import { Component, Input } from '@angular/core';
import { NumberRoulette } from '../models/number';

@Component({
  selector: 'app-roulette-stat',
  templateUrl: './roulette-stat.component.html',
  styleUrls: ['./roulette-stat.component.scss']
})
export class RouletteStatComponent {

  @Input() redOdd:Number = 0;
  @Input() blackOdd:Number = 0;
}
