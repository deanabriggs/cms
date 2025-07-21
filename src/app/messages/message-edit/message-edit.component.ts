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
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
    
  currentSender:string = "6872b4cdbf663eaa1d0d8191";

  constructor (private msgService: MessageService) {}

  onSendMessage(){  
    const newMsgId = String(this.msgService.maxMessageId);
    const theSubject = this.subjectInputRef.nativeElement.value;
    const theMsg = this.msgTextInputRef.nativeElement.value;
    const theSender = this.currentSender;
    const newMessage = new Message(newMsgId, theSubject, theMsg, theSender);
    // this.addMessageEvent.emit(newMessage);
    console.log(newMessage);
    this.msgService.addMessage(newMessage);
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }
}
