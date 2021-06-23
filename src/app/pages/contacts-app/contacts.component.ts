import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact-model';
import { ContactService } from 'src/app/services/contact-service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {

  filterBy = { term: '' }
  contacts: Contact[];
  selectedContactId: string = null;
  subscritption: Subscription;
  currContactId: String;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.subscritption = this.contactService.contacts$.subscribe(contacts => {
      this.contacts = contacts;
      console.log('Ball arrived with:', contacts);
    });
    this.contactService.loadContacts();
  }

  onBack() {
    this.currContactId = null;
  }

  onSetFilter(filterBy) {
    this.filterBy = filterBy
    this.contactService.loadContacts(filterBy)
  }

  ngOnDestroy() {
    this.subscritption.unsubscribe();
  }
}
