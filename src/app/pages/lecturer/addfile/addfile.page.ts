import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-addfile',
  templateUrl: './addfile.page.html',
  styleUrls: ['./addfile.page.scss'],
})
export class AddfilePage implements OnInit {

  filenames: string = "";
  asstype: string = "";
  filetype: string = "";
  file: any = "";
  url: string = "";
  id: string = "";
  newdata: any;
  datastorage: any;
  lectid: string = "";
  idfile: string = "";


  constructor(
    private storage: Storage,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accP: AccessProviders,
    public navCtrl: NavController,
    private actRoute: ActivatedRoute,
    private transfer: FileTransfer
  ) { }

  onFileChange(a) {
    console.log(a.target.files);
    var files = a.target.files[0].name;
    console.log("File Name");
    console.log(files);
    var reader = new FileReader();
    reader.readAsDataURL(a.target.files[0]);
    reader.onload = () => {
      this.file = reader.result;
      console.log(reader.result);
      console.log(this.file);
    };
      
  }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      console.log(data);
      this.id = data.id;
    });
    this.storage.get('StorageUser').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.lectid = this.datastorage.lecturer_id;
    });
  }

  async addlecturenote() {
    console.log(this.file);
    if (this.filenames == "") {
      this.presentToast('File name is required');
    } else {

      if (this.filetype == "LINK") {
        const loader = await this.loadingCtrl.create({
          message: "Please wait......",
        });
        loader.present();

        return new Promise(resolve => {
          let body = {
            action: 'addlecturenote',
            filename: this.filenames,
            url: this.url,
            type: this.filetype,
            id: this.id
          }

          this.accP.postData(body, 'app.php').subscribe((res: any) => {
            if (res.success == true) {
              loader.dismiss();
              this.navCtrl.navigateRoot(['/subjectview/' + this.id]);
              this.presentToast(res.msg);
            } else {
              loader.dismiss();
              this.presentToast(res.msg);
            }
          }, (err) => {
            loader.dismiss();
            this.presentToast(err);

          });
        });
      } else if (this.filetype == "FILE") {
        const loader = await this.loadingCtrl.create({
          message: "Please wait......",
        });
        loader.present();

        return new Promise(resolve => {
          

          let body = {
            action: 'addlecturenote',
            filename: this.filenames,
            url: this.file.name,
            type: this.filetype,
            id: this.id
          }

          this.accP.postData(body, 'app.php').subscribe((res: any) => {
            if (res.success == true) {
              const fileTransfer: FileTransferObject = this.transfer.create();
              this.idfile = res.msg;
              let options: FileUploadOptions = {
                fileKey: "lecture",
                fileName: this.filenames + ".pdf",
                chunkedMode: false,
                mimeType: "application/pdf",
                headers: {}
              }

              fileTransfer.upload(this.file, 'https://www.sukaa.my/icomm/api/app.php?uploadfile=' + this.id + '&lectid=' + this.lectid + '&idsub=' + this.idfile, options).then(
                data => {

                  this.newdata = JSON.parse(data.response);
                  if (this.newdata.success) {
                    //this.storage.set('StoragePhoto', this.newdata.data);
                    this.presentToast(this.newdata.message);
                    this.navCtrl.navigateRoot(['/subjectview/' + this.id]);
                  } else {
                    this.presentToast(this.newdata.message);
                  }
                  loader.dismiss();
                  //this.presentAlert('Profile photo has been uploaded!');
                  //this.navCtrl.navigateRoot(['/dashboard']);

                }, error => {
                  this.presentToast(JSON.stringify(error));
                  loader.dismiss();
                }
              );
              
              
            } else {
              loader.dismiss();
              this.presentToast(res.msg);
            }
          }, (err) => {
            loader.dismiss();
            this.presentToast(err);

          });
        });
      }
      

      
    }
  }

  async addquiz() {
    console.log(this.file);
    if (this.filenames == "") {
      this.presentToast('File name is required');
    } else {

      if (this.filetype == "LINK") {
        const loader = await this.loadingCtrl.create({
          message: "Please wait......",
        });
        loader.present();

        return new Promise(resolve => {
          let body = {
            action: 'addquiz',
            filename: this.filenames,
            url: this.url,
            type: this.filetype,
            id: this.id
          }

          this.accP.postData(body, 'app.php').subscribe((res: any) => {
            if (res.success == true) {
              loader.dismiss();
              this.navCtrl.navigateRoot(['/subjectview/' + this.id]);
              this.presentToast(res.msg);
            } else {
              loader.dismiss();
              this.presentToast(res.msg);
            }
          }, (err) => {
            loader.dismiss();
            this.presentToast(err);

          });
        });
      } else if (this.filetype == "FILE") {
        const loader = await this.loadingCtrl.create({
          message: "Please wait......",
        });
        loader.present();

        return new Promise(resolve => {


          let body = {
            action: 'addquiz',
            filename: this.filenames,
            url: this.file.name,
            type: this.filetype,
            id: this.id
          }

          this.accP.postData(body, 'app.php').subscribe((res: any) => {
            if (res.success == true) {
              const fileTransfer: FileTransferObject = this.transfer.create();
              this.idfile = res.msg;
              let options: FileUploadOptions = {
                fileKey: "quiz",
                fileName: this.filenames + ".pdf",
                chunkedMode: false,
                mimeType: "application/pdf",
                headers: {}
              }

              fileTransfer.upload(this.file, 'https://www.sukaa.my/icomm/api/app.php?uploadfile=' + this.id + '&lectid=' + this.lectid + '&idsub=' + this.idfile, options).then(
                data => {

                  this.newdata = JSON.parse(data.response);
                  if (this.newdata.success) {
                    //this.storage.set('StoragePhoto', this.newdata.data);
                    this.presentToast(this.newdata.message);
                    this.navCtrl.navigateRoot(['/subjectview/' + this.id]);
                  } else {
                    this.presentToast(this.newdata.message);
                  }
                  loader.dismiss();
                  //this.presentAlert('Profile photo has been uploaded!');
                  //this.navCtrl.navigateRoot(['/dashboard']);

                }, error => {
                  this.presentToast(JSON.stringify(error));
                  loader.dismiss();
                }
              );


            } else {
              loader.dismiss();
              this.presentToast(res.msg);
            }
          }, (err) => {
            loader.dismiss();
            this.presentToast(err);

          });
        });
      }



    }
  }

  async addpastyear() {
    console.log(this.file);
    if (this.filenames == "") {
      this.presentToast('File name is required');
    } else {

      if (this.filetype == "LINK") {
        const loader = await this.loadingCtrl.create({
          message: "Please wait......",
        });
        loader.present();

        return new Promise(resolve => {
          let body = {
            action: 'addpastyear',
            filename: this.filenames,
            url: this.url,
            type: this.filetype,
            id: this.id
          }

          this.accP.postData(body, 'app.php').subscribe((res: any) => {
            if (res.success == true) {
              loader.dismiss();
              this.navCtrl.navigateRoot(['/subjectview/' + this.id]);
              this.presentToast(res.msg);
            } else {
              loader.dismiss();
              this.presentToast(res.msg);
            }
          }, (err) => {
            loader.dismiss();
            this.presentToast(err);

          });
        });
      } else if (this.filetype == "FILE") {
        const loader = await this.loadingCtrl.create({
          message: "Please wait......",
        });
        loader.present();

        return new Promise(resolve => {


          let body = {
            action: 'addpastyear',
            filename: this.filenames,
            url: this.file.name,
            type: this.filetype,
            id: this.id
          }

          this.accP.postData(body, 'app.php').subscribe((res: any) => {
            if (res.success == true) {
              const fileTransfer: FileTransferObject = this.transfer.create();
              this.idfile = res.msg;
              let options: FileUploadOptions = {
                fileKey: "pastyear",
                fileName: this.filenames + ".pdf",
                chunkedMode: false,
                mimeType: "application/pdf",
                headers: {}
              }

              fileTransfer.upload(this.file, 'https://www.sukaa.my/icomm/api/app.php?uploadfile=' + this.id + '&lectid=' + this.lectid + '&idsub=' + this.idfile, options).then(
                data => {

                  this.newdata = JSON.parse(data.response);
                  if (this.newdata.success) {
                    //this.storage.set('StoragePhoto', this.newdata.data);
                    this.presentToast(this.newdata.message);
                    this.navCtrl.navigateRoot(['/subjectview/' + this.id]);
                  } else {
                    this.presentToast(this.newdata.message);
                  }
                  loader.dismiss();
                  //this.presentAlert('Profile photo has been uploaded!');
                  //this.navCtrl.navigateRoot(['/dashboard']);

                }, error => {
                  this.presentToast(JSON.stringify(error));
                  loader.dismiss();
                }
              );


            } else {
              loader.dismiss();
              this.presentToast(res.msg);
            }
          }, (err) => {
            loader.dismiss();
            this.presentToast(err);

          });
        });
      }



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

  dismissLogin() {
    this.router.navigate(['/subjectview/' + this.id]);
  }

}
