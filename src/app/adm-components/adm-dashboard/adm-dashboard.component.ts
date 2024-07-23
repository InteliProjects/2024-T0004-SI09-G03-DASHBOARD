import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterOutlet } from '@angular/router';
import { ChartistModule } from 'ng-chartist';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ApiconnectService } from '../../services/apiconnect.service';

export type ChartDetails = {
  title?: string;
  series: ChartSeries[];
  xaxis: ApexXAxis;
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title?: ApexTitleSubtitle;
};

export type ChartSeries = {
  name: string;
  data: number[];
};

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-adm-dashboard',
  standalone: true,
  imports: [
    ChartistModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    RouterOutlet,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    MatFormFieldModule,
    NgApexchartsModule,
  ],
  templateUrl: './adm-dashboard.component.html',
  styleUrl: './adm-dashboard.component.css',
})
export class AdmDashboardComponent implements OnInit {
  title = 'adm-dash';

  public try1: ChartSeries = {
    name: '',
    data: [],
  };
  public try2: ChartSeries = {
    name: '',
    data: [],
  };
  public try3: ChartSeries = {
    name: '',
    data: [],
  };

  ngOnInit(): void {
    this.apiConnectService.getPlants().subscribe((response) => {
      if (response.body) {
        this.totalDias = response.body[3].total_dias;
        this.totalAtestados = response.body[3].total_atestados;
      }
    });
    this.apiConnectService.getCars(this.selected).subscribe((response) => {
      if (response.body) {
        for (let i = 0; i < response.body.length; i += 3) {
          for (let j = 0; j < 3; j++) {
            const current = response.body[i + j];
            if (current) {
              if (current.descricao === 'ansiedade generalizada') {
                this.try1.data.push(current.quantidade_atestados);
                this.try1.name = current.descricao;
              } else if (
                current.descricao === 'transtorno misto ansioso e depressivo'
              ) {
                this.try2.data.push(current.quantidade_atestados);
                this.try2.name = current.descricao;
              } else {
                this.try3.data.push(current.quantidade_atestados);
                this.try3.name = current.descricao;

              }
            }
          }
        }

        this.chartOptions.series = [
          {
            data: this.try1.data,
            name: this.try1.name
          },
          {
            data: this.try2.data,
            name: this.try2.name
          },
          {
            data: this.try3.data,
            name: this.try3.name
          },
        ];
      }

      console.log(this.try1.data);

      return response.body;
    });
  }

  panelOpenState = false;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  selectedPlantValue: string = '';
  selectedPlantPerc: string = '';
  selectedPlantCode: string = '';

  totalDias: number = 0;
  totalAtestados: number = 0;

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  // public chartSeries1: Partial<ChartSeries>;
  // public chartSeries2: Partial<ChartSeries>;
  // public chartSeries3: Partial<ChartSeries>;

  foods: Food[] = [
    { value: 'ANC', viewValue: 'Anchieta' },
    { value: 'TBT', viewValue: 'Taubaté' },
    { value: 'SJP', viewValue: 'Curitiba' },
    { value: 'SCA', viewValue: 'São Carlos' },
  ];

  selected = 'ANC';

  setSelected() {
    this.try1.data = [];
    this.try2.data = [];
    this.try3.data = [];

    this.apiConnectService.getPlants().subscribe((response) => {
      console.log(response.body);
      if (response.body) {
        if (this.selected === 'ANC') {
          this.totalDias = response.body[3].total_dias;
          this.totalAtestados = response.body[3].total_atestados;
        }
        if (this.selected === 'SCA') {
          this.totalDias = response.body[2].total_dias;
          this.totalAtestados = response.body[2].total_atestados;
        }
        if (this.selected === 'TBT') {
          this.totalDias = response.body[1].total_dias;
          this.totalAtestados = response.body[1].total_atestados;
        }
        if (this.selected === 'SJP') {
          this.totalDias = response.body[0].total_dias;
          this.totalAtestados = response.body[0].total_atestados;
        }
      }
    });

    this.apiConnectService.getCars(this.selected).subscribe((response) => {
      if (response.body) {
        for (let i = 0; i < response.body.length; i += 3) {
          for (let j = 0; j < 3; j++) {
            const current = response.body[i + j];
            if (current) {
              if (current.descricao === 'ansiedade generalizada') {
                this.try1.data?.push(current.quantidade_atestados);
                this.try1.name = current.descricao;
              } else if (
                current.descricao === 'transtorno misto ansioso e depressivo'
              ) {
                this.try2.data?.push(current.quantidade_atestados);
                this.try2.name = current.descricao;
              } else {
                this.try3.data?.push(current.quantidade_atestados);
                this.try3.name = current.descricao;
              }
            }
          }
        }
      }

      if (this.try3.data.length > 0) {
      this.chartOptions.series = [
        {
          data: this.try1.data,
          name: this.try1.name
        },
        {
          data: this.try2.data,
          name: this.try2.name
        },
        {
          data: this.try3.data,
          name: this.try3.name
        },
      ];
    } else 
      this.chartOptions.series = [
        {
          data: this.try1.data,
          name: this.try1.name
        },
        {
          data: this.try2.data,
          name: this.try2.name
        },
        {
          data: [],
          name: ''
        },
      ];

      return response.body;
    });
  }

  constructor(
    private _formBuilder: FormBuilder,
    private apiConnectService: ApiconnectService
  ) {
    this.selectedPlantValue = '11';
    this.selectedPlantPerc = '11%';
    this.totalDias = 0;
    this.totalAtestados = 0;

    this.chartOptions = {
      series: [
        {
          name: 'Ansiedade generalizada',
          data: [],
          // data: this.try1.data,
          color: '#CC00FF',
        },
        {
          name: 'Transtorno misto ansioso e depressivo',
          data: [],
          color: '#6D6AFF',
        },
        {
          name: 'Transtornos de adaptação',
          data: [],
          color: '#00E096',
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };
  }
}
