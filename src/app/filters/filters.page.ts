import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter } from '../shared/models/filter.model';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.page.html',
  styleUrls: ['filters.page.scss']
})
export class FiltersPage {

  formModalitaFilters : FormGroup;
  filterActive:Filter
  isBiciDIsabled=false
  isPiediDisabled=false
  isMacchinaDIsabled=false
  formDisabled=false

  constructor(
    private formBuilder: FormBuilder,
    public router: Router) {
      this.formModalitaFilters = this.formBuilder.group({
        piedi: [null,Validators.required],
        bici: [null,Validators.required],
        macchina: [null,Validators.required],
      });
    }

  setFiltersPath(){
    this.router.navigate(["/tabs/map"]);
  }

  isPiediSelected(){
    if(this.formModalitaFilters.controls.piedi.value==true){
      this.formDisabled=true
      this.formModalitaFilters.controls.bici.disable()
      this.formModalitaFilters.controls.macchina.disable()
    }else{
      this.formDisabled=false
      this.formModalitaFilters.markAsDirty()
      this.formModalitaFilters.controls.bici.enable()
      this.formModalitaFilters.controls.macchina.enable()
    }
  }

  isBiciSelected(){
    if(this.formModalitaFilters.controls.bici.value==true){
      this.formDisabled=true
      this.formModalitaFilters.controls.piedi.disable()
      this.formModalitaFilters.controls.macchina.disable()
    }else{
      
      this.formDisabled=false
      this.formModalitaFilters.markAsDirty()
      this.formModalitaFilters.controls.piedi.enable()
      this.formModalitaFilters.controls.macchina.enable()
    }
    
  }

  isMacchinaSelected(){
    if(this.formModalitaFilters.controls.macchina.value==true){
      this.formDisabled=true
      this.formModalitaFilters.controls.bici.disable()
      this.formModalitaFilters.controls.piedi.disable()
    }else{
      
      this.formDisabled=false
      this.formModalitaFilters.controls.bici.enable()
      this.formModalitaFilters.controls.piedi.enable()
    }
  }
}
