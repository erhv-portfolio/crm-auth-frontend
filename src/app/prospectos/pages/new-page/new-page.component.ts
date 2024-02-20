import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Estatus, Prospecto } from '../../interfaces/prospecto.interface';
import { ProspectoService } from '../../services/prospectos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  prospectoForm = new FormGroup({
    _id: new FormControl<string>('', { nonNullable: true }),
    nombre: new FormControl<string>('', { nonNullable: true }),
    primer_apellido: new FormControl(''),
    segundo_apellido: new FormControl(''),
    calle: new FormControl(''),
    numero: new FormControl(''),
    colonia: new FormControl(''),
    codigo_postal: new FormControl(''),
    telefono: new FormControl(''),
    rfc: new FormControl(''),
    alt_img: new FormControl(''),
    estatus:  new FormControl<Estatus>(Estatus.Enviado),
  });

  estatus = [
    {id: 'Enviado', desc: 'Enviado'},
    {id: 'Autorizado', desc: 'Autorizado'},
    {id: 'Rechazado', desc: 'Rechazado'},
  ];

  imagenes = [
    {id: 'Mujer', url: 'https://imgs.search.brave.com/1cxptMIHsF_5HNHSjSqn4NTSzya1BkdwKGQiGuDgopI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzMzLzQ2LzI0/LzM2MF9GXzIzMzQ2/MjQwMl9GeDF5a2U0/bmc0R0E4VEppa0pa/b2lBVHJrbmN2VzZJ/Yi5qcGc'},
    {id: 'Hombre', url: 'https://imgs.search.brave.com/vNq2jFE3XACsBNx6XivyUP5r0PYaPjic3GaSsrkaloE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE3LzM0LzY3/LzM2MF9GXzIxNzM0/Njc4Ml83WHBDVHQ4/YkxOSnF2VkFhRFpK/d3Zaam0wZXBRbWo2/ai5qcGc'},
    { id:'deadshot', url: 'https://imgs.search.brave.com/njq9910bxCzVyR3MDnvxRbzbU2q2ubXckf_ynJwyt2A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2IzL2Mz/LzhmL2IzYzM4ZmFm/MWYzNmViNTBiNWI4/ODc5NDkxMjdiNWQy/LmpwZw' },
    { id:'shazam', url: 'https://imgs.search.brave.com/K9nIv3QAydr6MI8v4k_MYkTO52I2ocId-QNaKS_VPNA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5yZXZpc3RhZ3Eu/Y29tL3Bob3Rvcy82/MDVkY2I4Y2MxOWZm/NDM4MjcwYzVkZTgv/bWFzdGVyL3dfMzIw/LGNfbGltaXQvY2Jj/NzU5ODVjMDkwZjI0/YmRiOTkyZjcwMDll/ZjcyM2EuanBn' },
    { id:'batman', url: 'https://imgs.search.brave.com/j6EFFbI_fL6YGJR2Nkqow6Pt421S0RyLqJ5mKscwlYQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzgyLzIy/LzVkLzgyMjI1ZGMw/M2U5Y2NjMWNmZjkz/MjYyZTRmM2MxNTMw/LmpwZw' },
    { id: 'flash', url: 'https://imgs.search.brave.com/aTuZ3g3PcKJLqJUKZEpXZBZZU7UNl326I7FhOa1_O8Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5yZXZpc3RhZ3Eu/Y29tL3Bob3Rvcy82/MDVkY2M5MDFkNGU3/MWJlMjRiYzExMDYv/bWFzdGVyL3dfMzIw/LGNfbGltaXQvMjY3/ODc0OTkwY2IwMzA0/MTY5ZmIwNDVjNTVl/NThiMzkuanBn'},
    { id: 'superman', url: 'https://imgs.search.brave.com/2TbA72QvDXeWhjIdyGE1g5SzsEL2Bypp9oKGbeLyxdg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzk2LzBl/LzE4Lzk2MGUxODRi/ZWM5NjQyN2Y4N2Rm/ZmZlMGExZTgwMDBk/LmpwZw'},
    { id: 'Wonder Woman', url: 'https://imgs.search.brave.com/PFRa3h24epjUeHXXjV_mBihN3rbabgQGFsWQ4j_Clpw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzg0LzNj/L2RjLzg0M2NkYzM4/MGZkOWI0NTk5OGMw/NGUxNzE4ZTM4Nzg3/LmpwZw' },
    { id: 'Power Girl', url: 'https://imgs.search.brave.com/yGuat687LGOiaiCAJwJ6x7Q2TS37m7IYL4HgnMdZpgQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Y3LzA3/L2ZkL2Y3MDdmZDRl/Zjk3MmI4NmFiMjRh/OWYxZGIxYjEzNzg0/LmpwZw' },
    { id: 'Super Girl', url: 'https://imgs.search.brave.com/s2q60unvT2eLQiDe2QGHAW7WbNAEklevRsSEiNJvWX4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQ3L2I1/L2RlLzQ3YjVkZTk4/YzdhOGZkZjM1MDRk/YzU1ZDU3MDU5YjZj/LmpwZw' },
    { id: 'Star Fire', url: 'https://imgs.search.brave.com/70_BkI0SFp5Imd2um7LzkTZvfIiUUGLEn4hpBuRInE8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2F5bWVkaWEt/Y29udGVudC5jb20v/LmltYWdlL2NfbGlt/aXQsY3Nfc3JnYixm/bF9wcm9ncmVzc2l2/ZSxxX2F1dG86ZWNv/LHdfNzAwL01UYzNN/emN3TlRBek56ZzVO/RGczTWpZMS90aGUt/dG9wLTEwLXNleGll/c3Qtd29tZW4tb2Yt/ZGMtY29taWNzLmpw/Zw' },

  ];

  constructor(
    private prospectoService: ProspectoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.prospectoService.getProspectoById(id))
      )
      .subscribe( prospecto => {
        if(!prospecto) return this.router.navigateByUrl('/');

        // 1. regresa el form a su valor original, 2. si recibe un argumento actualiza con los valores que coincidan de mi formulario
        this.prospectoForm.reset(prospecto);
        return;

      });
  }

  get currentProspecto(): Prospecto {
    const prospecto = this.prospectoForm.value as Prospecto;
    return prospecto;
  }

  onSubmit(): void {
    if(this.prospectoForm.invalid) return;

    // Update de registro
    if(this.currentProspecto._id) {
      this.prospectoService.updateProspecto(this.currentProspecto)
        .subscribe( prospecto => {
          this.router.navigate(['/prospectos']);
          this.showSnackbar(`${this.currentProspecto.nombre} actualizado!`);
        });
        return;
    }

    // Crear registro
    this.prospectoService.addProspecto(this.currentProspecto)
      .subscribe( prospecto => {
        this.router.navigate(['/prospectos']);
        this.showSnackbar(`Prospecto ${this.currentProspecto.nombre} creado!`);
      });
  }

  onDeleteProspecto() {
    if(!this.currentProspecto._id) throw Error('ID del prospecto es requerido');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.prospectoForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result) => result),
        switchMap(() => this.prospectoService.deleteProspectoById(this.currentProspecto._id!)),
        filter((wasDeleted: any) => wasDeleted) // TODO: Cambiar respuesta del API de object a boolean
      )
      .subscribe(result => {
        this.router.navigate(['/prospectos']);
    });
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'done' , {
      duration: 2500
    });
  }

  goBack() {
    this.router.navigateByUrl('prospectos/list')
  }

}
