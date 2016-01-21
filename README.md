NOTE: svg should contain a <g></g> tag. Within that tag, it should contain the element to color, i.e. <path>

example function call
			PercentageColorSVG({
				imagePath: "img/car.svg",
				cols: 5,
				rows: 2,
				items: 10,
				percentage: 70,
				elemtentToColor: "path",
				color: "green",
				baseColor: "black",
				scale: 0.1
			});