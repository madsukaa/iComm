import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { element } from 'protractor';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';

export interface User {
  id: string;
  username: string;
  pass: string;
  role: string;
}

export interface Student {
  id: string;
  name: string;
  matricno: string;
  age: string;
  tel: string;
  email: string;
  gender: string;
  pic: string;
}

export interface Lecturer {
  id: string;
  name: string;
  staffid: string;
  gender: string;
  tel: string;
  email: string;
  pic: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
}

export interface StudentClass {
  studentid: string;
  subjectid: string;
  id: string;
  classcourseid: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private url = 'https://www.sukaa.my/icomm/api.php';
  isLoggedIn = false;
  token: any;

  constructor(private http: HttpClient,
    private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    //this._storage = storage;
  }

  login(matricno: String, password: String) {
    return this.http.post(this.url + 'signin.php', {
      matricno: matricno, password: password
    });
  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + "" +
      this.token["access_token"]
    });

    return this.http.get(
      this.url + 'logout.php', {
        headers: headers
      });
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization':
        this.token["token_type"] + "" +
        this.token["access_token"]
    });
  }

  //getToken() {
  //  return this.storage.getItem('token').then(
  //    data => {
  //      this.token = data;

  //      if (this.token != null) {
  //        this.isLoggedIn = true;
  //      } else {
  //        this.isLoggedIn = false;
  //      }
  //    },
  //    error => {
  //      this.token = null;
  //      this.isLoggedIn = false;
  //    }
  //  );
  //}

  register(name: String, matricno: String, tel: String, email: String, gender: String) {
    return this.http.post(this.url + 'signup.php',
      { name: name, matricno: matricno, tel: tel, email: email, gender: gender }
    )
  }

  getAll() {
    return this.http.get<[Student]>(this.url);
  }

  get(id: string) {
    return this.http.get<Student>(this.url + '?studentid=' + id);
  }

  create(student: Student) {
    return this.http.post(this.url, student);
  }

  update(student: Student, id: string) {
    return this.http.put(this.url + '/' + id, student);
  }

  remove(id: string) {
    return this.http.delete(this.url + '/' + id);
  }
}
