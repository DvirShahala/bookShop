import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookAtt } from 'src/app/models/interfaces';
import { BooksService } from 'src/app/services/books/books.service';

@Component({
  selector: 'app-update-book-content',
  templateUrl: './update-book-content.component.html',
  styleUrls: ['./update-book-content.component.scss']
})
export class UpdateBookContentComponent implements OnInit {
  formGroup: FormGroup;
  bookToUpdate: BookAtt;
  messageForUpdate: string = "";

  constructor(private bookService: BooksService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.bookToUpdate = this.bookService.getBookUpdate();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'book': [null, [Validators.required]],
      'author': [null, [Validators.required]],
      'publisher': [null, [Validators.required]]
    });
  }

  getErrorBook() {
    return this.formGroup.get('book').hasError('required') ? 'Book name is required' : '';
  }
  getErrorAuthor() {
    return this.formGroup.get('author').hasError('required') ? 'Author name is required' : '';
  }
  getErrorPublisher() {
    return this.formGroup.get('publisher').hasError('required') ? 'Publisher name is required' : '';
  }

  updateBook(bookId: string, newValue) {
    const updatedBook = { "id": bookId, "book": newValue.book, "author": newValue.author, "publisher": newValue.publisher };
    this.bookService.updateBook(updatedBook)
      .then(updateBook => {
        this.messageForUpdate = "Update sucssefuly";
        this.bookService.getBooks().then(val => {
          this.bookService.setBooksList(val);
        })
      })
      .catch(err => {
        console.error(err);
        err.error.errors.forEach(errMsg => {
          this.messageForUpdate = errMsg.message;
        });
      })
  }
}
