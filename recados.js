getAllUsers = () => {
   return JSON.parse(localStorage.getItem('users'));
};

getLoggedUser = () => {
   return localStorage.getItem('loggedIn');
};

loggedUserBaseCreation = () => {
   let loggedUser = getLoggedUser();
   let users = getAllUsers();
   for (let user of users) {
      if (user.username == loggedUser) {
         return user;
      }
   }
};
let objUser = loggedUserBaseCreation();

createNoteNumb = () => {
   let noteNumb = objUser.noteNumb;
   if (!noteNumb) {
      noteNumb = 1;
      objUser.noteNumb = noteNumb;
      let users = getAllUsers();
      let loggedUser = getLoggedUser();
      for (user of users) {
         if (user.username == loggedUser) {
            user.noteNumb = noteNumb;
         }
      }
      localStorage.setItem('users', JSON.stringify(users));
      return noteNumb;
   } else return noteNumb;
};

let noteNumb = createNoteNumb();

createNewNote = () => {
   if (!!document.querySelectorAll('input')[0].value && !!document.querySelectorAll('input')[1].value) {
      let newNote = {
         numero: `${noteNumb}`,
         descricao: `${document.querySelectorAll('input')[0].value}`,
         detalhamento: `${document.querySelectorAll('input')[1].value}`,
      };
      noteNumb++;
      objUser.notes.push(newNote);
      let users = getAllUsers();
      let loggedUser = getLoggedUser();
      for (let user of users) {
         if (user.username == loggedUser) {
            user.notes = objUser.notes;
            user.noteNumb = noteNumb;
         }
      }
      localStorage.setItem('users', JSON.stringify(users));
      document.querySelectorAll('input')[0].value = '';
      document.querySelectorAll('input')[1].value = '';
      document.querySelector('#modalNewNoteTitle').innerHTML = `Novo recado salvo!`;
      document.querySelector('#modalNewNoteBody').innerHTML = `Seu novo recado foi salvo com sucesso.`;
      objUser = loggedUserBaseCreation();
      let listBody = document.querySelector('#listBody');
      listBody.innerHTML = '';
      createNotesList();
   } else {
      document.querySelector('#modalNewNoteTitle').innerHTML = `Deu ruim!`;
      document.querySelector('#modalNewNoteBody').innerHTML = `Precisa adicionar descrição E detalhamento!`;
   }
};

setNewNoteButton = () => {
   let newNoteButton = document.querySelector('#newNoteButton');
   newNoteButton.setAttribute('onclick', 'createNewNote();');
};
setNewNoteButton();

createNotesList = () => {
   for (let note of objUser.notes) {
      let listBody = document.querySelector('#listBody');
      let row = document.createElement('tr');
      let th = document.createElement('th');
      th.setAttribute('scope', 'row');
      th.innerHTML = objUser.notes.findIndex((x) => x.numero == note.numero) + 1;
      let td1 = document.createElement('td');
      td1.innerHTML = note.descricao;
      let td2 = document.createElement('td');
      td2.innerHTML = note.detalhamento;
      let td3 = document.createElement('td');
      let deleteButton = document.createElement('button');
      deleteButton.innerHTML = `APAGAR`;
      deleteButton.setAttribute('class', 'btn btn-danger mx-2');
      deleteButton.setAttribute('data-bs-toggle', 'modal');
      deleteButton.setAttribute('data-bs-target', '#modalDeleteNote');
      deleteButton.setAttribute('onclick', `changeModalDeleteButton(${note.numero});`);
      let editButton = document.createElement('button');
      editButton.innerHTML = `EDITAR`;
      editButton.setAttribute('class', 'btn btn-success');
      editButton.setAttribute('onclick', `changeModalEditButton(${note.numero})`);
      editButton.setAttribute('data-bs-toggle', 'modal');
      editButton.setAttribute('data-bs-target', '#modalEditNote');

      td3.appendChild(deleteButton);
      td3.appendChild(editButton);
      row.appendChild(th);
      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      listBody.appendChild(row);
   }
};
createNotesList();

changeModalDeleteButton = (number) => {
   let deleteButtonModal = document.querySelector('#deleteButtonModal');
   deleteButtonModal.setAttribute('onclick', `deleteNote(${number});`);
};

deleteNote = (number) => {
   objUser.notes = objUser.notes.filter((filtered) => {
      return filtered.numero != number;
   });
   let users = getAllUsers();
   let loggedUser = getLoggedUser();
   for (user of users) {
      if (user.username == loggedUser) {
         user.notes = objUser.notes;
      }
   }
   localStorage.setItem('users', JSON.stringify(users));
   objUser = loggedUserBaseCreation();
   let listBody = document.querySelector('#listBody');
   listBody.innerHTML = '';
   createNotesList();
};

editNote = (numb) => {
   for (note of objUser.notes) {
      if (note.numero == numb) {
         if (!!document.querySelectorAll('input')[2].value && document.querySelectorAll('input')[3].value) {
            note.descricao = document.querySelectorAll('input')[2].value;
            note.detalhamento = document.querySelectorAll('input')[3].value;
            document.querySelectorAll('input')[2].value = '';
            document.querySelectorAll('input')[3].value = '';
         } else {
            alert('deu ruim');
            document.querySelectorAll('input')[2].value = '';
            document.querySelectorAll('input')[3].value = '';
         }
      }
   }
   let users = getAllUsers();
   let loggedUser = getLoggedUser();
   for (user of users) {
      if ((user.username = loggedUser)) {
         user.notes = objUser.notes;
      }
   }
   localStorage.setItem('users', JSON.stringify(users));
   objUser = loggedUserBaseCreation();
   let listBody = document.querySelector('#listBody');
   listBody.innerHTML = '';
   createNotesList();
};

changeModalEditButton = (numb) => {
   let editButtonModal = document.querySelector('#editButtonModal');
   editButtonModal.setAttribute('onclick', `editNote(${numb});`);
};
