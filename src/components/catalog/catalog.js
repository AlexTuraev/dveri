import React from 'react';
import { withRouter } from 'react-router-dom';

import MenuTree from '../menu-tree';
import ItemsGrid from '../items-grid';
import DoorService from '../../services/door-service';

import './catalog.scss';

const Catalog = ({location}) => {
    const doorService = DoorService;
    //console.log(doorService.json.categories);
    /*useEffect(()=>{
        Object.keys(doorService.json).forEach(key =>{
            console.log(`Ключ = ${key}`);
            console.log(doorService.json)
        });
    }, []);*/

    const urlInfo = doorService.getUrlInfo(location.pathname);

    return (
        <section className='container-big catalog'>
            <h1>Catalog</h1>
            <div className ='catalog__items-block'>
                <MenuTree openKeys={urlInfo.folderIds} categories={doorService.json.categories} categoriesObjById={doorService.categoriesObjById} />
                <ItemsGrid openCategories={urlInfo.folderIds} products={doorService.json.products} />
            </div>
        </section>
    );
}

export default withRouter(Catalog);

// Применить обертку withDoorService для использования класса DoorService