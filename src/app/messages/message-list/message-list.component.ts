import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {

  messages: Message[] = [
    new Message(1, "help", "I'm trying to understand this concept.", "Deana"),
    new Message(2, "success", "I think I figured it out!", "Deana"),
    new Message(3, "late", "Can I get credit for a late assignment?", "Deana"),
    new Message(4, "share", "Data flow charts really helped me.", "Deana"),
  ]

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
