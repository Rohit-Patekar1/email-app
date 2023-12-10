import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  message: string = '';
  type: 'success' | 'error' = 'success';
  show: boolean = false;

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.snackbarService.snackbarState.subscribe((state) => {
      this.message = state.message;
      this.type = state.type;
      this.show = state.show;

      if (state.show) {
        setTimeout(() => this.show = false, 4000); // hide after 4 seconds
      }
    });
  }
}
