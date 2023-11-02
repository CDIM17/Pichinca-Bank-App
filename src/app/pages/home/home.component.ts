import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/interfaces/product.interface';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  products!:Product[];
  filteredProducts!: Product[];
  searchTerm: string = '';

  constructor(private productService:ProductService,
             private router:Router,
             private helperService:HelpersService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (error) => {
        this.helperService.showAlert("Error", "Ha ocurrido un error para listar los archivos", "warning");
      },
    });

  }

  navigateToEditProduct(id:string){
    this.router.navigateByUrl(`/edit/${id}`)
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        this.helperService.showAlert("Producto Eliminado", "Proceso realizado exitosamente", "success");
      },
      error: (error) => {
        this.helperService.showAlert("Producto Eliminado", "Proceso realizado exitosamente", "success");
      }
    });
  }


  onSearchChange() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      || product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
