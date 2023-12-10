import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnDestroy {
  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.loadingSubscription = this.loadingService.loading$.subscribe(
      (status: boolean) => {
        this.loading = status;
      }
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
