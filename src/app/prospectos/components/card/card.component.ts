import { Prospecto } from '../../interfaces/prospecto.interface';
import { Component, Input, OnInit, input } from '@angular/core';

@Component({
  selector: 'prospectos-prospecto-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit{

  @Input()
  prospecto!: Prospecto;

  ngOnInit(): void {
    if(!this.prospecto) throw new Error('Hero property is required');
  }

}
