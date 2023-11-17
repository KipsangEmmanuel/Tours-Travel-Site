import { Component, OnInit } from '@angular/core';
import { Tour } from '../interfaces/tour';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  tours: Tour[] = [];
  bookedTours: Tour[] = [];

  constructor(private tourService: TourService) { }

  ngOnInit() {
    this.getTours();
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

  bookTour(tour: Tour) {
    const index = this.tours.indexOf(tour);
    if (index !== -1) {
      this.tours.splice(index, 1); // Remove from available tours
      this.bookedTours.push(tour); // Add to booked tours
    }
  }

  cancelBooking(tour: Tour) {
    const index = this.bookedTours.indexOf(tour);
    if (index !== -1) {
      this.bookedTours.splice(index, 1); // Remove from booked tours
      this.tours.push(tour); // Add back to available tours
    }
  }
}
