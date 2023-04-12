import axios from "axios";
import { response } from "express";
import { Download } from "../../assets/Icons/Download";
import { PenToSquare } from "../../assets/Icons/PenToSquare";
import { Registered } from "../../assets/Icons/Registered";
import { UserPen } from "../../assets/Icons/UserPen";
import { UserPlus } from "../../assets/Icons/UserPlus";
import { ActionsType } from "../../types/ActionsType";
import { IconsProps } from "../../types/IconsProps";

export const ManagerSystem = ({ handleOptionSystem, handleNewUser, handleManagerUser, handleNewProduct, handleManagerProduct }: ActionsType) => {
   const server = 'http://localhost:3001'

   // Funções de Backup
   const handleBackups = async () => {
      await axios.get(`${server}/backupUsers`)
         .then(response => {
            if(response.status === 200) { 
               // alert(`${response.data.msg} 😎`)

               axios.get(`${server}/backupProducts`)
               .then(response => {
                  if(response.status === 200) { 
                     // alert(`${response.data.msg} 😎`)
                     // alert('Backup de Usuários e Produtos realizado com sucesso 😎')

                     axios.get(`${server}/backupSalesDay`)
                        .then(response => {
                           if(response.status === 200) {
                              alert('Backup de Usuários, Produtos & Vendas, realizado com sucesso 😎')
                           }
                        })
                  } else {
                     alert(`${response.data.msg}`)
                  }
                  // alert(response)
               })
               .catch(err => alert(err))

            } else {
               alert(`${response.data.msg}`)
            }
            // alert(response)
         })
         .catch(err => console.log(err))

      
   }
   
   const handleBackupSales = async () => {
      await axios.get(`${server}/backupSalesDay`)
         .then(response => {
            if(response.status === 200) {
               alert('Backup das vendas realizadas, realizado com sucesso 😎')
            } else {
               alert(`${response.data.msg}`)
            }
         })
   }
   
   const handleBackupUsers = async () => {
      await axios.get(`${server}/backupUsers`)
         .then(response => {
            if(response.status === 200) { 
               alert(`${response.data.msg} 😎`)

            } else {
               alert(`${response.data.msg}`)
            }
            // alert(response)
         })
         .catch(err => console.log(err))
   }
   
   const handleBackupProducts = async () => {
      await axios.get(`${server}/backupProducts`)
         .then(response => {
            if(response.status === 200) { 
               alert(`${response.data.msg} 😎`)

            } else {
               alert(`${response.data.msg}`)
            }
            // alert(response)
         })
         .catch(err => alert(err))
   }

   return (
      <section className="managerSystem flex mr-3" onMouseLeave={handleOptionSystem}>
         <ul className="flex column text-dark bold">
            <li className="flex"
               onClick={ handleNewUser }>
               Novo Usuário
               <UserPlus w="20" h="20" fill="var(--bs-info)" className="ml-1" />
            </li>

            <li className="flex"
               onClick={handleManagerUser}>
               Editar Usuário
               <UserPen w="20" h="20" fill="var(--bs-warning)" className="ml-1" />
            </li>

            <li className="flex"
               onClick={handleNewProduct}>
               Novo Produto
               <Registered w="20" h="20" fill="var(--bs-info)" className="ml-1" />
            </li>

            <li className="flex"
               onClick={handleManagerProduct}>
               Editar Produto
               <PenToSquare w="20" h="20" fill="var(--bs-warning)" className="ml-1" />
            </li>

            <li className="flex"
               onClick={ handleBackups }>
               Backup Geral
               <Download w="20" h="20" fill="var(--btn)" className="ml-1" />
            </li>

            <li className="flex"
               onClick={ handleBackupSales }>
               BKP de Vendas
               <Download w="20" h="20" fill="var(--btn)" className="ml-1" />
            </li>

            <li className="flex"
               onClick={handleBackupUsers}>
               BKP de Usuários
               <Download w="20" h="20" fill="var(--btn)" className="ml-1" />
            </li>

            <li className="flex"
               onClick={handleBackupProducts}>
               BKP de Produtos
               <Download w="20" h="20" fill="var(--btn)" className="ml-1" />
            </li>
         </ul>
      </section>
   )
}