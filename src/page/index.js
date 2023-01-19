/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import TablePrice from '../components/Address';
import axios from '../service'
import {
    Container, ContainerForm, PostalCodes, Select,
    Label, Form, ButtonSubmit, AlertError, ContainerInputs
} from './styled';

export default function Calculator() {

    const [err, setErr] = useState(false);
    const [cepOrigin, setCepOrigin] = useState('');
    const [cepDestination, setCepDestination] = useState('');
    const [dataOrigin, setDataOrigin] = useState('');
    const [dataDestination, setDataDestination] = useState('');
    const [peso, setPeso] = useState('');
    const [CalcTabela, setCalcTabela] = useState('');
    const originLocation = dataOrigin.Distrito;
    const DestinationLocation = dataDestination.Distrito;

    useEffect(() => {
        async function getData(){
            if(cepOrigin.length >= 7){
               const origin = cepOrigin.replace('-', '');
              
               axios.get(origin).then(res =>{ 
                setDataOrigin(res.data);
                })      
            }
           if (cepDestination.length >= 7) {
            const destination = cepDestination.replace('-', '');
            console.log(destination);
               axios.get(destination).then(res =>{ 
                setDataDestination(res.data);
                })      
             }
         }
         getData();

        },[cepDestination, cepOrigin, peso]);
console.log(peso)
    function GetAddress() {
        if(peso && DestinationLocation){
            const obj = { peso, DestinationLocation}
            if(!cepOrigin || !cepDestination) return setErr(true);
            setErr(false);
            if (obj) return setCalcTabela(obj);
            // if(origin[0] === destination[0]);
        }
    }

    function maskInput(value){
        const input = value;
        if(!input) return '';
        return input.replace(/\D/g, "")
        .replace(/(\d{4})(\d{3})+\d?/, "$1-$2")
    }
    function handleCepOrigin(e){
        e.preventDefault();
        const value =  maskInput(e.target.value);
        setCepOrigin(value);
    }
    function handleCepDestination(e){
        e.preventDefault();
        const value = maskInput(e.target.value);
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
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <PostalCodes>
                        <Label>
                            De onde:
                            <ContainerInputs>
                                <input name="cepOrigin" type="text" onChange={(e)=> handleCepOrigin(e)} value={cepOrigin} placeholder='Informe o CEP' />
                                <input type="text" disabled value={originLocation} placeholder="Distrito"/>

                            </ContainerInputs>
                        </Label>
                        <Label>
                            Para onde:
                            <ContainerInputs>
                             <input name="cepDestination" type="text" onChange={(e)=> handleCepDestination(e)} value={cepDestination} placeholder='Informe o CEP' />   
                            <input type="text" disabled value={DestinationLocation} placeholder="Distrito"/>
                            </ContainerInputs>
                        </Label>
                    </PostalCodes>
                    <span>
                        <Label>
                            Qual a dimensão da sua encomenda:
                            <PostalCodes>
                                <div>
                                    <Select onChange={(e) => setPeso(e.target.value)} name='weight' type="text">
                                        <option hidden defaultChecked value=''>Qual é o Peso?*</option>
                                        <option value="1kg">1kg</option>
                                        <option value="2kg">2kg</option>
                                        <option value="5kg" >5kg</option>
                                    </Select>
                                </div>
                                <input name="altura" type="text" placeholder='Altura(cm)' />
                                <input name="largura" type="text" placeholder='Largura(cm)' />
                                <input name="comprimento" type="text" placeholder='Comprimento(cm)' />
                                <input name="comprimento" type="text" placeholder='Quantidade' />
                            </PostalCodes>
                        </Label>
                    </span>
                    <ButtonSubmit type='submit'> Simular </ButtonSubmit>
                </Form>
                <TablePrice props={CalcTabela} />
                <AlertError alertVisible={err}>É preciso informar o distrito</AlertError>
            </ContainerForm>
        </Container >
    )
}