import { Pipe, PipeTransform } from '@angular/core';
import { Prospecto } from '../interfaces/prospecto.interface';

@Pipe({
  name: 'prospectoImage'
})
export class ProspectoImagePipe implements PipeTransform {

  transform(prospecto: Prospecto): string {
    if(!prospecto._id && !prospecto.alt_img) {
      return 'assets/no-image.png';
    }

    if(!prospecto.alt_img) return 'assets/no-image.png';

    return prospecto.alt_img;
  }

}
