import { Component, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import * as _ from 'lodash';
import { BooksService } from 'src/app/services/books/books.service';
import { FormControl } from '@angular/forms';
import { BookAtt } from '../../models/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddBookContentComponent } from '../add-book-content/add-book-content.component';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  myControl = new FormControl();
  books: BookAtt;
  numOfItems: number = 0;
  itemsInCart: BookAtt[] = [];
  isLogin: boolean = false;
  ifAdmin: boolean = false

  constructor(private bookService: BooksService,
    private authService: AuthService,
    private cartService: CartService,
    private rouetr: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if (localStorage.getItem("userId")) {
      this.isLogin = true;
    }
    if (localStorage.getItem("admin")) {
      this.ifAdmin = true;
    }
    this.cartService.cartListChanges$.subscribe((res: BookAtt[]) => {
      if (res != null) {
        this.numOfItems = res.length;
      }
    })
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   this.isLogin = !this.isLogin;
  // }

  async onKeyup(event) {
    console.log(event);
    if (event.length >= 3) {
      this.debouncedGetCitities(event);
    }
  }
  debouncedGetCitities = _.debounce(params => this.searchBooks(params), 400);

  // Search book
  async searchBooks(namePrefix: string) {
    this.books = await this.bookService.searchBooks(namePrefix);
  }

  // Logout
  async logOut() {
    await this.authService.signOut();
    localStorage.clear();
    this.rouetr.navigate(['login']);
    this.cartService.clearCartList();
    this.numOfItems = 0;
  }

  // Add new book dialog
  addNewBook() {
    const dialogRef = this.dialog.open(AddBookContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
