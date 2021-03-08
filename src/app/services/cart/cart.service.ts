import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookAtt } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartListChanges$: BehaviorSubject<BookAtt[]> = new BehaviorSubject<BookAtt[]>(null);

  constructor() { }

  getCartList(): BookAtt[] {
    if (this.cartListChanges$.value == null) {
      return [];
    }
    return this.cartListChanges$.value;
  }

  setCartList(bookList: BookAtt[]) {
    this.cartListChanges$.next(bookList);
  }

  clearCartList() {
    this.cartListChanges$.next(null);
  }

  addToCart(book: BookAtt) {
    let currentCartList = this.getCartList();
    currentCartList.push(book);
    this.setCartList(currentCartList);
  }

  // Check if book in cart
  isExist(book: BookAtt): boolean {
    if (this.cartListChanges$.value == null) {
      return false;
    } else {
      if (this.cartListChanges$.value.indexOf(book) != -1) {
        return true;
      }
    }
    return false;
  }
}
