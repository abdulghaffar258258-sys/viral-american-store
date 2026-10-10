const products = [
 {id:1,name:"USA Graphic Hoodie",category:"Fashion",price:34.99,rating:"4.8",image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",sale:true},
 {id:2,name:"Everyday Sneakers",category:"Shoes",price:59.99,rating:"4.7",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",sale:false},
 {id:3,name:"Smart Watch",category:"Tech",price:49.99,rating:"4.6",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",sale:true},
 {id:4,name:"Stars & Stripes Backpack",category:"Lifestyle",price:39.99,rating:"4.8",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",sale:false},
 {id:5,name:"Classic Sunglasses",category:"Accessories",price:19.99,rating:"4.5",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",sale:true},
 {id:6,name:"Wireless Headphones",category:"Tech",price:44.99,rating:"4.7",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",sale:false}
];
// Replace the last demo image with a valid Unsplash photo URL.
products[5].image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85";
let activeCategory = "All";
let cart = [];
const grid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const scrim = document.getElementById("scrim");
const money = value => "$" + value.toFixed(2);

function renderProducts(){
  const query = (document.getElementById("searchInput")?.value || "").trim().toLowerCase();
  const visible = products.filter(p => (activeCategory === "All" || p.category === activeCategory) && p.name.toLowerCase().includes(query));
  document.getElementById("productCount").textContent = `${visible.length} item${visible.length === 1 ? "" : "s"}`;
  grid.innerHTML = visible.map(p => `<article class="product-card">
    <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy">${p.sale ? '<span class="sale-tag">POPULAR</span>' : ""}</div>
    <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><div class="rating">★★★★★ <span>(${p.rating})</span></div>
    <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}">Add to Cart +</button></div></div></article>`).join("");
  if (!visible.length) grid.innerHTML = '<p>No products found. Try another search.</p>';
}
function renderCart(){
  cartCount.textContent = cart.reduce((sum,item) => sum + item.qty, 0);
  const cartItems = document.getElementById("cartItems");
  if (!cart.length) cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Add something you love!</p>';
  else cartItems.innerHTML = cart.map(item => `<div class="cart-row"><div><b>${item.name}</b><p>${money(item.price)} × ${item.qty}</p></div><div><b>${money(item.price * item.qty)}</b><br><button data-remove="${item.id}">Remove</button></div></div>`).join("");
  document.getElementById("cartTotal").textContent = money(cart.reduce((sum,item) => sum + item.price * item.qty, 0));
}
function openCart(){cartDrawer.hidden=false;scrim.hidden=false;renderCart()}
function closeCart(){cartDrawer.hidden=true;scrim.hidden=true}
grid.addEventListener("click",event=>{
  const button=event.target.closest("[data-add]");
  if(!button)return;
  const product=products.find(p=>p.id===Number(button.dataset.add));
  const existing=cart.find(p=>p.id===product.id);
  if(existing)existing.qty++;else cart.push({...product,qty:1});
  renderCart();button.textContent="Added ✓";setTimeout(()=>button.textContent="Add to Cart +",900);
});
document.getElementById("cartItems").addEventListener("click",event=>{
  const button=event.target.closest("[data-remove]");
  if(!button)return;cart=cart.filter(p=>p.id!==Number(button.dataset.remove));renderCart();
});
document.getElementById("cartButton").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
scrim.addEventListener("click",closeCart);
document.getElementById("checkoutButton").addEventListener("click",()=>alert("This is a demo store. Connect a payment provider and order system before accepting real orders."));
document.querySelectorAll("[data-category]").forEach(button=>button.addEventListener("click",()=>{
  activeCategory=button.dataset.category;
  document.querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("active",b===button));
  renderProducts();
}));
document.getElementById("searchToggle").addEventListener("click",()=>{
  const panel=document.getElementById("searchPanel");panel.hidden=!panel.hidden;
  if(!panel.hidden)document.getElementById("searchInput").focus();
});
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("newsletterForm").addEventListener("submit",event=>{
  event.preventDefault();document.getElementById("newsletterMessage").textContent="Thanks! Newsletter signup is a demo; connect an email service to collect subscribers.";
  event.target.reset();
});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
