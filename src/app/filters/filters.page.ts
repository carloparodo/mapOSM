import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.page.html',
  styleUrls: ['filters.page.scss']
})
export class FiltersPage {

  constructor(
    public router: Router) {}

  setFiltersPath(){
    this.router.navigate(["/tabs/map"]);
  }

}
