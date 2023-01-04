import { Component, OnInit } from '@angular/core';
import { AngularFireAuth,} from '@angular/fire/compat/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import {User} from "../models/user.model";
// import { FirebaseAuthentication } from '@awesome-cordova-plugins/firebase-authentication/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
user = {} as User
 

  constructor(private toastCtrl:ToastController,
              private loadingCtrl:LoadingController,
              private afauth:AngularFireAuth,
              private navCtrl:NavController,
            
               ) { }

  ngOnInit() {
  }
 async register(user:User){
  if(this.formValidation()){
    // show loader
    let loader = this.loadingCtrl.create({
      message:"Please wait..."
    });
    (await loader).present();

    try{
  

    await this.afauth
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((data: any) =>{console.log(data);

      // redirect to home page
      this.navCtrl.navigateRoot("home");
    })
    .catch();

  } catch(e:any){
    this.showToast(e);
  }
  // dismiss loader
  (await loader).dismiss();

 }
 }
formValidation(){
  if(!this.user.email){
    this.showToast("Enter email");
    return false;
  }

  if(!this.user.password){
    this.showToast("Enter password");
    return false;
  }

  return true;
}

 showToast(message:string){
this.toastCtrl.create({
  message:message,
  duration:3000
})
.then(toastData =>toastData.present());
 }
}
