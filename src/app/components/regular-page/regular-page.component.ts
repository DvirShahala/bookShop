import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookAtt, CurrentUser } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BooksService } from 'src/app/services/books/books.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { UpdateBookContentComponent } from '../update-book-content/update-book-content.component';


@Component({
  selector: 'app-regular-page',
  templateUrl: './regular-page.component.html',
  styleUrls: ['./regular-page.component.scss']
})
export class RegularPageComponent implements OnInit {
  listOfBooks: BookAtt[];
  purchaseBooks: BookAtt[];
  if_selectBook: boolean = false;
  selectBookToShow: BookAtt;
  if_admin: boolean = false;
  currentU: CurrentUser = null;

  constructor(private bookService: BooksService,
    private authService: AuthService,
    private cartService: CartService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getBooks();
    this.bookService.booksListChanges$.subscribe((res: BookAtt[]) => {
      this.listOfBooks = res;
    })  
  }

  // Get the current user ans check if admin
  async getCurrentUser() {
    try {
      const user = await this.authService.currentUser();
      this.currentU = user;
      this.if_admin = this.currentU.admin;
    } catch (err) {
      console.error(err);
    }
  }

  // Get list of books
  async getBooks() {
    this.listOfBooks = await this.bookService.getBooks();
    this.bookService.setBooksList(this.listOfBooks);
    this.purchaseBooks = await this.bookService.getPurchaseBook();
  }

  // Check if purchased the book
  isPurchased(bookId: string): boolean {
    return Boolean(this.purchaseBooks.find(book => book.id == bookId));
  }

  // Add to cart a book
  addToCart(book: BookAtt) {
    this.cartService.addToCart(book);
  }

  isBookInCart(book: BookAtt): boolean {
    return this.cartService.isExist(book);
  }

  // Delete book
  deleteBook(bookId: string) {
    this.bookService.deleteBook(bookId);
    const tempList = this.listOfBooks.filter((book) => book.id !== bookId);
    this.bookService.setBooksList(tempList);
  }

  // Update book
  updateBook(book: BookAtt) {
    this.bookService.setBookUpdate(book);
    const dialogRef = this.dialog.open(UpdateBookContentComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
