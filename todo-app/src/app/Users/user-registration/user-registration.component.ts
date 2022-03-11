import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { api_url } from 'src/app/Models/global-url.model';
import { Users } from 'src/app/Models/users.model';
import { CountryStateCityService } from 'src/app/Services/country-state-city.service';
import { UsersService } from 'src/app/Services/users.service';
import { bootstrap,Modal } from 'bootstrap'
import { ResponseFromServer } from 'src/app/Models/response.model';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  user: Users;
  form: FormGroup;
  profile_image :File;
  countryList:any;
  stateList:any;
  cityList:any;
  user_data: any;
  loading:boolean = false;
  isSubmitted: boolean = false;
  response_from_server = new ResponseFromServer();
  imagePicker(e) {
    this.profile_image = e.target.files[0];
    //console.log(this.profile_image);
  }
  @ViewChild('filePicker')
  myInputVariable: ElementRef;
  constructor(
              private route : ActivatedRoute,
              private userService: UsersService,
              private countryStateCityService: CountryStateCityService
            ) { }

  ngOnInit(): void {

    this.getAllCountry();

    this.form = new FormGroup({
      TUM_First_Name:new FormControl(null,{
        validators:[Validators.required,Validators.min(3)]
      }),
      TUM_Last_Name: new FormControl(null,{
        validators:[Validators.required,Validators.min(3)]
      }),
      TUM_Gender: new FormControl(null, {
        validators:[Validators.required]
      }),
      TUM_Email: new FormControl(null, {
        validators:[Validators.required]
      }),
      TUM_Password: new FormControl(null, {
        validators:[Validators.required]
      }),
      TUM_Mobile: new FormControl(null, {
        validators:[Validators.required]
      }),
      TUM_Country: new FormControl(null, {
        validators:[Validators.required]
      }),
      TUM_State: new FormControl(null, {
       // validators:[Validators.required]
      }),
      TUM_City: new FormControl(null, {
        //validators:[Validators.required]
      }),
      TUM_Profile_Pic: new FormControl(null, {

      })

    });


  }

  saveUser() {


    if(this.form.invalid) {
      this.isSubmitted= true;
      console.log("There are some error in form input, which failed the validator");
      return;
    } else {
      this.loading = true;
    }
    const fd = new FormData();
    fd.append('TUM_First_Name',this.form.value.TUM_First_Name);
    fd.append('TUM_Last_Name',this.form.value.TUM_Last_Name);
    fd.append('TUM_Gender',this.form.value.TUM_Gender);
    fd.append('TUM_Mobile',this.form.value.TUM_Mobile);
    fd.append('TUM_Email',this.form.value.TUM_Email);
    fd.append('TUM_Country',this.form.value.TUM_Country);
    fd.append('TUM_State',this.form.value.TUM_State);
    fd.append('TUM_City',this.form.value.TUM_City);
    fd.append('TUM_Password',this.form.value.TUM_Password);

    if(this.profile_image){
      fd.append('TUM_Profile_Pic',this.profile_image,this.profile_image.name);

    }
    //console.log(fd);
    this.userService.registerNewUser(fd).subscribe((data: ResponseFromServer) => {

      this.response_from_server = data;

      //console.log(this.response_from_server.response)
      var myModal = new Modal(document.getElementById('myModal'));
      myModal.show();
      if(this.response_from_server.response == 'success'){
        //console.log("Form will reset");
        this.form.reset();
        this.myInputVariable.nativeElement.value = "";
        //(document.getElementById('filePicker') as HTMLInputElement).value = "";
      }
    });
    this.isSubmitted= false;
    this.loading = false;

  }
  getAllCountry() {
    this.countryStateCityService.getAllCountries().subscribe(result => {
      this.countryList = result;
      //console.log(this.countryList);
    });

  }

  getAllStates(e: Event) {
    var country  = (e.target as HTMLInputElement).value;
    this.countryStateCityService.getAllStates(country).subscribe(result => {
      this.stateList = result;
    });
  }

  getAllCities(e: Event) {
    var state = (e.target as HTMLInputElement).value;
    this.countryStateCityService.getAllCities(state).subscribe(result => {
      this.cityList = result;
    });
  }
  // getUserById(id: any) {
  //   this.userService.getUserById(id).subscribe(result => {

  //     this.user_data = result[0];
  //     this.user_data.tum_profile_pic = api_url+this.user_data.tum_profile_pic;
  //   })
  // }
  //To set value after fetching data from Id, using Reactive Forms :-
  // this.postsService.getPost(this.postId).subscribe(postData => {
  //   this.isLoading = false;
  //   this.form.setValue({
  //     id: postData._id,
  //     title: postData.title,
  //     content: postData.content,
  //     imagePath: postData.imagePath
  //  });
  //
  // });
}
