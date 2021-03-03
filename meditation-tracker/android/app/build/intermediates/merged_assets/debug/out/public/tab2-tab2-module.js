(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab2-tab2-module"],{

/***/ "EGAO":
/*!*************************************!*\
  !*** ./src/app/tab2/tab2.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#progress-circle {\n  transform: rotate(-90deg);\n}\n\n.timer-text {\n  transform: rotate(90deg);\n  transform-origin: center;\n  font-size: 36px;\n  text-anchor: middle;\n  font-weight: 600;\n  fill: #7f8c8d;\n}\n\n#TimerDiv {\n  margin-top: 100px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHRhYjIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kseUJBQUE7QUFDSjs7QUFFQTtFQUNJLHdCQUFBO0VBQ0Esd0JBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7QUFDSjs7QUFFQTtFQUNJLGlCQUFBO0FBQ0oiLCJmaWxlIjoidGFiMi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjcHJvZ3Jlc3MtY2lyY2xle1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcclxufVxyXG5cclxuLnRpbWVyLXRleHQge1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xyXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiAzNnB4O1xyXG4gICAgdGV4dC1hbmNob3I6IG1pZGRsZTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBmaWxsOiAgIzdmOGM4ZCA7XHJcbn1cclxuXHJcbiNUaW1lckRpdntcclxuICAgIG1hcmdpbi10b3A6IDEwMHB4O1xyXG59Il19 */");

/***/ }),

/***/ "JZ9U":
/*!***********************************!*\
  !*** ./src/app/tab2/tab2.page.ts ***!
  \***********************************/
/*! exports provided: Tab2Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2Page", function() { return Tab2Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_tab2_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./tab2.page.html */ "e9nj");
/* harmony import */ var _tab2_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab2.page.scss */ "EGAO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");






const circleR = 80;
const circleDasharray = 2 * Math.PI * circleR;
let Tab2Page = class Tab2Page {
    constructor(alertController, nav) {
        this.alertController = alertController;
        this.nav = nav;
        this.time = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]('00:00');
        this.percent = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](100);
        this.startDuration = 1;
        this.circleR = circleR;
        this.circleDasharray = circleDasharray;
        this.state = 'stop';
    }
    click() {
        alert('Meditation Session Started');
    }
    someAsyncOperation() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () { });
    }
    presentSessionAlert() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
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
            yield alert.present();
        });
    }
    startTimer(duration) {
        this.state = 'start';
        clearInterval(this.interval);
        this.timer = duration * 60;
        this.updateTimeValue();
        this.interval = setInterval(() => {
            this.updateTimeValue();
        }, 1000);
    }
    stopTimer() {
        clearInterval(this.interval);
        this.time.next('00:00');
        this.state = 'stop';
    }
    updateTimeValue() {
        let minutes = this.timer / 60;
        let seconds = this.timer % 60;
        minutes = String('0' + Math.floor(minutes)).slice(-2);
        seconds = String('0' + Math.floor(seconds)).slice(-2);
        const text = minutes + ':' + seconds;
        this.time.next(text);
        const totalTime = this.startDuration * 60;
        const percentage = ((totalTime - this.timer) / totalTime) * 100;
        this.percent.next(percentage);
        --this.timer;
        if (this.timer < 0) {
            this.stopTimer();
            let audio = new Audio();
            audio.src = "./assets/audio/gong.wav";
            audio.load();
            audio.play();
            this.presentSessionAlert();
        }
    }
    percentageOffset(percent) {
        const percentFloat = percent / 100;
        return circleDasharray * (1 - percentFloat);
    }
};
Tab2Page.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] }
];
Tab2Page = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-tab2',
        template: _raw_loader_tab2_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_tab2_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], Tab2Page);



/***/ }),

/***/ "TUkU":
/*!*************************************!*\
  !*** ./src/app/tab2/tab2.module.ts ***!
  \*************************************/
/*! exports provided: Tab2PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2PageModule", function() { return Tab2PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _tab2_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tab2.page */ "JZ9U");
/* harmony import */ var _explore_container_explore_container_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../explore-container/explore-container.module */ "qtYk");
/* harmony import */ var _tab2_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tab2-routing.module */ "UDmF");








let Tab2PageModule = class Tab2PageModule {
};
Tab2PageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _explore_container_explore_container_module__WEBPACK_IMPORTED_MODULE_6__["ExploreContainerComponentModule"],
            _tab2_routing_module__WEBPACK_IMPORTED_MODULE_7__["Tab2PageRoutingModule"]
        ],
        declarations: [_tab2_page__WEBPACK_IMPORTED_MODULE_5__["Tab2Page"]]
    })
], Tab2PageModule);



/***/ }),

/***/ "UDmF":
/*!*********************************************!*\
  !*** ./src/app/tab2/tab2-routing.module.ts ***!
  \*********************************************/
/*! exports provided: Tab2PageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2PageRoutingModule", function() { return Tab2PageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _tab2_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tab2.page */ "JZ9U");




const routes = [
    {
        path: '',
        component: _tab2_page__WEBPACK_IMPORTED_MODULE_3__["Tab2Page"],
    }
];
let Tab2PageRoutingModule = class Tab2PageRoutingModule {
};
Tab2PageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], Tab2PageRoutingModule);



/***/ }),

/***/ "e9nj":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tab2/tab2.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\r\n  <ion-toolbar>\r\n    <ion-title>\r\n      Session Timer\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content [fullscreen]=\"true\">\r\n  <ion-header collapse=\"condense\">\r\n    <ion-toolbar>\r\n      <ion-title size=\"large\">Session Timer</ion-title>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n  <div id=\"TimerDiv\">\r\n  <ion-row class=\"ion-justify-content-center\">\r\n  <svg\r\n    id=\"progress-circle\"\r\n    width=\"50vh\"\r\n    height=\"50vh\"\r\n    viewBox=\"0 0 200 200\"\r\n  >\r\n    <linearGradient id=\"linearColors1\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\r\n      <stop offset=\"0%\" stop-color=\"#aeb6bf\"></stop>\r\n      <stop offset=\"100%\" stop-color=\"#2e4053\"></stop>\r\n    </linearGradient>-->\r\n    <circle\r\n      cx=\"50%\"\r\n      cy=\"50%\"\r\n      [attr.r]=\"circleR\"\r\n      fill=\"none\"\r\n      stroke=\"#f3f3f3\"\r\n      stroke-width=\"12\"\r\n    />\r\n    <circle\r\n      cx=\"50%\"\r\n      cy=\"50%\"\r\n      [attr.r]=\"circleR\"\r\n      fill=\"none\"\r\n      stroke=\"url(#linearColors1)\"\r\n      stroke-width=\"12\"\r\n      stroke-linecap=\"round\"\r\n      [attr.stroke-dasharray]=\"circleDasharray\"\r\n      [attr.stroke-dashoffset]=\"percentageOffset(percent | async)\"\r\n    \r\n    />\r\n    <text x=\"50%\" y=\"55%\" class=\"timer-text\">{{ time | async }}</text>\r\n  </svg>\r\n  </ion-row> \r\n</div>\r\n</ion-content>\r\n<ion-footer>\r\n  <ion-item>\r\n    <ion-label position=\"floating\">How Many Minutes?</ion-label>\r\n    <ion-input type=\"number\" [(ngModel)]=\"minutes\"></ion-input>\r\n  </ion-item>\r\n  <ion-button *ngIf=\"state === 'stop'\" expand=\"block\" style=\"--background:  #229954\" (click)=\"startTimer(minutes)\">\r\n    Start Timer</ion-button>\r\n <ion-button *ngIf=\"state === 'start'\" expand=\"block\" style=\"--background:  #a93226 \" (click)=\"stopTimer()\">\r\n      Stop Timer</ion-button>\r\n</ion-footer>\r\n\r\n");

/***/ })

}]);
//# sourceMappingURL=tab2-tab2-module.js.map