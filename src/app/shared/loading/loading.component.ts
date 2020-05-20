import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoadingService } from './loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    loading$: Observable<string>;

    constructor(
       private loaginService: LoadingService
    ) { }

    ngOnInit(): void {
        this.loading$ = this.loaginService
                            .getLoading()
                            .pipe(map(Loading => Loading.valueOf()));
    }
}