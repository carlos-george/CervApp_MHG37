import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import star from '../../resources/star.png';
import phone from '../../resources/phone.png';
import uber from '../../resources/uber.png';
import taxi from '../../resources/99-app-logo.png';

interface Disponibilidade {
    id: number; 
    nome: string; 
    imageURL: string;
}

interface Cerveja {
    id: number;
    title: string;
    imageUrl: string;
}

interface Bar {
    id: number; 
    nome: string; 
    imageUrl: string; 
    nota: Number;
    contato: string;
    menu: string;
    distancia: string;
    descricao: string;
    endereco: string; 
    disponibilidades: Disponibilidade[];
    cervejas: Cerveja[];
}

const Detail = () => {

    const history = useHistory();

    const { id } = useParams();

    const [ bar, setBar ] = useState<Bar>( { id: 0, 
                                            nome: "", 
                                            imageUrl: "", 
                                            nota: 0,
                                            contato: "",
                                            menu: "",
                                            distancia: "", 
                                            descricao: "", 
                                            endereco: "", 
                                            disponibilidades: [],
                                            cervejas: [] });
    const [ atrativos, setAtrativos ] = useState<Disponibilidade[]>([]);
    const [ cervejas, setCervejas ] = useState<Cerveja[]>([]);
    const [ stars, setStars ] = useState<number[]>([]);

    useEffect(() => {
        if(id) {
            api.get(`bares/${id}`).then((res) => {
                
                setBar(res.data);
                setAtrativos(res.data.disponibilidades);
                setCervejas(res.data.cervejas);
                const arr = Array(res.data.nota).fill(null).map((_, i) => i);

                setStars(arr);
            });
        }
    }, [id]);

    const handleSelectCerveja = (id: number) => {
        console.log(id);
        history.push(`/cerveja-info/${id}`);
    }

    return (
        <>
            <div id="phone">
                <a href={`tel:${bar.contato}`}>
                    <img src={phone} alt="phone"/>
                </a>
            </div>
            <div id="detail-container">
                <header>
                    <img src={bar.imageUrl} alt={bar.nome}/>
                </header>
                <main>
                    <div className="bar-nome">
                        <div className="title">
                            <h1>
                                {bar.nome}
                            </h1>
                            <div className="nome-detail">
                                <h4>
                                    {bar.distancia}
                                </h4>
                                <strong>
                                    {stars.map(s => (

                                        <img key={s.toString()} src={star} alt="star"/>
                                    ))}
                                </strong>
                            </div>
                        </div>
                        <div className="menu">
                            <a href={bar.menu} target="_blank">MENU</a>
                        </div>
                    </div>
                    <hr className="divisor-line"/>
                    <div className="endereco">
                        <h3>
                            Endereço
                        </h3>
                        <div className="endereco-detalhe">
                            <p>
                                {bar.endereco}
                            </p>
                            <p className="delivery">
                                Possui serviço de delivery
                            </p>
                            <div className="uber">
                                <p>Ir para o bar:</p>
                                <a href="https://m.uber.com/ul/?action=setPickup&client_id=XqLmJRCR9vgEA8WhWLHlwLQ4e0Ira3TD&pickup=my_location&dropoff[formatted_address]=Raros%20Burgues%20Barro%20Vermelho%20-%20Rua%20Doutor%20Get%C3%BAlio%20Vargas%20-%20Santa%20Catarina%2C%20S%C3%A3o%20Gon%C3%A7alo%20-%20State%20of%20Rio%20de%20Janeiro%2C%20Brazil&dropoff[latitude]=-22.838444&dropoff[longitude]=-43.065945">
                                    <img src={uber} alt="uber"/>
                                </a>
                                <img src={taxi} alt="taxi"/>
                            </div>
                        </div>
                    </div>
                    <div className="cervejas">
                        <ul className="items-grid">
                            {cervejas.map( cerveja => (
                                <li key={cerveja.id}
                                    onClick={() => handleSelectCerveja(cerveja.id)}>
                                    <img src={cerveja.imageUrl} alt={cerveja.title} />
                                    <span>
                                        {cerveja.title}
                                    </span> 
                                </li>
                            ))}
                        </ul>
                        <div className="preferidas">
                            <p className="delivery">Temos suas cervejas preferidas geladas!!!</p>
                        </div>
                    </div>
                    <div className="reserva">
                        <a href="" className="reserva">Reserve uma mesa</a>
                    </div>
                    <div className="descricao">
                        <p>
                            {bar.descricao}
                        </p>
                    </div>
                    <div className="atrativos">
                        {atrativos.map(atrativo => (
                            <div className="atrativos-items" key={atrativo.id.toString()}>
                                <div className="item-img">
                                    <img src={atrativo.imageURL} alt={atrativo.nome}/>
                                </div>
                                <div className="item-nome">
                                    <strong>{atrativo.nome}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );

}

export default Detail;