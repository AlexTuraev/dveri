import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header';
import ImgSlider from '../img-slider';
import Catalog from '../catalog';
import MenuTree from '../menu-tree';
import ErrorBoundry from '../error-boundry';

import './app.scss';

const App = () => {
    return (
        <main>
            <ErrorBoundry>
                <Router>
                    <Header />
                    <ImgSlider />
                    
                    <Switch>
                        <Route path="/catalog" exact component={Catalog} />
                        <Route path="/catalog/:id" render={({match, history, location})=>{
                            const {id} = match.params;
                            //console.log('history');
                            //console.log(history);
                            //console.log('location');
                            //console.log(location);
                            return <Catalog />
                        }} />
                    </Switch>
                    
                </Router>
            </ErrorBoundry>

        </main>
    );
}

export default App;