import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from '../interfaces/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) {}
  createTour(tour: Tour): Observable<any> {
    return this.http.post('http://localhost:4500/tours/create', tour);
  }

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('http://localhost:4500/tours/all', {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  deleteTour(tourID: string): Observable<any> {
    return this.http.delete(`http://localhost:4500/tours/${tourID}`)
   
  }
}