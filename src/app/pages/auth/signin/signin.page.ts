import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardPage } from '../../dashboard/dashboard.page';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  matricno: string = "";
  pass: string = "";
  datastorage: any;
  pic: string = "";

  constructor(
    private storage: Storage,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accP: AccessProviders,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  dismissLogin() {
    this.router.navigate(['/home']);
  }

  async signin() {
    
    if (this.matricno == "") {
      this.presentToast('Matric Number is required');
    } else if (this.pass == "") {
      this.presentToast('Password is required');
    } else {
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });

      loader.present();

      return new Promise(resolve => {
        let body = {
          action: 'signin',
          matricno: this.matricno,
          pass: this.pass
        }

        this.accP.postData(body, 'app.php').subscribe((res: any) => {
          if (res.success == true) {
            loader.dismiss();
            if (res.usertype == 'student') {
              this.storage.set('StorageUser', res.result);
              this.navCtrl.navigateRoot(['/dashboard']);
            } else if (res.usertype == 'lecturer') {
              this.storage.set('StorageUser', res.result);
              this.storage.set('StorageSubject', res.subject);
              this.navCtrl.navigateRoot(['/lectdashboard']);
            } else if (res.usertype == 'admin') {
              this.storage.set('StorageUser', res.result);
              this.navCtrl.navigateRoot(['/userregister']);
            }  
          } else {
            loader.dismiss();
            this.presentAlert('Email or password is wrong');
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
      cssClass: 'toastcolor',
      duration: 1500
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
            this.signin();
          }
        }
      ]
    });

    await alert.present();
  }
}
