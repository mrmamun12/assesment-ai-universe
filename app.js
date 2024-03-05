const loadData = async (limete) => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.tools, limete);
};
const displayData = (datas, limete) => {

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
                  data-bs-target="#itemDetails" onclick="loadDataWithId('${data.id}')"> <i class="fa-solid fa-arrow-right" style="color: #b83232;"></i>
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

const loadDataWithId = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDataWithId(data.data);
};

const displayDataWithId = data => {
  console.log(data);
  const modalBody = document.getElementById('modal-container');
  modalBody.innerHTML = `
  <div class="col border border-danger rounded p-4 bg-danger bg-opacity-25 mb-5 mx-lg-5 mx-md-3">
            <h4>${data.description}</h4>
            <div class="row gap-2 my-3 plan-btn">
                <button class="col fw-bold bg-light text-success">${data.pricing[0].price} <br> ${data.pricing[0].plan}</button>
                <button class="col fw-bold text-danger-emphasis">${data.pricing[1].price} <br> ${data.pricing[1].plan}</button>
                <button class="col fw-bold text-danger">${data.pricing[2].price} <br> ${data.pricing[2].plan}</button>
            </div>
        <!-- Features and Intergations -->
          <div class="d-flex justify-content-between">
            <div>
              <h4>Features</h4>
              <ul>
                <li>${data.features[1].
      feature_name}</li>
                <li>${data.features[2].
      feature_name}</li>
                <li>${data.features[3].
      feature_name}</li>
              </ul>
            </div>
            <div>
              <h4>Intergrations</h4>
              <ul>${data.integrations.map((i) => `<li>${i}</li>`).join('')}</ul>
            </div>
          </div>
      </div>
      <!-- img and details -->
      <div class="col border border-danger rounded text-center mx-3 mb-5">
        <div class="img-container">
            <img class="mt-4 img-fluid" src="${data.image_link[0]}" alt="">
            <p class="btn btn-danger accuracy">${data.accuracy.score * 100 + '%' + '  Accuracy'}</p>
        </div>      
        <h2 class="mt-3">${data.use_cases[0].name}</h2>
        <p>${data.use_cases[0].description}</p>
      </div>
  </div>
  `;
}

loadData(3);

