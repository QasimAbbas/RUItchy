"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        console.log(firebase);
    }
    HomePage.prototype.takePicture = function () {
        var _this = this;
        ionic_native_1.Camera.getPicture({
            destinationType: ionic_native_1.Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then(function (imageData) {
            // imageData is a base64 encoded string
            _this.base64Image = imageData;
            //alert(this.base64Image);
            console.log(_this.base64Image);
            _this.sendImgString("" + _this.base64Image);
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.ngOnInit = function () {
        function writeUserData(userId, name, email, imageUrl) {
            firebase.database().ref('/').set({
                username: name,
                email: email,
                profile_picture: imageUrl
            });
        }
    };
    HomePage.prototype.sendImgString = function (img) {
        firebase.database().ref('/img').set({
            string: img
        });
    };
    HomePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/home/home.html'
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
var app = angular.module('myApp', ['ionic']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: 'tabs.html'
    })
        .state('tab.diagnosis', {
        url: '/diagnosis',
        views: {
            'tab-diagnosis': {
                templateUrl: 'tab-diagnosis.html',
                controller: 'PostsCtrl'
            }
        }
    });
    $urlRouterProvider.otherwise('/tab/posts');
});
//# sourceMappingURL=home.js.map