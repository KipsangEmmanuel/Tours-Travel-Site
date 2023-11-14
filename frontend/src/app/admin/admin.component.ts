import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tour } from 'src/app/interfaces/tour';
import { UserDetails } from 'src/app/interfaces/user';
import { TourService } from 'src/app/services/tour.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  visible = true
  // notVisible=false
  loggedIn=true

  createTourForm!: FormGroup
  // isFormVisible: boolean = false; 
  tours!: Tour[];
  users!: UserDetails[];
  // visible:boolean = true
 
  constructor(private tourService: TourService, private formBuilder:FormBuilder,private router: Router, private userService:UserService ){

    this.createTourForm=this.formBuilder.group({
      tour_name:['',[Validators.required]], 
      tour_description: ['',[Validators.required]],
      start_date: ['',[Validators.required]],
      end_date: ['',[Validators.required]],
      price: ['',[Validators.required]]
    })

  }



  ngOnInit() {
    this.getTours();
    // this.getUsers();
    
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

  createTour() {
    let createTour: Tour = this.createTourForm.value;
    console.log(createTour);
    
    this.tourService.createTour(createTour).subscribe(
      () => {
        this.getTours();
        console.log('Tours created successfully');
      },
      (error) => {
        console.error('Error creating tours:', error);
      }
    );

    this.router.navigate(['admin']);
  }


  // getUsers() {
  //   this.userService.getUsers().subscribe(
  //     (response: UserDetails[]) => {
  //       this.users = response;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching users:', error);
  //     }
  //   );
  // }

  loadTours(): void {
    this.tourService.getTours().subscribe(
      (tours) => {
        this.tours = tours;
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }

  deleteTour(tourID: string): void {
    // alert('Are you sure!')
    this.tourService.deleteTour(tourID).subscribe(
      () => {
        this.loadTours();
      },
      (error) => {
        console.error('Error deleting Tour:', error);
      }
    );
  }

  
}