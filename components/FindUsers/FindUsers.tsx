import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"

import { CircleCheck } from "../../assets/Icons/CircleCheck"
import { MagnifyingGlass } from "../../assets/Icons/MagnifyingGlass"
import { XMark } from "../../assets/Icons/XMark"
import { PenToSquare } from "../../assets/Icons/PenToSquare"
import { TrashCanXMark } from "../../assets/Icons/TrashCanXMark"
import { Link } from "react-router-dom"
import { ActionsType } from "../../types/ActionsType"
import { UserType } from "../../types/UserType"
import { allUsers } from "../../services/user.service"
import { EditUser } from "../EditUser/EditUser"

export const FindUsers = ({ close }: ActionsType) => {
   const server: string = 'http://localhost:3001'

   const [users, setUsers] = useState<UserType[]>([]) // Users Backup
   const [cloneUsers, setCloneUsers] = useState<UserType[]>([]) // List of Users what will be return search
   const [editUserModal, setEditUserModal] = useState(false)
   const [idUser, setIdUser] = useState('')

   useEffect(() => {
      allUsers()
         .then(setUsers)
         .catch(e => console.log(e))

      allUsers()
         .then(setCloneUsers)
         .catch(e => console.log(e))
   }, [editUserModal])

   // Return Userin Search
   const returnUser = async (e: ChangeEvent<HTMLInputElement>) => {
      let term = e.target.value
      // console.log(term)

      if (term === '') {
         // console.log('O term é: ' + term)
         console.log(cloneUsers)
         setUsers(cloneUsers)
      } else {
         let search = term.replace(term[0], term[0].toLocaleUpperCase())
         // console.log(search)

         let findByName = users.filter(user => user.userName.includes(search))
         //console.log('Name: ', findByName)

         let findByLogin = users.filter(user => user.userLogin.includes(search.toLocaleLowerCase()))
         // console.log('Login', findByLogin)

         if (findByName.length !== 0) {
            setUsers(findByName)
            // console.log(users)
         } else {
            setUsers(findByLogin)
         }
      }
   }

   // Edit User by ID
   const handleEditUser = async (id: string) => {
      // Função responsável por passar o ID via prop para o EditUser, consequentemente buscando o dado no Backend para Editar e mostrar o modal
      console.log(`Edit User By ID: ${id}`)
      setIdUser(id)
      setEditUserModal(!editUserModal)
   }

   // Delete Product by ID
   const handleDeleteUser = async (id: string) => {
      console.log(`Delete user by ID: ${id}`)
      await axios.delete(`${server}/delete/user/${id}`)
         .then(response => {
            if (response.status === 200) {
               //alert(response.data.msg)
            } else if (response.status !== 200) {
               console.log(response.data.status, response.data.msg)
            }
         })

         .catch(err => console.log(err.response.data.msg))

      return (
         setUsers(users.filter(user => user.id !== id)),
         setCloneUsers(cloneUsers.filter(user => user.id !== id))
      )

   }

   // Show Edit Product Modal
   const handleCloseEditUserModal = () => {
      setEditUserModal(false)
   }

   return (
      <article className="container flex pr-3  w-100 h-100 z-index-50" id='FindUserModal'>

         <div className="forms">

            {!editUserModal ?
               <form action='/' className="findUsersForm w-100 h-100 f column sar" id='findUsersForm'>
                  <h4 className="flex sbt">

                     <div className="flex text-center w-100">
                        <h5 className='flex text-info'>Edite um Colaborador</h5>
                        <MagnifyingGlass w='24' h='24' fill='var(--bs-info)' className='ml-1' />
                     </div>

                     <div id='closeFindUsers' className="flex">
                        <XMark w='24' h='24'
                           className=''
                           onClick={close}
                        />
                     </div>
                  </h4>

                  <div className="inputForm f aic sbt p-1"> {/* Input Search */}
                     <div className="flex inputValue w-100">

                        <p className='text-primary'>
                           <input type="text" onChange={returnUser}
                              className='text-primary border pg3 text-center inputFindUser'
                              id="findUser" placeholder="Faça uma busca" />
                        </p>
                     </div>
                  </div>

                  <div className="tableFormUserList mt-1" id="tableFormUserList">
                     <table className="tableFindUser text-center pg5 bold" id="tableFindUser">
                        <thead className="text-color">
                           <tr className="">
                              <td>Nome</td>
                              <td>Login</td>
                              <td>Admin</td>
                              <td>Ação</td>
                           </tr>
                        </thead>

                        <tbody>
                           {users.map((user) => {
                              return (
                                 <tr key={user.id}>
                                    <td>{user.userName}</td>
                                    <td>{user.userLogin}</td>
                                    <td>{user.userAdmin ? 'Sim' : 'Não'}</td>
                                    <td>
                                       <div className="flex">
                                          <span className="flex" onClick={() => handleEditUser(user.id)}>
                                             <PenToSquare w='16' h='16' fill='var(--bs-warning)' className='warning-hover' />
                                          </span>

                                          <span className="flex" onClick={() => handleDeleteUser(user.id)}>
                                             <TrashCanXMark w='16' h='16' fill='var(--bs-danger)' className='danger-hover' />
                                          </span>
                                       </div>
                                    </td>
                                 </tr>
                              )
                           })

                           }
                        </tbody>
                     </table>

                  </div>

                  <div className="flex btn btn-success mt-3" onClick={close}>
                     Ok
                     <CircleCheck w='24' h='24' fill='var(--text)' className='ml-1' />
                  </div>
               </form> :
               <EditUser id={idUser} listUsers={users} close={handleCloseEditUserModal} />
            }

         </div>

      </article>
   )
}