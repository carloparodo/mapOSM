import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PathPage } from './path.page';
import { PathLabelPipe } from './pathLabel.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: PathPage }])
  ],
  declarations: [PathPage, PathLabelPipe]
})
export class PathPageModule {}
