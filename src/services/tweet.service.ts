import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tweet } from '../models/tweet';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  user : User;
  private tweetSubject$ = new BehaviorSubject<any>(null);

  constructor() { }

  setTweet(tweet: Tweet[]) {
    this.tweetSubject$.next(tweet);
  }

  getTweet() {
    return this.tweetSubject$.asObservable();
  }

  getUser(){
    this.user = {
      firstName: 'Cleiton',
      lastName: 'Silva',
      username: 'Dev_Cleiton'
    }
    return this.user
  }

  setLike(tweet: Tweet){
    const tweetStorage = JSON.parse(localStorage.getItem('list-tweet')!) || []
    let index = tweetStorage.findIndex((x : Tweet) => x.id === tweet.id);
    tweetStorage[index].like = tweetStorage[index].like ? false : true;
    localStorage.setItem("list-tweet", JSON.stringify(tweetStorage));

    this.tweetSubject$.next(tweetStorage);
  }

  setFavorite(tweet: Tweet){
    const tweetStorage = JSON.parse(localStorage.getItem('list-tweet')!) || []
    let index = tweetStorage.findIndex((x : Tweet) => x.id === tweet.id);
    tweetStorage[index].favourite = tweetStorage[index].favourite ? false : true;
    localStorage.setItem("list-tweet", JSON.stringify(tweetStorage));

    this.tweetSubject$.next(tweetStorage);
  }

  deleteTweet(tweet: Tweet){
    const tweetStorage = JSON.parse(localStorage.getItem('list-tweet')!) || []
    let index = tweetStorage.findIndex((x : Tweet) => x.id === tweet.id);
    tweetStorage.splice(index, 1);
    localStorage.setItem("list-tweet", JSON.stringify(tweetStorage));

    this.tweetSubject$.next(tweetStorage);
  }

  //comit de serviço para o serviço de tweet


}
