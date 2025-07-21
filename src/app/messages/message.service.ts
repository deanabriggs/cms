import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
// import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
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
    this.http
      .get<Message[]>('http://localhost:3000/messages')
      .subscribe(
        // success method
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
          this.messageChangedEvent.next(this.messages.slice());
        },
        // error method
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
    // newMessage.id = String(++this.maxMessageId);
    // this.messages.push(newMessage);
    // this.storeMessages();
    newMessage.id = "";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{message: Message}>('http://localhost:3000/messages', newMessage, { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.message);
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  storeMessages() {
    const msgJson = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.http
      .put('http://localhost:3000/messages', msgJson, { headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      })
  }
}
