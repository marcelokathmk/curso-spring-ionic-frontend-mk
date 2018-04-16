import { StorageService } from "../storage.service";
import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { nullSafeIsEquivalent } from "@angular/compiler/src/output/output_ast";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {

    constructor(public storage: StorageService){

    }

    public createOrClearCart(): Cart {
        let cart : Cart = {itens: []};
        this.storage.setCart(cart);
        return cart;
    }

    public getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if  (cart == null){
            cart = this.createOrClearCart();
        }
        return cart;
    }

    public addProduct(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if  (position == -1){
            cart.itens.push({quantidade: 1, produto: produto});
        }
        this.storage.setCart(cart);
        return cart;
    }
}