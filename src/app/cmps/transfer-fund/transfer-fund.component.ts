import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact-model';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent implements OnInit {

  @Input() contact: Contact;

  constructor(private userService: UserService) { }

  amount: number;

  ngOnInit(): void {
    console.log(this.contact);
  }

  onTransfer() {
    this.userService.transferCoins(this.amount, this.contact);
    this.amount = 0;
  }
}
