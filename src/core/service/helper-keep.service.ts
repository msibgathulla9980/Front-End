import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HelperKeepService {
  public theme$: Subject<any> = new Subject();
  public search$: Subject<any> = new Subject();

  constructor( ) { }
  public setTheme(themeChanged: boolean) {
    this.theme$.next(themeChanged);
  }

  public getTheme() {
    return this.theme$;
  }

  public setSearch(search: string) {
    this.search$.next(search);
  }

  public getSearch() {
    return this.search$;
  }
}
