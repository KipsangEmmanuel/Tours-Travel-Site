import { Component, OnInit } from '@angular/core';
import { Tour } from '../interfaces/tour';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  tours!:Tour[]

  constructor(private tourService:TourService){}

  ngOnInit(){
    this.getTours()
  }

  getTours() {
    this.tourService.getTours().subscribe(
      (response) => {
        this.tours = response;
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }


}
