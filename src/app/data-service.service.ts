import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataServiceService {

  baseUrl = 'https://codifex-api.herokuapp.com/api/';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http) {

  }

  getData(url){
    return this.http.get(this.baseUrl + url)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'error server'));
  }

  addData(url,data){
    console.log(JSON.stringify(data));
    return this.http.post(this.baseUrl + url, JSON.stringify(data), {headers: this.headers})
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'error server'));
  }

  patchData(url,data){
    return this.http.patch(this.baseUrl + url + "/" + data.id, data)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'error server'));
  }

  deleteData(url,dataId){
    return this.http.delete(this.baseUrl + url + "/" + dataId)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'error server'));
  }
  putData(url,data){
    return this.http.put(this.baseUrl + url, JSON.stringify(data), {headers: this.headers})
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'error server'));
  }

}
