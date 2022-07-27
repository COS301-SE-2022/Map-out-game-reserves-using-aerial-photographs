import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Aerial Mapper';

  websocket: WebSocket;

  constructor() {
    this.websocket = new WebSocket("wss://yg39xocfj9.execute-api.us-east-1.amazonaws.com/production/");

    this.websocket.onopen = () => {
      this.websocket.send(JSON.stringify({
        message: "subscribe", //this selects the 'subscribe' API Gateway route (which triggers the onSubscribe lambda function)
        topic: "maps" //this is the topic we want to subscribe to
      }));
    }

    this.websocket.onmessage = function(str: any) {
      console.log("SNS message received ", str);
    };

    this.websocket.onclose = () => {
      console.log("Websocket connection closed");
    }
  }
}
