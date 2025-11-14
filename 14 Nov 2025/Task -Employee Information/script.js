const form = document.getElementById("employeeForm");
const tableBody = document.querySelector("#employeeTable tbody");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const position = document.getElementById("position").value;

    const row = document.createElement("tr");
    row.innerHTML = `<td>${name}</td><td>${age}</td><td>${position}</td>`;
    tableBody.appendChild(row);

    form.reset();
});
