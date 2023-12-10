import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-template',
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.css']
})
export class ViewTemplateComponent implements OnInit {

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(['/']);
  }

}
