import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local-user";
import { STORAGE_KEYS } from "../config/storage-keys.config";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService{
    
    public getLocalUser() : LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        if  (user == null){
            return null;
        }
        return JSON.parse(user);
    }

    public setLocalUser(obj : LocalUser) {
        if  (obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }else{
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    public getCart() : Cart{
        let str = localStorage.getItem(STORAGE_KEYS.cart);
        if  (str != null){
            return JSON.parse(str);
        }else{
            return null;
        }
    }

    public setCart(obj: Cart){
        if  (obj != null){
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        }else{
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
    }
}