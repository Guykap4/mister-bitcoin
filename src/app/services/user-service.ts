import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Move } from "../models/move-model";
import { User } from "../models/user-model";
import { StorageService } from "./storage-service.service";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private storageService: StorageService) { }

    public query(): User {
        return this.user;
    }

    user: User = this.storageService.loadFromStorage('user') || null;

    users: User[] = this.storageService.loadFromStorage('users') || [];

    public signup(name) {
        const newUser: User = {
            id: 'U' + Date.now() % 1000,
            name,
            coins: 100,
            moves: [],
            img: `https://robohash.org/${name}.png?set=set5`,
        }
        this.users.push(newUser);
        this.storageService.saveToStorage('users', this.users);
        this.user = newUser;
        this.storageService.saveToStorage('user', this.user);
    }

    public login(name) {
        const loggedUser = this.users.find(user => user.name === name);
        if (loggedUser) {
            this.user = loggedUser;
            this.storageService.saveToStorage('user', loggedUser);
            return true;
        } else {
            return false;
        }
    }

    public addMove(move: Move) {
        this.user = {
            ...this.user,
            moves: [move, ...this.user.moves]
        }
        this.loadMoves(move.receiverId);
        this.storageService.saveToStorage('users', this.users);
        this.storageService.saveToStorage('user', this.user);
    }

    public transferCoins(amount, contact) {
        if (this.user.coins >= amount) {
            this.user.coins -= amount;
            const move: Move = {
                senderId: this.user.id,
                amount,
                receiverId: contact._id,
                timestamp: Date.now(),
                receiverName: contact.name,
            }
            this.addMove(move);
        } else {
            alert('not enough funds!');
        }
    }

    public loadMoves(contactId = null) {
        if (contactId) {
            const filteredMoves = this.user.moves.filter(move => move.receiverId === contactId);
            this._moves$.next(filteredMoves);
        } else {
            this._moves$.next(this.user.moves);
        }
    }

    private _moves$ = new BehaviorSubject<Move[]>([])
    public move$ = this._moves$.asObservable()
}



