
import {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";//Switch

// import {MainPage,Page404, ComicsPage, SingleComicPage} from '../pages';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() =>  import('../pages/404'));
const MainPage = lazy(() =>  import('../pages/MainPage'));
const ComicsPage = lazy(() =>  import('../pages/ComicsPage'));
const SingleComicLayout = lazy(() =>  import('../pages/singleComicLayout/SingleComicLayout')); 
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));



const  App = () => {
        return (
            <Router> {/* //Router - это делается для того чтобы у нас были рабочими все ссылки и все страницы на которые будут ссылатся эти ссылки внутри одного компонента Router*/}
                {/* Router - маршрутизатор который получает сигналы от ссылок и показывать нам нужную страницу */}
                {/* Route - маршрут, именно этот компонент будет грузиться если в url-адрессе  появится определенная ссылка */}

                <div className="app"> 
                <AppHeader/> {/* ссылки*/}
                <main> {/* странцы */}
                    <Suspense fallback={<Spinner/>}>{/* fallback - это запасной компонент, который можно показать пока грузится динамический импорт, в него можно поместить как реакт компонент так и реакт элемент*/}
                        <Routes>{/* <Switch> */}
                            {/* Exate - этот атрибут позволяет сказать что только полное состояние пути будет рендерить этот компонент */}
                        <Route path="/" element={<MainPage/>}/> {/* <Route exact path="/"> */}
                            {/* <MainPage/> */}
                        {/* атрибут path - какие  url-адресса будут отслеживать каждый из маршрутов, path="/" - главная страница*/}
                            {/* </Route> */}
                            <Route path="/comics" element={<ComicsPage/>}/>
                                {/* <ComicsPage/> */}
                        {/* </Route> */}
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                                <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
            </Router>
        )
    // }
}

export default App;