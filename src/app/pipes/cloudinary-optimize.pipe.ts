import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cloudinaryOptimize',
  standalone: true
})
export class CloudinaryOptimizePipe implements PipeTransform {

transform(url: string, width: number, height?: number): string {
    if (!url || !url.includes('cloudinary')) return url;

    // f_auto, q_auto: Optimización básica
    // Eliminamos c_fill y g_auto para que NO recorte
    let params = `f_auto,q_auto,w_${width}`;
    
    if (height) {
      // Usamos c_limit para que se ajuste al máximo de esos píxeles sin cortar
      params += `,h_${height},c_limit`;
    }

    return url.replace('/upload/', `/upload/${params}/`);
  }
}
