import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  constructor(
      private activatedRoute:ActivatedRoute,
      private userService:UserService
    ) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.userService.getFriend(this.friendId),this.friendId);
   }

  ngOnInit() {
  }

}
