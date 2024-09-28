import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {//использую useEffect куда я передаю фун-ию "()", 
        updateComic();//как мы вызываем здесь стрелочную фун-ию выше чем она объявлена const onRequest = (offset) => {} сюда, дело в том что useEffect запускается после рендера, после того как наша фун-ия уже существует внутри нашего компонента фун-ии, поэтому мы спокойно можем её использовать onRequest() выше чем она объявлена
    }, [comicId])//когда оставляем пустой массив эта фун-ия выполнится всего один раз(при только создании моего компонента)

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;//вытаскиваем данные которые будут находится в комиксе и которые будут использоваться

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
             <Link to="/comics" className="single-comic__back">Back to all</Link>{/*element <a> replace to component <Link> */}
            
        </div>
    )
}

export default SingleComicPage;