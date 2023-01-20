/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { tablePrice } from "../../region/PriceTable";
import {PopUp, ContainerPopUp, AlertError } from './styled';
export default function CalcPrice({ props }) {
    const [total, setTotal] = useState('');
    const [err, setErr] = useState(false);
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
                    if(weight > 5) return setVisible(false);
                    const total = value[getWeight(weight)] * parseInt(quantity);
                    setTotal(total.toFixed(2));   
                    setVisible(true); 
                    setErr(false)
                }
                
            }
        }  
    },[props])
    const getWeight=(value)=>{
        if(value && value < 5){
            if(value > 0 && value < 2) return "1kg"
            if(value > 1 && value < 5) return "2kg"
            if(value > 4 && value < 6) return "5kg"            
        }
    }

    return (
        <ContainerPopUp> 
        <PopUp active={visible}>
            <div>{DestinationLocation}</div>
            Valor do frete: {total}
         </PopUp>
        <AlertError alertVisible={err}>É preciso informar o peso e quantidade</AlertError>
        </ContainerPopUp>
    )
}