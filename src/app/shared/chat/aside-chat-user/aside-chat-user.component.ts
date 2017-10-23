import { Component, OnInit, Input } from '@angular/core';

import { chatboxManager } from '../aside-chat/aside-chat-boxes'

@Component({
  selector: 'aside-chat-user',
  templateUrl: './aside-chat-user.component.html',
})
export class AsideChatUserComponent implements OnInit {

  @Input() user: any = {};

  state: {
    chatId: string
  };

  private static idCounter = 0;

  constructor() {
    this.state = {
      chatId: 'chatbox-user-' + AsideChatUserComponent.idCounter++
    }
  }

  ngOnInit() {
  }

  openChatBox(e) {
    e.preventDefault();
    const user = this.user;
    const [firstname, lastname] = user.username.split(/ /);
    const id = this.state.chatId;
    if (user.status !== 'ofline') {
      chatboxManager.addBox(id, {
        title: user.username,
        first_name: firstname,
        last_name: lastname,
        status: user.status || 'online',
        alertmsg: user.status === 'busy' ? user.username + ' is in a meeting. Please do not disturb!' : '',
        alertshow: user.status === 'busy'
        // you can add your own options too
      });
    }
  }
}
