// import { Location } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact-model';
import { ContactService } from 'src/app/services/contact-service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  contact: Contact;
  sub: Subscription;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router,
    // private location: Location
  ) { }

  async ngOnInit(): Promise<void> {

    // with resolver

    this.sub = this.route.data.subscribe(data => {
      this.contact = data.contact;
    })

    // without resolver

    // this.route.params.subscribe(async params => {
    //   const id = params.id
    //   this.contact = await this.contactService.getContactById(id).toPromise();
    // })
  }

  onBack() {
    this.router.navigateByUrl('/contact');
    // this.Location.back();
  }

  onEdit() {
    this.router.navigateByUrl(`contact/edit/${this.contact._id}`);
  }

  onDelete() {
    this.contactService.deleteContact(this.contact._id);
    this.router.navigateByUrl('/contact');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
