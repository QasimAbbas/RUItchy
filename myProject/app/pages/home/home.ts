import {Component, OnInit} from '@angular/core';
import {Camera} from 'ionic-native';
import { NavController } from 'ionic-angular';
declare var firebase:any;

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
      this.base64Image = "data:image/jpeg;base64," + imageData;
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
    this.sendImgString("" + this.base64Image);
    console.log(this.base64Image);
    console.log(this.base64Image + "");
    // writeUserData(12,"Victor","vi4tle@yahoo.com","jurl.jpg");
  }


  sendImgString(img){
    firebase.database().ref('/img').set({
      string: img
    });
  }

}
