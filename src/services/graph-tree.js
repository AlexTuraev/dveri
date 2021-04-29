import React from 'react';

// для экспериментов с деревом
const categories = [
    { id: 1, parentId: null, title: 'id1' },
    { id: 2, parentId: null, title: 'id2' },
    { id: 3, parentId: null, title: 'id3' },
    { id: 4, parentId: null, title: 'id4' },
    { id: 5, parentId: null, title: 'id5' },

    { id: 6, parentId: 1, title: 'id6' },
    { id: 7, parentId: 1, title: 'id7' },
    { id: 8, parentId: 1, title: 'id8' },

    { id: 9, parentId: 2, title: 'id9' },
    { id: 10, parentId: 2, title: 'id10' },

    { id: 11, parentId: 3, title: 'id11' },
    { id: 12, parentId: 3, title: 'id12' },
    { id: 13, parentId: 3, title: 'id13' },
    { id: 14, parentId: 3, title: 'id14' },

    { id: 15, parentId: 4, title: 'id15' },
    { id: 16, parentId: 4, title: 'id16' },

    { id: 17, parentId: 5, title: 'id17' },
    { id: 18, parentId: 5, title: 'id18' },
    { id: 19, parentId: 5, title: 'id19' },

    { id: 20, parentId: 6, title: 'id20' },
    { id: 21, parentId: 6, title: 'id21' },
    { id: 22, parentId: 6, title: 'id22' },

    { id: 23, parentId: 7, title: 'id23' },
    { id: 24, parentId: 7, title: 'id24' },
    { id: 25, parentId: 7, title: 'id25' },
    { id: 26, parentId: 7, title: 'id26' },
    { id: 27, parentId: 7, title: 'id27' },

    { id: 28, parentId: 23, title: 'id28' },
    { id: 29, parentId: 23, title: 'id29' },
    { id: 30, parentId: 23, title: 'id30' },
    { id: 31, parentId: 23, title: 'id31' },
    { id: 32, parentId: 23, title: 'id32' },

    { id: 33, parentId: 29, title: 'id33' },
    { id: 34, parentId: 29, title: 'id34' },
    { id: 35, parentId: 29, title: 'id35' },

    { id: 36, parentId: 30, title: 'id36' },
    { id: 37, parentId: 30, title: 'id37' }
];

function deepCopy(arr = [{}]) {
    return arr.map(item => {
        return Object.assign({}, item);
    });
}
/* ---------------- вспомогательная функция ---------------------------------------------- */
/* формируем для рекурсивно массив children в каждом элементе переданного массива */
/* поскольку используется ссылочный тип данных, то в итоге у каждого элемента children будет свой children (несколько уровней - меню категорий) */
function treeRecursion(category, categories=[]){
    if(category.id === null) return; // условие завершения рекурсии

    const idxParent = categories.findIndex(item => (item.id===category.parentId));
    if(idxParent === -1){
        return false; // неправильно составлено дерево иерархии, возможно надо throw new Error()
    }

    if (categories[idxParent].children.findIndex(item => (item.id === category.id)) === -1){ /* означает category отсутствует среди children, или можно использовать набор Set */
        categories[idxParent].children.push(category); /* Возможно уменьшить category до {id: category.id, parentId: category.parentId, title: category.title, children: category.children} */
    }

    treeRecursion(categories[idxParent], categories);
}
/* --------------------------------------------------------------------------------------- */
/* в результате будет [{}, {}, {}] - [a[0], a[1], ...], где a - {есть поле children[]}
    arr[i].children[ children[ children], children[children], ... ]. Иерархия потомков (меню категорий)
 */
function createObjTree(categories){
    //const arr = [...categories];
    const arr = deepCopy(categories);

    arr.push({
        id: null,
        parentId: undefined,
        title: 'Каталог'
    });

    arr.forEach(item => item.children=[]);

    arr.forEach(category => {
        treeRecursion(category, arr);
    });

    return arr;
}
/* --------------------------------------------------------------------------------------- */
/* ------------------------- Сюда передается category с id === null  --------------------- */
/*
    const template = createDomInnerTree(arrTree[ arrTree.findIndex(item => item.id===null) ]);
	 rootEl.innerHTML = template;
 */
function createDomInnerTree(category){

    const content = category.children.reduce((result, item)=>{
        return(
            result + `<li key=${item.id}>id: ${item.id} parentId:${item.parentId} ${item.title}
                ${(item.children.length>0) ? `<ul>${createDomInnerTree(item)}</ul>` : ''}
            </li>`
        );
    }, '');	

    return content;
}

function createDomArrayTree(category){

    const result = [];
    category.children.forEach((item)=>{
        return(
            result.push(<li key={item.id}> <a>{item.title}</a>
                {(item.children.length>0) ? <ul>{createDomArrayTree(item)}</ul> : ''}
            </li>)
        );
    });	
    
    return result;
}

export{
    deepCopy,
    createObjTree,
    createDomInnerTree,
    createDomArrayTree
}

