const loadCategories = ()=>{
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}
const loadAllTrees = ()=>{
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => displayAllTrees(data.plants))

}


const loadPlants = (categoryId)=>{
    removeActive();
    document.getElementById(categoryId).classList.add("bg-green");  
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data => displayAllTrees(data.plants))
}
const openModal = (plantId)=>{
    fetch(`https://openapi.programming-hero.com/api/plants/${plantId}`)
    .then(res => res.json())
    .then(data => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.textContent = '';
        const modal = document.createElement('div');
        modal.innerHTML = `<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="text-lg font-bold">${data.plant.name}</h3>
    <img class="w-full h-[300px] rounded-[8px]" src="${data.plant.image}" alt="">
    <p class="py-4"><span class="font-bold">Category:</span> ${data.plant.category}</p>
    <p class="py-4"><span class="font-bold">Price:</span> ৳${data.plant.price}</p>
    <p class="py-4"><span class="font-bold">Description:</span> ${data.plant.description}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>`;
      modalContainer.appendChild(modal);
      document.getElementById('my_modal_5').showModal();
    })
}
const displayAllTrees = plants =>{
    const plantContainer = document.getElementById('plant-container');
    plantContainer.textContent = '';
    for(const plant of plants){
        const plantDiv = document.createElement('div');
        plantDiv.innerHTML = `<div class="p-4 space-y-3 bg-white h-[400px]" id="${plant.id}" onclick="openModal(${plant.id})">
                    <img class="w-[311px] h-[186px] rounded-[8px]" src="${plant.image}" alt="">
                    <h1 class="font-semibold text-[14px]">${plant.name}</h1>
                    <p class="text-[#1f2937] text-[12px] font-normal">${plant.description}</p>
                    <div class="flex justify-between items-center">
                        <h1 class="bg-[#dcfce7] rounded-full text-[#15803d] text-[14px] font-normal w-auto p-2">${plant.category}
                        </h1>
                        <h1 class="font-semibold text-[14px]">৳${plant.price}</h1>
                    </div>
                    <button class="text-center w-full rounded-full py-3 px-5 text-[16px] font-medium text-white bg-[#15803d]">Add to cart</button>
                </div>`;
        plantContainer.appendChild(plantDiv);
    }
}

document.getElementById('all-trees').addEventListener('click', function(){
    loadAllTrees();
    removeActive();
    document.getElementById('all-trees').classList.add("bg-green");
});
loadAllTrees();

const displayCategories = categories =>{
    const categoriesContainer = document.getElementById('categories-container');
    const categoryDiv = document.createElement('div');
    
    
    for(const category of categories){
        categoryDiv.innerHTML += `<div class="category p-2" id="${category.id}">
                        <button class="" onclick="loadPlants(${category.id})">${category.category_name}</button>
                    </div>`;
    }
    categoriesContainer.appendChild(categoryDiv);
}

loadCategories();
const removeActive=()=>{
    const lessonButtons = document.querySelectorAll(".category");
    lessonButtons.forEach(btn=>btn.classList.remove("bg-green") );

};
