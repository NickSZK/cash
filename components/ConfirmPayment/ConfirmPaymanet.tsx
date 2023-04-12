import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ActionsType } from '../../types/ActionsType'

import { SackDollar } from '../../assets/Icons/SackDollar'
import { CashRegister } from '../../assets/Icons/CashRegister'
import { MoneyBillWave } from '../../assets/Icons/MoneyBillWave'
import { MoneyCheckDollar } from '../../assets/Icons/MoneyCheckDollar'
import { Pix } from '../../assets/Icons/Pix'
import { PiggyBank } from '../../assets/Icons/PiggyBank'
import { CreditCard } from '../../assets/Icons/CreditCard'
import { DollarSign } from '../../assets/Icons/DollarSign'
import { ArrowLeftLong } from '../../assets/Icons/ArrowLeftLong'
import { CircleCheck } from '../../assets/Icons/CircleCheck'
import { XMark } from '../../assets/Icons/XMark'
import { HandHoldingDollar } from '../../assets/Icons/HandHoldingDollar'
import { ArrowRightToBracket } from '../../assets/Icons/ArrowRightToBracket'
import { CartListContext } from '../../context/CartList/CartListContext'
import axios from 'axios'

/*  Blocked Keys
   F1 => Help
   F3 => Find Word
   F5 => Regarrega
   F6 => Fecha e Abre o navegador
   F7 => Fullscreen
*/

/* Utils Keys
   F2 = 113
   F4 = 115
   F7 = 118
   F8 = 119
   F9 = 120
   F10 = 121
   F12 = 123
*/

// window.addEventListener('keydown', (event) => {
//    console.log(event.keyCode)
// })

// const navigate = useNavigate()

export const ConfirmPayment = ({ close }: ActionsType) => {
   const { cartList, setCartList } = useContext(CartListContext)

   const server = 'http://localhost:3001'
   const userDatasSection = localStorage.getItem('UserDatas')

   let total = cartList.reduce(
      (sum, item) => sum + parseFloat(item.pdt_price), 0
   ).toFixed(2)

   const handleConfirmMethod = () => {
      const paymentMethod = document.querySelector('input[type=radio]:checked') as HTMLInputElement
      //console.log(paymentMethod)
      console.log(paymentMethod.value)
   
      let paymentMoney = document.querySelector('#paymentMoney') as HTMLInputElement
      let paymentPix = document.querySelector('#paymentPix') as HTMLInputElement
      let paymentDebit = document.querySelector('#paymentDebit') as HTMLInputElement
      let paymentCredit = document.querySelector('#paymentCredit') as HTMLInputElement
   
      if(paymentMethod.value === 'Dinheiro') {
         paymentMoney.classList.remove('borderFormFix')
         paymentMoney.classList.add('borderFormFixSuccess')
   
         paymentPix.classList.remove('borderFormFixPix')
         paymentPix.classList.add('borderFormFix')
   
         paymentDebit.classList.remove('borderFormFixBlueMP')
         paymentDebit.classList.add('borderFormFix')
   
         paymentCredit.classList.remove('borderFormFixYellowML')
         paymentCredit.classList.add('borderFormFix')
   
      } else if(paymentMethod.value === 'Pix') {
         paymentPix.classList.remove('borderFormFix')
         paymentPix.classList.add('borderFormFixPix')
   
         paymentMoney.classList.remove('borderFormFixSuccess')
         paymentMoney.classList.add('borderFormFix')
   
         paymentDebit.classList.remove('borderFormFixBlueMP')
         paymentDebit.classList.add('borderFormFix')
   
         paymentCredit.classList.remove('borderFormFixYellowML')
         paymentCredit.classList.add('borderFormFix')
   
      } else if(paymentMethod.value === 'Cartão de Débito') {
         paymentDebit.classList.remove('borderFormFix')
         paymentDebit.classList.add('borderFormFixBlueMP')
   
         paymentMoney.classList.remove('borderFormFixSuccess')
         paymentMoney.classList.add('borderFormFix')
   
         paymentPix.classList.remove('borderFormFixPix')
         paymentPix.classList.add('borderFormFix')
   
         paymentCredit.classList.remove('borderFormFixYellowML')
         paymentCredit.classList.add('borderFormFix')
   
      } else if(paymentMethod.value === 'Cartão de Crédito') {
         paymentCredit.classList.remove('borderFormFix')
         paymentCredit.classList.add('borderFormFixYellowML')
   
         paymentMoney.classList.remove('borderFormFixSuccess')
         paymentMoney.classList.add('borderFormFix')
   
         paymentPix.classList.remove('borderFormFixPix')
         paymentPix.classList.add('borderFormFix')
   
         paymentDebit.classList.remove('borderFormFixBlueMP')
         paymentDebit.classList.add('borderFormFix')
   
      }
   }
   
   const handleConfirmPayment = async() => {
      const paymentMethod = document.querySelector('input[type=radio]:checked') as HTMLInputElement
      //console.log(paymentMethod)
      /*let total = cartList.reduce(
         (sum, item) => sum + parseFloat(item.pdt_price), 0
      ).toFixed(2)*/

      if(total > '0.25') {
         if( paymentMethod.value === 'Pix' || 
             paymentMethod.value === 'Cartão de Débito' || 
             paymentMethod.value === 'Cartão de Crédito' ) {
   
            let confirmValue = window.confirm(`Confirma o pagamento de R$${total} no ${paymentMethod.value} ?`)

            if(confirmValue) {
               await axios.post(`${server}/newSale`, {
                  priceSale: total, 
                  sellerSale: userDatasSection ? JSON.parse(userDatasSection).userName : 'None',
                  methodSale: paymentMethod.value
               })
                  .then(res => {
                     alert('Venda registrada com sucesso')
                     setCartList([])
                  })
                  .catch(err => console.log(err))
            }
   
            // alert(confirmValue)
         } else if(paymentMethod.value === 'Dinheiro') {
            let confirmValue = window.confirm(`Confirma o pagamento de R$${total} em ${paymentMethod.value} ?`)
   
            // alert(confirmValue)

            if(confirmValue) {
               await axios.post(`${server}/newSale`, {
                  priceSale: total, 
                  sellerSale: userDatasSection ? JSON.parse(userDatasSection).userName : 'None',
                  methodSale: "Dinheiro"
               })
                  .then(res => {
                     alert('Venda registrada com sucesso')
                     setCartList([])
                  })
                  .catch(err => console.log(err))
            }
         } else {
            alert('Por obsérquio, informe o método de pagamento.')
         }
      }

   }


   return (
      <main className="container flex pr-3" id='paymentFormContainer'>
         <div className="forms flex sbt column z-index-50">

            <form action='/' className="paymentForm w-100 h-100 f sbt column">
               <h4 className="flex sbt">

                  <div className="flex text-center3 w-100">
                     <p className='pg1 flex'>Pagamento</p>
                     <HandHoldingDollar w='24' h='24' fill='var(--bs-info)' className='ml-1' />
                  </div>

                  <div id='closePaymentForm'>
                     <XMark w='24' h='24'
                        className=''
                        onClick={ close }
                     />
                  </div>
               </h4>

               <div className="inputForm flex sbt"> {/* Valor da Compra */}
                  <p className='inputTF'>Valor da Compra</p>

                  <div className="purchasePrice borderFormPrimary flex inputValue">
                     <CashRegister w='24' h='24' fill='var(--bs-primary)' className='mr-1' />
                     <p className='inputTF text-primary'>
                        { cartList.reduce(
                                 (sum, item) => sum + parseFloat(item.pdt_price), 0
                           ).toFixed(2) 
                        }
                        {/* {opening.toFixed(2)} */}
                        {/* { openCashValue } */}
                     </p>
                  </div>
               </div>
               <span className='bb-info'></span>

               <div className="">  {/* Forma de Pagamento */}
                  <p className='inputTF text-center'>Forma de Pagamento</p>

                  <div className='flex column mt-2' id='choosePaymentMethodContainer'>
                     <div className='flex'>
                       
                        <label id='paymentMoney' onClick={ handleConfirmMethod } htmlFor="paymentMethod01" className="paymentMoney borderFormFix flex sbt mr-1 pointer">
                           <input type="radio" className='mr-1' name="paymentMethod" id="paymentMethod01" value='Dinheiro' />
                           <p className='inputTF text-success flex'> 
                              <MoneyBillWave w='24' h='24' fill='var(--bs-success)' className='mr-1' />
                              Dinheiro 
                           </p>
                        </label>


                        <label id='paymentPix' onClick={ handleConfirmMethod } htmlFor="paymentMethod02" className="PaymentPix borderFormFix flex sbt ml-1 pointer">
                           <input type="radio" name="paymentMethod" id="paymentMethod02" value='Pix' />
                           <p className='inputTF text-pix flex'> 
                              <Pix w='24' h='24' fill='var(--pix)' className='mr-1' />
                              Pix 
                           </p>
                        </label>
                     </div>

                     <div className='flex mt-2'>
                        <label id='paymentDebit' onClick={ handleConfirmMethod } htmlFor="paymentMethod03" className="paymentDebit borderFormFix flex sbt mr-1 pointer">
                           <input type="radio" className='mr-1' name="paymentMethod" id="paymentMethod03" value='Cartão de Débito' />
                           <p className='inputTF text-blue-mp flex'> 
                              <CreditCard w='24' h='24' fill='var(--blue-mp)' className='mr-1' />
                              Débito
                           </p>
                        </label>

                        <label id='paymentCredit' onClick={ handleConfirmMethod } htmlFor="paymentMethod04" className="PaymentCredit borderFormFix flex sbt ml-1 pointer">
                           <input type="radio" name="paymentMethod" id="paymentMethod04" value='Cartão de Crédito' />
                           <p className='inputTF text-yellow-ml flex'> 
                              <CreditCard w='24' h='24' fill='var(--yellow-ml)' className='mr-1' />
                              <span>
                                 Crédito 
                              </span>
                           </p>
                        </label>
                     </div>

                  </div>

               </div>
               <span className='bb-info mb-3'></span>
            </form>
            
            <button
               className="btn btn-success w-100"
               onClick={ handleConfirmPayment } >
               Finalizar Venda
               <ArrowRightToBracket w='23' h='23' fill='var(--text)' className='ml-1' />
            </button>
         </div>
      </main>
   )
}