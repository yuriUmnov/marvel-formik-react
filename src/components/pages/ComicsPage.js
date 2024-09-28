import { Helmet } from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
    return (
        <>{/* одно из главных правил jsx  фрагмент <></> */}
            {/* Helmet - шапка, название вкладки страницы */}
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                        />
                <title>Comics page</title>
            </Helmet>
            
            <AppBanner/>
            <ComicsList/> 
        </>
        
    )
}

export default ComicsPage;