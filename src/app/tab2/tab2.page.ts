import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertController, NavController } from '@ionic/angular';

const circleR = 80;
const circleDasharray = 2 * Math.PI * circleR;



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  percent: BehaviorSubject<number> = new BehaviorSubject(100);
  minuteinput:number;
  minutes:number;
  timer: number; //in seconds
  start: Date;
  finish: number;
  totalTime: number;
  interval;

  startDuration = 1;

  circleR = circleR;
  circleDasharray = circleDasharray;
  state: 'start' | 'stop' = 'stop';

  constructor(public alertController: AlertController, private nav : NavController) {
    }

  click(){
    alert('Meditation Session Started')
  }
  async presentSessionAlert() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Save Session?',
      // subHeader: 'Subtitle',
      // message: 'Choose whether to save your session, take notes, or cancel',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: () => {
            this.nav.navigateRoot('tabs/tab3');
          }
        }
      ]
    });

    await alert.present();
  }
  startTimer(duration: number){
    this.state = 'start';
    this.finish = Date.now()+duration*60000;
    this.totalTime = duration * 60;
    clearInterval(this.interval);
    this.timer = this.minuteinput * 60;
    // this.updateTimeValue();
    this.interval = setInterval( () => {
      this.updateTimeValue();
    }, 25);
  }

  stopTimer(){
    clearInterval(this.interval);
    this.time.next('00:00');
    this.state = 'stop';
  }


  updateTimeValue(){
    let minutes: any = (this.finish-Date.now()) / 60000.0;
    let seconds: any = ((this.finish-Date.now()) / 1000.0) % 60.0;

    minutes = String ('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const text = minutes + ':' + seconds;
    this.time.next(text);

    
    const percentage =101-((((this.finish-Date.now())/1000) / this.totalTime) * 100);
    this.percent.next(percentage);

    --this.timer;
    if (minutes + seconds == 0){
      this.stopTimer();
      let audio = new Audio();
      audio.src = "./assets/audio/gong.wav";
      audio.load();
      audio.play();
      this.presentSessionAlert();
    }
  }

  percentageOffset(percent){
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat);
  }

}
