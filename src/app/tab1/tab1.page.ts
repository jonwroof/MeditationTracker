import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}
  playBowl(){
    let audio = new Audio();
    audio.src = "./assets/audio/bowl.wav";
    audio.load();
    audio.play();
}
}
