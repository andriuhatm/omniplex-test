import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdleModalModule } from './idle-modal/idle-modal.module';
import { WelcomeComponent } from './welcome.component';



@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    IdleModalModule,
  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule { }
