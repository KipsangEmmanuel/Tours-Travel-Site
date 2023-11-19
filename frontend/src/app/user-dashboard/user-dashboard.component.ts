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
    this.loadBookedTours();
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
      this.tours.splice(index, 1); 
      this.bookedTours.push(tour); 
      this.saveBookedTours();
    }
  }

  cancelBooking(tour: Tour) {
    const index = this.bookedTours.indexOf(tour);
    if (index !== -1) {
      this.bookedTours.splice(index, 1); 
      this.tours.push(tour); 
      this.saveBookedTours();
    }
  }

  private loadBookedTours() {
    const storedBookedTours = localStorage.getItem('bookedTours');
    if (storedBookedTours) {
      this.bookedTours = JSON.parse(storedBookedTours);
    }
  }

  private saveBookedTours() {
    localStorage.setItem('bookedTours', JSON.stringify(this.bookedTours));
  }
}
