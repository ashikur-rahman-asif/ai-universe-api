// load data from api
const loadData = async () => {
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
                    <button onclick="modalDetails('${
                      element.id
                    }')" class="arrow-btn" data-bs-toggle="modal"
                        data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right-long"></i></button>
                </div>
            </div>
        </div>`;

    divContainer.appendChild(div);
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
loadData();
