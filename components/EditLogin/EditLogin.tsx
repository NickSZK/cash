import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRightToBracket  } from "../../assets/Icons/ArrowRightToBracket";
import { IdCard } from "../../assets/Icons/IdCard";

export const Login = () => {

   const loginUsers = async() => {
      const db = 'http://localhost:3001'
      // const navigate = useNavigate()

      let userLogin = document.querySelector('#userLogin') as HTMLInputElement
      let userPassword = document.querySelector('#userPassword') as HTMLInputElement

      if (userLogin.value && userPassword.value !== '') {
         // alert(`
         //    Login: ${userLogin}
         //    Senha: ${userPassword}
         // `)
         // const Navigation = useNavigate()

         const login = userLogin.value
         const password = userPassword.value

         const response = await axios.post(`${db}/login`, {
            userLogin: userLogin.value,
            userPassword: userPassword.value
         })
         //.then(alert(`User: ${userLogin.value}, ${userPassword.value}`))
         // .then(response => {
         //    alert(response.data.msg)
         // })

         if (response.status !== 200) {
            alert(`Colaborador não encontrado`)
         } else {
            alert(`Login no Front`)
            // alert(`Logado como ${login}`)
         }

      } else {
         alert('Colaborador, por obséquio logue com vossa matricula e senha. Caso contrário, sujeito a pancada. 🤜😵🤛')
      }
   }

   const loginUser = async() => {
      const db = "http://localhost:3001";

      let userLogin = document.querySelector("#userLogin") as HTMLInputElement
      let userPassword = document.querySelector("#userPassword") as HTMLInputElement

      if (userLogin.value && userPassword.value !== "") {
         const login = userLogin.value;
         const password = userPassword.value;

         const response = await axios.post(`${db}/login`, {
            userLogin: login,
            userPassword: password,
         });

         alert(`User: ${userLogin.value}, ${userPassword.value}`);

         if (response.status !== 200) {
            alert(`Colaborador não encontrado`);
         } else {
            alert(`Login no Front`);
         }
      } else {
         alert(
            "Colaborador, por obséquio logue com vossa matricula e senha. Caso contrário, sujeito a pancada. 🤜😵🤛"
         );
      }
   }

   return (
      <main className="container flex">
         <div className="forms">

            <section className="loginUser w-100 h-100  f column sbt z-index-50">
               <h4 className="flex">
                  Identifique-se
                  <IdCard w='25' h='25' fill='var(--bs-info)' className='ml-1' />
               </h4>

               <div className="inputForm">
                  <input type="text" name="userLogin" id="userLogin"
                     placeholder="Login / Matrícula"
                     required
                     onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Digite seu Login/Matrícula')}
                     onInput={e => (e.target as HTMLInputElement).setCustomValidity('')} />
               </div>

               <div className="inputForm">
                  <input type="password" name="userPassword" id="userPassword"
                     required
                     placeholder="Senha"
                     onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Digite a sua senha')}
                     onInput={e => (e.target as HTMLInputElement).setCustomValidity('')} />
               </div>

               <div className="actionsLogin f sbt " >
                  <Link to='/' className="ForgotPassword secondary-hover flex">
                     Esqueci minha senha
                  </Link>

                  <Link to='/registerNewUser' className="RegisterUserNow info-hover flex ">
                     Registrar Colaborador
                  </Link>
               </div>

               <button
                  id="LogonUser"
                  className="LogonUser btn btn-info"
                  onClick={loginUser} >
                  Logar no Sistema
                  <ArrowRightToBracket w='23' h='23' fill='var(--text-color)' className='ml-1' />
               </button>
            </section>
         </div>
      </main>
   )
}