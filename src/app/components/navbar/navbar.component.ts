import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  token: string = ''
  router = inject(Router)
  
  constructor() {
    this.token = localStorage.getItem('avi_token')!
    console.log(this.token);
    
  }
  //TODO:XQ NO ME APARECE EL LOGIN ENSEGUIDA TENGO Q RECARGAR PAGINA
  logout() {
    localStorage.removeItem('avi_token')
    this.router.navigateByUrl('/access')
  }

}
