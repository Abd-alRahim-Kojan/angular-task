import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(users: any[], searchInput: number): any[] {
    if (!searchInput) {
      return [];
    }
    searchInput = searchInput;
    return users.find((x) => x.includes(searchInput));
  }
}
