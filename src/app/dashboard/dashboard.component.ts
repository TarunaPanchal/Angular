import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   
  quote = "Loading quote...."
  email= "Getting Your Email "

  constructor(private user: UserService, private router:Router) { }
  
  ngOnInit() {

       this.user.getData().subscribe(data => {
         if(data.status){
          this.quote = data.quote
          this.email = data.email
        }else{
          // this.router.navigate(['logout'])
          this.router.navigate([''])
        }
       })
    }

    updatequote(event){
      const value = event.target.parentNode.querySelector('#myQuote').value
      this.user.updateQuote(value).subscribe( data => {
        if(data.success){
          alert("Your quote was updated")
        }
        else{
          alert("Some Problem")
        }
      })
    
    }
}
