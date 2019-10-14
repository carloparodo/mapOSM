import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MapPage } from './map.page';
import { LabelPipe } from './label.pipe';

@NgModule({
    imports: [
      IonicModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild([{ path: '', component: MapPage }])
    ],
    declarations: [MapPage,LabelPipe]
  })
  export class MapPageModule {}
  