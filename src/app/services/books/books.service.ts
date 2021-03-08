import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BookAtt } from '../../models/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  booksListChanges$: BehaviorSubject<BookAtt[]> = new BehaviorSubject<BookAtt[]>(null);
  private bookToUpdate: BookAtt;
  
  constructor(private http: HttpClient) { }


  getBooksList(): BookAtt[] {
    return this.booksListChanges$.value;
  }

  setBooksList(bookList: BookAtt[]) {
    this.booksListChanges$.next(bookList);
  }

  addBookToList(book:BookAtt) {
    let currentBookList = this.getBooksList();
    currentBookList.push(book);
    this.setBooksList(currentBookList);
  }

  getBookUpdate(): BookAtt {
    return this.bookToUpdate;
  }

  setBookUpdate(book: BookAtt) {
    this.bookToUpdate = book;
  }


  // DB // 

  // Get books
  getBooks(): Promise<BookAtt[]> {
    return this.http.get<BookAtt[]>(`${environment.BE_ENDPOINT}/api/books`, { withCredentials: true }).toPromise();
  }

  // Get purchase book
  getPurchaseBook(): Promise<BookAtt[]> {
    return this.http.get<BookAtt[]>(`${environment.BE_ENDPOINT}/api/books/purchase`, { withCredentials: true }).toPromise();
  }

  // Search book
  searchBooks(book): Promise<BookAtt> {
    const httpOptions = {
      withCredentials: true,
      params: new HttpParams()
        .set('book', book)
    }
    return this.http.get<BookAtt>(`${environment.BE_ENDPOINT}/api/books`, httpOptions).toPromise();
  }

  // Create book
  createBook(book: BookAtt) {
    return this.http.post<BookAtt>(`${environment.BE_ENDPOINT}/api/books/create`, book, { withCredentials: true }).toPromise();
  }

  // Purchase book
  purchaseBook(bookId: string): Promise<BookAtt> {
    return this.http.post<BookAtt>(`${environment.BE_ENDPOINT}/api/books/purchase`, { "bookId": bookId }, { withCredentials: true }).toPromise();
  }

  // Delete book
  deleteBook(bookId: string): Promise<any> {
    return this.http.delete<any>(`${environment.BE_ENDPOINT}/api/books/${bookId}`, { withCredentials: true }).toPromise();
  }

  // Update book
  updateBook(book: any): Promise<any> {
    return this.http.patch<any>(`${environment.BE_ENDPOINT}/api/books`, book, { withCredentials: true }).toPromise();
  }
}
