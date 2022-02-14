import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-viewsubject',
  templateUrl: './viewsubject.page.html',
  styleUrls: ['./viewsubject.page.scss'],
})
export class ViewsubjectPage implements OnInit {
  id: string = "";
  lnote: any = [];
  quizz: any = [];
  pyear: any = [];
  doc: any;

  ab: string = "LINK";
  ac: string = "FILE";

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accP: AccessProviders,
    public navCtrl: NavController,
    private actRoute: ActivatedRoute,
    private file: File,
    private transfer: FileTransfer,
    private iab: InAppBrowser
  ) {
    //this.actRoute.params.subscribe((data: any) => {
    //  console.log(data);
    //  this.id = data.id;
    //this.lnote = [];
    //this.quizz = [];
    //this.pyear = [];
    //  this.loadFile();
    //});
  }

  ngOnInit() {
    //this.actRoute.params.subscribe((data: any) => {
    //  console.log(data);
    //  this.id = data.id;
    //  this.lnote = [];
    //  this.quizz = [];
    //  this.pyear = [];
    //  this.loadFile();
    //});
  }

  downloadfile(a, b, c) {
    this.doc = a;

    if (c == "FILE") {
      this.file.checkDir(this.file.dataDirectory, 'iCommerce').then(_ => {
        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.download(b, this.file.externalRootDirectory + '/iCommerce/' + a + '.pdf').then((entry) => {
        });
      }
      ).catch(err => {
        this.file.createDir(this.file.externalRootDirectory, 'iCommerce', false).then(response => {
          const fileTransfer: FileTransferObject = this.transfer.create();
          fileTransfer.download(b, this.file.externalRootDirectory + '/iCommerce/' + a + '.pdf').then((entry) => {
          }).catch((err));
        });
      });
    } else if (c == "LINK") {
      this.iab.create(c);
    } else {

    }
    
  }

  ionViewDidLoad() {
    this.actRoute.params.subscribe((data: any) => {
      console.log(data);
      this.id = data.id;
      this.lnote = [];
      this.quizz = [];
      this.pyear = [];
      this.loadFile();
    });
  }

  ionViewDidEnter() {
    //this.actRoute.params.subscribe((data: any) => {
    //  console.log(data);
    //  this.id = data.id;
    //  this.lnote = [];
    //  this.quizz = [];
    //  this.pyear = [];
    //  this.loadFile();
    //});
  }

  async doRefresh(event) {
    this.ionViewDidLoad();
    event.target.complete();
  }

  async loadFile() {
    return new Promise(resolve => {
      let body = {
        action: 'loadFile',
        id: this.id
      }

      this.accP.postData(body, 'app.php').subscribe((res: any) => {
        for (let note of res.lnote) {
          this.lnote.push(note);
        }
        for (let quiz of res.quiz) {
          this.quizz.push(quiz);
        }
        for (let past of res.pyear) {
          this.pyear.push(past);
        }
        resolve(true);
      });
    });
  }

  dismissLogin() {
    this.navCtrl.navigateRoot(['/dashboard']);
  }

  addFile(a) {
    this.router.navigate(['/addfile/' + a]);
  }
}
