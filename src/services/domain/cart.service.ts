import { StorageService } from "../storage.service";
import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
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

    public removeProduct(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if  (position != -1){
            cart.itens.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    public increaseQuantity(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if  (position != -1){
            cart.itens[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    public decreaseQuantity(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if  (position != -1){
            cart.itens[position].quantidade--;
            if  (cart.itens[position].quantidade < 1){
                cart = this.removeProduct(produto);        
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    public total(): number {
        let cart = this.getCart();
        let sum = 0;
        for (var i = 0; i < cart.itens.length; i++){
            sum += cart.itens[i].produto.preco * cart.itens[i].quantidade;
        }
        return sum;
    }
}