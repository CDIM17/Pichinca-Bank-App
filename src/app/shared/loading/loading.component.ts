import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  isLoading$ = false;
  constructor(private _loadingService: LoadingService) {}
  ngOnInit(): void {
    this._loadingService.isLoading$.subscribe((x) => (this.isLoading$ = x));
  }
}
