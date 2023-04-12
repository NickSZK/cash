import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"

import { CircleCheck } from "../../assets/Icons/CircleCheck"
import { MagnifyingGlass  }from "../../assets/Icons/MagnifyingGlass"
import { XMark } from "../../assets/Icons/XMark"
import { PenToSquare } from "../../assets/Icons/PenToSquare"
import { TrashCanXMark } from "../../assets/Icons/TrashCanXMark"
import { Link } from "react-router-dom"
import { ActionsType } from "../../types/ActionsType"
import { ProductType } from "../../types/ProductType"

export const FindProducts = ({ close }: ActionsType) => {
   const server = 'http://localhost:3001'

   // Get All Users
   const [users, setUsers] = useState([])
   
   useEffect(() => {
      axios.get(`${server}/users`)
      .then(response => setUsers(response.data.result))
      .catch(err => console.log(err))
   }, [])
   //console.log(users)
   
   // Get All Products
   const [products, setProducts] = useState<ProductType[]>([]) // First Search on List
   const [find, setFind] = useState<ProductType[]>([]) // List before Search
   const [items, setItems] = useState<ProductType[]>([]) // List if Search is empty

   useEffect(() => {
      axios.get(`${server}/products`)
         .then(response => {
            setProducts(response.data.result)
            setFind(response.data.result)
            setItems(response.data.result)
         })
         .catch(err => console.log(err))
   }, [])

   const findItem = async(search: string) => {
      // let findProductInput = document.querySelector('#findProduct')
      await axios.get(`${server}/products/type`)
         // .then(response => setFind(response.data.result))
         .then(response => response.data.msg)
         .catch(err => console.log(err))

         // console.log(findProductInput.value + ' no console')
         // console.log(find)
   }

   // Delete Product
   const handleDeleteProduct = (id: string) => {
      axios.delete(`${server}/delete/product/${id}`)
         .then(response => {
            if (response.status === 200) {
               alert(response.data.msg)
            } else if (response.status !== 200) {
               console.log(response.data.status, response.data.msg)
            }
         })
         .catch(err => alert(err.response.data.msg))

      return setProducts(products.filter(prod => prod.id !== id))
   }

   const returnProduct = async (e: ChangeEvent<HTMLInputElement>) => {
      let term = e.target.value

      if(term === '') {
         // console.log('O term é: ' + term)
         setProducts(items)
      } else {
         let search = term.replace(term[0], term[0].toLocaleUpperCase())
         // setProducts(find.filter(prod => prod.pdt_name.includes(search)))
         // setProducts(find.filter(prod => prod.pdt_type.includes(search)))

         let findByName = find.filter(prod => prod.pdt_name.includes(search))

         let findByType = find.filter(prod => prod.pdt_type.includes(search))

         if(findByName.length !== 0) {
            setProducts(findByName)
         } else {
            setProducts(findByType)
         }
      }
   }

   return (
      <>
         <article className="container flex pr-3" id='FindProductModal'>

            <div className="forms">

               <form action='/' className="formsFindProducts w-100 h-100 f column sbt" id='formsFindProducts'>
                  <h4 className="f sbt pb-2">

                     <div className="flex text-center">
                        <h5 className='flex text-info'>Pesquise um Produto</h5>
                        <MagnifyingGlass w='24' h='24' fill='var(--bs-info)' className='ml-1' />
                     </div>

                     {/* <div id='closeFindProducts' onClick={props.close}> */}
                     <div id='closeFindProducts'>
                        <XMark w='24' h='24'
                           className=''
                           onClick={ close }
                        />
                     </div>
                  </h4>

                  <div className="inputForm f aic sbt p-1"> {/* Abertura */}
                     <div className="flex inputValue w-100">

                        <p className='text-primary'>
                           <input type="text" onChange={returnProduct}
                              className='text-primary border pg3 text-center inputFindProduct'
                              id="findProduct" placeholder="Faça uma busca" />
                        </p>
                     </div>
                  </div>

                  <div className="tableFormList" id="tableFormList">
                     <table className="tableFindProduct text-center pg5 bold" id="tableFindProduct">
                        <thead className="none">
                           <tr className="">
                              <td>Nome</td>
                              <td>Preço</td>
                              <td>Tipo</td>
                              <td>Quandidade</td>
                              <td>Ação</td>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              products.map((prod) => {
                                 return (
                                    <tr key={prod.id}>
                                       <td>{prod.pdt_name}</td>
                                       <td>{prod.pdt_price}</td>
                                       <td>{prod.pdt_type}</td>
                                       <td>{prod.pdt_qty}</td>
                                       <td>
                                          <div className="flex jsc aic">
                                             <Link to={`/edit/product/${prod.id}`} >
                                                <PenToSquare w='16' h='16' fill='var(--bs-warning)' className='warning-hover' />
                                             </Link>

                                             <Link to='/findproducts' onClick={() => handleDeleteProduct(prod.id)}>
                                                <TrashCanXMark w='16' h='16' fill='var(--bs-danger)' className='danger-hover' />
                                             </Link>
                                          </div>
                                       </td>
                                    </tr>
                                 )
                              })
                           }
                        </tbody>
                     </table>
                  </div>

                  {/* <div className="flex btn btn-success mt-3" onClick={props.close}> */}
                  <div className="flex btn btn-success mt-3">
                     Confirmar
                     <CircleCheck w='24' h='24' fill='var(--text)' className='ml-1' />
                  </div>

               </form>
            </div>
         </article>
      </>


   )

}