var arrA = document.getElementsByTagName('a'),
		arrLink = document.getElementsByTagName('link'),
		i = 1,
		j = 1,
		lenA = arrA.length,
		lenLink = arrLink.length;

for (; i < lenA; i++) {
	arrA[i].addEventListener('click', function() {
		var title = this.getAttribute('data-title');

		for (j = 1; j < lenLink; j++) {
			arrLink[j].disabled = true;
			
			if (arrLink[j].title === title) {
				arrLink[j].disabled = false;
			}
		}
	});
}
