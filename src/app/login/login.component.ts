import {Component, Inject} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { DropdownModule } from 'primeng/dropdown';
import {ApiConection} from "../Shared/ApiConection";
import {Router, RouterOutlet} from "@angular/router";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin : FormGroup

  constructor(private fb: FormBuilder,private api:ApiConection,private router:Router) {
    this.formLogin = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
    })

  }


  login(){
    this.api.login(this.formLogin.value)
      .subscribe(
        (data:any) => {
          console.log(data)
          this.router.navigate(['/home']);
        }
      )
  }

}
