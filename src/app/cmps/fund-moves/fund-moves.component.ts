import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact-model';
import { Move } from 'src/app/models/move-model';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-fund-moves',
  templateUrl: './fund-moves.component.html',
  styleUrls: ['./fund-moves.component.scss']
})
export class FundMovesComponent implements OnInit {

  @Input() contact: Contact;

  constructor(private userService: UserService) { }

  sub: Subscription;
  moves: Move[];

  // ngOnInit(): void {
  //   this.moves = this.userService.getMoves(this.contact._id);

  // }

  ngOnInit(): void {
    this.sub = this.userService.move$.subscribe(moves => {
      this.moves = moves;
      console.log('Ball arrived with:', moves);
    });
    this.userService.loadMoves(this.contact._id);
  }
}
