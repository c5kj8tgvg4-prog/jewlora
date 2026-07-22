const products = [
  {id:1,name:"Minimal Clover Necklace",category:"Necklaces",price:599,mrp:999,badge:"BESTSELLER",image:"images/product-1.jpg"},
  {id:2,name:"Classic Hoop Earrings",category:"Earrings",price:399,mrp:699,badge:"NEW",image:"images/product-2.jpg"},
  {id:3,name:"Layered Charm Bracelet",category:"Bracelets",price:449,mrp:799,badge:"TRENDING",image:"images/product-3.jpg"},
  {id:4,name:"Crystal Adjustable Ring",category:"Rings",price:349,mrp:599,badge:"POPULAR",image:"images/product-4.jpg"},
  {id:5,name:"Pearl Drop Earrings",category:"Earrings",price:499,mrp:899,badge:"GIFT PICK",image:"images/product-5.jpg"},
  {id:6,name:"Heart Pendant Necklace",category:"Necklaces",price:549,mrp:949,badge:"NEW",image:"images/product-6.jpg"},
  {id:7,name:"Sleek Cuff Bracelet",category:"Bracelets",price:499,mrp:849,badge:"LIMITED",image:"images/product-7.jpg"},
  {id:8,name:"Stackable Everyday Ring",category:"Rings",price:299,mrp:499,badge:"VALUE PICK",image:"images/product-8.jpg"}
];

let currentFilter = "All";
let searchTerm = "";
let cart = JSON.parse(localStorage.getItem("jewloraCart") || "[]");

const rupees = value => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);

function renderProducts(){
  const grid = document.getElementById("productGrid");
  const filtered = products.filter(p =>
    (currentFilter === "All" || p.category === currentFilter) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  grid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-image">
        <span class="badge">${p.badge}</span>
        <img src="${p.image}" alt="${p.name}" onerror="this.remove(); this.parentElement.insertAdjacentHTML('beforeend','<span>Add ${p.name}<br><small>${p.image}</small></span>')">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>Anti-tarnish stainless steel</p>
        <div class="price"><strong>${rupees(p.price)}</strong><del>${rupees(p.mrp)}</del></div>
        <button class="add-btn" onclick="addToCart(${p.id})">Add to Bag</button>
      </div>
    </article>`).join("");
  document.getElementById("emptyState").style.display = filtered.length ? "none" : "block";
}

function addToCart(id){
  const found = cart.find(item => item.id === id);
  found ? found.qty++ : cart.push({...products.find(p => p.id === id),qty:1});
  saveCart(); openCart();
}
function removeFromCart(id){ cart = cart.filter(item => item.id !== id); saveCart(); }
function saveCart(){
  localStorage.setItem("jewloraCart",JSON.stringify(cart));
  renderCart();
}
function renderCart(){
  document.getElementById("cartCount").textContent = cart.reduce((a,b)=>a+b.qty,0);
  const wrap = document.getElementById("cartItems");
  if(!cart.length){ wrap.innerHTML='<p class="cart-empty">Your bag is empty.</p>'; }
  else{
    wrap.innerHTML=cart.map(item=>`
      <div class="cart-item">
        <div class="cart-thumb">${item.category}</div>
        <div><h4>${item.name}</h4><p>Qty: ${item.qty} · ${rupees(item.price*item.qty)}</p></div>
        <button class="remove" onclick="removeFromCart(${item.id})">✕</button>
      </div>`).join("");
  }
  document.getElementById("subtotal").textContent=rupees(cart.reduce((a,b)=>a+b.price*b.qty,0));
}
function openCart(){
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}
function closeCart(){
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); currentFilter=btn.dataset.filter; renderProducts();
}));
document.querySelectorAll(".category-card").forEach(card=>card.addEventListener("click",()=>{
  currentFilter=card.dataset.filter;
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===currentFilter));
  renderProducts();
}));
document.getElementById("searchBtn").onclick=()=>document.getElementById("searchPanel").classList.add("open");
document.getElementById("closeSearch").onclick=()=>document.getElementById("searchPanel").classList.remove("open");
document.getElementById("searchInput").addEventListener("input",e=>{searchTerm=e.target.value;renderProducts()});
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("menuBtn").onclick=()=>document.getElementById("mainNav").classList.toggle("open");
document.getElementById("newsletterForm").addEventListener("submit",e=>{
  e.preventDefault(); document.getElementById("formMessage").textContent="Thank you! You are on the Jewlora list."; e.target.reset();
});
document.getElementById("whatsappCheckout").onclick=()=>{
  if(!cart.length) return alert("Your bag is empty.");
  const lines=cart.map(i=>`${i.name} x ${i.qty} = ${rupees(i.price*i.qty)}`);
  const total=rupees(cart.reduce((a,b)=>a+b.price*b.qty,0));
  const message=encodeURIComponent(`Hello Jewlora, I want to order:\n\n${lines.join("\n")}\n\nTotal: ${total}\n\nPlease confirm availability.`);
  // IMPORTANT: Replace 91XXXXXXXXXX with your WhatsApp number.
  window.open(`https://wa.me/91XXXXXXXXXX?text=${message}`,"_blank");
};
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts(); renderCart();
