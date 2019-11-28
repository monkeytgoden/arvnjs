import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent {
  @Input() imgURL: any;
  @Output() avatarChange = new EventEmitter();

  public imagePath;
  public message: string;

  onSelectFile(event) {
    this.message = null;
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const mimeType = file.type;
      const fileName = file.name;
      const fileType = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length);
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }
      // lets web applications asynchronously read the contents of files stored on the user’s computer
      const reader = new FileReader();
      // this.imagePath = files;
      // method starts reading the contents of the specified file and,
      // once finished, the result attribute contains URL represents the file’s data
      reader.readAsDataURL(file);
      // event is triggered once the reading operation is successfully completed
      reader.onload = event => {
        this.imgURL = reader.result.toString();
        this.avatarChange.emit({file: this.imgURL, fileType: fileType});
      };
    }
  }

}
