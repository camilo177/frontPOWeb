import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {ApiConection} from "./ApiConection";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private api:ApiConection,private router:Router) {
  }
  token = localStorage.getItem('token');

  canActivate(): boolean {

    if(this.token){
      return true;
    }else {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }


}

}
