import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   
  message = 'Hello Guest'
   logout = true
 
   
  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getAllState().subscribe(state => {
      this.message = state.login ? + "Hello" + state.user : "Guest"
    })
  }

}
