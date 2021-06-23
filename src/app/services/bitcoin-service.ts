import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import axios from "axios";

@Injectable({
    providedIn: 'root'
})

export class BitcoinService {

    constructor(private http: HttpClient) { }

    // getPrice(currency = 'USD') {
    //     return this.http.get<{ bpi }>('https://api.coindesk.com/v1/bpi/currentprice.json')
    //         .pipe(
    //             map(res => res.bpi[currency])
    //         )
    // }

    getPrice(currency = 'USD') {
        return axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(res => res.data.bpi[currency])
    }
}