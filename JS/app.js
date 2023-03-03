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

loadData();
