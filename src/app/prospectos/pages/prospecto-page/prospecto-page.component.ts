import { Component, OnInit } from '@angular/core';
import { Prospecto } from '../../interfaces/prospecto.interface';
import { ProspectoService } from '../../services/prospectos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-prospecto-page',
  templateUrl: './prospecto-page.component.html',
  styles: ``
})
export class ProspectoPageComponent implements OnInit {
  prospecto?: Prospecto;

  constructor(
    private prospectoService: ProspectoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(1000),
        switchMap( ({id}) => this.prospectoService.getProspectoById(id))
      )
      .subscribe( prospecto => {
        if(!prospecto) return this.router.navigate(['/prospectos.list']);

        this.prospecto = prospecto;
        console.log(this.prospecto);

        return;
      })
    //throw new Error('Method not implemented.');
  }

  goBack() {
    this.router.navigateByUrl('prospectos/list')
  }
}
