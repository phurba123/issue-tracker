import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allissues',
  templateUrl: './allissues.component.html',
  styleUrls: ['./allissues.component.css']
})
export class AllissuesComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
