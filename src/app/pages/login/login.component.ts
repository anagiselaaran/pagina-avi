import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userService = inject(UserService)
  router = inject(Router)

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.pattern((/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/))),
    password:new FormControl(null, Validators.required)
  })

  async onSubmit() {
    if (this.loginForm.valid) {
      const response = await this.userService.login(this.loginForm.value)
      console.log(response);
      await Swal.fire({
        title: "you're in",
        text: "Successfull login",
        icon: 'success'
      })
      localStorage.setItem('avi_token', response.token)
      this.loginForm.reset()

      this.router.navigate(['/dashboard','profile'])
      
    }
    
  }


}
