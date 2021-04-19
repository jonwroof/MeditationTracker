import { Component } from '@angular/core';
import { ThemeSwitcherService } from '../theme-switcher.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private theme: ThemeSwitcherService) {}
  playBowl(){
    let audio = new Audio();
    audio.src = "./assets/audio/bowl.wav";
    audio.load();
    audio.play();
}

enableFawhnification(){
  this.theme.enableFawhnification();

}

enableLight() {
  this.theme.enableLight();
}
}
