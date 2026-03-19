console.log("hey buddy");

let issues = [];
const counting = document.getElementById("count");

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
  if (issue === "all") {
    counting.innerText = issues.length;
    displayData(issues);
  } else {
    const filterIssue = issues.filter((p) => p.status === issue);
    counting.innerText = filterIssue.length;
    displayData(filterIssue);
  }
};

const displayData = (information) => {
  console.log(information);

  //1. get the container and empty it
  const cardContainer = document.getElementById("card-container");
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
    // labeling
    const createLabel = info.labels
      .map((label) => {
        let labeltext = label.toUpperCase();
        let texting = label.toLowerCase();
        let imgSRC = "";
        let labelstyle = "bg-red-50 text-red-600 border-red-300";
        if (texting === "bug") {
          imgSRC = "./assets/BugDroid.png";
          labelstyle = "bg-red-50 text-red-600 border-red-300";
        } else if (
          texting === "help wanted" ||
          texting === "good first issue"
        ) {
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

    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
        <div class="card flex flex-col h-full border-t-4 ${info.status == "open" ? `border-[#00a96e]` : `border-[#a855f7]`} shadow-md p-3 space-y-3">
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
                ${createLabel}
             </div>
              </div>
               <hr class ="border-gray-400">
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
