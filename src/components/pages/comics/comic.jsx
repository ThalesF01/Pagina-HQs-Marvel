import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';
import Header from '../../main/header'
import { useParams } from 'react-router-dom';
import { Div, ContainerView, Img, Cart, Title } from '../../../styles/view';
import { Article } from '../../main/styles';

export const Comic = () => {

  const publicKey = 'c35bd6ac7d24ffa9ab6b91748102fc41';
  const privateKey = 'babd4db99c02ee9a5d1bd653484e3c5a6a29da7b';
  const time = Number(new Date())
  const hash = md5(time + privateKey + publicKey);
  
const {id} =useParams()

const [comic, setComic] = useState()

useEffect(()=>{
  axios.get(`https://gateway.marvel.com:443/v1/public/comics/${id}?ts=${time}&apikey=${publicKey}&hash=${hash}`)
 .then(response =>{
      //console.log(response.data.data.results)
      setComic(response.data.data.results[0])
  }) 
  .catch(err => console.log(err))
}, [0])

  return (
    <>
      <Header />
        <Div>        
          {
            (!comic)?"Nothing here...":(
              <ContainerView>                  
                <Img><img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={`Foto do ${comic.name}`} /></Img>   
                  <Article>
                    <Title>Title: {comic.title}</Title>
                    <p>Description: {(!comic.description)?"Comic without description...":(comic.description)}</p>
                    <p>Price: ${comic.prices[0].price}</p>
                      <Cart>
                        <button>Add to Cart</button>
                        <button>Remove from Cart</button>
                      </Cart>                  
                    </Article>
                </ContainerView>
              )
            }
          </Div>
      </>        
  );
}

export default Comic;