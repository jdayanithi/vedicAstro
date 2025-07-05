import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/service/post.service';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../AngularMaterialModule';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class SearchByNameComponent {

  result:any= [];
  name:any = "";

  constructor(private postService: PostService,
    private snackBar: MatSnackBar){}


    searchByName(){
      this.postService.searchByName(this.name).subscribe(res=>{
        this.result = res;
        console.log(this.result);
      },error=>{
        this.snackBar.open("Something Went Wrong!!!!", "Ok")
      })
    }

}
