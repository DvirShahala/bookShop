import { Component, OnInit } from '@angular/core';
import { BookAtt } from 'src/app/models/interfaces';
import { BooksService } from 'src/app/services/books/books.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itemsInCart: BookAtt[] = [];
  if_succses: boolean = false;

  constructor(private cartService: CartService,
    private bookService: BooksService) { }

  ngOnInit(): void {
    this.cartService.cartListChanges$.subscribe((res: BookAtt[]) => {
      this.itemsInCart = res;
    })
  }

  // Remove item from cart
  removeItem(book: BookAtt) {
    const tempList = this.itemsInCart.filter((item) => item.id !== book.id);
    this.cartService.setCartList(tempList);
  }

  // Purchase all book from carts
  purchaseBooks() {
    this.itemsInCart.forEach(item => {
      this.bookService.purchaseBook(item.id);
      this.removeItem(item);
    });
    this.if_succses = true;
  }

  // Add book to cart
  addToCart(book: BookAtt) {
    const currentCartList = this.cartService.getCartList();
    currentCartList.push(book);
    this.cartService.setCartList(currentCartList);
  }

}
