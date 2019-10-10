import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Toast } from '@ionic-native/toast/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-profilo',
  templateUrl: 'profilo.page.html',
  styleUrls: ['profilo.page.scss']
})
export class ProfiloPage {

  formFilters : FormGroup;
  sqliteHelper: Promise<SQLiteObject>;
  filtersRow= {
    "piedi": false,
    "bici": false,
    "auto": false,
    "turisti": false,
    "fitness": false,
    "famiglia": false,
    "anziani": false,
    "disabilita": false
  };
  database: SQLiteObject
  success:any

  constructor(
    private datePicker: DatePicker,
    private sqlite: SQLite,
    private formBuilder: FormBuilder,
    private toast: Toast) {  

      this.formFilters = this.formBuilder.group({
        piedi: [null,Validators.required],
        bici: [null,Validators.required],
        auto: [null,Validators.required],
        turisti: [null,Validators.required],
        fitness: [null,Validators.required],
        famiglia: [null,Validators.required],
        anziani: [null,Validators.required],
        disabilita: [null,Validators.required]
      });

      
      this.sqlite.create({
        name: 'filters.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database=db
          this.createDatabase()
        })
    }

  showDatePicker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  createDatabase(){
      this.database.executeSql(`
          CREATE TABLE IF NOT EXISTS filtersProfile(
            rowid INTEGER PRIMARY KEY, 
            piedi TEXT, 
            bici TEXT, 
            auto TEXT,
            turisti TEXT,
            fitness TEXT,
            famiglia TEXT,
            anziani TEXT,
            disabilita TEXT)`, [])
          .then((createTable)=>{
            this.database.executeSql(`select * from filtersProfile`,[])
            .then((resultSelect)=>{

              if(resultSelect.rows.length > 0) {
                this.formFilters["piedi"]=resultSelect.rows.item(0).piedi
                this.filtersRow.piedi = resultSelect.rows.item(0).piedi

                this.filtersRow.bici = resultSelect.rows.item(0).bici
                this.formFilters["bici"]=resultSelect.rows.item(0).bici
                
                this.filtersRow.auto = resultSelect.rows.item(0).auto
                this.formFilters["auto"]=resultSelect.rows.item(0).auto
                
                this.filtersRow.turisti = resultSelect.rows.item(0).turisti
                this.formFilters["turisti"]=resultSelect.rows.item(0).turisti

                this.filtersRow.fitness = resultSelect.rows.item(0).fitness
                this.formFilters["fitness"]=resultSelect.rows.item(0).fitness
                
                this.filtersRow.famiglia = resultSelect.rows.item(0).famiglia
                this.formFilters["famiglia"]=resultSelect.rows.item(0).famiglia

                this.filtersRow.anziani = resultSelect.rows.item(0).anziani
                this.formFilters["anziani"]=resultSelect.rows.item(0).anziani

                this.filtersRow.disabilita = resultSelect.rows.item(0).disabilita
                this.formFilters["disabilita"]=resultSelect.rows.item(0).disabilita
                
                
              }
            })
            .catch((e)=>{
              this.toast.show("Error", '3000', 'center').subscribe(
                toast => {
                  console.log(toast);
              })
            })
          })
  }

  savefilters(){
    this.database.executeSql(`
        REPLACE INTO filtersProfile (rowid,piedi,bici,auto,turisti,fitness,famiglia,anziani,disabilita)
          VALUES(1,?,?,?,?,?,?,?,?)`, 
          [JSON.stringify(this.formFilters.value.piedi),
            JSON.stringify(this.formFilters.value.bici),
            JSON.stringify(this.formFilters.value.auto),
            JSON.stringify(this.formFilters.value.turisti),
            JSON.stringify(this.formFilters.value.fitness),
            JSON.stringify(this.formFilters.value.famiglia),
            JSON.stringify(this.formFilters.value.anziani),
            JSON.stringify(this.formFilters.value.disabilita)
          ])
      .then((tableInserted)=>{
        
        this.toast.show("salvatggio avvenuto", '3000', 'center').subscribe(
          toast => {
            console.log(toast);
        })
        
      })
  }

}
