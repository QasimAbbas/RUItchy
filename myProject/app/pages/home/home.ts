import {Component, OnInit} from '@angular/core';
import {Camera} from 'ionic-native';
import { NavController } from 'ionic-angular';
declare var firebase:any;

interface HTMLElement {
  extended?: any;
}

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage implements OnInit{
  public base64Image: string;
  constructor(public navCtrl: NavController) {
  console.log(firebase);
  }

  takePicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = imageData;
      alert(this.base64Image);
      console.log(this.base64Image);
      this.sendImgString("" + this.base64Image);
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit(){
    function writeUserData(userId, name, email, imageUrl) {
      firebase.database().ref('/').set({
        username: name,
        email: email,
        profile_picture : imageUrl
      });
    }
    // writeUserData(12,"Victor","vi4tle@yahoo.com","jurl.jpg");
  }


  sendImgString(img){
    firebase.database().ref('/img').set({
      string: img
    });
  }

  /*document.getElementById("addSymptom").addEventListener("click", function(){
    var currInput = document.getElementById("currentInput").value;
    var ul = document.getElementById("symptomListList");
    var li = document.createElement("li");
    li.appendChild(currInput);
    ul.appendChild(li);
  });*/

  /*var app = angular.module("myApp",[]);
  app.controller("myController", function($scope){
  $scope.name="asd";
  $scope.items = [];
  $scope.addItem = function (itemName) {
    $scope.items.push({
      name: itemName
    });
    $scope.itemName = "";
  };

  $scope.removeItem = function (index) {
    $scope.items.splice(index, 1);
  };
})*/
}
