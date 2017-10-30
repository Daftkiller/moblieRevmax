import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'cart',
    segment: 'cart'
  }
)
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage: boolean = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public storage: Storage, 
    public viewCtrl: ViewController) {
      this.total = 0.0; 
      this.storage.ready().then(()=>{
        this.storage.get("cart").then( (data)=>{
          console.log(data);
          this.cartItems = data;
          console.log(this.cartItems);
        
          if(this.cartItems != null){
              if(this.cartItems.length > 0){
                this.cartItems.forEach( (item, index)=> {
                  this.total = this.total + (item.product.price * item.qty)
                })
        
              } else {
        
                this.showEmptyCartMessage = true;
        
              }
          }
        })
    
      })

  } /* Constructor ends here */

  removeFromCart(item, i){ 
    let price = item.product.price;
    let qty = item.qty;  
    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then( ()=> {

      this.total = this.total - (price * qty);

    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }
    
  }
    
  closeModal(){
    this.viewCtrl.dismiss();
  }
  
  checkout(){
    window.open('https://revmax.twinspark.co/cart/', '_system', 'location=yes');
        
      }
}/* Class ends here */
