
/*json.categories.forEach(item=>{
		item.parentId = item.parent_id;
	})*/

(()=>{
	
	const categories=[
		{id: 1, parentId: null, title: 'id1'},
		{id: 2, parentId: null, title: 'id2'},
		{id: 3, parentId: null, title: 'id3'},
		{id: 4, parentId: null, title: 'id4'},
		{id: 5, parentId: null, title: 'id5'},

		{id: 6, parentId: 1, title: 'id6'},
		{id: 7, parentId: 1, title: 'id7'},
		{id: 8, parentId: 1, title: 'id8'},

		{id: 9, parentId: 2, title: 'id9'},
		{id: 10, parentId: 2, title: 'id10'},

		{id: 11, parentId: 3, title: 'id11'},
		{id: 12, parentId: 3, title: 'id12'},
		{id: 13, parentId: 3, title: 'id13'},
		{id: 14, parentId: 3, title: 'id14'},

		{id: 15, parentId: 4, title: 'id15'},
		{id: 16, parentId: 4, title: 'id16'},

		{id: 17, parentId: 5, title: 'id17'},
		{id: 18, parentId: 5, title: 'id18'},
		{id: 19, parentId: 5, title: 'id19'},

		{id: 20, parentId: 6, title: 'id20'},
		{id: 21, parentId: 6, title: 'id21'},
		{id: 22, parentId: 6, title: 'id22'},

		{id: 23, parentId: 7, title: 'id23'},
		{id: 24, parentId: 7, title: 'id24'},
		{id: 25, parentId: 7, title: 'id25'},
		{id: 26, parentId: 7, title: 'id26'},
		{id: 27, parentId: 7, title: 'id27'},

		{id: 28, parentId: 23, title: 'id28'},
		{id: 29, parentId: 23, title: 'id29'},
		{id: 30, parentId: 23, title: 'id30'},
		{id: 31, parentId: 23, title: 'id31'},
		{id: 32, parentId: 23, title: 'id32'},

		{id: 33, parentId: 29, title: 'id33'},
		{id: 34, parentId: 29, title: 'id34'},
		{id: 35, parentId: 29, title: 'id35'},

		{id: 36, parentId: 30, title: 'id36'},
		{id: 37, parentId: 30, title: 'id37'}
		];

	function createElement({tag, options=[], cssClasses=[]}){
		if (tag===undefined) return;

		const element = document.createElement(tag, options);
		cssClasses.forEach((item) => {
			element.classList.add(item);
		});

		return element;
	}

	
	function deepCopy(arr=[{}]){
		return arr.map(item=>{
			return Object.assign({}, item);
		});
	}

	function treeRecursion(category, categories=[]){
		if(category.id === null) return; // условие завершения рекурсии

		const idxParent = categories.findIndex(item => (item.id===category.parentId));
		if(idxParent === -1){
			return false; // неправильно составлено дерево иерархии, возможно надо throw new Error()
		}

		if (categories[idxParent].children.findIndex(item => (item.id === category.id)) === -1){ // можно использовать Set
			categories[idxParent].children.push(category);
		}

		treeRecursion(categories[idxParent], categories);
	}

	function treeWithoutRecursion(){
		// НАПИСАТЬ БЕЗ РЕКУРСИИ
	}

	function createObjTree(categories){
		//const arr = [...categories];

		const arr = deepCopy(categories);

		arr.push({
			id: null,
			parentId: undefined
		});

		arr.forEach(item => item.children=[]);

		arr.forEach(category => {
			treeRecursion(category, arr);
		});

		return arr;
	}

	


	function createDomTree(category){

		const content = category.children.reduce((result, item)=>{
			return(
				result + `<li>id: ${item.id} parentId:${item.parentId} ${item.title}
					${(item.children.length>0) ? `<ul>${createDomTree(item)}</ul>` : ''}
				</li>`
			);
		}, '');	

		return content;
	}

	/* Main program */
	console.log('categories');
	console.log(categories);
	const rootEl = document.querySelector('#root');
	
	

	const arrTree = createObjTree(categories);//1
	console.log('category with children[]');
	console.log(arrTree);

	// ---------------------------------
	
	 const template = createDomTree(arrTree[ arrTree.findIndex(item => item.id===null) ]);
	 rootEl.innerHTML = template;

})();