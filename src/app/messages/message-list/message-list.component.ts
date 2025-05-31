import { Component, Injectable, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Injectable()
@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[];

  constructor(private msgService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.msgService.getMessages();
    this.msgService.messageChangedEvent.subscribe(
      (msg: Message[]) => {
        this.messages = msg;
      }
    );
  }

  // onAddMessage(message: Message){
  //   this.messages.push(message);
  // }
}
