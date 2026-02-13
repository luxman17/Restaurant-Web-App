document.addEventListener("DOMContentLoaded", async () => {

    const tbody = document.getElementById("items-list");
    const totalPrice = document.getElementById("total");
    const form = document.getElementById("submit-order")
    let total = 0;

    document.querySelector('#submit-order').addEventListener('submit', async(e) => {
        e.preventDefault();
        const rows = document.querySelectorAll("#items-list tr");
        const chosenItems = [];
        const totalOrder = [];
        const firstname = document.getElementById("fname").value;
        const lastname = document.getElementById("lname").value;
        const tn = parseInt(document.getElementById("tn").value);
        const name = firstname+ " " + lastname;
        
        rows.forEach( (row) => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            const select = row.querySelector("select");


            if(checkbox && checkbox.checked){
                const foodname = row.cells[1].textContent.trim();
                const price = parseFloat(checkbox.value);
                const qty = parseInt(select.value);
                
                chosenItems.push({foodname,price,qty})


            }
        });

        totalOrder.push({name,chosenItems,total})
        
        const newOrder = {reciept: totalOrder}
         try {
        const response = await fetch('/api/receipts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder)
        });
        const result = await response.json();
        if (response.status === 201) {
            alert('Order submitted successfully!');
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error submitting order:', error);
    }

    })
    
    function getSelectedTotal(){
        total = 0;
        const rows = document.querySelectorAll("#items-list tr");



        rows.forEach( (row) => {
            
            const checkbox = row.querySelector('input[type="checkbox"]');
            const select = row.querySelector("select");


            if(checkbox && checkbox.checked){
                
                let price = parseFloat(checkbox.value);
                let qty = parseInt(select.value);
                total += price * qty;

            }



        });
        console.log(total);
        totalPrice.innerHTML = "Total price: " + total.toFixed(2);
    }

    try{
        const items = [
        {
            "id" :1,
            "foodname": "Angus AAA Beef Slice",
            "description": "Premium thin sliced Angus AAA beef",
            "img": "",
            "category": "main",
            "price": 10.12,
            "vegan": false,
            "chicken": false,
            "beef": true,
            "pork": false
        },
        {
            "id" :2,
            "foodname": "Boneless Short Rib",
            "description": "Boneless beef short rib",
            "img": "",
            "category": "main",
            "price": 13.12,
            "vegan": false,
            "chicken": false,
            "beef": true,
            "pork": false
        },
        {
            "id" :3,
            "foodname": "Beef Sirloin",
            "description": "Fresh beef sirloin slices",
            "img": "",
            "category": "main",
            "price": 0,
            "vegan": false,
            "chicken": false,
            "beef": true,
            "pork": false
        },
        {
            "id" :4,
            "foodname": "Beef Tongue Slice",
            "description": "Thin sliced beef tongue",
            "img": "",
            "category": "main",
            "price": 0,
            "vegan": false,
            "chicken": false,
            "beef": true,
            "pork": false
        },
        {
            "id" :5,
            "foodname": "Beef Short Rib Bone-In",
            "description": "Marinated beef short rib with bone",
            "img": "",
            "category": "main",
            "price": 0,
            "vegan": false,
            "chicken": false,
            "beef": true,
            "pork": false
        },
        {
            "id" :6,
            "foodname": "Beef Short Plate Slice",
            "description": "Marinated beef short plate slices",
            "img": "",
            "category": "main",
            "price": 0,
            "vegan": false,
            "chicken": false,
            "beef": true,
            "pork": false
        },
        {
            "id" :7,
            "foodname": "Beef Tongue Slice (Marinated)",
            "description": "Marinated thin sliced beef tongue",
            "img": "",
            "category": "main",
            "price": 0,
            "vegan": false,
            "chicken": false,
            "beef": true,
            "pork": false
        },
        {
            "id" :8,
            "foodname": "Special Chicken Breast",
            "description": "Marinated chicken breast",
            "img": "",
            "category": "main",
            "price": 0,
            "vegan": false,
            "chicken": true,
            "beef": false,
            "pork": false
        },
        {
            "id" :9,
            "foodname": "Chicken Thigh",
            "description": "Marinated chicken thigh",
            "img": "",
            "category": "main",
            "price": 0,
            "vegan": false,
            "chicken": true,
            "beef": false,
            "pork": false
        },
        {
            "id" :10,
            "foodname": "Garlic Shrimp",
            "description": "Shrimp cooked with garlic",
            "img": "",
            "category": "main",
            "price": 0,
            "vegan": false,
            "chicken": false,
            "beef": false,
            "pork": false
        },
        {
            "id" :11,
            "foodname": "Fish Fillet",
            "description": "Fresh fish fillet",
            "img": "",
            "category": "main",
            "price": 0,
            "vegan": false,
            "chicken": false,
            "beef": false,
            "pork": false
        },
        {
            "id" :12,
            "foodname": "Golden Garlic Mussel",
            "description": "Mussels cooked with garlic sauce",
            "img": "",
            "category": "main",
            "price": 0,
            "vegan": false,
            "chicken": false,
            "beef": false,
            "pork": false
        }
        ]

        tbody.innerHTML = "";


        items.forEach((item) => {
            
            const tr = document.createElement("tr");
            tr.innerHTML = `<td> <input type="checkbox" name="selectedItems" value="${item.price}"> </td> <td> ${item.foodname}</td> <td>${item.price}</td> 
    <td> <select name="qty" class="qty">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    </select></td>`;
            
        


    tr.querySelector('input[type="checkbox"]').addEventListener("change", getSelectedTotal)
    tr.querySelector('select').addEventListener("change", getSelectedTotal)
     tbody.appendChild(tr);



        });


        getSelectedTotal();

    } catch(err) {
        console.error("Error loading menu:", err);

    }
});