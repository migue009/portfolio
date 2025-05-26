let dataArray = []; 
const carga_data = async function() {
  try {
    const response = await fetch('./data.json'); 
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    const data = await response.json(); 
    dataArray = data;
    console.log(dataArray);
    return data; 
  } catch (error) {
    console.error('Hubo un problema con la carga del archivo JSON:', error);
  }
};

const btnContainer = document.querySelector(".btn-container");
const content = document.querySelector(".about-content");
const imgs = document.querySelector(".about-img");

window.addEventListener("DOMContentLoaded", async function() {
  await carga_data();
  cargarBtns();
});



function cargarBtns() {
  const titles = getTitles(dataArray);
  const allBtns = titles.map(item => { 
    return `<button class="tab-btn active" data-id="${item}">${item}</button>`;
  }).join(""); 
  btnContainer.innerHTML = allBtns;
  clickEvent();
}

function getTitles(dataArray) {
  return dataArray.map(item => item.title);
}

function clickEvent() {
  const classBtn = btnContainer.querySelectorAll(".tab-btn");

  classBtn.forEach(btn => {
    btn.addEventListener("click", function (e) {
      const idSelect = e.currentTarget.dataset.id;
      const idBtn = dataArray.filter(item => item.title === idSelect);

      if (idSelect) {

         classBtn.forEach(function (btn) {
         btn.classList.remove("active");
        });
        e.target.classList.add("active");
        cargarDesc(idBtn);
      }else{
        console.log("No esta el articulo");
      }

    });
  });

}


function cargarDesc(idBtn) {
    let desc = idBtn.map(function (item){
      return `<div class="content-active" id=${item.title}>
              <h4>${item.title}</h4>
              <p>${item.desc}
              </p>
            </div>`;
    });
    desc = desc.join("");
    content.innerHTML = desc;

    let img = idBtn.map(function (item){
      return `<img src=${item.img} alt=${item.title} />`;
    });
    img = img.join("");
    imgs.innerHTML = img;

}