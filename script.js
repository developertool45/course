const API_URL =
    "https://api.classplusapp.com/v2/course/preview/similar/eyJvcmdJZCI6MTI4Nn0=?tabCategoryId=1&limit=500&offset=0&requiredFilters=[100]";
  

const searchInput = document.getElementById("searchInput");
// Filter courses based on search input
function filterCourses() {
  const filter = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll("#courseTable tr");

  rows.forEach((row) => {
    const courseName = row.cells[1].textContent.toLowerCase();
    if (courseName.includes(filter)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}
searchInput.addEventListener("input", filterCourses);

async function loadCourses() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    console.log(result.data.coursesData);

    // filter courses with input search

    // API structure ke hisab se adjust kar lena
    const courses = result.data.coursesData || [];
    const tbody = document.getElementById("courseTable");

    tbody.innerHTML = "";

    courses.forEach((course, index) => {
      const courseName = course.name || course.courseName || "N/A";

      const courseUrl =
        course.shareableLink ||
        course.singlePaymentLink ||
        `https://www.eadonlineclasses.com/courses/${course.id}`;

      tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td class="courseName">${courseName}: <a href="${courseUrl}" target="_blank">
                            ${courseUrl}
                        </a> <button id="copyButton">Copy</button>
                    </td>
                 
                </tr>
            `;
    })    
      coptyCourse();
      
  } catch (error) {
    console.error(error);
    document.getElementById("courseTable").innerHTML = `<tr>
            <td colspan="3">
                Failed to load courses
            </td>
        </tr>`;
  }
}

loadCourses();

function coptyCourse() {
    const copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", () => {
      const courseUrl = copyButton.parentNode.querySelector("a").href;
        navigator.clipboard.writeText(courseUrl).then(() => {
          copyButton.textContent = "Copied";
        console.log("Copied to clipboard: " + courseUrl);
      });
    });
}