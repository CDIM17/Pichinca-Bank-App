import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip/tooltip.component';
import { ModalComponent } from './modal/modal.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    TooltipComponent,
    ModalComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TooltipComponent,
    ModalComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
