import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      name: '',
    })
  }

  ngOnInit(): void {
  }

  onSignup() {
    const { name } = this.form.value;
    this.userService.signup(name)
    this.router.navigateByUrl('')
  }
}
