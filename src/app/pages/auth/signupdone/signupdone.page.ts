import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-signupdone',
  templateUrl: './signupdone.page.html',
  styleUrls: ['./signupdone.page.scss'],
})
export class SignupdonePage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  home() {
    this.navCtrl.navigateRoot(['/home']);
  }
}
