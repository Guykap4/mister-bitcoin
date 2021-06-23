import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/models/contact-model';
import { ContactService } from 'src/app/services/contact-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      name: '',
      email: '',
      phone: '',
    })
  }

  contact: Contact;
  contactImg: string;
  sub: Subscription;

  async ngOnInit(): Promise<void> {
    if (this.route.data) {
      this.sub = this.route.data.subscribe(data => {
        this.contact = data.contact;
        this.form.controls['name'].setValue(this.contact.name);
        this.form.controls['email'].setValue(this.contact.email);
        this.form.controls['phone'].setValue(this.contact.phone);
        this.contactImg = `https://robohash.org/${this.contact.name}.png?set=set5`
      })
    }

    // without resolver ***

    // if (id) {
    //   this.contact = await this.contactService.getContactById(id).toPromise();
    //   this.form.controls['name'].setValue(this.contact.name);
    //   this.form.controls['email'].setValue(this.contact.email);
    //   this.form.controls['phone'].setValue(this.contact.phone);
    //   this.contactImg = `https://robohash.org/${this.contact.name}.png?set=set5`
    // }
  }

  onSave() {
    const { name, email, phone } = this.form.value
    const id = this.contact?._id || null;
    const contact = new Contact(id, name, email, phone);
    this.contactService.saveContact(contact);
    this.router.navigateByUrl('/contact');
  }

  ngOnDestory() {
    this.sub.unsubscribe();
  }
}
