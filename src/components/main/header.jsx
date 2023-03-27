import React from "react";
import { useNavigate } from 'react-router-dom'
import { Nav, Lista, Ul, Link } from "./mainStyles";

export default function Header(){

    let navigate = useNavigate() //Rotas

    return(
        <Nav>
            <Ul>
                <Lista> <Link onClick={()=>navigate(`/`)}> Home </Link> </Lista>
                <Lista> <Link onClick={()=>navigate(`/comics`)}> Comics </Link> </Lista>
                <Lista> <Link onClick={()=>navigate(`/characters`)}> Characters </Link> </Lista>
            </Ul>
        </Nav>
    )
}