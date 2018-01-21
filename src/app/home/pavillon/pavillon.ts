export class Pavillon {
  private _libelle : String;

  constructor(libelle: string) {
    this._libelle = libelle;
  }


  get libelle(): String {
    return this._libelle;
  }

  set libelle(value: String) {
    this._libelle = value;
  }



}
