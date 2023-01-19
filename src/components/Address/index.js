/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { tablePrice } from "../../region/PriceTable";
import {PopUp, ContainerPopUp, AlertError } from './styled';
export default function CalcPrice({ props }) {
    const [total, setTotal] = useState('');
    const [err, setErr] = useState(false);
    const [visible, setVisible] = useState(false);
    const {peso} = props || '';
    const {DestinationLocation} = props || '';
    
    useEffect(()=>{
        for(let key in tablePrice) {
            if(DestinationLocation){
                const strDestination = DestinationLocation.replace(/( )+/g, '');
                if(key === strDestination){
                    const value = tablePrice[key]
                    if(!peso) return setErr(true);
                    setTotal(value[peso]);   
                    setVisible(true); 
                    setErr(false)
                }
                
            }
        }  
    },[props])

    return (
        <ContainerPopUp> 
        <PopUp active={visible}>
            <div>{DestinationLocation}</div>
            Valor do frete: {total}
         </PopUp>
        <AlertError alertVisible={err}>É preciso informar o peso da encomenda</AlertError>
        </ContainerPopUp>
    )
}