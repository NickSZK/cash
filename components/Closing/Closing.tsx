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
import { ValeusSalesContext } from '../../context/ValuesSales/ValuesSalesContext'
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

const closeFormDay = () => {
   const close = document.querySelector('#closingFormDay') as HTMLDivElement
   // console.log(close)
   // close.style.display = 'none'
   // close.classList.toggle('none')

   close.style.display = 'flex' ? close.style.display = 'none' : close.style.display = 'flex'
}

const server = 'http://localhost:3001'

export const Closing = ({ close, userInfos }: ActionsType) => {
   const {valuesSalesToday, setValuesSalesToday} = useContext(ValeusSalesContext)
   const navigate = useNavigate()

   useEffect(() => {
      window.addEventListener('keydown', (event) => {
         if (event.keyCode === 118) { // F7
            navigate('/invoicing')
         } else if (event.keyCode === 119) { // F8
            navigate('/')
         }
      })
   }, [])

   const closeSystem = async() => {
      const OpenCashValueLC = localStorage.getItem('openCashValue')
      const openHour = localStorage.getItem('openHour')

      const day: number = new Date().getDate()
      const mouth: number = new Date().getMonth()
      const year: number = new Date().getFullYear()

      const hour: number = new Date().getHours()
      const minutes: number = new Date().getMinutes()
      const seconds: number = new Date().getSeconds()

      const today: string = `${day}/${(mouth + 1) < 10 ? 0 + (mouth + 1) : (mouth + 1)}/${year}`
      const closeHours: string = `${hour}:${minutes}:${seconds}`

      await axios.post(`${server}/closeSystem`, { 
         sellerSale: userInfos?.userName, 
         openCash: OpenCashValueLC, 
         totalSale: valuesSalesToday.totalSale, 
         openSystemHour: openHour,
         closeSystemHour: closeHours, 
         moneySale: valuesSalesToday.moneyTotal, 
         pixSale: valuesSalesToday.pixSale, 
         debitSale: valuesSalesToday.debitCredit, 
         creditSale: valuesSalesToday.creditSale, 
         cardsSale: valuesSalesToday.debitCredit, 
         bankSale: valuesSalesToday.valuesBankSale
      })
         .then(response => {
            console.log(response)
            if(response.status === 200) {

               axios.delete(`${server}/deleteSalesDay`)
                  .then(res => {
                     if(res.status === 200) {
                        alert(
                           `${response.data.msg} 😎`
                        )
                     }
                  })
                  .catch(err => console.log(err))

               localStorage.clear()
               window.location.href = 'http://localhost:3000'
            }
         }).catch(err => console.log(err))

   }

   return (
      <main className="container flex pr-3 ml-3" id='closingFormDay'>
         <div className="formsClosingDay">

            <form action='/' className="closingDayForm w-100 h-100 f column sbt">
               <h4 className="f sbt mb-2">

                  <div className="flex text-center">
                     <p className='pg1 flex text-info'>Fechamento de Caixa</p>
                     <SackDollar w='24' h='24' fill='var(--bs-info)' className='ml-1' />
                  </div>

                  <div id='closeElementFormDay'>
                     <XMark w='24' h='24'
                        className=''
                        onClick={ close }
                     />
                  </div>
               </h4>

               <div className="inputForm f aic sbt bb-info mb-1 pb-1 pb-1"> {/* Abertura */}
                  <p className='inputTF'>Abertura</p>

                  <div className="openingValue borderForm flex inputValue">
                     <CashRegister w='24' h='24' fill='var(--bs-primary)' className='mr-1' />
                     <p className='inputTF text-primary'>
                        { parseFloat(valuesSalesToday.openCash as string).toFixed(2) }
                     </p>
                  </div>
               </div>

               <div className="inputForm f aic sbt bb-info mb-1 pb-1 pb-1">  {/* Encerramento */}
                  <p className='inputTF'>Encerramento</p>

                  <div className="moneyOfTheDay inputValue borderForm flex">
                     <MoneyBillWave w='24' h='24' fill='var(--bs-success)' className='mr-1' />
                     <p className='inputTF text-success'>
                        { (valuesSalesToday.moneyTotal)?.toFixed(2) }
                     </p>
                  </div>
               </div>

               <div className="inputForm f aic sbt bb-info mb-1 pb-1">  {/* Vendas - Encerramento - Abertura */}
                  <p className='inputTF'>Vendas</p>

                  <div className="amountMoneyOfTheDay inputValue borderForm flex">
                     <span className='inputTF flex'>
                        <MoneyCheckDollar w='28' h='28' fill='var(--violet-nk)' className='mr-1' />
                        <span className="mr-1">=</span>
                        <MoneyBillWave w='24' h='24' fill='var(--bs-success)' className='mr-1' />
                        <span className="mr-1">-</span>
                        <CashRegister w='24' h='24' fill='var(--bs-primary)' className='mr-1' />
                     </span>

                     <p className='inputTF text-violet-nk'>
                        { (valuesSalesToday.moneySale)?.toFixed(2) }
                     </p>
                  </div>
               </div>

               <div className="inputForm f aic sbt bb-info mb-1 pb-1">  {/* Pix */}
                  <p className='inputTF'>Pix</p>

                  <div className="valueOfTheDay borderForm flex">
                     <Pix w='24' h='24' fill='var(--pix)' className='mr-1' />
                     <p className='inputTF text-pix'>
                        { (valuesSalesToday.pixSale)?.toFixed(2) }
                     </p>
                  </div>
               </div>

               <div className="inputForm f aic sbt bb-info mb-1 pb-1">  {/* Cartões - amountCards */}
                  <p className='inputTF flexborder3'>Cartões</p>

                  <span className='text-small flex column'>
                     <span className='text-blue-mp'>- 6.73%</span>
                     <span className='text-yellow-ml'>(taxas)</span>
                  </span>

                  <div className="valueOfTheDay borderForm flex">
                     <span className='inputTF flex'>
                        <CreditCard w='24' h='24' fill='var(--blue-mp)' className='mr-1' />
                        <span className="mr-1">+</span>
                        <CreditCard w='24' h='24' fill='var(--yellow-ml)' className='mr-1' />
                     </span>
                     <p className='inputTF text-blue-mp'>
                        { (valuesSalesToday.debitCredit?.toFixed(2)) }
                     </p>
                  </div>
               </div>

               <div className="inputForm f aic sbt bb-info mb-1 pb-1">  {/* Conta - amountBank */}
                  <p className='inputTF'>Conta</p>

                  <div className="valueOfTheDay borderForm flex">
                     <span className='inputTF flex'>
                        <PiggyBank w='24' h='24' fill='var(--orange-in)' className='mr-1' />
                        <span className="mr-1">=</span>
                        <Pix w='24' h='24' fill='var(--pix)' className='mr-1' />
                        <span className="mr-1">+</span>
                        <CreditCard w='24' h='24' fill='var(--blue-mp)' className='mr-1' />
                        <span className="mr-1">+</span>
                        <CreditCard w='24' h='24' fill='var(--yellow-ml)' className='mr-1' />
                     </span>
                     <p className='inputTF text-orange-in'>
                        { (valuesSalesToday.valuesBankSale)?.toFixed(2) }  
                     </p>
                  </div>
               </div>

               <div className="inputForm f aic sbt bb-info mb-1 pb-1">  {/* Geral - amountValue */}
                  <p className='inputTF'>Total</p>

                  <div className="valueOfTheDay borderForm flex">
                     <span className='inputTF flex'>
                        <DollarSign w='24' h='24' fill='var(--dark-green)' className='' />
                        <span className="mr-1">=</span>
                        <MoneyCheckDollar w='28' h='28' fill='var(--violet-nk)' className='mr-1' />
                        <span className="mr-1">+</span>
                        <PiggyBank w='24' h='24' fill='var(--orange-in)' className='mr-1' />
                     </span>
                     <p className='inputTF text-dark-green'>
                        { (valuesSalesToday.totalSale)?.toFixed(2) }
                     </p>
                  </div>
               </div>

               <span className="flex sbt mt-1">
                  <button className="btn btn-warning mr-1 w-50"  onClick={ close } >
                     Voltar(F7)
                     <ArrowLeftLong w='24' h='24' fill='var(--bs-dark)' className='ml-1' />
                  </button>

                  <button className="btn btn-success ml-1 w-50" onClick={ closeSystem } >
                     Fechar(F8)
                     <CircleCheck w='24' h='24' fill='var(--text)' className='ml-1' />
                  </button>
               </span>
            </form>
         </div>
      </main>
   )
}