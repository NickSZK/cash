import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { MoneyCheckPen } from "../../assets/Icons/MoneyCheckPen";
import { ArrowLeftLong } from "../../assets/Icons/ArrowLeftLong";
import { Registered } from "../../assets/Icons/Registered";
import { TrashCanXMark } from "../../assets/Icons/TrashCanXMark";
import { ActionsType } from "../../types/ActionsType";
import { XMark } from "../../assets/Icons/XMark";
import { IconsProps } from "../../types/IconsProps";
import { ProductType } from "../../types/ProductType";
import { allProducts, findProductById }  from '../../services/product.service'

export const EditProduct = ({ close, id, listProducts }: ActionsType) => {
   const server: string = 'http://localhost:3001'

   // const { id } = useParams()
   //console.log(id)

   const navigate = useNavigate()

   const [products, setProducts] = useState<ProductType[]>([])
   const [product, setProduct] = useState<ProductType>({
      id:  '',
      pdt_name: '',
      pdt_price: '',
      pdt_qty: '',
      pdt_type: ''
   })
      
   useEffect(() => {
      if(listProducts) {
         setProducts(listProducts)
   
         findProductById(id!)
            .then(setProduct)
            .catch(e => console.log(e))

         allProducts()
            .then(setProducts)
            .catch(e => console.log(e))
      }

   }, [])

   useEffect(() => {
      getProduct()
   })

   const newProductName = document.querySelector('#newProductName') as HTMLInputElement
   const newProductPrice = document.querySelector('#newProductPrice') as HTMLInputElement
   const newProductType = document.querySelector('#newProductType') as HTMLInputElement
   const newProductQty = document.querySelector('#newProductQty') as HTMLInputElement

   const getProduct = async() => { // Seta os campos com o dado do produto

      //console.log(product)

      let pdt_name = product.pdt_name
      let pdt_price = product.pdt_price
      let pdt_type = product.pdt_type
      let pdt_qty = product.pdt_qty

      newProductName.value = pdt_name
      newProductPrice.value = pdt_price
      newProductType.value = pdt_type
      newProductQty.value = pdt_qty
   }

   //getProduct()

   const updateProduct = async(id: string) => { // Atualiza o produto

      await axios.put(`${server}/edit/product/${id}`, {
         // pdt_name, pdt_price, pdt_type, pdt_qty
         pdt_name: newProductName.value,
         pdt_price: newProductPrice.value,
         pdt_type: newProductType.value,
         pdt_qty: newProductQty.value
      })
         .then(response => {
            if (
               ((newProductName.value && newProductPrice.value && newProductType.value && newProductQty.value) !== '') &&
               ((newProductName.value && newProductPrice.value && newProductType.value && newProductQty.value) !== '0')
               // ((newProductName.value && newProductPrice.value && newProductType.value && newProductQty.value) !== 0)
            ) {

               if (response.status === 200) {
                  alert(`
                     ${response.data.msg} 😎
                     Nome do produto: ${newProductName.value}
                     Preço do Produto: ${newProductPrice.value}
                     Tipo do Produto: ${newProductType.value}
                     Quatidade do Produto: ${newProductQty.value}
                  `)

                  if(close) {
                     close()
                  }

                  // setTimeout(() => navigate('/openSystem'), 1000)
                  // getProducts()
                  
               } else if (response.status === 400) {
                  alert('Erro ao cadastrar')
               }

            } else {
               alert('Por obséquio, preencha todos os campos corretamente')
            }
         })
         // .catch(err => alert(err.response.data.msg))
         .catch(err => console.log(err.response.data.msg))
   }

   return (
      <section className="editProductForm w-100 h-100 f column sbt z-index-50">
         <h4 className="flex sbt">
            <div className="flex text-center w-100">
               Atualizar Produto
               <MoneyCheckPen w='25' h='25' fill='var(--bs-info)' className='ml-1' />
            </div>

            <div id='closeEditProduct' className="flex">
               <XMark w='24' h='24'
                  className=''
                  onClick={ close }
               />
            </div>
         </h4>

         <div className="inputForm">
            <input type="text" name="newProductName" id="newProductName"
               placeholder="Nome do produto"
               required
               onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Digite o nome do Produto')}
               onInput={e => (e.target as HTMLInputElement).setCustomValidity('')} />
         </div>

         <div className="inputForm">
            <input type="number" name="newProductPrice" id="newProductPrice"
               placeholder="Preço"
               required
               onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Digite o preço do Produto')}
               onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            />
         </div>

         <div className="inputForm">
            <select name="newProductType" id="newProductType" className="" required>
               <option value="" className="withoutBg">Escolha o tipo</option>
               <option value="Comidas" className="withoutBg">Comidas</option>
               <option value="Bebibas" className="withoutBg">Bebidas</option>
               <option value="Cigarros" className="withoutBg">Cigarros</option>
               <option value="Diversos" className="withoutBg">Diversos</option>
            </select>
         </div>

         <div className="inputForm">
            <input type="number" name="newProductQty" id="newProductQty"
               placeholder="Quantidade"
               required
               onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Informe a quantidade do Produto')}
               onInput={e => (e.target as HTMLInputElement).setCustomValidity('')} />
         </div>

         <button
            id="btnRegisterNewProduct"
            className="btnRegisterNewProduct btn btn-info"
            onClick={() => updateProduct(`${id}`)}
         >
            Atualizar Produto
            <Registered w='24' h='24' fill='var(--bs-dark)' className='ml-1' />
         </button>

         <button className="btn btn-warning" onClick={ close } >
            Voltar
            <ArrowLeftLong w='24' h='24' fill='var(--bs-dark)' className='ml-1' />
         </button>
      </section>
   )
}
