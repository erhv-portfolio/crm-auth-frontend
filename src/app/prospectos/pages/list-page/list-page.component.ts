import { ProspectoService } from './../../services/prospectos.service';
import { Component, OnInit } from '@angular/core';
import { Prospecto } from '../../interfaces/prospecto.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {

  prospectos: Prospecto[] = [];

  constructor(private prospectoService: ProspectoService) { }

  ngOnInit(): void {
    this.prospectoService.getProspectos()
      .subscribe( prospectos => this.prospectos = prospectos )
  }

}
