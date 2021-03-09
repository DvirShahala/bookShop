import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { BooksService } from 'src/app/services/books/books.service';
import { FormControl } from '@angular/forms';
import { BookAtt, CurrentUser } from '../../models/interfaces';
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
  ifAdmin: boolean = false;

  constructor(private bookService: BooksService,
    private authService: AuthService,
    private cartService: CartService,
    private rouetr: Router,
    public dialog: MatDialog) { }

  // It is not secure but for the maim purpose I checked from localstorage
  ngOnInit(): void {

    if (localStorage.getItem("userId") && !this.authService.getCurrentUserId()) {
      // After refresh we set again the behaviour subject value
      this.authService.setCurrentUserId(localStorage.getItem("userId"))
    }
    if (localStorage.getItem("admin") && !this.authService.getAdminStatus()) {
      this.authService.setCurrentAdminStatus(Boolean(localStorage.getItem("admin")));
    }
    this.authService.adminStatus$.subscribe((admin: boolean) => {

      this.ifAdmin = admin;
    })

    this.authService.currentUserId$.subscribe((currUserId: string) => {
      if (currUserId != null) {
        this.isLogin = true;
        console.log(Boolean(localStorage.getItem("admin")));
      } else {
        this.isLogin = false;
      }
    })
    this.cartService.cartListChanges$.subscribe((res: BookAtt[]) => {
      if (res != null) {
        this.numOfItems = res.length;
      }
    })
  }

  async onKeyUp(bookName) {
    if (bookName.length >= 3) {
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
    this.authService.setCurrentUserId(null);
    this.authService.setCurrentAdminStatus(null);
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
