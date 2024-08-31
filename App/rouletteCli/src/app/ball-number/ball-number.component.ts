import { Component, Input } from '@angular/core';
import { NumberRoulette } from '../models/number';

@Component({
  selector: 'app-ball-number',
  templateUrl: './ball-number.component.html',
  styleUrls: ['./ball-number.component.scss']
})
export class BallNumberComponent {
  @Input() lessNumbers: NumberRoulette[] = [];
  @Input() mostNumbers: NumberRoulette[] = [];
}
