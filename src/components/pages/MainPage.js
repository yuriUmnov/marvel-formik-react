import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            {/* Helmet - шапка, название вкладки страницы */}
            <Helmet>
            <meta
                name="description"
                content="Marvel information portal"
                    />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            {/* {this.state.showRandomChar ? <RandomChar/> : null} */}
            {/* <button onClick={this.toggleRandomChar}>Click me</button> */}
            <div className="char__content">
               {/* 1)когда мы добавляем 3 элемент его нужно куда-то поместить */}
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div>
                    {/* 3) Поэтому он занимает правую колонку и внутри себя вмещает CharInfo и CharSearchForm*/}
                    {/* 2) Поэтому сделали пустой блок div в который поместил CharInfo и CharSearchForm*/}
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm/>
                    </ErrorBoundary>
                </div>

            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;