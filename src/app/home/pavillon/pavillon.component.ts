import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Toast, ToasterConfig, ToasterService} from "angular2-toaster";
import {DataServiceService} from "../../data-service.service";
import {Pavillon} from "./pavillon";
import {letProto} from "rxjs/operator/let";
import {forEach} from "@angular/router/src/utils/collection";
import {Etage} from "./etage";
import {IonRangeSliderComponent} from "ng2-ion-range-slider";

@Component({
  selector: 'app-pavillon',
  templateUrl: './pavillon.component.html',
  styleUrls: ['./pavillon.component.css'],
  providers:[ToasterService,DataServiceService]
})
export class PavillonComponent implements OnInit {

  @ViewChild('advancedSliderElement')
  advancedSliderElement: IonRangeSliderComponent;
  @ViewChild('ngForm')
  private myFormPavillon:NgForm;
  private myFormEtage:NgForm;
  private myFormRelation:NgForm;
  //private myFormChambre:NgForm;
  //pattNombreChambre = '^0*(?:[1-9][0-9]?|100)';

  /*
   * begin déclaration variable pavillon
   */
  pattPavillon = '^Pavillon-[A-Z]';
  pavUrl = 'pavillons';
  pavillonClasse : Array<Pavillon> = new Array<Pavillon>();
  labelPavillon :Array<any> = new Array<any>();

  /*
   * begin déclaration variable étage
   */
  etageUrl = 'etages';
  pattEtage = '^Etage-[0-9]';
  etageClasse : Array<Etage> = new Array<Etage>();
  labelEtage :Array<any> = new Array<any>();

  // configuration du toaster
  public toasterconfig: ToasterConfig = new ToasterConfig({positionClass: 'toast-top-center'});

  constructor(private toasterService: ToasterService,private dataService:DataServiceService) {
    this.toasterService = toasterService;
    /*var eventSource = new window['EventSource']("http://codifex-api.herokuapp.com/api/pavillons/change-stream? format=change-stream");
    eventSource.addEventListener('data', function(msg) {
      var raw = msg.data;
      var data = JSON.parse(raw);
      console.log(data); // => change obj
    });*/
  }

  min: number = 1;
  max: number = 10;

  simpleSlider = {name: "Simple Slider", onUpdate: undefined, onFinish: undefined};
  advancedSlider = {name: "Advanced Slider", onUpdate: undefined, onFinish: undefined};

  update(slider, event) {
    console.log("Slider updated: debut : " + slider.from + " to "+ slider.to);
    slider.onUpdate = event;
  }

  finish(slider, event) {
    console.log("Slider finished: " + slider.name);
   // slider.onFinish = event;
  }

  setAdvancedSliderTo(from, to) {
    this.advancedSliderElement.update({from: from, to:to});
  }


  ngOnInit() {
    this.getDataPavillon();
    this.getDataEtage();
  }

  popToast(type,titre,message) {
    const toast: Toast = {
      type: type,
      title: titre,
      body: message
    };
    this.toasterService.pop(toast);
  }

  /*
   * begin définition fonction pavillon
   */
  getDataPavillon(){
    this.dataService.getData(this.pavUrl)
      .subscribe(
        data => {
          this.pavillonClasse = data;
          console.log(this.pavillonClasse);
          this.getLabelPavillon(data);
        },
        error => console.log(error)
      );
  }
  getLabelPavillon(data){
    for(let i=0;i < data.length;i++){
      if (!this.labelPavillon.includes(data[i].label)){
        this.labelPavillon.push(data[i].label);
      }
    }
    console.log(data);
  }
  addPavillon(value:NgForm){
    this.getDataPavillon();
    if(value.form.status == "VALID"){
      if (this.labelPavillon != null && !this.labelPavillon.includes(value.value.label)){
        this.dataService.addData(this.pavUrl,value.value)
          .subscribe(
            data => {
              value.onReset();
              this.handlePavillon(data);
              this.popToast('success','Correct','Ajout réussi');
              this.getDataPavillon();
            },
            error => {
              value.onReset();
              this.handleError(error);
            }
          );
      }else {
        value.onReset();
        this.popToast('error','Erreur','Ce Pavillon existe déja');
      }
    }else{
      value.onReset();
      this.popToast('error','Erreur','Erreur de syntaxe');
    }
  }
  handlePavillon(data){
    console.log(data);
  }

  /*
   * begin définition fonction Étage
   */
  addEtage(value){
    this.getDataEtage();
    console.log(value);
    if(value.form.status == "VALID"){
      if (this.labelEtage != null && !this.labelEtage.includes(value.value.label)){
        this.dataService.addData(this.etageUrl,value.value)
          .subscribe(
            data => {
              value.onReset();
              this.handleEtage(data);
              this.popToast('success','Correct','Ajout réussi');
              this.getDataEtage();
            },
            error => {
              value.onReset();
              this.handleError(error);
            }
          );
      }else {
        value.onReset();
        this.popToast('error','Erreur','Cette Etage existe déja');
      }
    }else{
      value.onReset();
      this.popToast('error','Erreur','Erreur de syntaxe');
    }
  }
  getDataEtage(){
    this.dataService.getData(this.etageUrl)
      .subscribe(
        data => {
          this.etageClasse = data;
          console.log(this.etageClasse);
          this.getLabelEtage(data);
        },
        error => console.log(error)
      );
  }
  getLabelEtage(data){
    for(let i=0;i < data.length;i++){
      if (!this.labelEtage.includes(data[i].label)){
        this.labelEtage.push(data[i].label);
      }
    }
    console.log(data);
  }
  handleEtage(data){
    console.log(data);
  }

  /*
   * begin définition fonction Chambre
   */

  addChambre(value){
    console.log(value);
  }

  /*
   * begin définition fonction Relation
   */
  addRelation(value:NgForm){
    console.log(value.value);
  }

  handleError(error){
    this.popToast('error','Erreur',error);
    console.log(error);
  }
}
