import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterOutlet } from '@angular/router';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-visao-geral',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './visao-geral.component.html',
  styleUrl: './visao-geral.component.css'
})

export class VisaoGeralComponent {
  selected = 'geral';
  foods: Food[] = [
    {value: 'geral', viewValue: 'Geral'},
    {value: 'plantas', viewValue: 'Plantas'},
  ];

  constructor(private router: Router) {}

  setSelected() {
    console.log(this.selected)
    if (this.selected === 'plantas') {
      this.router.navigate(['/about/adm-vision/adm-plantas']);
    } 
    else if (this.selected === 'geral') {
      this.router.navigate(['/about/adm-vision/adm-geral']);
    }
  }
}
