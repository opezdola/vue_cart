Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:`

        <div class="product">
            <div class="product-image">
                <img :src="image" :alt="altText"/>
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p>{{description}}</p>
                <p>{{ sale }}</p>

                <a :href="link">More products like this</a>
            <p v-if="inStock">In stock</p>
            <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
<p>Shipping: {{ shipping }}</p>
 <product-details :details="details"></product-details>
  <div v-for="size in sizes">
    <li>{{size}}</li>
</div>
<div
    class="color-box"
    v-for="(variant, index) in variants"
                    :key="variant.variantId"
:style="{ backgroundColor:variant.variantColor }"
@mouseover="updateProduct(index)"
    ></div>  
</div>

<div v-for="variant in variants" :key="variant.variantId">
    <p @mouseover="updateProduct(variant.variantImage)">
</p>


</div>

<div class="cart">
    <p>Cart({{ cart }})</p>
</div>

<div class="btn">


<button
    v-on:click="addToCart"
                    :disabled="!inStock"
:class="{ disabledButton: !inStock }"
    >
    Add to cart
</button>
<button v-on:click="deleteToCart">Delete to cart</button>
</div>
</div>
</div>
 `  ,
    data() {
        return {
            product: "Socks",
            description: "A pair of warm, fuzzy socks.",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            selectedVariant: 0,
            altText: "A pair of socks",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],

            cart: 0,
            brand: "Vue Mastery",
            onSale: true,

        }
    },

    methods: {
        addToCart() {
            this.cart += 1
        },
        deleteToCart() {
            this.cart -= 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
            return  this.brand + ' ' + this.product + ' are not on sale'
        }
    }


})
let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})
