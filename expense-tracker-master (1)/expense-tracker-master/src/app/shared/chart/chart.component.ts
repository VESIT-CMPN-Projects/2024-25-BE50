import { Component, Input } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import {
  AgChartOptions,
  AgCharts,
  AgChartSubtitleOptions,
} from 'ag-charts-community';
import { color } from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  public options: any;
  @Input() data: any;
  @Input() parameter1!: string; // this is the type of parameter on which chart will be made
  @Input() parameter2!: string; // this is the quantity of parameter on which chart will be made
  ngOnInit(): void {
    console.log(this.data + ' ' + this.parameter1 + ' ' + this.parameter2);

    this.options = {
      title: { text: 'Expense Chart' } as AgChartOptions,
      subtitle: {
        text:
          'This Chart will show u the relation ' +
          this.parameter1 +
          ' and ' +
          this.parameter2,
      } as AgChartSubtitleOptions,
      data: this.data,
      series: [
        {
          type: 'donut',
          calloutLabelKey: this.parameter1,
          angleKey: this.parameter2,
          innerRadiusRatio: 0.5,
          innerLabels: [
            {
              text: 'Total expense is ' + this.getTotalSum(),
              fontWeight: 'bold',
              color: 'black',
            },
          ],
        },
      ],
      // Axes: Configure the axes for the chart

      // Legend: Matches visual elements to their corresponding series or data categories.
    };
  }
  getTotalSum(): number {
    let sum = 0;
    this.data.forEach((element: any) => {
      sum += element[this.parameter2];
    });
    return sum;
  }

  constructor() {}
}
