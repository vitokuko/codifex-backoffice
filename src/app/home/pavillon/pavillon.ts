export class Pavillon {
  private _label : String;
  private _id : String;

  constructor(){}

  get id(): String {
    return this._id;
  }

  get label(): String {
    return this._label;
  }

  set label(value: String) {
    this._label = value;
  }

  getPavillon(value:Pavillon){
    this._label = value.label;
  }


}
