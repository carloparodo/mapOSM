import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PercorsoPage } from './percorso.page';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
      IonicModule,
      CommonModule,
      FormsModule,
      RouterModule.forChild([{ path: '', component: PercorsoPage }])
    ],
    declarations: [PercorsoPage]
  })
  export class PercorsoPageModule {}
  