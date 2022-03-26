const Addbtn = document.querySelector(".btn");

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const myData = `
                <div class="operation">
                    <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
                </div>
                <div class="main ${text ? "" : "hidden"}"></div>
                <textarea class="words ${text ? "hidden" : ""}"></textarea>`;

  note.insertAdjacentHTML("afterbegin", myData);
  // console.log(note)
  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const mainButton = note.querySelector(".main");
  const textareaButton = note.querySelector("textarea");

  // deleting the note
  deleteButton.addEventListener("click", () => {
    note.remove();
    updateLocalStorageData();
  });

  // toggle using edit button
  textareaButton.value = text;
  mainButton.innerHTML = text;

  editButton.addEventListener("click", () => {
    mainButton.classList.toggle("hidden");
    textareaButton.classList.toggle("hidden");
  });

  textareaButton.addEventListener("change", (event) => {
    const valuee = event.target.value;
    //console.log(valuee)
    mainButton.innerHTML = valuee;

    updateLocalStorageData();
  });

  //document.body.appendChild(note);
  document.querySelector(".main-section").appendChild(note);
};

Addbtn.addEventListener("click", () => addNewNote());

//===================
// sending our data on localStorage
const updateLocalStorageData = () => {
  const textareaData = document.querySelectorAll("textarea");
  const notes = [];
  //console.log(notes)
  textareaData.forEach((element) => {
    //console.log(element)
    return notes.push(element.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};
//=========================
// getting our data from localStorage
const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => addNewNote(note));
}
