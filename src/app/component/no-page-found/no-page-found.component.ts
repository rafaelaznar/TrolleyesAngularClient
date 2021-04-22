import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrls: ['./no-page-found.component.css']
})
export class NoPageFoundComponent implements OnInit {
  loading: boolean = false;
  constructor(private _location: Location) { }

  ngOnInit() {
  }

  goBack = () => this._location.back();

}
