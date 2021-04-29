import doorsDataJSON from './json-bravo/doors.json'; // JSON-object - данные по дверям
import translit from './translit';

let doorsJson = doorsDataJSON; // для имитации получения данных, впоследствии на сервере можно будет также исп-ть для модификации исходного JSON

class DoorService {
    constructor() {
        this.json = Object.assign({}, doorsJson);
        
        this.categoriesObjById = {}; /* чтобы ссылаться на категорию по ключу id. {id: {Объект category}} */
        this.json.categories.forEach(item => {
            this.categoriesObjById[item.id] = item;                   /* формируем ссылочный объект для обращения к категории по полю id */
            item.parentId = item.parent_id;                           /* Переводим в привычный camelCase */
            delete item.parent_id;
        });
        this.json.products.forEach(item => {
            item.categoryId = item.category_id;
            delete item.category_id;
        });

        //this.categoriesTree = {}; // {id_ParentCategory : [id1_ChildCategory, id2_ChildCategory, ...]} // ???
        //this.fillCategoriesTree();                                                                     // ???
        this.addFieldsTranslitCategoryTitle();
        this.addFieldsTranslitProductTitle();
    }

    /* ------------------------------------------------------------------------------------------------------------------------------- */
    /* Возвращает index в массиве "arr" (arr[index].id ===searchId) (для поиска родительской ноды с id===searchId и не только) */
    findByField({ arr = [], targetField, searchValue }) {
        if (arr.length === 0) return -1;
        return arr.findIndex((item) => {
            if (item.hasOwnProperty(targetField)){
                return item[targetField] === searchValue;
            } else return false;
        });
    }   
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    findIdxCategoryById(id){
        return this.findByField({arr: [...this.json.categories], targetField: 'id', searchValue: id});
    }
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    findProductByEndUrl(url){
        //return this.json.products.findIndex(product => product.translitTitle === url);

        return this.json.products.findIndex(product => {
            const arr = product.url.split('/');
            return arr.pop() === url;
        });
    }
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // ВОЗМОЖНО ИЗЛИШНЯЯ ОПЕРАЦИЯ ПО ДОБАВЛЕНИЮ translitTitle
    addFieldsTranslitProductTitle(){
        this.json.products.forEach(product => {
            product.url += '-id'+ product.id.toString();

            const arr = this.splitUrl(product.url);                                  // ??? оставлять поле translitTitle ???
            product.translitTitle = arr.pop();                                       // ??? оставлять поле translitTitle ???
        }, this);
    }
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    /* Добавляем поле translitUrlTitle по всем категориям ('mezhk' соотв-т 'Межк') */
    addFieldsTranslitCategoryTitle(){
        this.json.categories.forEach(category => {
            category.translitTitle = translit(category.title.replaceAll(/ {2,}/g, ' ').toLowerCase());
        });
    }
    /* ------------------------------------------------------------------------------------------------------------------------------- */

    /*  Заполняет this.categoriesTree -> {idParent_N : [{ parentId: idParentN}, ..., {parentId: idParentN}]}    эл-ты ноды иерархии каталога */
    /*fillCategoriesTree() {
        const arr = this.json.categories;
        const res = {};
        arr.forEach((item => {
            if (res[item.parentId] === undefined) {
                res[item.parentId] = []; // создаем свойство в res{parentId: []}
            }
            res[item.parentId].push(item.id);
        }));

        this.categoriesTree = Object.assign({}, res);
    }*/
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    splitUrl(pathname){
        const arr = pathname.split('/');
        if(arr[arr.length-1] === "") arr.pop(); // удаляем- пустой элемент
        if(arr[0] ==="") arr.shift(); // удаляем- пустой элемент
        return [...arr];
    }
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    getUrlInfo(pathname){
        const arrUrls = this.splitUrl(pathname);
        switch(arrUrls[0]){
            case 'catalog': 
                arrUrls[0] = null; // вместо catalog передаем arr[0]===null (такой id у головного эл-та)
                const resultCatalogElements = this.getCatalogUrlInfo(pathname, ...arrUrls); 
                console.log(resultCatalogElements);
                return resultCatalogElements;
                break;
            default: return -1; // неправильный адрес
        }
    }
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    // формируем URL-путь для продукта с заданным id
    createProductUrl(id, categories=[...this.json.categories]){
        let idx = this.findIdxCategoryById(id);
        if (idx === -1) return false; // значит ошибка в json-файле, неправильно указана родительская категория

        if(categories[idx].parentId === null){
            return '/catalog' + '/' + categories[idx].translitTitle;
        }else {
            //console.log(`path = ${categories[idx].translitTitle}`);
            return this.createProductUrl(categories[idx].parentId, categories) + '/' + categories[idx].translitTitle;
        }
    }
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    getChildrenIds(parentId){
        /*if (this.categoriesTree[parentId] === undefined) return [];
        else return([...this.categoriesTree[parentId]]);*/
        /* код выше, когда использовалось categoryTree */

        return this.json.categories.filter(item => (item.parentId === parentId))
            .map(item => item.id);
    }
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    /* Проверка правильности пути в URL в соответствии с json, возвращает массив id до тек-й категории в URL */
    checkCategoriesUrlAndGetIds(categories, arrUrls){
        if(arrUrls[0] !== null) {
            return false; // путь неверный
        }

        if (arrUrls.length===1){
            return null; // то есть последний url === 'catalog'
        } else{
            for(let i=1; i<arrUrls.length; i++){
                const idNext = this.getChildrenIds(arrUrls[i-1])
                    .find(id=>{
                        const idx = this.findIdxCategoryById(id);
                        return categories[idx].translitTitle === arrUrls[i];
                    });
                if(idNext === undefined) return false; // путь неверный
                else arrUrls[i] = idNext;
            }
        }
        return arrUrls; // возвращаем массив пути из id категорий до текущей категории (catalog folder) Например, [3,10,507]
    }
    /* ------------------------------------------------------------------------------------------------------------------------------- */
    getCatalogUrlInfo(pathname, ...arrUrls){
                // пробуем найти последний эл-т url среди products
        let idx = this.findProductByEndUrl(arrUrls[arrUrls.length-1]);

        let treeIds=[];
        if (idx === -1) {
                /* Возможно это страница категории каталога. Но это точно не продукт */
            treeIds = this.checkCategoriesUrlAndGetIds([...this.json.categories], [...arrUrls]);
            if(treeIds){
                return { path: true, isProduct: false, isFolder: true, folderIds: treeIds };
            }
                
        } else{
                /* Это продукт, теперь проверяем правильность пути дерева каталога */
            const pathProduct = this.createProductUrl(this.json.products[idx].category_id, [...this.json.categories]) + '/' + this.json.products[idx].translitTitle
            treeIds = this.checkCategoriesUrlAndGetIds([...this.json.categories], [...arrUrls].pop());
            if (pathProduct === pathname){
                return {path: true, isProduct: true, isFolder: false, idxProduct: idx, idproduct: this.json.products[idx].id, folderIds: treeIds};
            }
        }

        return {path: false, isProduct: false, isFolder: false, folderIds: []};
    }
    /* ------------------------------------------------------------------------------------------------------------------------------- */

}

const doorService = new DoorService();

export default doorService;