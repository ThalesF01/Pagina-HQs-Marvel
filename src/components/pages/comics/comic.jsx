import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import md5 from 'md5';
import { useNavigate } from 'react-router-dom'

export const Comic = () => {

  const publicKey = 'c35bd6ac7d24ffa9ab6b91748102fc41';
  const privateKey = 'babd4db99c02ee9a5d1bd653484e3c5a6a29da7b';
  const time = Number(new Date())
  const hash = md5(time + privateKey + publicKey);
  
const {id} =useParams()

let navigate = useNavigate()

const [comic, setComic] = useState()

useEffect(()=>{
  axios.get(`https://gateway.marvel.com:443/v1/public/comics/${id}?ts=${time}&apikey=${publicKey}&hash=${hash}`)
 .then(response =>{
      console.log(response.data.data.results)
      setComic(response.data.data.results[0])
     // console.log('Segundo log', item)
  }) 
  .catch(err => console.log(err))
}, [0])


  return (
    <>
    <h1>Teste {id}</h1>
    <h1>Comic </h1>
    <button onClick={()=>navigate(`/comics`)}>Retornar</button>
            {
              (!comic)?"Nada aqui":(
                <>
                    <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={`Foto do ${comic.name}`} />
                  <p>Nome da HQ: {comic.title}</p>
                  <p>Descrição da HQ: {comic.description}</p>
                  <p>Preço da HQ: {comic.price}</p>
                  <p>personagens da HQ: {`${comic.available}.${comic.collectionURI}`}</p>
                </>
                
              )
            }
            </>        
  );
}

export default Comic;