import { useContext, useEffect, useState } from "react"
import { CreditCard } from "../../assets/Icons/CreditCard"
import { ListCheck } from "../../assets/Icons/ListCheck"
import { MoneyBillWave } from "../../assets/Icons/MoneyBillWave"
import { Pix } from "../../assets/Icons/Pix"
import { XMark } from "../../assets/Icons/XMark"
import { ValeusSalesContext } from "../../context/ValuesSales/ValuesSalesContext"
import { ActionsType } from "../../types/ActionsType"
import { SalesType } from "../../types/SalesType"

export const Sales = ({ listSales, valuesSales, close }: ActionsType) => {
   const [sales, setSales] = useState<SalesType[]>([]) // Recebe a lista de vendas do historicSale
   const {valuesSalesToday, setValuesSalesToday} = useContext(ValeusSalesContext) // Pega os valores de sales e injeta em valuesSalesDay

   useEffect(() => {
      listSales ? setSales(listSales) : setSales([])
      setValuesSalesToday({
         openCash: localStorage.getItem("openCashValue")!,
         moneySale: parseFloat(paymentMoney),
         moneyTotal: parseFloat(paymentMoney) + parseFloat(localStorage.getItem("openCashValue")!),

         pixSale: parseFloat(paymentPix),
         moneyPix: parseFloat(paymentMoney) + parseFloat(paymentPix),

         // debitSale: parseFloat(paymentDebit),
         debitSale: parseFloat(paymentDebit) - (parseFloat(paymentDebit) * (1.99 / 100)),
         // creditSale: parseFloat(paymentCredit),
         creditSale: parseFloat(paymentCredit) - (parseFloat(paymentCredit) * (4.74 / 100)),
         // debitCredit: (parseFloat(paymentDebit) + parseFloat(paymentCredit)) - ((parseFloat(paymentDebit) + parseFloat(paymentCredit)) * (6.73 / 100)),
         debitCredit: (parseFloat(paymentDebit) - (parseFloat(paymentDebit) * (1.99 / 100))) + (parseFloat(paymentCredit) - (parseFloat(paymentCredit) * (4.74 / 100))),

         // valuesBankSale: parseFloat(paymentPix) + parseFloat(debitCredit),
         // totalSale: parseFloat(moneyPix) + parseFloat(debitCredit)
         valuesBankSale: parseFloat(paymentPix) + ((parseFloat(paymentDebit) - (parseFloat(paymentDebit) * (1.99 / 100))) +  parseFloat(paymentCredit) - (parseFloat(paymentCredit) * (4.74 / 100))),
         // totalSale: parseFloat(moneyPix) + ((parseFloat(paymentDebit) + parseFloat(paymentCredit)) - ((parseFloat(paymentDebit) + parseFloat(paymentCredit)) * (6.73 / 100)))
         totalSale: parseFloat(moneyPix) + ((parseFloat(paymentDebit) - (parseFloat(paymentDebit) * (1.99 / 100))) +  parseFloat(paymentCredit) - (parseFloat(paymentCredit) * (4.74 / 100)))
      })
   }, [sales])

   let paymentMoney =  sales.filter(el => (
      el.methodSale === 'Dinheiro'
   )).reduce(
      (sum, item) => sum + parseFloat(item.priceSale as string), 0
   ).toFixed(2)

   let paymentPix =  sales.filter(el => (
      el.methodSale === 'Pix'
   )).reduce(
      (sum, item) => sum + parseFloat(item.priceSale as string), 0
   ).toFixed(2)

   let paymentDebit =  sales.filter(el => (
      el.methodSale === 'Cartão de Débito'
   )).reduce(
      (sum, item) => sum + parseFloat(item.priceSale as string), 0
   ).toFixed(2)

   let paymentCredit =  sales.filter(el => (
      el.methodSale === 'Cartão de Crédito'
   )).reduce(
      (sum, item) => sum + parseFloat(item.priceSale as string), 0
   ).toFixed(2)

   let moneyPix = (parseFloat(paymentMoney) +  parseFloat(paymentPix)).toFixed(2)
   let debitCredit = (parseFloat(paymentDebit) + parseFloat(paymentCredit)).toFixed(2)

   console.log(`
      Cash: ${localStorage.getItem("openCashValue")!}
      Money: ${paymentMoney}
      MoneyTotal: ${ parseFloat(paymentMoney) + parseFloat(localStorage.getItem("openCashValue")!)}
      Pix: ${paymentPix}
      MoneyPix: ${parseFloat(paymentMoney) + parseFloat(paymentPix)}
      Debit: ${paymentDebit}
      Credit: ${paymentCredit}
      DebitCredit: ${parseFloat(paymentDebit) + parseFloat(paymentCredit)}
      Bank: ${parseFloat(paymentPix) + parseFloat(paymentDebit) + parseFloat(paymentCredit)}
      Total: ${parseFloat(paymentMoney) + parseFloat(paymentPix) + parseFloat(paymentDebit) + parseFloat(paymentCredit)}
   `)

   return(
      <div className="salesContainer flex sbt column sbt mr-2">

         <h4 className="flex sbt w-100">
            <div className="historic flex text-info w-100">
               <p>Historico de Vendas</p>
               <ListCheck w='24' h='24' fill="var(--bs-info)" className='ml-1' />
            </div>

            <div className="salesClose flex">
               <XMark w='24' h='24' className='' onClick={ close } />
            </div>
         </h4>

         <div className="salesData mt-3">
            <table className="salesDataTable text-center pg5 bold">
               <thead className="text-color">
                  <tr>
                     <td>Venda</td>
                     <td>Valor</td>
                     <td>Pagamento</td>
                     <td>Vendedor</td>
                     <td>Data</td>
                     <td>Horário</td>
                  </tr>
               </thead>

               <tbody>
   
                  { 
                     sales.map((el) => (
                        <tr key={ el.idSale }>
                           <td>{ el.idSale }</td>
                           <td>R$ { el.priceSale }</td>
                           <td>{ el.methodSale }</td>
                           <td>{ el.sellerSale }</td>
                           <td>{ (el.registrationSale)?.split(' ')[0] }</td>
                           <td>{ (el.registrationSale)?.split(' ')[1] }</td>
                        </tr>
                     ))
                  }

               </tbody>

            </table>

         </div>

         <div className="valuesSale flex sbt mt-2 w-100">
            <span className="f column w-100 sbt aifs">
               <p className="moneySale inputTF borderFormMoney flex text-success mb-1">
                  <MoneyBillWave w='24' h='24' fill='var(--bs-success)' className='mr-1' />
                  { (valuesSalesToday.moneySale)?.toFixed(2) }
               </p>

               <p className="pixSale inputTF borderFormPix flex text-pix mb-1">
                  <Pix w='24' h='24' fill='var(--pix)' className='mr-1' />
                  { (valuesSalesToday.pixSale)?.toFixed(2) }
               </p>

               <p className="moneyPixSale inputTF borderFormMoneyPix flex text-danger">
                  <MoneyBillWave w='24' h='24' fill='var(--bs-success)' className='mr-1' />
                  <span className="mr-1">+</span>
                  <Pix w='24' h='24' fill='var(--pix)' className='mr-1' />
                  { (valuesSalesToday.moneyPix)?.toFixed(2) }
               </p>
            </span>

            <span className="f column w-100 sbt aife">
               <p className="debitSale inputTF borderFormDebit flex text-blue-mp mb-1">
                  <CreditCard w='24' h='24' fill='var(--blue-mp)' className='mr-1' />
                  { (valuesSalesToday.debitSale)?.toFixed(2) }
               </p>

               <p className="creditSale inputTF borderFormCredit flex text-yellow-ml mb-1">
                  <CreditCard w='24' h='24' fill='var(--yellow-ml)' className='mr-1' />
                  { (valuesSalesToday.creditSale)?.toFixed(2) }
               </p>

               <p className="debitCreditSale inputTF borderFormCredit flex text-danger">
                  <CreditCard w='24' h='24' fill='var(--blue-mp)' className='mr-1' />
                  <span className="mr-1">+</span>
                  <CreditCard w='24' h='24' fill='var(--yellow-ml)' className='mr-1' />

                  {/* { (valuesSalesToday.debitCredit)?.toFixed(2) } */}
                  { parseFloat(debitCredit).toFixed(2) }
               </p>
            </span>
         </div>
      </div>
   )
}