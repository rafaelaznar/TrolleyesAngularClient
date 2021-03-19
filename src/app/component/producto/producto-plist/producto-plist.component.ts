import { Component, OnInit, ViewChild } from '@angular/core';
import { IPage, IProducto, Page, Producto } from 'src/app/model/model-interfaces';
import { ProductoService } from 'src/app/service/producto.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-producto-plist',
  templateUrl: './producto-plist.component.html',
  styleUrls: ['./producto-plist.component.css']
})

export class ProductsComponent implements OnInit {
  totalElements: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  page: IPage = new Page();
  Products: IProducto[] | undefined;
  columnas: string[] = ['id', 'nombre', 'codigo', 'precio', 'existencias', 'herramientas'];
  loading: boolean = false;

  //new MatTableDataSource(<IProducto> response);
  dataSource: MatTableDataSource<IProducto> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  //@ViewChild(MatSort) sort: MatSort | undefined;

  getPage = (pageNumber: number, rpp: number, filter: string | undefined = undefined) => {
    this.loading = true;
    this.productoService.getProductos(pageNumber, rpp, filter).subscribe((oPage: IPage) => {
      this.page = oPage;
      this.Products = oPage.content;
      this.totalElements = oPage['totalElements'];
      this.dataSource = new MatTableDataSource(oPage.content);
      //console.log(this.dataSource);   
      this.pageSize = oPage['size'];
      this.pageIndex = pageNumber;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    })
  }

  nextPage(event: PageEvent) {
    this.getPage(event.pageIndex, event.pageSize, this.strToFind);
  }

  constructor(private productoService: ProductoService, private router: Router, private _location: Location) {
    this.getPage(this.pageIndex, this.pageSize, this.strToFind);
  }

  ngOnInit() {
  }

  goToDetails(cod: number) {
    this.router.navigate(['/producto-detail/', cod]);
  }

  goBack() {
    this._location.back();
  }

  strToFind: string | undefined = undefined;
  onSubmitFindForm() {
    //console.log(this.strToFind);
    this.getPage(0, this.pageSize, this.strToFind);
  }

}
