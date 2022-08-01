import { environment } from "src/environments/environment";
import * as CryptoJS from "crypto-js";

export function getRequestParams(){
  return `ts=${environment.TIME_STAMP}&apikey=${environment.API_KEY}&hash=${generateHash()}`
}

function generateHash(){
  return CryptoJS.MD5(`${environment.TIME_STAMP}${environment.PRIVATE_KEY}${environment.API_KEY}`);
}

export function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}