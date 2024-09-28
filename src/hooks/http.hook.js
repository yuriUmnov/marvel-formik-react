import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);//null = false в логическом контексте тоже самое

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {//если body не указан то будет null, headers заголовки которые мы пудем передавать
        setLoading(true);//после того как мы установили загрузку будем отправлять fetch на сервер


        //надо обдумать каким образом выдавать ошибку, этот метод будет отправлять запрос на сервер ,но не обрабатывать её ошибку
        try {
            const response = await fetch(url, {method, body, headers}); //переменная response = ответ, воспользуемся await для того чтобы подождать ответа от сервера, здусь я буду просто использовать fetch(api)
            
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            
            //мы знаем что наш ответ это promise
            const data = await response.json();//дальше мы получаем конкретные данные,воспользуемся await  чтобы подождать результат работы ассинхроной операции и берем response.json()
            
            //если у нас данные загрузились до этого участка дошел код
            setLoading(false);//загрузку ставим false, загрузка завершилась
            return data;//если всё в порядке то после загрузки, нам фун-ия request(метод) вернёт данные которые были получены от сервера
            //чистые данные которые приходят от api
        } catch (e) {//e = error
            setLoading(false);//если произошла ошибка, загрузка прекратилась, она завершилась ошибкой
            setError(e.message);//сообщение об ошибке
            throw e;//из catch выкинуть ошибку
        }

    }, []);

    const clearError = useCallback(() => setError(null), []);//чистит ошибку, перезатереть ошибку
    return {loading, request, error, clearError}
}