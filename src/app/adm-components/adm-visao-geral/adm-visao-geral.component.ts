import { Component, OnInit, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterOutlet } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
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
  selector: 'app-adm-visao-geral',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatTabsModule, NgApexchartsModule],
  templateUrl: './adm-visao-geral.component.html',
  styleUrl: './adm-visao-geral.component.css'
})
export class AdmVisaoGeralComponent implements OnInit {
  selected = 'geral';
  foods: Food[] = [
    {value: 'geral', viewValue: 'Geral'},
    {value: 'plantas', viewValue: 'Plantas'},
  ];

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
  
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  satisfacaoGPTW: number = 0;
  engageGPTW: number = 0;

  satisfacaoStiba: number = 0;
  engageStiba: number = 0;
 
 
  constructor(
    private router: Router,
    private apiConnectService: ApiconnectService
  ) {

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

  ngOnInit(): void {
    this.apiConnectService.getEngage().subscribe((response) => {
      if (response.body) {
        this.satisfacaoGPTW = response.body[1].trust_index;
        this.engageGPTW = response.body[1].engagement_percent;
      }
    });
    this.apiConnectService.getStiba().subscribe((response) => {
      if (response.body) {
        this.satisfacaoStiba = response.body[0].average_nota_stiba;
        this.engageStiba = response.body[0].avg_particip;
      }
    });

    this.apiConnectService.getCarsAll().subscribe((response) => {
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
