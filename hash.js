Hash = {
	// Получаем данные из адреса
	get: function() {
		var vars = {}, hash, splitter, hashes;
		if (!this.oldbrowser()) {
			var pos = window.location.href.indexOf('?');
			hashes = (pos != -1) ? decodeURIComponent(window.location.href.substr(pos + 1)) : '';
			splitter = '&';
		}
		else {
			hashes = decodeURIComponent(window.location.hash.substr(1));
			splitter = '/';
		}
 
		if (hashes.length == 0) {return vars;}
		else {hashes = hashes.split(splitter);}
 
		for (var i in hashes) {
			if (hashes.hasOwnProperty(i)) {
				hash = hashes[i].split('=');
				if (typeof hash[1] == 'undefined') {
					vars['anchor'] = hash[0];
				}
				else {
					vars[hash[0]] = hash[1];
				}
			}
		}
		return vars;
	}
	// Заменяем данные в адресе на полученный массив
	,set: function(vars) {
		var hash = '';
		for (var i in vars) {
			if (vars.hasOwnProperty(i)) {
				hash += '&' + i + '=' + vars[i];
			}
		}
 
		if (!this.oldbrowser()) {
			if (hash.length != 0) {
				hash = '?' + hash.substr(1);
			}
			window.history.pushState(hash, '', document.location.pathname + hash);
		}
		else {
			window.location.hash = hash.substr(1);
		}
	}
	// Добавляем одно значение в адрес
	,add: function(key, val) {
		var hash = this.get();
		hash[key] = val;
		this.set(hash);
	}
	// Удаляем одно значение из адреса
	,remove: function(key) {
		var hash = this.get();
		delete hash[key];
		this.set(hash);
	}
	// Очищаем все значения в адресе
	,clear: function() {
		this.set({});
	}
	// Проверка на поддержку history api браузером
	,oldbrowser: function() {
		return !(window.history && history.pushState);
	}
	// получаем адрес
	,read: function() {
	    var pageHref=location;
        var stroka =pageHref.toString();
		return stroka;
		
	}
};