import { Component } from '@angular/core';
import { Map,LeafIcon, tileLayer, marker, icon,polyline ,geoJSON } from 'leaflet';
import { Platform } from '@ionic/angular';
import { PathService } from '../shared/services/path.service';
import { FilterListService } from '../shared/services/filters.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage {
  point: { lng: any; lat: any; };

  pointsPath=[];

  map: Map

  pathIsCreated: boolean = false;
  savePath : boolean = false;
  icons= {
    greenIcon : icon({
      iconUrl: '/assets/pref-2/green-s.png',
      iconSize: [25, 25], 
      popupAnchor: [0, -20]
    }),
    redIcon : icon({
      iconUrl: '/assets/pref-2/red-s.png',
      iconSize: [25, 25],  
      popupAnchor: [0, -20]
    })
  }
  
  constructor(
    public plt: Platform,
    public pathService: PathService,
    public filterListService: FilterListService,
    public router: Router) {}

  ionViewDidEnter(){

    this.plt.ready().then(() => {
      if(this.map) {this.map.removeLayers()}else{this.initMap()}
    });
  }
  
  initMap() {
    
    this.map = new Map('map').setView([39.21834898953833,9.1126227435], 10);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.invalidateSize();
    this.map.on('click', (e)=>{
      this.onMapClick(e)
    });

    
  }

  onMapClick(e) {

    if(this.pointsPath.length < 2){
      
      if(this.pointsPath.length == 0){
        marker([e.latlng.lat, e.latlng.lng], {icon: this.icons.greenIcon})
        .addTo(this.map);
      }else{
        marker([e.latlng.lat, e.latlng.lng], {icon: this.icons.redIcon})
        .addTo(this.map);
      }
      
      this.pointsPath
        .push(e.latlng)
    }
    
    if(this.pointsPath.length == 2) this.pathIsCreated= true;
  }

  getShowPath(){
    
    let pointStart= this.pointsPath[0].lat + "," +this.pointsPath[0].lng
    let pointEnd= this.pointsPath[1].lat + "," +this.pointsPath[1].lng

    this.pathService.getPath(pointStart,pointEnd, this.filterListService.getFilterList())
    .subscribe(
        posts => {
          let newGeometry = posts.geometry.replace("[","");
          newGeometry = newGeometry.replace("]","");
          newGeometry = newGeometry.replace(/ /g,"|");
          newGeometry = newGeometry.replace("|","");	
      
          // 2. split sulle virgole:
          let geometryArray1Dim = newGeometry.split(",");    
      
          // 3. crea array bidimesionale:
          let geometryArray2Dim = Array.from(Array(geometryArray1Dim.length), () => new Array(2));
      
          // 4. popola array: per ogni elemento del precedente array, split su |:    
          for(let i=0; i<geometryArray1Dim.length; i++)
          {
            let tempArray = geometryArray1Dim[i].split("|");
            for(let j=0; j<2; j++)
            {
              geometryArray2Dim[i][0] = parseFloat(tempArray[0]);
              geometryArray2Dim[i][1] = parseFloat(tempArray[1]);
            }
          }

          let newPointList = posts.nodes.replace("[","");
          newPointList = newPointList.replace("]","");
      
          // 2. split sulle virgole:
          let PointList1Dim = newPointList.split(",");

          geoJSON({
            "type": "LineString", 
            "coordinates": geometryArray2Dim
          }).addTo(this.map)
        
          this.savePath=true
          this.pathIsCreated=false
        },
        error => {
          
        });
  }

  savePathNavigate(){
    this.router.navigate(["/tabs/path"]);
  }

}
