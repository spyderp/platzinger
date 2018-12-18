import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFireDatabase:AngularFireDatabase) { }
  createConversation(conversation){
    return this.angularFireDatabase.object('conversation/' + conversation.uid+'/'+conversation.timestamp).set(conversation);
  }
 editConversation(conversation) {
    return this.angularFireDatabase.object('conversation/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
  }
  getConversation(uid: string){
    return this.angularFireDatabase.list('conversation/' + uid);
  }
}
