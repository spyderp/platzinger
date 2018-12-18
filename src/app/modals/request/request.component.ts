import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { UserService } from 'src/app/services/user.service';
import { RequestsService } from 'src/app/services/requests.service';

export interface PromptModel{
  scope: any,
  currentRequest:any
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.sass']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel{
  shouldAdd: string = 'yes';
  currentRequest:any;
  scope:any;
  constructor(public dialogService: DialogService, private userService: UserService, private requestsService:RequestsService) { 
    super(dialogService)
  }
  accept(){
    let status: string;
    if(this.shouldAdd == 'yes'){
      status = 'accepted';
    }else if(this.shouldAdd == 'no'){
      status = 'rejected';
    } else if (this.shouldAdd == 'later') {
    }
    this.requestsService.setRequestStatus(this.currentRequest, status).then((data) => { 
      if (status == 'accepted'){
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then((data)=>{
          alert('Solicitud Aceptada');
        })
      }
     }).catch((error) => { console.log(error) })
  }
  open(){

  }
  close(){

  }
}
