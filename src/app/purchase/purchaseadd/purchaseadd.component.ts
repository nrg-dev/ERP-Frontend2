import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-purchaseadd',
  templateUrl: './purchaseadd.component.html',
  styleUrls: ['./purchaseadd.component.css']
})
export class PurchaseaddComponent implements OnInit {
  user:User;
  model: any ={};
  headElements = ['#ID', 'Product Name', 'Category Name', 'Quantity'];

  constructor( public fb: FormBuilder,
    private cd: ChangeDetectorRef) { 

      this.model.purchaseOrdeData = [
        {id: 1, productname: '',category: '',quantity: 0},
        {id: 2, productname: '',category: '',quantity: 0},
        {id: 3, productname: '',category: '',quantity: 0},
        {id: 4, productname: '',category: '',quantity: 0},
        {id: 5, productname: '',category: '',quantity: 0},
        {id: 6, productname: '',category: '',quantity: 0},
        {id: 7, productname: '',category: '',quantity: 0},
        {id: 8, productname: '',category: '',quantity: 0},
        {id: 9, productname: '',category: '',quantity: 0},
  
      ];

    }
    submitted = false;
   
    // City names
    productList: any = ['Mobile', 'Computer', 'Cloths', 'TV'];
    categoryList: any = ['Electronic', 'Manufactorning', 'Institue', 'Mining'];

  //productForm = new FormGroup();

  ngOnInit() {
    /* Initiate the form structure */
    this.model.currentusername='';

   
  }

    /*##################### Registration Form #####################*/
    registrationForm = this.fb.group({
     // file: [null],
      /*fullName: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
        lastName: ['', [Validators.required]]
      }),

      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        cityName: ['', [Validators.required]]
      }),*/
      //gender: ['male'],
      //PasswordValidation: this.fb.group({
      //  password: ['', Validators.required],
      //  confirmPassword: ['', Validators.required]
      //},
      
     // {
       // validator: ValidatePassword.MatchPassword // your validation method
     // }
      //),
      addDynamicElement: this.fb.array([])
    })  
  
    /*########################## File Upload ########################*/
   // @ViewChild('fileInput') el: ElementRef;
    //imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    //editFile: boolean = true;
    //removeUpload: boolean = false;
  
  
   
    // Getter method to access formcontrols
    //get myForm() {
      //return this.registrationForm.controls;
   // }
    
    // Choose city using select dropdown
   // changeCity(e) {
     // this.registrationForm.get('address.cityName').setValue(e.target.value, {
     //   onlySelf: true
     // })
    //}
  
    /*############### Add Dynamic Elements ###############*/
    get addDynamicElement() {
      return this.registrationForm.get('addDynamicElement') as FormArray
    }
    selected=false;
    btnselected=false;
    addNew() {
      this.selected=true;
      this.btnselected=true;
      this.addDynamicElement.push(this.fb.control(''))
    }
  
    // Submit Registration Form
    onSubmit() {
      
      for (let entry of this.model.purchaseOrdeData) {
        console.log(entry.productname); // 1, "string", false
      

    }
alert("Successfully saved.")
   
    }

  
  
}
