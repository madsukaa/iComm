import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Platform, ToastController, AlertController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  navigate: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    public navCtrl: NavController,
    private alertController: AlertController,
    private router: Router,
    private location: Location,
    private toastCtrl: ToastController
  ) {
    //this.sideMenu();
    this.lectButtonEvent();
    //this.studButtonEvent();
    //this.homeButtonEvent();
    this.initializeApp();
  }

  ngOnInit() {

  }

  lectButtonEvent() {
    //this.platform.backButton.subscribe(async () => {
    //  this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
    //    if (outlet && outlet.canGoBack()) {
    //      outlet.pop();
    //    } else if (this.router.url === '/home') {
    //      if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
    //        navigator['app'].exitApp();
    //      } else {
    //        const toast = await this.toastCtrl.create({
    //          message: 'Press back again to exit.',
    //          duration: 2000,
    //          position: 'bottom'
    //        });

    //        toast.present();
    //        this.lastTimeBackPress = new Date().getTime();
    //      }
    //    } 
    //  });
    //});

    this.platform.backButton.subscribeWithPriority(0, () => {
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (this.router.url != '/home') {
          await this.location.back();
        } else if (this.router.url === '/home') {
          if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          } else {
            navigator['app'].exitApp();
          }
        }
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to exit?',
      buttons: [{
        text: 'Yes',
        cssClass: 'secondary',
        handler: () => {
          navigator['app'].exitApp();
        }
      },{
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
        }
      }]
    });

    await alert.present();
  }

  initializeApp() {
    this.storage.create();
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    //this.storage.get('StorageUser').then((res) => {
    //  if (res == null) {
    //    this.navCtrl.navigateRoot('/home');
    //  } else {
    //    this.navCtrl.navigateRoot('/dashboard');
    //  }
    //}); 
  }

  sideMenu() {
    this.navigate =
      [
        {
          title: "Dashboard",
          url: "/admindashboard",
          icon: "home"
        },
        {
          title: "User",
          url: "/userregister",
          icon: "contacts"
        },
        {
          title: "Logout",
          url: "/adminlogout",
          icon: "logout"
        },

      ]
  }
  
}
