createAccount = () => {
   let users = JSON.parse(localStorage.getItem('users')) ?? [];
   let newUser = {
      username: document.querySelectorAll('input')[0].value,
      password: document.querySelectorAll('input')[1].value,
      notes: [],
   };
   let passwordConfirm = document.querySelectorAll('input')[2].value;
   if (newUser.password == passwordConfirm && !!newUser.username && !!newUser.password && !!passwordConfirm) {
      for (let user of users) {
         if (user.username == newUser.username) {
            alert('Este username está em uso.');
            return;
         }
      }
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Conta criada com sucesso, faça login.');
      window.location.assign('index.html');
      return;
   }
   if (newUser.password != passwordConfirm) {
      alert('Senha diferente da confirmação.');
   } else {
      alert('Preencha todos os campos.');
   }
};
