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
    return this.http.post('http://localhost:9500/tour/', tour);
    
  }

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('http://localhost:9500/tour/', {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  deleteTour(tour_id: string): Observable<any> {
    return this.http.delete(`http://localhost:9500/tour/${tour_id}`)
   
  }
}