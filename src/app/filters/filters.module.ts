import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltersPage } from './filters.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: FiltersPage }])
  ],
  declarations: [FiltersPage]
})
export class FiltersPageModule {}
