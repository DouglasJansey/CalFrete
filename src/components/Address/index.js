/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { tablePrice } from "../../region/PriceTable";
export default function CalcPrice({ props }) {
   const {peso} = props || '';
   const {destination} = props || '';
   const [total, setTotal] = useState('');
  

    useEffect(()=>{

        for(let key in tablePrice) {
            if(key === destination){
                const value = tablePrice[key]
                setTotal(value[peso]);
            }
            
        }  
    },[props])
    return (
        <div>
             <div>Valor do frete: {total} </div>
        </div>
    )
}