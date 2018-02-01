import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataServiceService} from "../../data-service.service";
import {Toast, ToasterConfig, ToasterService} from "angular2-toaster";

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css'],
  providers: [DataServiceService,ToasterService]
})
export class SpecificationComponent implements OnInit {

  @ViewChild('ngForm')
  myFormSexeEtage: NgForm;
  pavUrl = 'pavillons';
  pavillonClasse = [];
  etageOfPavillonClasse = [];
  pavillonEtageClasse = [];
  urlPavEtage = 'pavillon-etages';

  // configuration du toaster
  public toasterconfig: ToasterConfig = new ToasterConfig({positionClass: 'toast-top-center'});

  constructor(private dataService:DataServiceService,private toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.getDataPavillon();
  }

  popToast(type,titre,message) {
    const toast: Toast = {
      type: type,
      title: titre,
      body: message
    };
    this.toasterService.pop(toast);
  }

  //TODO récuperer les étages selon le pavillon
  //TODO pas encore gerer

  validate(value:NgForm){
    console.log(value.value);
    console.log(this.urlPavEtage);
    this.updateDemeurant(value.value);
  }

  updateDemeurant(valeur){
    this.dataService.getData(this.urlPavEtage + '?filter='+encodeURIComponent('{"where":{"etageId":"'+valeur.etageId+'","pavillonId":"'+valeur.pavillonId+'"}}'))
      .subscribe(
        data => {
          console.log("identifiant : ",this.urlPavEtage + '/'+ data[0].id," value : ",valeur);
          this.dataService.patchData(this.urlPavEtage + '/'+ data[0].id,valeur)
            .subscribe(
              data => console.log(data),
              error => this.handleError(error)
            );
        },
        error => this.handleError(error)
      )
  }

  getDataPavillon(){
    this.dataService.getData(this.pavUrl)
      .subscribe(
        data => {
          this.pavillonClasse = data;
          console.log(this.pavillonClasse);
        },
        error => this.handleError(error)
      )
  }

  getDataEtageOfPavilon(value:NgForm){
    this.dataService.getData(this.pavUrl+'/'+value+'/etages'+'?filter='+'{"order":"label"}')
      .subscribe(
        data => {
          this.etageOfPavillonClasse = data;
          console.log(this.etageOfPavillonClasse);
        },
        error => console.log(error)
      );
  }

  handleError(error){
    this.popToast('error','Erreur',error);
    console.log(error);
  }

  handlePavEtage(data){
    console.log(data);
  }
}
