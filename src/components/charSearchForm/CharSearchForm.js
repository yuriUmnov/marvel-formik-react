import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
//Когда мы импортируем ошибку, она имеет такое же название как и из Formik, такой конфликт имен бывает это - норм,
//поэтому я его переименовал ErrorMessage as FormikErrorMessage 

import './charSearchForm.scss';

const CharSearchForm = () => {//function component
    const [char, setChar] = useState(null);//который внутри себя создает состояние char - сюда помещается персонаж который найден в нашей API, изначально он null
    const {loading, error, getCharacterByName, clearError} = useMarvelService();//импортируем всё из нашего сервиса - useMarvelService

    //onCharLoaded запускаем и устанавливаем наше новое состояние
    const onCharLoaded = (char) => {//function = method который будет устанавливать наше состояние
        setChar(char);      
    }

    const updateChar = (name) => {//have function которая будет запускаться в момент когда у нас будет идти запрос на сервер
        clearError();           //мы будем запускать updateChar - который сначала отчистит все ошибки, 

        getCharacterByName(name)    //а после сделает запрос на сервер 
            .then(onCharLoaded);    //и получит какие-то данные
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    // Произошла ошибка отрендерим <div className="char__search-critical-error"><ErrorMessage /></div>
    //Если нет ошибки, то мы ничего не рендерим null после формы Formik {errorMessage}

    //здесь я создал переменную results которая  будет помещаться после формы Formik
    const results = !char ? null : char.length > 0 ? //когда мы получаем какой-то рез-тат, то мы будем генерировать ещё один кусочек интерфейса
                    //Если нет персонажа !char - в таком случае мы ничего не рендерим
                    //Если персонажей больше чем один то в таком случае мы будем рендерить участок верстки <div className="char__search-wrapper">
                     <div className="char__search-wrapper"> {/* оберточка для этого блока */}
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        {/* Внутри есть сообщение There is! Visit page? что мы его нашли*/}
                        {/* Пжлст посетите страничку этого персонажа */}
                        {/* Мы обращаемся к char[0] первому элементу и единственному и берём от него name*/}
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                        {/* Также есть Линк компонента, который ведет на путь /characters/${char[0].id}*/}
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    //Если мы сделали запрос и у нас нет такого персонажа, то мы все равно получим объект, но function _transformCharacter даст нам просто пустой массив results[]
                    //В т.с. если у нас меньше одного полученногго руз-тата, будем рендерить другой кусочек интерфейса
                    //The character was not found. Check the name and try again
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;
                    //Если нашли зеленым написано There is! Visit page? --- и кнопка To page
                    //Если не нашли красным написано The character was not found. Check the name and try again

    return (
        <div className="char__search-form">     {/* Есть один блок который в верстке испо-тся для обертки */}
            <Formik     // базовый компонент <Formik 
                initialValues = {{  //у которого один initialValues п.ч. у нас одно поле
                    charName: ''    //это charName которое изначально строка
                }}
                validationSchema = {Yup.object({    //validation представлено этой схемой при помощи Yup
                    charName: Yup.string().required('This field is required')   //мы говорим что Yup.string() - поле д.б. строкой и оно .required('This field is required') должно обязательно присутствовать
                })}
                onSubmit = { ({charName}) => {  //есть onSubmit(отправка) где мы выполняем updateChar
                    updateChar(charName);       //т.е. когда наша форма будет отправляться -> мы будем запускать updateChar - который сначала отчистит все ошибки, а после сделает запрос на сервер и получит какие-то данные
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field //есть поле - Field
                            id="charName" 
                            name='charName' //связали его при помощи name и форма каждый раз валидирует это поле validationSchema, если валидация не проходит то автоматически появляется компонент ошибки FormikErrorMessage
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            // disabled={loading}
                            >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />   {/*  если валидация не проходит то автоматически появляется компонент ошибки FormikErrorMessage */}
                    {/* компонент ошибки FormikErrorMessage рендерится в качестве component="div" */}
                </Form>
            </Formik>
            {results}  {/*// я создал переменную results которая  будет помещаться после формы Formik */}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;