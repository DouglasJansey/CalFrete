/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import  tableRegion  from "../../region/Region.json";
import {PopUp, ContainerPopUp, AlertError, AlertErrorKg } from './styled';
export default function CalcPrice({ props }) {
    const [total, setTotal] = useState('');
    const [err, setErr] = useState(false);
    const [errorKg, setErrorKg] = useState(false);
    const [visible, setVisible] = useState(false);
    const {weight} = props || '';
    const {quantity} = props || '';
    const {OriginLocation} = props || '';
    const {DestinationLocation} = props || '';

    useEffect(()=>{  
                if(OriginLocation && DestinationLocation){
                    const value = tableRegion[OriginLocation.toUpperCase()];
                    if(!weight || !quantity) return setErr(true);
                    if(weight > 10) {
                        setVisible(false);
                       return setErrorKg(true);
                    } 

                    getWeight(value);    
                    setVisible(true); 
                    setErr(false);
                    setErrorKg(false);               
                }

    },[props, weight])
    const getWeight=(value)=>{
 
        if(value){
            let newWeight = weight;
            if(newWeight > 2 && newWeight < 5) newWeight = 5;
            const peso = `até ${newWeight} kg`;
            const filter = value.filter((item)=>{
              return item.PESO.toLowerCase() === peso;  
            });
            const price = filter[0][DestinationLocation] * parseInt(quantity);
            setTotal(price.toFixed(2))
        }

    }

    return (
        <ContainerPopUp> 
        <PopUp active={visible}>
           {/* <div>Destino: {DestinationLocation}</div>*/}
            Valor do frete: {total}
         </PopUp>
        <AlertError alertVisible={err}>É preciso informar {weight ? 'quantidade' : 'peso'}</AlertError>
        <AlertErrorKg alertError={errorKg}>Peso maior que 10kg, por favor, entre em contato!</AlertErrorKg>
         <div>Peso maior que 10kg, por favor, entre em contato!</div>
        </ContainerPopUp>
    )
}