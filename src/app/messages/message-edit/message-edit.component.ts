import { Component, ElementRef, EventEmitter, Injectable, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Injectable()
@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  currentSender:string = "20";
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  
  constructor (private msgService: MessageService) {}

  onSendMessage(){
    const theSubject = this.subjectInputRef.nativeElement.value;
    const theMsg = this.msgTextInputRef.nativeElement.value;
    const theSender = this.currentSender;
    const newMessage = new Message("10", theSubject, theMsg, theSender);
    // this.addMessageEvent.emit(newMessage);
    this.msgService.addMessage(newMessage);
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }

}
