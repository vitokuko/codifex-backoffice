export class Etage {
  private _label :String;
  private _id :String;


  constructor() {
  }


  get label(): String {
    return this._label;
  }

  get id(): String {
    return this._id;
  }

  set label(value: String) {
    this._label = value;
  }
}
