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

  updateTourVisible = false;
  updateTourForm!: FormGroup;
  selectedTour: Tour | null = null;

  editTourForm: FormGroup;
  isEditModalVisible: boolean = false;

  

 
  constructor(
    private tourService: TourService,
    private formBuilder:FormBuilder,
    private router: Router, 
    private userService:UserService 
    ){

    this.createTourForm=this.formBuilder.group({
      tour_name:['',[Validators.required]], 
      tour_description: ['',[Validators.required]],
      start_date: ['',[Validators.required]],
      end_date: ['',[Validators.required]],
      price: ['',[Validators.required]]
    });

    this.editTourForm = this.formBuilder.group({
      tour_name: ['', Validators.required],
      tour_description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      price: ['', Validators.required]
    });

  }


  openEditTourModal(tour: Tour) {
    this.selectedTour = tour;
    this.editTourForm.patchValue({
      tour_name: tour.tour_name,
      tour_description: tour.tour_description,
      start_date: tour.start_date,
      end_date: tour.end_date,
      price: tour.price
    });
    this.isEditModalVisible = true;
  }

  closeEditTourModal() {
    this.isEditModalVisible = false;
  }


  saveChanges() {
    if (this.selectedTour) {
      // Implement logic to update the tour details using TourService
      this.tourService.updateTour(this.selectedTour.tour_id, this.editTourForm.value).subscribe(
        () => {
          this.getTours();
          console.log('Tour updated successfully');
        },
        (error: any) => {
          console.error('Error updating tour:', error);
        }
      );
      this.closeEditTourModal();
    }
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


