loginValidation = () => {
   let username = document.querySelectorAll('input')[0].value;
   let password = document.querySelectorAll('input')[1].value;
   let users = JSON.parse(localStorage.getItem('users'));
   for (let user of users) {
      if (user.username == username && user.password == password) {
         localStorage.setItem('loggedIn', username);
         document.querySelectorAll('input')[0].value = '';
         window.location.assign('recados.html');
         return;
      }
   }
   if (!username || !password) {
      alert('Preencha login e senha ou crie sua conta.');
      return;
   }
   alert('Username e/ou senha não encontrados.');
};
