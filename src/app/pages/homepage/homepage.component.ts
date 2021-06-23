import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/models/user-model'
import { UserService } from 'src/app/services/user-service'
import { BitcoinService } from 'src/app/services/bitcoin-service';
import { Move } from 'src/app/models/move-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private userService: UserService, private bitcoinService: BitcoinService) { }
  user: User;
  coinDesc: any;
  moves: Move[];
  sub: Subscription;

  async ngOnInit(): Promise<void> {
    this.user = this.userService.query();
    this.sub = this.userService.move$.subscribe(moves => {
      this.moves = moves;
    })
    this.userService.loadMoves();
    console.log(this.moves);
    

    const coinStats = await this.bitcoinService.getPrice();
    this.coinDesc = { price: Math.floor(coinStats.rate_float), symbol: coinStats.symbol }
  }
}
