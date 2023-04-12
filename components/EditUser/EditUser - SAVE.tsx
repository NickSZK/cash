import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'

import { Square } from "../../assets/Icons/Square"
import { SquareXMark } from "../../assets/Icons/SquareXMark"
import { UserPen } from "../../assets/Icons/UserPen"
import { UserPlus } from "../../assets/Icons/UserPlus"
import { ArrowLeftLong } from "../../assets/Icons/ArrowLeftLong"
import { useEffect } from "react"

export default function EditUserSave() {
   const server = 'http://localhost:3001'

   const { id } = useParams()
   console.log('ID do Usuário: ' + id)

   const navigate = useNavigate()

   const [user, setUsers] = useState([])
   const [admin, setAdmin] = useState(false)

   useEffect(() => {  // Lista os Arquivos
      axios.get(`${server}/users`)
         .then(response => setUsers(response.data.result))
         .catch(err => console.log(err))
   }, [])

   useEffect(() => {
      getUser()
   })

   let newUserName = document.querySelector('#newUserName') as HTMLInputElement
   let newUserLogin = document.querySelector('#newUserLogin') as HTMLInputElement
   let newUserPassword = document.querySelector('#newUserPassword') as HTMLInputElement
   let newUserAdmin = document.querySelector('#isAdmin') as HTMLSpanElement | Boolean
   
   async function getUser() {
      await axios.get(`${server}/user/${id}`)
         .then(response => {
            let userName = response.data.result[0].userName 
            let userLogin = response.data.result[0].userLogin 
            let userPassword = response.data.result[0].userPassword 
            // let userAdmin = response.data.result[0].userAdmin 

            newUserName.value = userName
            newUserLogin.value = userLogin
            newUserPassword.value = userPassword
            newUserAdmin = admin

            // console.log('Valor do admin é: ' + newUserAdmin)
            // console.log('bc ' + newUserAdmin)
            console.log(response)
         })
         .catch(err => alert(err.response.data))
   }

   //getUser()

   const updateUser = async(id: string) => {

      if ((newUserName.value !== '') && (newUserLogin.value !== '') && (newUserPassword.value !== '')) {
         // alert(
         //    `
         //       Nome Completo: ${newUserName.value}
         //       Login: ${newUserLogin.value}
         //       Senha: ${newUserPassword.value}
         //       Admin: ${newUserAdmin ? 'Sim' : 'Não'}
         //    `
         // )
         //console.log(`${server}/edit/user/${id}`)

         await axios.put(`${server}/edit/user/${id}`, {
            newUserName: newUserName.value,
            newUserLogin: newUserLogin.value,
            newUserPassword: newUserPassword.value,
            newUserAdmin: newUserAdmin
         })
            .then(response => {
               alert(response.data.msg)
            })
            //.then(setTimeout(() => { navigate('/') }, 5000))
            //.then( alert('Usuario cadastrado no sistema com sucesso') )
            .catch(err => alert(err.response.data.msg))
      } else {
         alert('Preencha os campos')
      }
   }


   return (
      <>
         <main className="container flex">
            <div className="forms">

               <section className="registerNewUser w-100 h-100  f column sbt">
                  <h4 className="flex">
                     Registro de Usuário
                     <UserPlus w='24' h='24' fill='#0DCAF0' className='ml-1' />
                  </h4>

                  <div className="inputForm">
                     <input type="text" name="newUserName" id="newUserName"
                        placeholder="Nome Completo"
                        required
                        onInvalid={e => (e.target  as HTMLInputElement).setCustomValidity('Digite o nome do novo colaborador')}
                        onInput={e => (e.target  as HTMLInputElement).setCustomValidity('')} />
                  </div>

                  <div className="inputForm">
                     <input type="text" name="newUserLogin" id="newUserLogin" required placeholder="Login"
                        onInvalid={e => (e.target  as HTMLInputElement).setCustomValidity('Digite o login do novo colaborador')}
                        onInput={e => (e.target  as HTMLInputElement).setCustomValidity('')} />
                  </div>

                  <div className="inputForm">
                     <input type="password" name="newUserPassword" id="newUserPassword" required placeholder="Senha"
                        onInvalid={e => (e.target  as HTMLInputElement).setCustomValidity('Digite uma senha para o novo colaborador')}
                        onInput={e => (e.target  as HTMLInputElement).setCustomValidity('')} />
                  </div>

                  <div className="isAdminDiv flex" >
                     <span className="flex" id="isAdmin" onClick={() => setAdmin(!admin)}>
                        {
                           admin ?
                              <SquareXMark w='24' h='24' fill='#0DCAF0' className='mr-2' /> /* TRUE */ :
                              <Square w='24' h='24' fill='#0DCAF0' className='mr-2' /> /* FALSE */
                        }
                     </span>
                     <p>Usuário Administrador</p>
                  </div>

                  <button
                     id="submitNewUser"
                     className="submitNewUser btn btn-info"
                     onClick={ () => updateUser(`${id}`) } >
                     Atualizar dados
                     <UserPen w='24' h='24' fill='var(--bs-dark)' className='ml-2' />
                  </button>

                  <Link to='/' className="btn btn-warning" >
                     Voltar
                     <ArrowLeftLong w='24' h='24' fill='var(--bs-dark)' className='ml-1' />
                  </Link>
               </section>
            </div>
         </main>
      </>
   )
}