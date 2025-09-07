let total =  0;

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}
const loadAllTrees = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => {
            document.getElementById('spinner').classList.add('hidden');
            document.getElementById('plant-container').classList.remove('hidden');
            displayAllTrees(data.plants);
        })

}
const displayCart = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => {
            const counter = document.getElementById(`count-${data.plants.id}`);
            if (counter) {
                let count = parseInt(counter.innerText);
                count = count + 1;
                counter.innerText = count;
                const totalElement = document.getElementById('total');
                total = parseInt(totalElement.innerText) || 0;
                total += data.plants.price;
                totalElement.innerText = total;
                
                return;
            }
            const cartContainer = document.getElementById('cart-container');
            const plant = data.plants;
            const cartDiv = document.createElement('div');
            cartDiv.innerHTML = `
        <div class="flex justify-between items-center bg-[#f0fdf4] px-3 py-2 my-2" id="cart-item-${plant.id}">
                    <div class="">
                        <h1 class="text-lg font-bold">${plant.name}</h1>
                        <h1>${plant.price} x <span id="count-${plant.id}">1</span></h1>
                    </div>
                    <div class="">
                        <button class="delete-btn" data-plant-id="${plant.id}" data-price="${plant.price}"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>`;
            const totalElement = document.getElementById('total');
            total = parseInt(totalElement.innerText) || 0;
            total += plant.price;
            totalElement.innerText = total;
            cartContainer.appendChild(cartDiv);
            
        })

}


const loadPlants = (categoryId) => {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('plant-container').classList.add('hidden');
    
    removeActive();
    document.getElementById(categoryId).classList.add("bg-green");
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('spinner').classList.add('hidden');
            document.getElementById('plant-container').classList.remove('hidden');
            displayAllTrees(data.plants);
        })
}
const openModal = (plantId) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`)
        .then(res => res.json())
        .then(data => {
            const modalContainer = document.getElementById('modal-container');
            modalContainer.innerHTML = `<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="text-lg font-bold">${data.plants.name}</h3>
    <img class="w-full h-[300px] rounded-[8px]" src="${data.plants.image}" alt="">
    <p class="py-4"><span class="font-bold">Category:</span> ${data.plants.category}</p>
    <p class="py-4"><span class="font-bold">Price:</span> ৳${data.plants.price}</p>
    <p class="py-4"><span class="font-bold">Description:</span> ${data.plants.description}</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>`;
            modalContainer.classList.remove('hidden');

            document.getElementById('my_modal_5').showModal();
        })
}
const displayAllTrees = plants => {
    const plantContainer = document.getElementById('plant-container');
    plantContainer.textContent = '';
    for (const plant of plants) {
        const plantDiv = document.createElement('div');
        plantDiv.className = "m-4 md:m-0 md:p-4 space-y-3 bg-white  cursor-pointer";
        plantDiv.onclick = () => openModal(plant.id);
        plantDiv.innerHTML = `<img class="w-[311px] h-[186px] rounded-[8px]" src="${plant.image}" alt="">
                    <h1 class="font-semibold text-[14px]">${plant.name}</h1>
                    <p class="text-[#1f2937] text-[12px] font-normal h-[90px]">${plant.description}</p>
                    <div class="flex justify-between items-center">
                        <h1 class="bg-[#dcfce7] rounded-full text-[#15803d] text-[14px] font-normal w-auto p-2">${plant.category}
                        </h1>
                        <h1 class="font-semibold text-[14px]">৳${plant.price}</h1>
                    </div>
                    <button class="text-center w-full rounded-full py-3 px-5 text-[16px] font-medium text-white bg-[#15803d]" onclick="event.stopPropagation(); displayCart(${plant.id})">Add to cart</button>`;
        plantContainer.appendChild(plantDiv);
    }
}

document.getElementById('all-trees').addEventListener('click', function () {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('plant-container').classList.add('hidden');
    
    removeActive();
    document.getElementById('all-trees').classList.add("bg-green");
    loadAllTrees();
});
loadAllTrees();

const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    const categoryDiv = document.createElement('div');


    for (const category of categories) {
        categoryDiv.innerHTML += `<div class="category p-2" id="${category.id}">
                        <button class="" onclick="loadPlants(${category.id})">${category.category_name}</button>
                    </div>`;
    }
    categoriesContainer.appendChild(categoryDiv);
}

loadCategories();
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".category");
    lessonButtons.forEach(btn => btn.classList.remove("bg-green"));

};

document.addEventListener('click', function(e) {
    if (e.target.closest('.delete-btn')) {
        const deleteBtn = e.target.closest('.delete-btn');
        const plantId = deleteBtn.getAttribute('data-plant-id');
        const price = parseInt(deleteBtn.getAttribute('data-price'));
        
    
        const countElement = document.getElementById(`count-${plantId}`);
        const count = parseInt(countElement.innerText);
        
        const totalElement = document.getElementById('total');
        total -= (price * count);
        totalElement.innerText = total;

        const cartItem = document.getElementById(`cart-item-${plantId}`);
        cartItem.remove();
    }
});
