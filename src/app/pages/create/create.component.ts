import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/interfaces/product.interface';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {

  productForm!: FormGroup;
  productId:string = '';
  product!:Product;

  constructor(private fb: FormBuilder,
              private productService:ProductService,
              private activatedRoute:ActivatedRoute,
              private helperService:HelpersService
              ) {}

  ngOnInit(): void {
    this.initForm();
    this.getProductIdByUrl();
  }

  initForm(){
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(10)]],
      name: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required,this.dateReleaseValidator]],
      date_revision: ['', [Validators.required]],
    });
  }

  getProductIdByUrl(){
    this.productId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if(this.productId !== ''){

      this.productForm.get('id')?.disable();

      this.getProductById();
    }
  }

  getProductById(){
    this.productService.getProductById(this.productId).subscribe((data:Product) => {
      this.product = data;
      this.setForm();
    })
  }

  setForm(){
   this.productForm.patchValue({
    ...this.product
   })
  }

  dateReleaseValidator(control:FormControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      return { invalidDate: true };
    }
    return null;
  }

  dateRevisionValidator(control:FormControl) {
    const selectedDate = new Date(control.value);
    const releaseDate = new Date(this.productForm.get('date_release')?.value);

    const oneYearAfterRelease = new Date(releaseDate);
    oneYearAfterRelease.setFullYear(oneYearAfterRelease.getFullYear() + 1);

    if (selectedDate.getTime() !== oneYearAfterRelease.getTime()) {
      return { invalidRevisionDate: true };
    }
    return null;
  }

  invalidFormControl(field:string){
    return this.productForm.controls[field].invalid &&
    (this.productForm.controls[field].dirty ||
      this.productForm.controls[field].touched)
  }

  onSubmit() {
    const product = this.productForm.getRawValue();

    if (this.productForm.invalid) {
      this.helperService.showAlert("Formulario Invalido", "Completa todos los campos", "warning");
      return;
    }

    this.productService.saveProduct(product, this.productId).subscribe({
      next: (data) => {
        if (this.productId !== '') {
          this.helperService.showAlert("Producto Actualizado", "Proceso realizado satisfactoriamente", "success");
        } else {
          this.helperService.showAlert("Producto Creado", "Proceso realizado satisfactoriamente", "success");
          this.clearForm();
        }
      },
      error: (error) => {
        this.helperService.showAlert("Error", "Ha ocurrido un error al Crear o Actualizar Producto", "error");
      }
    });
  }


  clearForm() {
    this.productForm.reset();
  }

}
