import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

// import thor from '../../resources/img/thor.jpeg';
import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    // state = {
    //     char: null,
    //     loading: false,
    //     error: false
    // }

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {//использую useEffect куда я передаю фун-ию "()", 
        updateChar();//как мы вызываем здесь стрелочную фун-ию выше чем она объявлена const onRequest = (offset) => {} сюда, дело в том что useEffect запускается после рендера, после того как наша фун-ия уже существует внутри нашего компонента фун-ии, поэтому мы спокойно можем её использовать onRequest() выше чем она объявлена
    }, [props.charId])//когда оставляем пустой массив эта фун-ия выполнится всего один раз(при только создании моего компонента)

    // componentDidMount() {
    //     this.updateChar();
    // }

    // componentDidUpdate(prevProps) {//, prevState
    //     if (this.props.charId !== prevProps.charId) {
    //         this.updateChar();
    //     }
    // }

    // componentDidCatch(err, info) {
    //     console.log(err, info);
    //     this.setState({error: true});
        
    // }

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        // onCharLoading();
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            // .catch(onError);

        // this.foo.bar = 0;
    }

    const onCharLoaded = (char) => {
        // console.log('update');
        // setLoading(false);
        setChar(char);
        // this.setState({
        //     char,
        //     loading: false
        // })
    }

    // const onCharLoading = () => {
    //     setLoading(true);
    //     // this.setState({
    //     //     loading: true
    //     // })
    // }

    // const onError = () => {
    //     setError(true);
    //     setLoading(false);
    //     // this.setState({
    //     //     loading: false,
    //     //     error: true
    //     // })
    // }


    // render() {
        // const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    // }  //rende }
}

//Ожидание
// Получение заказа
// Доставка
// Получение оплаты

//FSM - finite-state machine

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    let imgStyle = {'objectFit': 'cover'};
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit': 'contain'};
        }
    return (
        <>
        <div className="char__basics">
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comics.length > 0 ? null : 'There is no comics with this character'}
            {
                comics.map((item, i) => {
                    // eslint-disable-next-line
                    if (i > 9) return;
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })
            }


        </ul>
    </>
    )
    
}

CharInfo.protoType = {
    charId: PropTypes.number
}

export default CharInfo;