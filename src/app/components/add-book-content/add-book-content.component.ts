import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookAtt } from 'src/app/models/interfaces';
import { BooksService } from 'src/app/services/books/books.service';

@Component({
  selector: 'app-add-book-content',
  templateUrl: './add-book-content.component.html',
  styleUrls: ['./add-book-content.component.scss']
})
export class AddBookContentComponent implements OnInit {
  formGroup: FormGroup;
  messageForAdd: string = "";

  constructor(private formBuilder: FormBuilder,
    private bookService: BooksService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'book': [null, [Validators.required]],
      'author': [null, [Validators.required]],
      'publisher': [null, [Validators.required]],
      'cover': [null],
      'price': [null]
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

  // Add new book
  async addBook(newBookVal: BookAtt) {
    await this.bookService.createBook(newBookVal)
      .then(newBook => {
        this.messageForAdd = "Add sucssefuly";
        this.bookService.addBookToList(newBook);
      })
      .catch(err => {
        console.log(err);

        err.error.errors.forEach(errMsg => {
          this.messageForAdd = errMsg.message;
        });
      })
  }
}
