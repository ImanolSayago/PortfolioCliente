import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() title: string = 'Atención';
  @Input() type: 'error' | 'success' | 'info' = 'info';
  @Input() btnText: string = "Aceptar";
  @Input() cancelBtnText: string = "";
  @Input() time: number = 0

  cd = inject(ChangeDetectorRef);
  
  message: string = 'Ocurrio un error inesperado';
  isOpen: boolean = false;
  

  @Output() onCloseEvent = new EventEmitter<void>();
  @Output() onConfirmEvent = new EventEmitter<void>();

 open(message?: string, customTitle?: string) {
    if (message) this.message = message;
    if (customTitle) this.title = customTitle;
    
    this.isOpen = true;
    this.cd.detectChanges();

    if (this.time > 0) {
      setTimeout(() => {
        this.close();
      }, this.time);
    }
  }

  close() {
    this.isOpen = false;
    this.onCloseEvent.emit();
    this.cd.detectChanges();
  }

  confirm() {
    this.onConfirmEvent.emit();
    this.close();
  }
}
