import { useContext, useEffect, useState } from "react"
import { CartCircleXMark } from "../../assets/Icons/CartCircleXMark"
import { CashRegister } from "../../assets/Icons/CashRegister"
import { Minus } from "../../assets/Icons/Minus"
import { Plus } from "../../assets/Icons/Plus"
import { CartListContext } from "../../context/CartList/CartListContext"
import { ProductsContext } from "../../context/Products/ProductsContext"
import { ActionsType } from "../../types/ActionsType"
import { ProductType } from "../../types/ProductType"
import { MessageTexugo } from "../MessageTexugo/MessageTexugo"

export const CartList = ({ listProducts, returnItems }: ActionsType) => {

   const { products, setProducts } = useContext(ProductsContext)
   const { cartList, setCartList } = useContext(CartListContext)

   const [items, setItems] = useState<ProductType[]>([])
   const [qty, setQty] = useState(1)

   let itemId = (id: number) => {
      document.querySelector(`#qty-${id}`)
   }

   // Original
   /*useEffect(() => {
      if (listProducts) {
         setItems(listProducts)
         console.log(listProducts)
      }
   }, [listProducts])*/

   useEffect(() => {
      setCartList(cartList)
   }, [cartList, setCartList])

   //console.log(`List Product in Context${products}`)

   const handleRemoveProductOnList = (id: string) => {
      // console.log(items.filter(prod => prod.id !== id))
      // console.log(items.filter(prod => prod.id !== id))
      // items.filter(prod => prod.id !== id)

      // setItems(items.filter(prod => prod.id !== id))
      // console.log(items.filter(prod => prod.id !== id))
      // console.log(id)

      //setItems(items.filter(prod => prod.id !== id))

      // Original
      /*setItems(items.filter(prod => prod.id !== id))
      listProducts = items
      console.log(`Items: ${items.length}`)
      console.log(`ListProducts: ${listProducts?.length}`)*/

      setCartList(cartList.filter(item => item.id !== id))
   }

   const handleReturnItems = () => {

   }

   const handleAddQty = (id?: string) => {
      // setQty(qty + 1)
      let itemQty = (document.querySelector(`#qty-${id}`) as HTMLInputElement)
      let quantity = parseInt(itemQty.innerHTML)
      itemQty.innerHTML = `${quantity + 1}`
      // console.log('add')
   }

   const handleMinusQty = (id?: string) => {
      // setQty(qty - 1)
      let itemQty = (document.querySelector(`#qty-${id}`) as HTMLInputElement)
      let quantity = parseInt(itemQty.innerHTML)
      itemQty.innerHTML = `${quantity - 1}`
      //console.log('remove')
   }

   let total = cartList.reduce(
      (sum, item) => sum + parseFloat(item.pdt_price), 0
   ).toFixed(2)

   return (
      <>
         {/* { items ? */}
         {cartList ?
            <article className="containerCartList flex sbt column h-100 p-3">

               <div className="flex sbt w-100 mb-2">
                  <p className="w-100 text-center text-info">Lista de compras</p>

                  <div className="borderFormDanger flex inputValue">
                     <CashRegister w='24' h='24' fill='var(--dark-blue)' className='mr-1' />

                     <p className='inputTF text-danger'>
                        { total }
                     </p>
                  </div>
               </div>
               

               <div className="cartList flex sbt column w-10 h-100">
                  <section className="cartListSection w-100 h-100">

                     <table className="tableCartList f column sbt w-100 h-100">

                        <thead className="text-primary bold flex sbt w-100">
                           <tr>
                              <td className="itemName">Nome do Produto</td>
                              <td>QTD</td>
                              <td>Preço Unitário</td>
                              <td>Valor</td>
                           </tr>
                        </thead>

                        <tbody className="text-center w-100 column">
                           {/* { items.map((prod) => ( */}
                           {cartList.map((prod, index) => (
                              <tr key={index}>
                                 <td className="itemName">
                                    <span>{prod.pdt_name}</span>

                                    <span className="flex">
                                       <CartCircleXMark w='16' h='16' fill='var(--bs-danger)' className="pointer" onClick={() => handleRemoveProductOnList(prod.id)} />
                                    </span>

                                 </td>

                                 <td className="flex">
                                    <Minus w='16' h='16' fill='var(--bs-danger)'
                                       className="pointer mr-1" onClick={() => handleMinusQty(`${prod.id}`)} />
                                    <span id={`qty-${prod.id}`}>1</span>
                                    <Plus w='16' h='16' fill='var(--bs-success)'
                                       className="pointer ml-1" onClick={() => handleAddQty(`${prod.id}`)} />
                                 </td>
                                 <td>{prod.pdt_price}</td>
                                 {/* <td>{ (parseFloat(prod.pdt_price) * qty).toFixed(2) }</td> */}
                                 <td>{parseFloat(prod.pdt_price).toFixed(2)}</td>
                                 {/* <td>{ parseFloat(prod.pdt_price) * parseFloat((document.querySelector(`#qty-${prod.id}`) as HTMLInputElement).value) }</td> */}
                                 {/* <td>{ (document.querySelector(`#qty-${prod.id}`) as HTMLInputElement).innerText }</td> */}
                              </tr>

                           ))}
                        </tbody>

                        <tfoot className="cartListFooter flex sbt p-1 ">
                           <p>Total</p>
                           <span className="cartListValue text-danger">
                              {/* { cartList.reduce(
                                 (sum, item) => sum + parseFloat(item.pdt_price), 0
                              ).toFixed(2) } */}
                              {total}
                           </span>
                        </tfoot>

                     </table>
                  </section>
               </div>
            </article> : <MessageTexugo th="100" tw="100" msg="Carrinho vazio, meu chapa" />
         }
      </>
   )
}

