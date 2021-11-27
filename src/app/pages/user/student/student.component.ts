import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Mapboxgl from 'mapbox-gl';
import { StudentService } from 'src/app/core/services/student.service';
import { environment } from 'src/environments/environment';
import { Student } from '../../../core/models/student.model';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentForm = new FormGroup({
    name : new FormControl(),
    lastname : new FormControl(),
    dni : new FormControl()
  });
  student!: Student;
  map !: Mapboxgl.Map;
  now = new Date();
  dni!: number;
  id_history!: string;
  name!: string;
  last_name!: string;
  birthday!: Date;
  gender!: string;
  phone!: number;
  email!:string;
  civil_status!: string;
  country!: string;
  department!: string;
  district!: string;
  address!: string;
  lat!: number;
  long!: number;

  ctrlName!: FormControl;
  ctrlLastname_p!: FormControl;
  ctrlLastname_m!: FormControl;
  ctrlDni!: FormControl;
  ctrlBirthday!: FormControl;
  ctrlGender!: FormControl;
  ctrlPhone!: FormControl;
  ctrlEmail!: FormControl;
  ctrlCivil_status!: FormControl;
  ctrlCountry!: FormControl;
  ctrlDepartment!: FormControl;
  ctrlDistrict!: FormControl;
  ctrlAddress!: FormControl;

  ctrlBuscarDni!: FormControl;
  constructor( private studentService: StudentService) { 
    this.ctrlName = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+(\s+[a-zA-ZÁÉÍÓÚáéíóúñÑ]*[\S])*$/)]);
    this.ctrlLastname_p = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+(\s+[a-zA-ZÁÉÍÓÚáéíóúñÑ]*[\S])*$/)]);
    this.ctrlLastname_m = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+(\s+[a-zA-ZÁÉÍÓÚáéíóúñÑ]*[\S])*$/)]);
    this.ctrlDni = new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(8), Validators.maxLength(8)]);
    this.ctrlBirthday = new FormControl('', [Validators.required]);
    this.ctrlGender = new FormControl('', [Validators.required]);
    this.ctrlPhone = new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(9), Validators.maxLength(9)]);
    this.ctrlEmail = new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
    this.ctrlCivil_status = new FormControl('', [Validators.required]);
    this.ctrlCountry = new FormControl('', [Validators.required]);
    this.ctrlDepartment = new FormControl('', [Validators.required]);
    this.ctrlDistrict = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+(\s+[a-zA-ZÁÉÍÓÚáéíóúñÑ]*[\S])*$/)]);
    this.ctrlAddress = new FormControl('', [Validators.required]);

    this.ctrlBuscarDni = new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]);
  }

  ngOnInit(): void {
    (Mapboxgl as any).accessToken = environment.accessToken;
    this.map = new Mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-77.0844015,-12.0544152], // starting position [lng, lat]
      zoom: 17 // starting zoom
    });
  }
  searchStudent(event:Event){
    this.studentService.getStudent(this.ctrlBuscarDni.value).subscribe((student) => {
      this.student = student[0];
      this.name = student[0].name;
      this.last_name = student[0].last_name;
      this.dni = student[0].dni;
      this.lat = student[0].lat;
      this.long = student[0].long;
      console.log(this.lat, this.long);
      console.log(student);
      this.map.remove();
      (Mapboxgl as any).accessToken = environment.accessToken;
      this.map = new Mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [student[0].long,student[0].lat], // starting position [lng, lat]
        zoom: 17 // starting zoom
      });
      new Mapboxgl.Marker()
      .setLngLat([student[0].long, student[0].lat])
      .addTo(this.map)
      .setPopup( new Mapboxgl.Popup({offset: 25}).setText(student[0].name + " "+student[0].last_name));
    });
  }
}