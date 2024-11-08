import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { ScriptService } from '../../services/script.service';
import { Script } from '../../interfaces/script.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { File } from '../../interfaces/file.interface';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userService = inject(UserService)
  scriptService = inject(ScriptService)
  role: string = ''
  id!: number
  userLoged: User | null = null
  arrScript: Script[] = []
  private myFile:any
  

  fileForm: FormGroup = new FormGroup({
    file_name: new FormControl()
  })


  async ngOnInit() {
    try {
      const token = this.userService.getTokenData()
      this.role = token.role
      this.id = token.userId
      this.userLoged = await this.userService.getUserData(this.id)
      console.log(this.userLoged);
      const scripts = await this.scriptService.getAllScripts()
      console.log(scripts);
    } catch (error) {
      console.log(error);
    }
  }



  getFile($event: any) {
    
    const [file] = $event.target.files
    this.myFile = {
      filePropio: file,
      fileName: file.name
    }
    console.log(this.myFile);
    
    
    
  }
  
  async loadFile() {
    
    const body = new FormData()
    body.append('file', this.myFile.filePropio, this.myFile.fileName)

    this.scriptService.upload(body)
    .subscribe(res => console.log(res)
    )

  }
    
    
  }



