import React, {Component} from 'react';

export default class ErrorBoundry extends Component{
    constructor(){
        super()  ;
        this.state = {
            hasError: false
        };
    }

    componentdidCatch(){
        this.setState({
            hasError: true
        });
    }

    render(){
        if (this.state.hasError){
            return (
                <h1>Some problems was occured. We are already trying to fix it!</h1>
            );
        }
        return this.props.children;
        
    }
    
}
