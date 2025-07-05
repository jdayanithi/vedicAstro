import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/service/post.service';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../AngularMaterialModule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class ViewAllComponent {

  allPosts:any;

  constructor(private postService: PostService,
    private snackBar: MatSnackBar){}

    ngOnInit(){
      this.getAllPosts();
    }

    getAllPosts(){
      this.postService.getAllPosts().subscribe(res =>{
        console.log(res);
        this.allPosts = res;
      }, error=>{
        this.snackBar.open("Something Went Wrong!!!!", "Ok")
      })
    }

}
