import { useContext } from "react"
import { HandHoldingDollar } from "../../assets/Icons/HandHoldingDollar"
import { ListCheck } from "../../assets/Icons/ListCheck"
import { MagnifyingGlass } from "../../assets/Icons/MagnifyingGlass"
import { SackDollar } from "../../assets/Icons/SackDollar"
import { Signature } from "../../assets/Icons/Signature"
import { TrashCan } from "../../assets/Icons/TrashCan"
import { AuthContext } from "../../context/Auth/AuthContext"
import { ActionsType } from "../../types/ActionsType"

export const FooterSystem = ({
   userInfos, handleHistoricModal, handleConfirmPayment, handleAddProductModal,
   handleClearCartList, onKeyDown }: ActionsType) => {

   const { userData, setUserData } = useContext(AuthContext)

   return (
      <footer className="footerSystem flex sbt">
         <div className="employeerFooterSystem flex column px-2 py-1 mr-3" >
            <p className="pg5 bold text-color">Colaborador</p>

            <p className="pg4 bold italic text-center text-dark-blue flex column" id="employeerName">
               {userInfos?.userName === undefined ? userData.userName : userInfos?.userName}
               <Signature w='24' h='24' fill='var(--dark-blue)' />
            </p>
         </div>

         <div className="actionsFooterSystem flex mr-3">
            <button className="btn btn-secondary" onClick={handleHistoricModal} >
               F2 Historico
               <ListCheck w='20' h='20' fill='var(--text)' className='ml-1' />
            </button>

            <button className="btn btn-success ml-1" onClick={handleConfirmPayment}>
               F4 Finalizar
               <SackDollar w='20' h='20' fill='var(--text)' className='ml-1' />
            </button>

            <button className="btn btn-warning ml-1" onClick={handleAddProductModal} onKeyDown={onKeyDown}>
               F9 Pesquisar
               <MagnifyingGlass w='20' h='20' fill='var(--text-dark)' className='ml-1' />
            </button>

            <button className="btn btn-danger ml-1" onClick={handleClearCartList}>
               F10 Cancelar
               <TrashCan w='20' h='20' fill='var(--text)' className='ml-1' />
            </button>

            <button className="btn btn-primary ml-1">
               F12 Pagamento
               <HandHoldingDollar w='20' h='20' fill='var(--text)' className='ml-1' />
            </button>

         </div>
      </footer>
   )
}