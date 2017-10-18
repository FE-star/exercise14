function get(key) {
	  console.log(key,localStorage[key]);
    return JSON.parse(localStorage[key])
}

function set(key, value) {
    try {
        localStorage[key] = JSON.stringify(value)
      } catch(e) {
      	removeItem(key,value,'random')
      }
}

let start = 0;
function removeItem(key,value,type){
  let space = JSON.stringify(value).length;
  let number = Number(key.slice(5));

	if(type == 'random'){ //随机移除 最慢
		let size = 0;
  	let items = [];
  	for(item in localStorage){
  		items.push(item)
  		size += localStorage[item].length;
  		if(size > space) break;
  	}
  	for(let i=0;i<items.length;i++){
  		localStorage.removeItem(items[i]);
  	}
	}

	if(type =='behind'){ //从后往前移除
		let size = 0;
		while(--number){
			let item = 'data-'+number;
			size +=localStorage[item].length;
			localStorage.removeItem(item)
			if(size > space){
				break
			}
		}
	}

	if(type == 'front'){ //从前往后移除
   let size = 0;
   while(start++ < number){
			let item = 'data-'+start;
			size +=localStorage[item].length;
			localStorage.removeItem(item)
			if(size > space){
				break
			}
		}
	}

	localStorage[key] = JSON.stringify(value) //把数据放进去

}

window.storage = {
    get: get,
    set: set
}