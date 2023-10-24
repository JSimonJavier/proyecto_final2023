async function addToCart(pid) {
  try {
    
    const result = await fetch("/api/session/show/cart");
    const data = await result.json();
    if (!data.payload){
      
      return "Coudnt acces to your cart";
    } 

    const cartID = data.payload;

    const response = await fetch(`/api/carts/${cartID}/product/${pid}`, {
      method: "PUT"
    });

       if (response.ok) {
      alert('Producto agregado al carrito');
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
    
  } catch(err) {
    console.error('Error parsing JSON:', err);
  }
}


async function deleteButton(pid){
  try{
    const response = await fetch(`/api/products/${pid}`, {
      method: "DELETE"
    });

    console.log(response)
      if (response.ok) {
      alert('Product deleted');
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  }
  catch(err) {
    console.error(err);
  }
}

async function UpdatePremium(uid){
  try{
    const response = await fetch(`/api/users/update/${uid}`, {
      method: "PUT"
    });
    
    console.log(response)
      if (response.ok) {
      alert('User Updated');
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  }
  catch(err) {
    console.error(err);
  } 
}

async function deleteUser(uid){
  try{
    const response = await fetch(`/api/users/delete/${uid}`, {
      method: "DELETE"
    });
    
    console.log(response)
      if (response.ok) {
      alert('User Deleted');
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  }
  catch(err) {
    console.error(err);
  } 
}

async function myCart(cid){
  try{
    location.href=`/api/carts/${cid}`
  }
  catch(err) {
    console.error(err);
  }  
}

async function purchase(cid){
  try{
    const response = await fetch(`/api/carts/${cid}/purchase`, {
      method: "POST"
    });
    
    console.log(response)
      if (response.ok) {
        location.href=`/api/carts/${cid}/purchase`
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  }
  catch(err) {
    console.error(err);
  } 
}



