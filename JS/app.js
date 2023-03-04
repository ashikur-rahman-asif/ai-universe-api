// load data from api
const loadData = async () => {
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const seeMoreSection = document.getElementById("see-more-section");
    if (data.data.tools.length > 6) {
      seeMoreSection.classList.remove("d-none");
      displayData(data.data.tools.slice(0, 6));
    }
  } catch (error) {
    console.log("Error!!!" + error);
  }
};
const displayData = (data) => {
  // console.log(data)
  const divContainer = document.getElementById("divSection");
  divContainer.innerHTML = "";
  // getting every object
  data.forEach((element) => {
    // console.log(element.published_in)
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="card p-3">
        <img src="${
          element.image
            ? element.image
            : '<i class="fa-sharp fa-solid fa-circle-exclamation"></i>'
        }" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <div>
                <ol type="1" id="listItem">
                    <li>${
                      element.features[0]
                        ? element.features[0]
                        : '<b class="text-danger">No Data Found</b>'
                    }</li>
                    <li>${
                      element.features[1]
                        ? element.features[1]
                        : '<b class="text-danger">No Data Found</b>'
                    }</li>
                    <li>${
                      element.features[2]
                        ? element.features[2]
                        : '<b class="text-danger">No Data Found</b>'
                    }</li>
                </ol>
            </div>
            <h5>${element.name}</h5>
            <div class="d-flex justify-content-between">
                <div class="d-flex gap-2 justify-content-start">
                    <div class="date">
                        <i class="fa-solid fa-calendar-days"></i>
                    </div>
                    <div class="publish">
                        <p>${element.published_in}</p>
                    </div>
    
                </div>
                <div>
                    <button onclick="itemDetails('${
                      element.id
                    }')" class="arrow-btn" data-bs-toggle="modal"
                        data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right-long"></i></button>
                </div>
            </div>
        </div>`;

    divContainer.appendChild(div);
    toggleSpinner(false);
  });
};

// see more btn working function
document.getElementById("see-more-btn").addEventListener("click", function () {
  const seeMoreBtn = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      displayData(data.data.tools);
    } catch (error) {
      console.log("Error!!!!;" + error);
    }
  };
  seeMoreBtn();
});
const itemDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => modalData(data.data));
};
const modalData = (modalData) => {
  const leftCard = document.getElementById("left-card");
  leftCard.innerText = modalData.description;
  const rightCard = document.getElementById("right-card");
  rightCard.innerHTML = `
    <img src="${
      modalData.image_link[0] ? modalData.image_link[0] : "Not Found Image"
    }" class="card-img-top rounded" alt="...">
        <div class="accuracy-section">
            ${
              modalData.accuracy.score * 100 > 80
                ? '<button class="btn btn-success">Accuracy: ' +
                  modalData.accuracy.score * 100 +
                  "%</button>"
                : '<button class="btn btn-danger">Accuracy Low</button>'
            }

        </div>
        <div class="card-body">
            <h5 class="card-title text-center">${
              modalData.input_output_examples[0].input
            }</h5>
            <p class="card-text text-center">${
              modalData.input_output_examples[0].output
            }</p>

        </div>

    `;
  const priceItem = document.getElementById("price");
  priceItem.innerHTML = `
            <div class="col">
                <div class="card py-3">
                    <div class="card-body p-4  p-lg-1 text-center">
                        <h5 class="card-title text-success">${modalData.pricing[0].price}</h5>
                        <h5 class="card-title text-success">${modalData.pricing[0].plan}</h5>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="card py-3">
                    <div class="card-body p-4  p-lg-1 text-center">
                        <h5 class="card-title text-warning">${modalData.pricing[1].price}</h5>
                        <h5 class="card-title text-warning">${modalData.pricing[1].plan}</h5>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="card py-1">
                     <div class="card-body p-4 p-lg-1 text-center">
                         <h5 class="card-title text-danger">${modalData.pricing[2].price}</h5>
                         <h5 class="card-title text-danger">${modalData.pricing[2].plan}</h5>
                    </div>
                </div>
            </div>
    `;
  const feature = document.getElementById("feature");
  feature.innerHTML = `
                    <div class="col">
                        <div class="card">
                             <div class="card-body p-1">
                                <h2 class="card-title fw-bold">Feature</h2>
                                <ul>
                                    <li>${
                                      modalData.features[1].feature_name
                                    } </li>
                                    <li>${
                                      modalData.features[2].feature_name
                                    } </li>
                                    <li>${
                                      modalData.features[3].feature_name
                                    } </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="card">
                            <div class="card-body p-1 feature">
                                <h2 class="card-title fw-bold">Integration</h2>
                                 <ul>
                                    <li>${
                                      modalData.integrations[0]
                                        ? modalData.integrations[0]
                                        : '<b class="text-danger">No Data Found</b>'
                                    } </li>
                                    <li>${
                                      modalData.integrations[1]
                                        ? modalData.integrations[1]
                                        : '<b class="text-danger">No Data Found</b>'
                                    } </li>
                                     <li>${
                                       modalData.integrations[2]
                                         ? modalData.integrations[2]
                                         : '<b class="text-danger">No Data Found</b>'
                                     } </li>
                                </ul>
                            </div>
                        </div>
                    </div>
    `;
};
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
document.getElementById("sort-by-date").addEventListener("click", function () {
  const sortByDate = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const sortData = data.data.tools;
      sortData.sort(
        (a, b) => new Date(a.published_in) - new Date(b.published_in)
      );
      const seeMoreSection = document.getElementById("see-more-section");
      if (sortData.length > 6) {
        seeMoreSection.classList.remove("d-none");
        displayData(sortData);
      }
    } catch (error) {
      console.log("Error!!!!" + error);
    }
  };
  sortByDate();
});
loadData();
