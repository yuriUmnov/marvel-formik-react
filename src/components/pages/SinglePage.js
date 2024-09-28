import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";

// Хотелось бы вынести функцию по загрузке данных как отдельный аргумент
// Но тогда мы потеряем связь со стэйтами загрузки и ошибки
// А если вынесем их все в App.js - то они будут одни на все страницы

const SinglePage = ({Component, dataType}) => {//1) я задал второй компонент dataType
    //7) Мы можем его передавать через аргумент Component, dataType
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

        useEffect(() => {//4) В зависимости от этого мы получаем какие то данные 
            updateData()//5) Записываем в state
        }, [id])

        const updateData = () => {
            clearError();

            switch (dataType) {//2)я задал второй компонент dataType, что при помощи строки  будем решать какая фун-ия у нас будет запускаться
                case 'comic'://3)если это комикс = то getComic
                    getComic(id).then(onDataLoaded);//или получить один комикс
                    break;
                case 'character'://4) если это персонаж = то getCharacter
                    getCharacter(id).then(onDataLoaded);//или получить одого персонажа
            }
        }

        const onDataLoaded = (data) => {
            setData(data);//5) Записываем в state
        }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !data) ? <Component data={data}/> : null;//6)когда мы рендерим content, мы изначально можем не знаеть  <Component data={data} какой компонент
        // 8) Теперь это какая-то абстракция которая говорит что вот она будет рендерить отдельную страницу, 
        // Какой метод внутри себя будет использовать она ещё не знает, она получит только при вызове
        // И какой компонент она как верстку как интерфейс она будет рендурить она тоже не знает, она получит только при вызове
        return (
            <>
                <AppBanner/>
                {errorMessage}
                {spinner}
                {content}
            </>
        )
}

export default SinglePage;