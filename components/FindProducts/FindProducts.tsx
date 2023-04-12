import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"

import { CircleCheck } from "../../assets/Icons/CircleCheck"
import { MagnifyingGlass  }from "../../assets/Icons/MagnifyingGlass"
import { XMark } from "../../assets/Icons/XMark"
import { PenToSquare } from "../../assets/Icons/PenToSquare"
import { TrashCanXMark } from "../../assets/Icons/TrashCanXMark"
import { Link } from "react-router-dom"
import { ActionsType } from "../../types/ActionsType"
import { EditProduct } from "../EditProduct/EditProduct"
import { ProductType } from "../../types/ProductType"
import { allProducts } from "../../services/product.service"
import { UserType } from "../../types/UserType"

export const FindProducts = ({ close, id, listProducts }: ActionsType) => {
   const server = 'http://localhost:3001'

   // Get All Products
   const [products, setProducts] = useState<ProductType[]>([]) // First Search on List
   const [cloneProducts, setCloneProducts] = useState<ProductType[]>([]) // List if Search is empty
   const [findProducts, setFindProducts] = useState<ProductType[]>([]) // List if Search is empty
   const [editProductModel, setEditProductModal] = useState(false)
   const [idItem, setIdItem] = useState('')

   useEffect(() => {
      allProducts()
         .then(setProducts)
         .catch(e => console.log(e))

      allProducts()
         .then(setCloneProducts)
         .catch(e => console.log(e))
      
      allProducts()
         .then(setFindProducts)
         .catch(e => console.log(e))
   }, [editProductModel])
   //console.log(users)

   // Return Product in Search
   const returnProduct = async (e: ChangeEvent<HTMLInputElement>) => {
      let term = e.target.value

      if (term === '') {
         // console.log('O term é: ' + term)
         //console.log(cloneProducts)
         setProducts(cloneProducts)
      } else {
         let search = term.replace(term[0], term[0].toLocaleUpperCase())
         // setProducts(find.filter(prod => prod.pdt_name.includes(search)))
         // setProducts(find.filter(prod => prod.pdt_type.includes(search)))
         //console.log(search)
         
         let findByName = findProducts.filter(prod => prod.pdt_name.includes(search))
         //console.log(findByName)

         let findByType = findProducts.filter(prod => prod.pdt_type.includes(search))

         if (findByName.length !== 0) {
            setProducts(findByName)
            // console.log(products)
         } else {
            setProducts(findByType)
         }
      }
   }

   // Edit Product by ID
   const handleEditProduct = async (id: string) => {
      // Função responsável por passar o ID via prop para o EditProduct, consequentemente buscando o dado no Backend para Editar e mostrar o modal
      console.log(`Edit Product By ID: ${id}`)
      setIdItem(id)
      setEditProductModal(!editProductModel)
   }

   // Delete Product by ID
   const handleDeleteProduct = (id: string) => {
      axios.delete(`${server}/delete/product/${id}`)
         .then(response => {
            if (response.status === 200) {
               //alert(response.data.msg)
            } else if (response.status !== 200) {
               console.log(response.data.status, response.data.msg)
            }
         })
         // .catch(err => alert(err.response.data.msg))
         .catch(err => console.log(err.response.data.msg))

      return(
         setProducts(products.filter(prod => prod.id !== id)),
         setCloneProducts(cloneProducts.filter(prod => prod.id !== id))
      )  
   }

   // Show Edit Product Modal
   const handleCloseEditProductModal = () => {
      setEditProductModal(false)
   }

   return (
      <article className="container flex pr-3  w-100 h-100 z-index-50" id='FindProductModal'>

         <div className="forms">

            {!editProductModel ?
               <form action='/' className="findProductsForm w-100 h-100 f column sbt" id='findProductsForm'>
                  <h4 className="flex sbt">

                     <div className="flex text-center w-100">
                        <h5 className='flex text-info'>Edite um Produto</h5>
                        <MagnifyingGlass w='24' h='24' fill='var(--bs-info)' className='ml-1' />
                     </div>

                     {/* <div id='closeFindProducts' onClick={props.close}> */}
                     <div id='closeFindProducts' className="flex">
                        <XMark w='24' h='24'
                           className=''
                           onClick={ close }
                        />
                     </div>
                  </h4>

                  <div className="inputForm f aic sbt p-1"> {/* Input Search */}
                     <div className="flex inputValue w-100">

                        <p className='text-primary'>
                           <input type="text" onChange={ returnProduct }
                              className='text-primary border pg3 text-center inputFindProduct'
                              id="findProduct" placeholder="Faça uma busca" />
                        </p>
                     </div>
                  </div>

                  <div className="tableFormList mt-1" id="tableFormList">
                     <table className="tableFindProduct text-center pg5 bold" id="tableFindProduct">
                        <thead className="text-color">
                           <tr className="">
                              <td>Nome</td>
                              <td>Preço</td>
                              <td>Tipo</td>
                              <td>Qtd</td>
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
                                          <div className="flex">
                                             {/* <Link to={`/edit/product/${prod.id}`} > */}
                                             <span className="flex" onClick={ () => handleEditProduct(prod.id) }>
                                                <PenToSquare w='16' h='16' fill='var(--bs-warning)' className='warning-hover' />
                                             </span>
                                             {/* </Link> */}

                                             <span className="flex" onClick={ () => handleDeleteProduct(prod.id) }>   
                                                <TrashCanXMark w='16' h='16' fill='var(--bs-danger)' className='danger-hover' />

                                                {/* <Link to='/findproducts' onClick={() => handleDeleteProduct(prod.id)}>
                                                   <TrashCanXMark w='16' h='16' fill='var(--bs-danger)' className='danger-hover' />
                                                </Link> */}
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

                  {/* <div className="flex btn btn-success mt-3" onClick={props.close}> */}
                  <div className="flex btn btn-success mt-3" onClick={ close }>
                     Ok
                     <CircleCheck w='24' h='24' fill='var(--text)' className='ml-1' />
                  </div>

               </form> :
               <EditProduct id={idItem} listProducts={ products } close={ handleCloseEditProductModal } />
            }
         </div>
      </article>
   )

}