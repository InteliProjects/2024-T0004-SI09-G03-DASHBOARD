import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { environment } from './environment';
import { ApiconnectService } from './services/apiconnect.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgApexchartsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  apiUrl: string | undefined;
  title = 'parati-front';

  constructor(private router: Router, private apiConnectService: ApiconnectService) {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit(): void {
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }
}
