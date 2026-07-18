           // navbar  //

const bar = document.getElementById("bar");
const close = document.getElementById("close")
const nav = document.getElementById("navbar");

if(bar){
  bar.addEventListener("click", () =>{
    nav.classList.add("active");
  });
};
if(close){
    close.addEventListener("click", ()=>{
        nav.classList.remove("active");
    });
};

        // shop page to sproduct page //

let products = document.querySelectorAll(".pro");

if(products.length > 0){

       products.forEach((item) => {
       item.onclick = function(){

        let image = item.querySelector("img").src;
        let brand = item.querySelector("span").innerText;
        let title = item.querySelector("h5").innerText;
        let price = item.querySelector("h4").innerText;

        localStorage.setItem("image",image);
        localStorage.setItem("brand",brand);
        localStorage.setItem("title",title);
        localStorage.setItem("price",price);
        localStorage.setItem("details","Premium Quality Cotton Product.");

        window.location.href = "sproduct.html";
     }

 });
}

let mainImg = document.getElementById("mainImg");
  if(mainImg){
    mainImg.src = localStorage.getItem("image");
  }

let brand = document.getElementById("brand");
  if(brand){
    brand.innerText = localStorage.getItem("brand");
  }

let title = document.getElementById("title");
  if(title){
    title.innerText = localStorage.getItem("title");
  }

let price = document.getElementById("price");
  if(price){
    price.innerText = localStorage.getItem("price");
  }

let details = document.getElementById("details");
if(details){
details.innerText =localStorage.getItem("details")
||
"No Details Available.";
}

           // small img //

let smallimg = document.getElementsByClassName("small-img");

  if(mainImg && smallimg.length > 0){

    for(let i=0;i<smallimg.length;i++){
        smallimg[i].onclick = function(){
          mainImg.src = smallimg[i].src;
        }
    }
}


//  add to cart
let addCart = document.getElementById("addCart");
if(addCart){
  addCart.onclick = function(){
    let quantityInput = document.getElementById("quantity");
    let Productquantity =1;
      if(quantityInput){
          Productquantity = parseInt(quantityInput.value);
      }

    let sizeInput = document.getElementById("size");
    let productSize = "";
      if(sizeInput){
       productSize = sizeInput.value;
      }

    if(productSize === ""){
       alert("Please Select Size.");
       return;
    }


    let cart = JSON.parse(
      localStorage.getItem("cart")
    )||[];

    let product= {
      id : localStorage.getItem("image"),
      image : localStorage.getItem("image"),
      brand : localStorage.getItem("brand"),
      title : localStorage.getItem("title"),
      price : localStorage.getItem("price"),
      size : productSize,
      quantity : Productquantity
    };
    let existProduct = cart.find((item)=>{
       return (item.id === product.id
        &&
        item.size == product.size
       );
    });

    if(existProduct){
      existProduct.quantity+= Productquantity;
    }else{
    cart.push(product);
    }


    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Added Successfully :)");
  }
}


let cartBody = document.getElementById("cartBody");

  if(cartBody){
    let cart = JSON.parse(
       localStorage.getItem("cart")
    )||[];

  cart.forEach((item,index)=>{
    let subtotal = parseFloat(item.price.replace("$","")) * item.quantity;
      cartBody.innerHTML += `
           <tr>
              <td>
                <i class="fa-solid fa-circle-xmark remove" data-index="${index}"></i>
              </td>

              <td>
                <img src="${item.image}" width="70">
              </td>

              <td>${item.title}
               <br>
               Size : ${item.size}
              </td>
              <td>${item.price}</td>
              <td>
                <input type="number" value="${item.quantity}" min="1" class="qty" data-index="${index}">
              </td>
              <td>$${subtotal}</td>
           </tr>`;
  });
 }

// quantity

let quantity = document.querySelectorAll(".qty");
   quantity.forEach((qty)=>{
     qty.addEventListener("change",function(){

        let index = this.dataset.index;

        let cart = JSON.parse(localStorage.getItem("cart"))||[];

        let value = parseInt(this.value);
            if(value <1){
               value =1;
               this.value =1;
            }

      cart[index].quantity = value;
        localStorage.setItem("cart",
        JSON.stringify(cart)
        );
        location.reload();
    });
  });


//  remove
let removeBtn = document.querySelectorAll(".remove");
  removeBtn.forEach((btn)=>{
    btn.onclick = function(){
      let index = this.dataset.index;
       
      let cart = JSON.parse(
         localStorage.getItem("cart")
      )||[];

      cart.splice(index,1);

      localStorage.setItem("cart",
        JSON.stringify(cart)
      );

      location.reload();
    }
  });
