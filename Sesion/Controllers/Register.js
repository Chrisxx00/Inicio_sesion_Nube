import { confirmacion, registerauth } from "../Controllers/Firebase.js";

const save_auth = document.getElementById('btnregister');
const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/

async function register() {
    const email = document.getElementById('edtuser').value;
    const password = document.getElementById('edtpassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmEmail = document.getElementById('confirmEmail').value;

    // Validar que las contraseñas coincidan
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres')
        return
      } else if (!specialCharacters.test(password)) {
        alert('La contraseña debe contener al menos un caracter especial')
        return
      } else if (email != confirmEmail) {
        alert('El usuario y la confirmación de usuario no coinciden')
        return
      } else if (password != confirmPassword) {
        alert('La contraseña y la confirmación de contraseña no coinciden')
        return
      } else {

      const validar = registerauth(email, password)
      const verificar = await validar
        .then((verificar) => {
          alert('Usuario registrado exitosamente')
  
          confirmacion()
            .then(() => {
              console.log('Correo electrónico de verificación enviado con éxito')
            })
            .catch((error) => {
              console.error(
                'Error al enviar correo electrónico de verificación:',
                error
              )
            })
          window.location.href = '../Home.html'
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          alert(errorMessage)
        })
    }
  }

window.addEventListener('DOMContentLoaded', async () => {
    save_auth.addEventListener('click', register);
});
