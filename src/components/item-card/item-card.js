import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
const { Meta } = Card;

import './item-card.scss';

const ItemCard = ({title, imgUrl, price, id}) => {
    return(
        <div className='item-card'>
            <Card
                hoverable
                style={{ width: 240 }}
                title={<p className='item-card__title' title={title}>{title}</p>}
                cover={<img className='item-card__img' alt="item picture" src={imgUrl} />}
            >        
                <Meta title="Europe Street beat" description="www.instagram.com" />
                <p className='item-card__price'>{`Цена: ${price} руб.`}</p>
            </Card>
        </div>
    );
}

export default ItemCard;