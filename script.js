getAllNotes();

async function getAllNotes() {
    const res = await fetch('http://localhost:8080/all');
    const notes = await res.json();
    renderNotes(notes)
    console.log(notes);
}

function change(event) {
    console.log(event.data)
    let obj = {
        note_id: parseInt(event.target.id),
        note_txt: event.target.value
    };
    socket.send(JSON.stringify(obj));
}

function renderNotes(notes) {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
    notes.forEach((note) => {
        createTextArea(note);
    })
}
function createTextArea(note) {
    const noteDiv = document.createElement('div');
    const noteElement = document.createElement('textarea');
    noteElement.value = note.note_txt;
    noteElement.id = note.note_id;
    noteElement.rows = '4';
    noteElement.cols = '20'
    noteElement.addEventListener("input", change)
    noteDiv.appendChild(noteElement);
    notesContainer.appendChild(noteDiv);

    createButtons(noteDiv, note)
}
function createButtons(noteDiv, note) {
    const updateBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    updateBtn.id = note.note_id; updateBtn.innerText = 'Update'; updateBtn.addEventListener("click", updateNote); noteDiv.appendChild(updateBtn);
    deleteBtn.id = note.note_id; deleteBtn.innerText = 'Delete'; deleteBtn.addEventListener("click", deleteNote); noteDiv.appendChild(deleteBtn);
}

async function updateNote(event) {
    const note = document.getElementById(`${event.target.id}`);
    const res = await fetch('http://localhost:8080/update', {
        method: "POST",
        body: JSON.stringify({
            note_id: event.target.id,
            note_txt: note.value
        })
    });
    console.log(res);
}

async function deleteNote(event) {
    const res = await fetch('http://localhost:8080/delete', {
        method: "POST",
        body: JSON.stringify({
            note_id: event.target.id,
        })
    });
    console.log(res);
    getAllNotes()
}

async function addNote() {
    let noteCont = document.getElementById('notesContainer')
    let lastId = noteCont.lastChild.childNodes[0].id
    let note = {
        note_id: parseInt(lastId) + 1,
        note_txt: ""
    }
    const res = await fetch('http://localhost:8080/add', {
        method: "POST",
        body: JSON.stringify(note)
    });
    createTextArea(note)
}

const socket = new WebSocket('ws://localhost:8080/');

socket.onopen = () => {
    console.log('Connection Working');
};
socket.onmessage = (event) => {
    let noteData = JSON.parse(event.data)
    const noteBox = document.getElementById(`${noteData.note_id}`);
    noteBox.value = noteData.note_txt;
    if (noteData.note_id == 1) {
        const test = document.getElementById(`test`);
        test.innerHTML = noteData.note_txt;
    }
};


