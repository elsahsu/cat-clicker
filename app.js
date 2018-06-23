function Cat(name, image_url) {
	this.name = name;
	this.image_url = image_url;
	this.clicks = 0;
}

Cat.prototype.clicked = function() {
	this.clicks += 1;
	console.log(this.name + ' clicked. Count:' + this.clicks);
}

Cat.prototype.clickName = function() {
	console.log(this.name + ' name clicked.');
	octopus.selectCat(this);
}

let model = {
	init: function() {
		this.cats = [
			new Cat('Onesey', 'cat_1.jpg'),
			new Cat('Twosey', 'cat_2.jpg'),
			new Cat('Threesey', 'cat_3.jpg'),
			new Cat('Foursey', 'cat_4.jpg'),
			new Cat('Fivesey', 'cat_5.jpg')
		];
		this.selected_cat = this.cats[0];
	}
};

let octopus = {
	init: function() {
		model.init();
		view.init();
	},

	getCats: function() {
		return model.cats;
	},

	getSelectedCat: function() {
		return model.selected_cat;
	},

	selectCat: function(cat) {
		model.selected_cat = cat;
		view.renderCatDisplay();
	},

	imageClicked: function() {
		model.selected_cat.clicked();
		view.renderCatDisplay();
	}
};

let view = {
	init: function() {
		$('#display-img').click(function() {
			console.log('Image clicked');
			octopus.imageClicked();
		});
		this.renderCatList();
		this.renderCatDisplay();
	},

	renderCatList: function() {
		let cats = octopus.getCats();
		console.log('renderCatList: ' + cats);
		let list_elem = $('#cat-list');
		list_elem.html('');
		cats.forEach(function(cat, index) {
			console.log(cat);
			let item_elem = document.createElement('div');
			let link_elem = document.createElement('a');
			link_elem.setAttribute('href', '#' + cat.name);
			link_elem.textContent = cat.name;
			link_elem.addEventListener('click', function() {
				cat.clickName();
			});
			item_elem.append(link_elem);
			list_elem.append(item_elem);
		});
	},

	renderCatDisplay: function() {
		let cat = octopus.getSelectedCat();
		// let image_file = "cat_" + selected_cat.index + ".jpg";
		$('#display-name').html(cat.name);
		$('#display-img').attr('src', cat.image_url);
		$('#click-count').text(cat.clicks);
	}
};

octopus.init();
