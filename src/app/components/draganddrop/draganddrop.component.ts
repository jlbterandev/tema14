import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { StorageService } from 'src/app/services/storage.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-draganddrop',
  templateUrl: './draganddrop.component.html',
  styleUrls: ['./draganddrop.component.css']
})
export class DraganddropComponent implements OnInit {

  constructor(private firestore: FirestoreService,  private storage: StorageService)
  {

  }
  fileName = '';
  file: File;
  item: Item;
  currentUrl: string;


  async ngOnInit()
  {
   this.getAllData();
  }

  getAllData()
  {
    this.firestore.getImagen().subscribe(
      (imagenes: Item[]) =>
      {
        this.item = imagenes[0];
        this.getCurrentImage();
      });

  }

  getCurrentImage()
  {
    console.log(this.item);
    this.storage.getImage(this.item.img).subscribe((url: string) => this.currentUrl = url);
    console.log(this.currentUrl);
  }

  public fileBrowseHandler(event: any)
  {
    this.file = event.target.files[0] as File;
    if(this.file)
    {
      this.fileName = this.file.name;
    }
  }

  actualizarImagen()
  {
    console.log(this.file);
    if (this.file)
    {
      console.log(this.file);

      let metadata = { name: this.file.name, size: this.file.size };

      this.storage.createImage(`images/${this.file.name}`, this.file, metadata);

      this.firestore.updateImageData(this.item.id, this.file.name);

      this.file =  new File([],'');

      this.getAllData();
    }
  }

  private delay(ms: number)
  {
  return new Promise(resolve => setTimeout(resolve, ms));
  }
}
