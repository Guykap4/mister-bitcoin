import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      name: '',
    })
  }

  ngOnInit(): void {
  }

  onLogin() {
    const { name } = this.form.value;
    const logged = this.userService.login(name)
    if (logged) {
      this.router.navigateByUrl('')
    } else {
      this.form.controls['name'].setValue('');
    }
  }
}