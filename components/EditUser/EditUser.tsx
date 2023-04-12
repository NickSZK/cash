import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'

import { Square } from "../../assets/Icons/Square"
import { SquareXMark } from "../../assets/Icons/SquareXMark"
import { UserPen } from "../../assets/Icons/UserPen"
import { UserPlus } from "../../assets/Icons/UserPlus"
import { ArrowLeftLong } from "../../assets/Icons/ArrowLeftLong"
import { useEffect } from "react"
import { XMark } from "../../assets/Icons/XMark"
import { ActionsType } from "../../types/ActionsType"
import { UserType } from "../../types/UserType"
import { allUsers, findUserById } from "../../services/user.service"

export const EditUser = ({ close, id, listUsers }: ActionsType) => {
   const server = 'http://localhost:3001'
   const navigate = useNavigate()
   
   // Get All Users
   const [users, setUsers] = useState<UserType[]>([])
   const [user, setUser] = useState<UserType>({
      id: '',
      userName: '',
      userLogin: '',
      userPassword: '',
      userAdmin: false
   })
   const [admin, setAdmin] = useState(false)


   useEffect(() => {  // Lista os Arquivos
      // axios.get(`${server}/users`)
      //    .then(response => setUsers(response.data.result))
      //    .catch(err => console.log(err))

      if(listUsers) {
         setUsers(listUsers)

         findUserById(id!)
            .then(setUser)
            .catch(e => console.log(e))

         allUsers()
            .then(setUsers)
            .catch(e => console.log(e))
         }
      }, [])
      
   useEffect(() => {
      getUser()
   }, [users])

   let newUserName = document.querySelector('#newUserName') as HTMLInputElement
   let newUserLogin = document.querySelector('#newUserLogin') as HTMLInputElement
   let newUserPassword = document.querySelector('#newUserPassword') as HTMLInputElement
   let newUserAdmin = document.querySelector('#isAdmin') as HTMLSpanElement | Boolean
   
   const getUser = async() => {
      await axios.get(`${server}/user/${id}`)
         .then(response => {
            let userName = response.data.result[0].userName 
            let userLogin = response.data.result[0].userLogin 
            let userPassword = response.data.result[0].userPassword 
            let userAdmin = response.data.result[0].userAdmin 
            // console.log(`User admin?: ${userAdmin}`)
            userAdmin ? setAdmin(true) : setAdmin(false)

            newUserName.value = userName
            newUserLogin.value = userLogin
            newUserPassword.value = userPassword
            newUserAdmin = userAdmin

            // console.log('Valor do admin é: ' + newUserAdmin)
            // console.log('bc ' + newUserAdmin)
            // console.log(response)
         })
         .catch(err => alert(err.response.data))
   }

   //getUser()

   const handleUpdateUser = async(id: string) => {

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
            newUserAdmin: admin
         })
            .then(response => {
               alert(response.data.msg)

               if(close) {
                  close()
               }

            })
            //.then(setTimeout(() => { navigate('/') }, 5000))
            //.then( alert('Usuario cadastrado no sistema com sucesso') )
            .catch(err => alert(err.response.data.msg))
      } else {
         alert('Preencha os campos')
      }
   }

   const handleUserAdmin = () => {
      //newUserAdmin = admin
      //console.log(!admin)
      return setAdmin(!admin)
   }

   return (
      <>
         <section className="editUserForm w-100 h-100 f column sbt z-index-50">
               <h4 className="flex sbt">
                  <div className="flex text-center w-100">   
                     Edição de Usuário
                     <UserPlus w='24' h='24' fill='#0DCAF0' className='ml-1' />
                  </div>

                  <div id='closeEditUser' className="flex">
                     <XMark w='24' h='24'
                        className=''
                        onClick={ close } />
                  </div>
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

               <div className="isAdminDiv pointer flex" onClick={ handleUserAdmin } >
                  <span className="flex" id="isAdmin">
                     {
                        admin ?
                           <SquareXMark w='24' h='24' fill='#0DCAF0' /> /* TRUE */ :
                           <Square w='24' h='24' fill='#0DCAF0' /> /* FALSE */
                     }
                  </span>
                  <p className="ml-2 text-color bold italic">Usuário Administrador</p>
               </div>

               <button
                  id="submitNewUser"
                  className="submitNewUser btn btn-info"
                  onClick={ () => handleUpdateUser(`${id}`) } >
                  Atualizar dados
                  <UserPen w='24' h='24' fill='var(--bs-dark)' className='ml-2' />
               </button>

               <button className="btn btn-warning" onClick={ close } >
                  Voltar
                  <ArrowLeftLong w='24' h='24' fill='var(--bs-dark)' className='ml-1' />
               </button>
         </section>
      </>
   )
}