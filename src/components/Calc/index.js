/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { tablePrice } from "../../region/PriceTable";
import {PopUp, ContainerPopUp, AlertError, AlertErrorKg } from './styled';
export default function CalcPrice({ props }) {
    const [total, setTotal] = useState('');
    const [err, setErr] = useState(false);
    const [errorKg, setErrorKg] = useState(false);
    const [visible, setVisible] = useState(false);
    const {weight} = props || '';
    const {quantity} = props || '';
    const {DestinationLocation} = props || '';
    
    useEffect(()=>{
        for(let key in tablePrice) {
            if(DestinationLocation){
                const strDestination = DestinationLocation.replace(/( )+/g, '');
                if(key === strDestination){
                    const value = tablePrice[key]
                    if(!weight || !quantity) return setErr(true);
                    if(weight > 5) {
                        setVisible(false);
                       return setErrorKg(true);
                    } 
                    const total = value[getWeight(weight)] * parseInt(quantity);
                    setTotal(total.toFixed(2));   
                    setVisible(true); 
                    setErr(false);
                    setErrorKg(false);
                }
                
            }
        }  
    },[props])
    const getWeight=(value)=>{
        if(value && value <= 5){
            if(value > 0 && value < 2) return "1kg"
            if(value > 1 && value < 5) return "2kg"
            if(value > 4 && value < 6) return "5kg"
            if(value >= 6) ;            
        }
    }

    return (
        <ContainerPopUp> 
        <PopUp active={visible}>
            <div>{DestinationLocation}</div>
            Valor do frete: {total}
         </PopUp>
        <AlertError alertVisible={err}>É preciso informar o peso e quantidade</AlertError>
        <AlertErrorKg alertError={errorKg}>Peso maior que 5kg, por favor, entre em contato!</AlertErrorKg>
        </ContainerPopUp>
    )
}