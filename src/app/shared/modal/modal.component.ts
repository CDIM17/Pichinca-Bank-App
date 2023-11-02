import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input('item') item: any;
  @Output() executeDelete:any = new EventEmitter<any>();

  isModalOpen = false;

  constructor() {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirm(){
    this.executeDelete.emit()
  }
}
