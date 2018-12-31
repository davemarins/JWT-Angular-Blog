import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-newarticle',
  templateUrl: './newarticle.component.html',
  styleUrls: ['./newarticle.component.css']
})

export class NewArticleComponent implements OnInit {

  public edited: boolean;

  public pubblicaForm = {
    title: null,
    description: null
  };

  public Editor = ClassicEditor;

  constructor(
    private modalService: NgbModal,
    private router: Router) { }

  openWindow(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.edited = false;
  }

  hasBeenEdited() {
    this.edited = true;
  }

  openModalIfEdited(content) {
    if (this.edited) {
      this.modalService.open(content);
    } else {
      this.router.navigateByUrl('/blog');
    }
  }

  publishThisArticle() {
    this.modalService.dismissAll();
  }

}
