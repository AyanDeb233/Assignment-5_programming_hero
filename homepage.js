console.log("hey buddy");

let issues = [];
const counting = document.getElementById("count");
const cardContainer = document.getElementById("card-container");
const btnCard = document.getElementById("btn-card");
const spinning = document.getElementById("spinner");

const spinninMachine = (bar) => {
  if (bar == true) {
    spinning.classList.remove("hidden");
    btnCard.classList.add("hidden");
  } else {
    spinning.classList.add("hidden");
    btnCard.classList.remove("hidden");
  }
};

const loadData = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((result) => {
      issues = result.data;
      counting.innerText = issues.length;
      displayData(issues);
    });
};

const showIssues = (issue) => {
  spinninMachine(true);
  setTimeout(() => {
    if (issue === "all") {
      counting.innerText = issues.length;
      displayData(issues);
    } else {
      const filterIssue = issues.filter((p) => p.status === issue);
      counting.innerText = filterIssue.length;
      displayData(filterIssue);
    }
    spinninMachine(false);
  }, 150);
};

//labeling
const labelMachine = (labels) => {
  return labels
    .map((label) => {
      let labeltext = label.toUpperCase();
      let texting = label.toLowerCase();
      let imgSRC = "";
      let labelstyle = "bg-red-50 text-red-600 border-red-300";
      if (texting === "bug") {
        imgSRC = "./assets/BugDroid.png";
        labelstyle = "bg-red-50 text-red-600 border-red-300";
      } else if (texting === "help wanted" || texting === "good first issue") {
        imgSRC = "./assets/Lifebuoy.png";
        labelstyle = "bg-yellow-50 text-yellow-600 border-yellow-300";
      } else if (texting == "enhancement" || texting == "documentation") {
        imgSRC = "./assets/Sparkle.png";
        labelstyle = "bg-green-50 text-green-600 border-green-300";
      }

      const imgHtml = imgSRC
        ? `<img src="${imgSRC}" class="w-4 h-4" alt=""></img>`
        : "";

      return `<div class="flex items-center border px-2 py-0.5 rounded-full gap-1 ${labelstyle}">
      ${imgHtml} <span class="text-[12px]">${labeltext}</span>
     </div>`;
    })
    .join(" ");
};

const modaling = (id) => {
  const modal = document.getElementById("my_modal_1");
  modal.showModal();
  const modalBox = document.getElementById("modal-container");

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((result) => {
      const info = result.data;
      modalBox.innerHTML = `
      <div class="space-y-3 p-1">
          <!-- part 1 -->
          <h1 class="text-[24px] font-semibold">${info.title ? info.title : "title not found"}</h1>
          <!-- part 2 -->
          <div class="flex flex-col sm:flex-row justify-start items-center gap-2">
            <div class="btn ${info.status === "open" ? "bg-[#00a96e]" : "bg-[#aa58f7]"} text-white p-3 rounded-full text-[12px] border-none">
              ${info.status === "open" ? "Opened" : "Closed"}
            </div>
            <div class="flex items-center space-x-2">
              <h1 class="border h-2 w-2 rounded-full border-gray-200 bg-gray-400"></h1>
              <h1 class="text-[14px] text-gray-600">Opened by ${info.author ? info.author : "not found author"}</h1>
              <h1 class="border h-2 w-2 rounded-full border-gray-200 bg-gray-400"></h1>
              <h1 class="text-[14px] text-gray-600">${new Date(info.createdAt).toLocaleDateString("en-GB")}</h1>
            </div>
          </div>
          <!-- part3  -->
           <div class="bugginng flex flex-wrap gap-2 py-2">
              ${labelMachine(info.labels)}
           </div>
           <!-- part4 -->
            <h1 class="text-[14px] pb-5 text-gray-600">${info.description}</h1>
            <!-- part 5 -->
             <div class="flex items-center justify-start gap-[100px] bg-gray-50 p-3 rounded-[16px]">
              <!-- 1 -->
              <div class="text-[16px]">
                <h1 class="text-gray-500">Assignee:</h1>
                <h1 class="font-semibold">${info.assignee ? info.assignee : "Not assign"}</h1>
              </div>
              <!-- 2 -->
              <div>
                <h1 class="text-gray-500">Priority:</h1>
                <div>
                 ${
                   info.priority == "high"
                     ? `
                     <div class="p-1 bg-red-100 rounded-3xl w-[80px]">
                     <h1 class="text-red-500 font-semibold text-center text-xs">HIGH</h1>
                     </div>`
                     : info.priority == "medium"
                       ? `
                     <div class="p-1 bg-orange-100 rounded-3xl w-[80px]">
                     <h1 class="text-orange-500 font-semibold text-center text-xs">MEDIUM</h1>
                     </div>`
                       : `<div class="p-1 bg-gray-300 rounded-3xl w-[80px]">
                     <h1 class="text-gray-700 font-semibold text-center text-xs">LOW</h1>
                    </div>`
                 }
            </div>
              </div>
             </div>

        </div>

        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-primary">Close</button>
          </form>
        </div>


      `;
    });
};

const displayData = (information) => {
  console.log(information);

  //1. get the container and empty it
  cardContainer.innerHTML = "";

  //     "id": 1,
  // "title": "Fix navigation menu on mobile devices",
  // "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
  // "status": "open",
  // "labels": [
  // "bug",
  // "help wanted"
  // ],
  // "priority": "high",
  // "author": "john_doe",
  // "assignee": "jane_smith",
  // "createdAt": "2024-01-15T10:30:00Z",
  // "updatedAt": "2024-01-15T10:30:00Z"

  //2. get the each element
  for (let info of information) {
    const cardDiv = document.createElement("div");
    cardDiv.onclick = () => modaling(info.id);
    cardDiv.classList = "cursor-pointer";
    cardDiv.innerHTML = `
        <div class="card flex flex-col h-full border-t-4 ${info.status == "open" ? `border-[#00a96e]` : `border-[#a855f7]`} shadow-lg p-3 space-y-3">
           <!-- part 1 -->
            <div class="flex justify-between items-center mt-2">
               <div>${info.status == "open" ? `<img src="./assets/Open-Status.png" alt=""></img>` : `<img src="./assets/Closed- Status .png" alt=""></img>`}</div>
                <div>${
                  info.priority == "high"
                    ? `
                     <div class="p-1 bg-red-100 rounded-3xl w-[80px]">
                     <h1 class="text-red-500 font-semibold text-center text-xs">HIGH</h1>
                     </div>`
                    : info.priority == "medium"
                      ? `
                     <div class="p-1 bg-orange-100 rounded-3xl w-[80px]">
                     <h1 class="text-orange-500 font-semibold text-center text-xs">MEDIUM</h1>
                     </div>`
                      : `<div class="p-1 bg-gray-100 rounded-3xl w-[80px]">
                     <h1 class="text-gray-500 font-semibold text-center text-xs">LOW</h1>
                    </div>`
                }
                </div>
            </div>
            <!-- part 2 -->
             <div class="flex-grow space-y-3 mb-4">
            <h1 class="text-[14px] font-bold text-gray-800 leading-tight">
              ${info.title ? info.title : "No title found"}
            </h1> 
             <p class="text-[12px] text-gray-500 line-clamp-3">
               ${info.description ? info.description : "No description found"}
              </p>
             <div class="bug-container flex flex-wrap gap-2">
                ${labelMachine(info.labels)}
             </div>
              </div>
               <hr class ="border-gray-300 border-t-2">
               <!-- part 5 -->
               <div class="text-[12px] mt-2 text-gray-500">
                   <h1>#${info.id} by ${info.author ? info.author : "Not found author"}</h1>
                   <p>${new Date(info.createdAt).toLocaleDateString()}</p>
               </div>
         </div>
        `;
    cardContainer.append(cardDiv);
  }
};
loadData();
