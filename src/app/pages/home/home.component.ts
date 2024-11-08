import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import Swal from 'sweetalert2'
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  role:string = ''

  userService = inject(UserService)
  router = inject(Router)

  registerForm: FormGroup = new FormGroup({
    company_name: new FormControl(null,[Validators.required]),
    p_iva: new FormControl(/* null, [Validators.required] */),//requerido?
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)]),
    telefono: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required])
  })

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        const response = await this.userService.registerUser(this.registerForm.value)
        Swal.fire('Register', 'You are in', 'success')
        console.log(response);
        this.registerForm.reset()
        this.router.navigate(['/access'])
      } catch (error) {
        Swal.fire('Error', 'Make sure your data is correct', 'error')
      }
    } else {
      Swal.fire('Complete the form', 'You are almost there', 'error')
      Object.values(this.registerForm).forEach( cont => { cont.markAsTouched()})
    }
    
  }

  checkError(controlName: string, errorName: string) {

    return this.registerForm.get(controlName)?.hasError(errorName) && this.registerForm.get(controlName)?.touched
  }
}
