const loadData = async (limete) => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.tools, limete);
};
const displayData = (datas, limete) => {


  //   console.log(datas);
  const cardContainer = document.getElementById("card-container");
  // -------------Display 3 Phones-------------------
  const showAll = document.getElementById('show-all');
  if (limete && datas.length > 3) {
    datas = datas.slice(0, 3);
    showAll.classList.remove('d-none');
  }
  else {
    showAll.classList.add('d-none');
    datas = datas.slice(3);
  }
  datas.forEach((data) => {
    const creatDiv = document.createElement("div");
    creatDiv.classList.add("col");
    creatDiv.innerHTML = `
    <div class="card h-100">
    <img src="${data.image}" class="m-2 img" alt="...">
    <div class="card-body">
        <h5 class="card-title">Features</h5>
            <div id="list">
                <div class="feature-body">
                <p class="m-0">1 .${data.features[0]}</p>
                <p class="m-0">2 .${data.features[1]}</p>
                <p class="m-0">3 .${data.features[2] ? data.features[2] : "Feature Upcoming"}</p>
                <p class="m-0">${data.features[3] ? "4 ." + data.features[3] : ""}</p>
                </div>
            </div>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title">${data.name}</h5>
            <p><i class="fa-solid fa-calendar-days me-2"></i>${data.published_in}</p>
          </div>
          <div>
                <button class="arrow-btn"      data-bs-toggle="modal"
                  data-bs-target="#itemDetails" onclick="loadDataById('${data.id}')"> <i class="fa-solid fa-arrow-right" style="color: #b83232;"></i>
                </button>
           </div>
        </div>
     
    </div>

</div>

    `;
    toggleSpinner(false);
    cardContainer.appendChild(creatDiv);
  });
};

const toggleSpinner = isLoading => {
  const loader = document.getElementById('loader');
  const body = document.getElementById('body');
  if (isLoading) {
    loader.classList.remove('d-none');
  }
  else {
    loader.classList.add('d-none');
  }

}
const showAll = (limite) => {
  toggleSpinner(true);
  loadData();
};

const loadDataById = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
};


loadData(3);

