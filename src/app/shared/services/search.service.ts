import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchValueSource = new BehaviorSubject<string>('');
  currentSearchValue = this.searchValueSource.asObservable();

  changeSearchValue(searchValue: string) {
    this.searchValueSource.next(searchValue);
  }
}
