import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

import './items-grid.scss';
import ItemCard from '../item-card';
import withItemsGrid from '../hoc/with-items-grid';

const ItemsGrid = ({filteredProducts}) =>{
    const[totalPageElems, setTotalPageElems] = useState(0);
    useEffect(() =>{
        setTotalPageElems(filteredProducts.length);
    }, [filteredProducts]);
    
    const [items, setItems] = useState([]);
    useEffect(()=>{
        setItems (getItems(filteredProducts, 1, 20));
    }, [filteredProducts])

    const handlerPageOnChange = (page, pageSize) =>{
        const items = getItems(filteredProducts, page, pageSize);
        setItems(items);
    }

    return(
        <div className='items-grid'>
            <h1>ItemsGrid's components</h1>
            <ul className='items-grid__ul'>
                {items}
            </ul>
            <Pagination onChange={handlerPageOnChange} defaultCurrent={1} total={totalPageElems} hideOnSinglePage={false} 
                defaultPageSize={20} pageSizeOptions={[20,30,50,100]} />
        </div>
    );
}

function getItems(filteredProducts, page, pageSize){
    return filteredProducts.filter((item, index)=>{
        return ((index >= pageSize*(page-1)) && (index < pageSize*(page-1) + pageSize));
    }).map(product =>{
        const {title, pictures, price, id} = product;
        return <li key={`product${id}`}><ItemCard title={title} imgUrl={pictures[0].small} price={price} id={id}/></li>;
    });
}

export default withItemsGrid(ItemsGrid);