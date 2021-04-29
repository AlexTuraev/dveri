import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { createObjTree, deepCopy } from '../../services/graph-tree';        // через High Order Component?
import doorService from '../../services/door-service';                    // через High Order Component?

import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

import './menu-tree.scss';

const MenuTree = ({ history, openKeys, categories, categoriesObjById }) => {
    const pushUrlForArrayIds = (urlKeys) => {
        const arr = urlKeys.map(id => doorService.categoriesObjById[id].translitTitle);
        arr.unshift('/catalog');
        history.push(arr.join('/'));
    }

    const handleClick = ({ item, key, keyPath, domEvent }) => {
        keyPath.reverse();
        pushUrlForArrayIds(keyPath);
    }

    const handleOpenChange = (openKeys) => {
        const arrIds = [...openKeys];
        let isParent = true;
        while ((arrIds.length >= 2) && isParent) {
            isParent = (categoriesObjById[arrIds[arrIds.length - 1]].parentId == arrIds[arrIds.length - 2]);
            if (!isParent) {
                arrIds.splice(arrIds.length - 2, 1); /* удаляем и цепочки предпоследний неродительский id */
                isParent = true;
            } else break;
        }

        pushUrlForArrayIds(arrIds);
    }

    const [items, setItems] = useState(null);
    useEffect(() => {
        const categoriesCopy = deepCopy(categories);
        const arrTree = createObjTree(categoriesCopy);
        setItems(createMenuTree(arrTree[arrTree.findIndex(item => item.id === null)]));
    }, [categories]);

    const [keys, setKeys] = useState([]);
    useEffect(()=>{
        openKeys.shift(); /* null - убираем, так как такого пункта "Главная" в меню нет */
        openKeys = openKeys.map(item => item.toString());
        setKeys(openKeys);
    }, [openKeys]);

    return (
        <div>
            <Menu onClick={handleClick} onOpenChange={handleOpenChange} openKeys={keys} style={{ width: 256 }} defaultSelectedKeys={['1']} defaultOpenKeys={[]} mode="inline"
                selectedKeys={[keys[keys.length - 1]]}>
                {items}
            </Menu>
        </div>
    )
}

export default withRouter(MenuTree);

/* ВНИМАНИЕ! РЕКУРСИЯ. При смене наименования функции, не забывать менять название функции в теле функции */
function createMenuTree(category) {

    const result = [];
    category.children.forEach((item) => {
        if (item.children.length > 0) {
            result.push(<SubMenu key={item.id} icon={<FolderOutlined />} title={item.title}>
                {createMenuTree(item)}
            </SubMenu>);
        } else {
            result.push(<Menu.Item key={item.id}>{item.title}</Menu.Item>);
        }
    });

    return result;
}

/* Вариант вместо Ant Menu использовать свой <ul></ul> */
/* return (<ul className='ul-menu'>
            {items}
        </ul>); */