import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'filters',
    loadChildren: () => import('./filters/filters.module').then(m => m.FiltersPageModule)
  },
  
  {
    path: 'prenotazione/:id',
    loadChildren: () => import('./percorso/percorso.module').then(m => m.PercorsoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
