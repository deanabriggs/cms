import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  currentSender:string = "Deana";
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  
  onSendMessage(){
    const theSubject = this.subjectInputRef.nativeElement.value;
    const theMsg = this.msgTextInputRef.nativeElement.value;
    const theSender = this.currentSender;
    const newMessage = new Message(1, theSubject, theMsg, theSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }

}
