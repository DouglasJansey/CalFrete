/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import TablePrice from '../components/Calc';
import axios from '../service';
import inputMaskCep from '../components/Util/InputMaskCep';
import {
    Container, ContainerForm, PostalCodes, AlertErrorInput,
    Label, Form, ButtonSubmit, AlertError, ContainerInputs
} from './styled';

export default function Calculator() {

    const [err, setErr] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [cepOrigin, setCepOrigin] = useState('');
    const [cepDestination, setCepDestination] = useState('');
    const [itemHeight, setHeight] = useState('');
    const [itemWidth, setWidth] = useState('');
    const [itemLength, setLength] = useState('');
    const [dataOrigin, setDataOrigin] = useState('');
    const [dataDestination, setDataDestination] = useState('');
    const [weight, setWeight] = useState();
    const [quantity, setQuantity] = useState('');
    const [CalcTable, setCalcTable] = useState('');
    const originLocation = dataOrigin.Distrito;
    const DestinationLocation = dataDestination.Distrito;
    const OriginLocation = dataOrigin.Distrito;
  
    useEffect(() => {
       function getData(){
            if(cepOrigin.length >= 7){
                    const origin = cepOrigin.replace('-', ''); 
                        axios.get(origin).then(res =>{         
                            setDataOrigin(res.data);
                            console.clear();
                            setErr(false)
                        }).catch(err => {
                            console.log(err.response.statusText)
                            setErr(true);
                            console.clear();
                        })      
               
             
            }
           if (cepDestination.length >= 7) {
            const destination = cepDestination.replace('-', '');
               axios.get(destination).then(res =>{ 
                setDataDestination(res.data);
                })      
             }
         }
         getData();

        },[cepDestination, cepOrigin, weight]);

    function GetAddress() { 
            const obj = { weight, DestinationLocation, OriginLocation, quantity}
           if(!cepOrigin || !cepDestination) return setErr(true);
           if(!itemWidth || !itemHeight || !itemLength) return setAlertError(true)
            setErr(false);
            setCalcTable(obj);
            setAlertError(false)
    }

    function handleCepOrigin(e){
        e.preventDefault();
        const value =  inputMaskCep(e.target.value);
        setCepOrigin(value);
    }
    function handleCepDestination(e){
        e.preventDefault();
        const value = inputMaskCep(e.target.value);
        setCepDestination(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        GetAddress();
    }

    return (
        <Container>
            <ContainerForm>
                <h1>Faça uma Simulação</h1>
                <Form>
                    <PostalCodes>
                        <Label>
                            De onde:
                            <ContainerInputs>
                                <input name="cepOrigin" type="text" onChange={(e)=> handleCepOrigin(e)} value={cepOrigin} placeholder='Código Postal*' />
                                <input type="text" disabled value={originLocation} placeholder="Distrito"/>

                            </ContainerInputs>
                        </Label>
                        <Label>
                            Para onde:
                            <ContainerInputs>
                             <input name="cepDestination" type="text" onChange={(e)=> handleCepDestination(e)} value={cepDestination} placeholder='Código Postal*' />   
                            <input type="text" disabled value={DestinationLocation} placeholder="Distrito"/>
                            </ContainerInputs>
                        </Label>
                    </PostalCodes>
                    <span>
                        <Label>
                            Qual a dimensão da sua encomenda:
                            <PostalCodes>
                                <div>
                                <input name="weight" type="text" onChange={(e) => setWeight(e.target.value.replace(/\D/g, ''))} placeholder='Peso(kg)*' />
                                </div>
                                <input name="height" type="text" onChange={(e)=> setHeight(e.target.value)} placeholder='Altura(cm)*' />
                                <input name="width" type="text" onChange={(e)=> setWidth(e.target.value)} placeholder='Largura(cm)*' />
                                <input name="length" type="text" onChange={(e)=> setLength(e.target.value)} placeholder='Comprimento(cm)*' />
                                <input name="quantity" type="text" onChange={(e) => setQuantity(e.target.value.replace(/\D/g, ''))} placeholder='Número de volumes*' />
                            </PostalCodes>
                        </Label>
                    </span>
                    <AlertErrorInput alertErrorVisible={alertError}>Todos os campos são obrigatórios</AlertErrorInput>
                    <AlertError alertVisible={err}>É preciso informar o cep válido</AlertError>
                    <ButtonSubmit type='button' onClick={(e) => handleSubmit(e)}> Simular </ButtonSubmit>
                </Form>
                <TablePrice props={CalcTable} />
            </ContainerForm>
        </Container >
    )
}