import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Article } from 'src/app/Article';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-newarticle',
  templateUrl: './newarticle.component.html',
  styleUrls: ['./newarticle.component.css']
})

export class NewArticleComponent implements OnInit {

  public myArticles: Article[];
  public isDraft: boolean;
  public edited: boolean;
  public editorData: string;
  public title: string;
  public description: string;

  public Editor = ClassicEditor;

  public savedDraft: string;
  public some_error: string;
  public articlePublished: string;

  constructor(
    private jarwis: JarwisService,
    private modalService: NgbModal,
    private router: Router) { }

  initDataDraft(data) {
    this.myArticles = data;
    if (this.myArticles.length) {
      this.isDraft = true;
    } else {
      const temp = new Article(undefined, undefined, undefined, undefined, true, '<p>Ciao chiunque tu sia!<br>Buona scrittura ;)</p>');
      this.myArticles[0] = temp;
      this.isDraft = false;
    }
  }

  initErrorDraft(error) {
    this.some_error = error;
    this.editorData = '<p>Ciao chiunque tu sia!<br>Buona scrittura ;)</p>';
    this.isDraft = false;
  }

  ngOnInit() {
    this.edited = false;
    this.jarwis.getArticleDraft().subscribe(
      data => this.initDataDraft(data),
      error => this.initErrorDraft(error)
    );
    this.title = '[nessun titolo]';
    this.description = '[nessuna descrizione]';
  }

  openWindow(content) {
    this.modalService.open(content);
  }

  resetMessages() {
    this.savedDraft = null;
    this.articlePublished = null;
    this.some_error = null;
  }

  hasBeenEdited( { editor }: ChangeEvent ) {
    this.edited = true;
    this.resetMessages();
    this.myArticles[0].content = editor.getData();
  }

  openModalIfEdited(content) {
    if (this.edited) {
      this.modalService.open(content);
    } else {
      this.router.navigateByUrl('/blog');
    }
  }

  openModalDeleteDraft(content) {
    if (this.isDraft) {
      this.modalService.open(content);
    }
  }

  // Article publishing part

  handlingSendEmailSuccess(data) {
    this.articlePublished = 'Newsletter spedita con successo';
  }

  handlingSendEmailError(error) {
    this.some_error = 'C\'è stato un problema durante l\'invio della newsletter';
  }

  publishThisArticle() {
    const temp = this.myArticles[0];
    temp.description = this.description;
    temp.title = this.title;
    temp.draft = false;
    this.modalService.dismissAll();
    this.resetMessages();
    // To be edited
    this.jarwis.sendNewsletter(temp).subscribe(
      data => this.handlingSendEmailSuccess(data),
      error => this.handlingSendEmailError(error)
    );
    this.edited = false;
  }

  // Article Draft part

  handlingDraftSuccess(data) {
    this.savedDraft = 'Bozza salvata con successo';
  }

  handlingDraftError(error) {
    this.some_error = 'C\'è stato un problema durante il salvataggio della bozza';
  }

  saveDraft() {
    const temp = this.myArticles[0];
    this.jarwis.saveNewsletterDraft(temp).subscribe(
      data => this.handlingDraftSuccess(data),
      error => this.handlingDraftError(error)
    );
    this.resetMessages();
    this.edited = false;
    this.isDraft = true;
  }

  deleteDraftFromServer() {
    this.jarwis.deleteDraft().subscribe(
      data => this.savedDraft = 'Bozza eliminata con successo',
      error => this.some_error = 'C\'è stato un problema durante la cancellazione della bozza'
    );
    this.modalService.dismissAll();
    this.edited = false;
    this.router.navigateByUrl('/blog');
  }

}
