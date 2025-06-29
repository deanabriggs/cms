import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient, private contactService: ContactService) {
    // this.messages = MOCKMESSAGES;
  }

  private getMaxId(): number {
    let maxId = 0;
    for (let msg of this.messages) {
      let currentId = +msg.id;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages() {
    this.contactService.getContacts();

    this.http
      .get<Message[]>('https://rkjcms-5f317-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.error(error);
        }
      )
  }

  getMessage(id: string): Message | null {
    return this.messages.find(m => m.id == id);
  }

  addMessage(newMessage: Message) {
    if(!newMessage) {
      return;
    }
    newMessage.id = String(++this.maxMessageId);
    this.messages.push(newMessage);
    this.storeMessages();
  }

  storeMessages() {
    const msgJson = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.http
      .put('https://rkjcms-5f317-default-rtdb.firebaseio.com/messages.json', msgJson, { headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      })
  }
}
