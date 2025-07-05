import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/service/post.service';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../AngularMaterialModule';
import { RouterModule } from '@angular/router';
import { OnPushHelperService, StateManager } from '../../services/onpush-helper.service';

interface ViewAllState {
  allPosts: any[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class ViewAllComponent implements OnInit {

  stateManager: StateManager<ViewAllState>;

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private onPushHelper: OnPushHelperService
  ) {
    this.stateManager = this.onPushHelper.createStateManager<ViewAllState>(
      { allPosts: [] },
      this.cdr
    );
  }

  get allPosts() {
    return this.stateManager.currentState.allPosts;
  }

  get isLoading() {
    return this.stateManager.isLoading;
  }

  ngOnInit() {
    this.getAllPosts();
  }

  async getAllPosts() {
    await this.stateManager.executeAsync(
      () => this.postService.getAllPosts().toPromise(),
      (res) => {
        console.log(res);
        this.stateManager.patchState({ allPosts: res });
      },
      (error) => {
        this.snackBar.open("Something Went Wrong!!!!", "Ok");
      }
    );
  }
}

