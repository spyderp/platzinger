import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private autheticationService: AuthenticationService) { }
  user: User;
  ngOnInit() {
    this.autheticationService.getStatus().subscribe((status) => {
       this.userService.getUserById(status.uid).valueChanges().subscribe((data:User) => {
         this.user = data;
       }, (error) => {
         console.log(error);
       });
    }, (error) => {
      console.log(error);
    });

  }

}
