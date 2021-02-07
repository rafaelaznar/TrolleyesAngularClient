import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public title: string | undefined;
  public message: string | undefined;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {

  }

  ngOnInit(): void {
  }

}
