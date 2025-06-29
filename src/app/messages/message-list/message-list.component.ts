import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Injectable()
@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  messages: Message[];

  constructor(private msgService: MessageService) {}

  ngOnInit(): void {
    this.msgService.getMessages();
    this.subscription = this.msgService.messageChangedEvent.subscribe(
      (msg: Message[]) => {
        this.messages = msg;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onAddMessage(message: Message){
  //   this.messages.push(message);
  // }
}
