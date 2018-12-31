import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
import { Subscriber } from 'src/app/subscriber';

@Component({
  selector: 'app-newsletter',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  public mySubscribers: Subscriber[];
  public totalSubscribers: number;

  // ChartJS part

  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];

  public lineChartLabels: Array<any> = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio',
  'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  public lineChartLabelsWeek: Array<any> = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì',
  'Venerdì', 'Sabato', 'Domenica'];

  public lineChartOptions: any = {
    responsive: true
  };

  // public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private jarwis: JarwisService) { }

  ngOnInit() {
    this.jarwis.getSubscribers().subscribe(
      data => this.initSubscribers(data),
      error => console.log(error)
    );
  }

  initSubscribers(data) {
    this.mySubscribers = data;
    this.totalSubscribers = this.mySubscribers.length;
  }

  changeAxis() {
    console.log('Cambia ascissa - Day; Week; Month; Day; ...');
  }

}
