import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-editarticle',
  templateUrl: './editarticle.component.html',
  styleUrls: ['./editarticle.component.css']
})
export class EditArticleComponent implements OnInit {

  public edited: boolean;

  public editForm = {
    title: null,
    description: null
  };

  public Editor = ClassicEditor;

  constructor(
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {
  }

  openWindow(content) {
    this.modalService.open(content);
  }

  openModalIfEdited(content) {
    if(this.edited) {
      this.modalService.open(content);
    } else {
      this.router.navigateByUrl('/blog');
    }
  }

  hasBeenEdited() {
    this.edited = true;
  }

  deleteArticle() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('/blog');
  }

}
