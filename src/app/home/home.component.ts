import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  friends: User[];
  user:User;
  query: string;
  friendEmail: string;
  constructor(
    private userService: UserService, 
    private authenticationService: AuthenticationService, 
    private router: Router, 
    private modalService: NgbModal,
    private requestService: RequestsService
    ) {
    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
      this.friends = data;
    }, (error) => { console.log(error); });
   }

  ngOnInit() {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }
  logout() {
    this.authenticationService.logout().then(() => {
      alert('Sección Cerrada');
      this.router.navigate(['login']);
    }).catch((error) => {
      console.log(error)
    });
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      
    }, (reason) => {
    
    });
  }
  sendRequest(){
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status:'pending'
    }
    this.requestService.createRequest(request).then(()=>{
      alert('Solicitud enviada');
      this.friendEmail = '';
    }).catch((error)=>{
      alert('Ocurrior error');
      console.log(error);
    })
  }
}
