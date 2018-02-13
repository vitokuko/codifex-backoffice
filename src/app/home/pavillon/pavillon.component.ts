import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Toast, ToasterConfig, ToasterService} from "angular2-toaster";
import {DataServiceService} from "../../data-service.service";
import {Pavillon} from "./pavillon";
import {letProto} from "rxjs/operator/let";
import {forEach} from "@angular/router/src/utils/collection";
import {Etage} from "./etage";
import {IonRangeSliderComponent} from "ng2-ion-range-slider";
import {Alert} from "selenium-webdriver";

@Component({
  selector: 'app-pavillon',
  templateUrl: './pavillon.component.html',
  styleUrls: ['./pavillon.component.css'],
  providers: [ToasterService, DataServiceService]
})
export class PavillonComponent implements OnInit {

  @ViewChild('advancedSliderElement')
  advancedSliderElement: IonRangeSliderComponent;
  @ViewChild('ngForm')
  private myFormPavillon: NgForm;
  private myFormEtage: NgForm;
  private myFormRelation: NgForm;
  //private myFormChambre:NgForm;
  //pattNombreChambre = '^0*(?:[1-9][0-9]?|100)';

  /*
   * begin déclaration variable pavillon
   */
  pattPavillon = '^Pavillon-[A-Z]';
  pavUrl = 'pavillons';
  pavEtage = 'pavillonEtages';
  pavillonClasse: Array<Pavillon> = new Array<Pavillon>();
  labelPavillon: Array<any> = new Array<any>();
  urlChambre = 'chambres';
  listPavId = [];

  /*
   * begin déclaration variable étage
   */
  etageUrl = 'etages';
  pattEtage = '^[0-9]-Etage';
  etageClasse: Array<Etage> = new Array<Etage>();
  labelEtage: Array<any> = new Array<any>();
  listEtage: Array<any> = new Array<any>();

  /*
   * begin déclaration variable relation pavillon etage chambre
   */
  pavEtageChambre = [];
  nombreChambreTotale;

  listPavEtage1 = [];
  listPavEtage2 = [];
  listPavEtage3 = [];
  objChambre = [];

  // configuration du toaster
  public toasterconfig: ToasterConfig = new ToasterConfig({positionClass: 'toast-top-center'});

  constructor(private toasterService: ToasterService, private dataService: DataServiceService) {
    this.toasterService = toasterService;
    /*var eventSource = new window['EventSource']("http://codifex-api.herokuapp.com/api/pavillons/change-stream? format=change-stream");
     eventSource.addEventListener('data', function(msg) {
     var raw = msg.data;
     var data = JSON.parse(raw);
     console.log(data); // => change obj
     });*/
  }


  ngOnInit() {
    this.getDataPavillon();
    this.getDataEtage();
    this.getDataChambre();
    //this.getPavEtageChambre();
  }

  popToast(type, titre, message) {
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
  getDataPavillon() {
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

  getLabelPavillon(data) {
    for (let i = 0; i < data.length; i++) {
      if (!this.labelPavillon.includes(data[i].label)) {
        this.labelPavillon.push(data[i].label);
      }
    }
    console.log(data);
  }

  addPavillon(value: NgForm) {
    this.getDataPavillon();
    if (value.form.status == "VALID") {
      if (this.labelPavillon != null && !this.labelPavillon.includes(value.value.label)) {
        this.dataService.addData(this.pavUrl, value.value)
          .subscribe(
            data => {
              value.onReset();
              this.handlePavillon(data);
              this.popToast('success', 'Correct', 'Ajout réussi');
              this.getDataPavillon();
            },
            error => {
              value.onReset();
              this.handleError(error);
            }
          );
      } else {
        value.onReset();
        this.popToast('error', 'Erreur', 'Ce Pavillon existe déja');
      }
    } else {
      value.onReset();
      this.popToast('error', 'Erreur', 'Erreur de syntaxe');
    }
  }

  handlePavillon(data) {
    console.log(data);
  }

  /*
   * begin définition fonction Étage
   */
  addEtage(value) {
    this.getDataEtage();
    console.log(value);
    if (value.form.status == "VALID") {
      if (this.labelEtage != null && !this.labelEtage.includes(value.value.label)) {
        this.dataService.addData(this.etageUrl, value.value)
          .subscribe(
            data => {
              value.onReset();
              this.handleEtage(data);
              this.popToast('success', 'Correct', 'Ajout réussi');
              this.getDataEtage();
            },
            error => {
              value.onReset();
              this.handleError(error);
            }
          );
      } else {
        value.onReset();
        this.popToast('error', 'Erreur', 'Cette Etage existe déja');
      }
    } else {
      value.onReset();
      this.popToast('error', 'Erreur', 'Erreur de syntaxe');
    }
  }

  getDataEtage() {
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

  getLabelEtage(data) {
    for (let i = 0; i < data.length; i++) {
      if (!this.labelEtage.includes(data[i].label)) {
        this.labelEtage.push(data[i].label);
      }
    }
    console.log(data);
  }

  handleEtage(data) {
    console.log(data);
  }

  /*
   * begin définition fonction Chambre
   */

  addChambre(value) {
    console.log(value);
  }

  getDataChambre() {
    this.dataService.getData(this.urlChambre)
      .subscribe(
        data => {
          this.nombreChambreTotale = data.length;
          console.log(this.nombreChambreTotale);
        },
        error => this.handleError(error)
      );
  }

  /*
   * begin définition fonction Relation
   */
  addRelation(value: NgForm) {
    this.listPavEtage2 = [];
    var objPavEtage;
    console.log(value.value);
    console.log(this.listEtage);
    if (value.form.status == "VALID") {
      if (!this.listPavId.includes(value.value.pavillonId)) {
        this.listPavId.push(value.value.pavillonId);
        console.log(value);
        console.log("etageId ", value.value.etageId);
        console.log("pavillonId ", value.value.pavillonId);

        this.iterationNombreEtage(0, value.value.etageId, value.value.pavillonId);

      } else {
        value.onReset();
        this.popToast('error', 'Erreur', 'L\'objet existe déjà!!! ');
      }
    } else {
      value.onReset();
      this.popToast('error', 'Erreur', 'Invalid');
    }
  }

  createRoom(from, to, pavEtageId) {
    console.log(from)
    if (from == to) {
      let objChambre = {label: from, pavillonEtageId: pavEtageId};
      this.dataService.addData(this.urlChambre, objChambre)
        .subscribe(
          data => console.log(data),
          error => console.log(error)
        )
    }
    else {
      let objChambre = {
        label: from, pavillonEtageId: pavEtageId
      };
      this.dataService.addData(this.urlChambre, objChambre)
        .subscribe(
          data => console.log(data),
          error => console.log(error)
        );
      this.createRoom(from + 1, to, pavEtageId)
    }
  }

  iterationPavEtage2(debut, pavEtageId) {
    this.createRoom(this.listEtage[debut].from, this.listEtage[debut].to, pavEtageId);
  }

  getIdByEtageName(debut, label) {
    for (let i = debut; i <= this.etageClasse.length - 1; i++) {
      if (label == this.etageClasse[i].label) {
        alert(i+'eme if: ' + label + ' - ' + this.etageClasse[i].id);
        return this.etageClasse[i].id;
      }
    }
    /*console.log(this.etageClasse);
     alert(debut + ' - '+  this.etageClasse.length);
     if (debut == this.etageClasse.length-1){
     if (label == this.etageClasse[debut].label){
     alert('1eme if: '+label + ' - '+this.etageClasse[debut].id);
     return this.etageClasse[debut].id;
     }
     }else{
     if (label == this.etageClasse[debut].label){
     alert('2eme if: '+label + ' - '+this.etageClasse[debut].id);
     return this.etageClasse[debut].id;
     }
     this.getIdByEtageName(debut+1,label);
     }*/
  }

  iterationNombreEtage(debut, fin, idPav) {
    if (debut == fin) {
      let etageId = this.getIdByEtageName(0, debut + '-Etage');
      console.log(debut + ' - ' + etageId);
      this.postPavEtage(this.pavEtage, {etageId: etageId, pavillonId: idPav}, debut);
    } else {
      let etageId = this.getIdByEtageName(0, debut + '-Etage');
      //alert(etageId);
      this.postPavEtage(this.pavEtage, {etageId: etageId, pavillonId: idPav}, debut);
      this.iterationNombreEtage(debut + 1, fin, idPav);
    }
  }

  postPavEtage(url, obj, current) {
    this.dataService.addData(url, obj)
      .subscribe(
        data => {
          let pavEtageId = data.id;
          this.popToast('success', 'Ajout', 'Relation Pav Etage Successful!!!');
          //boucle qui permet d'ajouter dans l'objet objChambre1 des chambres pour chaque etage selon le pavillon
          this.iterationPavEtage2(current, pavEtageId);
          console.log(this.listEtage)
        },
        error => this.handleError(error)
      );
  }

  getNombreEtage(value) {
    console.log(value);
    this.listEtage = [];
    for (let i = 0; i <= value; i++) {
      this.listEtage.push(
        {
          index: i,
          min: 1,
          max: 200,
          from: 0,
          from_min: 0,
          from_max: 60,
          from_shadow: true,
          to: 10,
          to_min: 10,
          to_max: 100
        }
      );
    }

  }


  //fonction de slider intervalle chambre
  //TODO gerer le bug emit => slider
  update(slider, sliderContainer, event) {
    console.log(slider);
    if (slider.index < this.listEtage.length - 1) {
      this.listEtage[slider.index].from = sliderContainer.from;
      this.listEtage[slider.index].to = sliderContainer.to;
      this.listEtage[slider.index + 1].from = sliderContainer.to + 1;
      this.listEtage[slider.index + 1].from_min = sliderContainer.to + 1;
      this.listEtage[slider.index + 1].from_max = sliderContainer.from_max + (sliderContainer.to - sliderContainer.from);
      this.listEtage[slider.index + 1].to = sliderContainer.to + (sliderContainer.to - sliderContainer.from);
      this.listEtage[slider.index + 1].to_min = sliderContainer.to + (sliderContainer.to - sliderContainer.from);
      this.listEtage[slider.index + 1].to_max = sliderContainer.to_max + (sliderContainer.to_max - sliderContainer.to_min);
      //this.listEtage[slider.index+1].to = this.listEtage[slider.index+1].from+100;
      console.log(slider.index, sliderContainer);
      sliderContainer.onUpdate = event;
      console.log("listEtage", this.listEtage);
    }
    if (slider.index == this.listEtage.length - 1) {
      this.listEtage[slider.index].from = sliderContainer.from;
      this.listEtage[slider.index].to = sliderContainer.to;
      console.log(slider.index, sliderContainer);
      sliderContainer.onUpdate = event;
      console.log("listEtage", this.listEtage);
    }

  }

  getPavEtageChambre() {
    /*this.pavEtageChambre = [];
     this.dataService.getData(this.pavUrl + '?filter='+encodeURIComponent('{"include":{"etages":"chambres"}}'))
     .subscribe(
     data => {
     this.handlePavEtageChambre(data);
     },
     error => this.handleError(error)
     );*/
  }

  handlePavEtageChambre(data) {
    this.pavEtageChambre = data;
    /*this.pavEtageChambre.forEach(function(pavillon){
     pavillon.nombreEtage = pavillon.etages.length;
     pavillon.nombreChambre = 0;
     pavillon.etages.forEach(function (etages) {
     pavillon.nombreChambre = pavillon.nombreChambre + etages.chambres.length;
     console.log("etages : ", etages)
     })
     });*/
    console.log("PavEtageChambre : ", this.pavEtageChambre);
  }


  finish(slider) {
    console.log(slider);
    // slider.onFinish = event;
  }

  setAdvancedSliderTo(from, to) {
    this.advancedSliderElement.update({from: from, to: to});
  }


  handleError(error) {
    this.popToast('error', 'Erreur', error.json);
    console.log(error);
  }
}
