import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component{
    state = {
        error: false
    }

    // static getDerivedStateFromError(error) {//он занимается только что обновляет состояние(setState который обрабатывает ошибку)
    //     return {error: true};
    // }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return  <ErrorMessage/>     //<h2>Something went wrong</h2>
        }

        return this.props.children;
    }

}

export default ErrorBoundary;