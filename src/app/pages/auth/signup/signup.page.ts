import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  name: string = "";
  matricno: string = "";
  phoneno: string = "";
  email: string = "";
  gender: string = "";
  pass: string = "";
  cpass: string = "";
  check: any;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accP: AccessProviders,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  dismissLogin() {
    this.router.navigate(['/home']);
  }

  async signup() {
    if (this.name == "") {
      this.presentToast('Full name is required');
    } else if (this.matricno == "") {
      this.presentToast('Matric Number is required');
    } else if (this.phoneno == "") {
      this.presentToast('Phone Number is required');
    } else if (this.email == "") {
      this.presentToast('Email is required');
    } else if (this.gender == "") {
      this.presentToast('Gender is required');
    } else if (this.pass == "") {
      this.presentToast('Password is required');
    } else if (this.cpass != this.pass) {
      this.presentToast('Password are not the same');
    } else {
      const loader = await this.loadingCtrl.create({
        message: "Please wait......", 
      });

      loader.present();

      return new Promise(resolve => {
        let body = {
          action: 'signup2',
          name: this.name,
          matricno: this.matricno,
          phoneno: this.phoneno,
          email: this.email,
          gender: this.gender,
          pass: this.pass
        }

        this.accP.postData(body, 'app.php').subscribe((res: any) => {
          if (res.success == true) {
            loader.dismiss();
            this.navCtrl.navigateRoot(['/signupdone']);
          } else {
            loader.dismiss();
            this.presentToast(res.msg);
          }
        }, (err) => {
          loader.dismiss();
          this.presentAlert('Timeout');
        
        });
      });
    }
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.signup();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentA(a) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

}
