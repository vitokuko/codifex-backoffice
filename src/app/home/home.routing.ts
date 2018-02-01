import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {PavillonComponent} from "./pavillon/pavillon.component";
import {SpecificationComponent} from "./specification/specification.component";
/**
 * Created by souaibou on 5/9/17.
 */
const HOME_ROUTES : Routes =[
  {
    path: 'home',
    component : HomeComponent,
    children : [
      {path: '' , component: AccueilComponent},
      {path: 'accueil', component: AccueilComponent},
      {path: 'pavillon', component: PavillonComponent},
      {path: 'specification', component: SpecificationComponent}
    ]
  }

];
@NgModule({
  imports: [
    RouterModule.forChild(HOME_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRouting {}
