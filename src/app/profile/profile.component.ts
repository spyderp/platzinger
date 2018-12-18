import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { AuthenticationService } from '../services/authentication.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private autheticationService: AuthenticationService, private firebaseStorage:AngularFireStorage) { }
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;
  ngOnInit() {
    this.autheticationService.getStatus().subscribe((status) => {
       this.userService.getUserById(status.uid).valueChanges().subscribe((data:User) => {
         this.user = data;
       }, (error) => {
         console.log(error);
       });
    }, (error) => {
      console.log(error);
    });

  }
  saveSettings(){
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId+'.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) =>{
          this.userService.setAvatar(p, this.user.uid).then(() => { alert('avatar subido correctamente') }).catch((error) => { console.log(error) });
        });
      }).catch((error) => {
        console.log(error)
      });
    }else{
      this.userService.editUser(this.user).then(() => {
        alert('Cambios realizados');
      }).catch((error) => {
        alert('Ocurrio un error');
        console.log(error);
      })
    }
   
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
}
