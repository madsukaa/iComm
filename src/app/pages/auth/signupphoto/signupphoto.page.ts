import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage-angular';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AccessProviders } from 'src/app/providers/access-providers';

@Component({
  selector: 'app-signupphoto',
  templateUrl: './signupphoto.page.html',
  styleUrls: ['./signupphoto.page.scss'],
})
export class SignupphotoPage implements OnInit {
  base64img: string = '';
  datastorage: any;
  matricno: string;
  file: string;
  newdata: any;

  constructor(
    private camera: Camera,
    private storage: Storage,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private accP: AccessProviders,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private transfer: FileTransfer
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('StorageUser').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.matricno = this.datastorage.student_matricno;
      this.file = this.matricno + ".png";
    });
  }

  imageCaptured() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      cameraDirection: 1,
      allowEdit: true,
      targetHeight: 300,
      targetWidth: 300,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64img = "data:image/png;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }
  imageCapturedGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then((ImageData => {
      this.base64img = "data:image/jpeg;base64," + ImageData;
    }), error => {
      console.log(error);
    })
  }

  clear() {
    this.base64img = '';
  }

  async photo() {
    const loader = await this.loadingCtrl.create({
      message: "Please wait......",
    });

    loader.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "photo",
      fileName: this.file,
      chunkedMode: false,
      mimeType: "image/png",
      headers: {}
    }

    fileTransfer.upload(this.base64img, 'https://www.sukaa.my/icomm/api/app.php', options).then(
      data => {

        this.newdata = JSON.parse(data.response);
        if (this.newdata.success) {
          this.storage.set('StoragePhoto', this.newdata.data);
          this.presentA(this.newdata.message);

        } else {
          this.presentAlert(this.newdata.message);
        }
        loader.dismiss();
        //this.presentAlert('Profile photo has been uploaded!');
        //this.navCtrl.navigateRoot(['/dashboard']);
        
      }, error => {
        this.presentAlert(JSON.stringify(error));
        loader.dismiss();
      }
    );
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
          text: 'Next',
          handler: (blah) => {
            this.navCtrl.navigateRoot(['/dashboard']);
          }
        }
      ]
    });

    await alert.present();
  }
}
