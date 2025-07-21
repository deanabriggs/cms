import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Injectable()
@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit { 
  @Input() message: Message;
  messageSender: string;

  constructor (  ) {}

  ngOnInit(): void {
    const sender = this.message?.sender;

    if (this.isSenderObject(sender)) {
      this.messageSender = sender.name;
    } else {
      this.messageSender = 'Unknown';
      console.warn(`No contact found or sender is not populated:`, sender);
    }
  }

  private isSenderObject(sender: any): sender is { name: string } {
  return sender !== null
    && sender !== undefined
    && typeof sender === 'object'
    && 'name' in sender
    && typeof sender.name === 'string'; 
  }
}
