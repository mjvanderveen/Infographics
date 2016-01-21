/**
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
*/
function PercentageColorSVG(c) {
			
		Snap.load(c.imagePath, function (f) {
		
		// initiate paper
		var paper = Snap("#mysvg");
	
		// initiate g
		var g = paper.g();
		
		// select main element or path from callback
		var element = f.select("g").select(c.elemtentToColor).attr({ transform: 's' + c.scale});
		
		// get element height
		var itemBB = element.getBBox();
		
		// determine row to color out of total items
		var rowToPartialColor = Math.ceil((c.items * (c.percentage / 100) / c.cols)+0.0001);
		
		// set rectGroup
		var rectGroup = paper.g();
		
		// set bounding box of this row
		var elBB;
		
		// Loop through cols and rows
		var currentItem = 1;
		var hasBeenColored = false;
		
		for ( i=0; i<c.rows; i++) {
		   
		   for ( j=0; j< c.cols; j++) {
				if(currentItem <= c.items){
					 var x =j*itemBB.width - itemBB.x;
					 var y = i*itemBB.height - itemBB.y;
					
					 g.append(element.clone().attr({ transform: 't' + + x + ',' + y + 's' + c.scale, fill: 'white' }));
				}

				currentItem++;
		   }
		   
		   if(elBB === undefined){
			 elBB = g.getBBox();
		   }
		   
		   // set base color rectangle
		   var r = paper.rect(0,(i*itemBB.height),elBB.width,itemBB.height).attr({ fill: c.baseColor });
		   
		   var b;
			// this row has to be fully colored
			if(i != rowToPartialColor - 1){
				var bbWidth = 0;
				if(hasBeenColored == false){
					bbWidth = elBB.width;
				}
				
				// create the background
				b = paper.rect(0,(i*itemBB.height), bbWidth,itemBB.height).attr({ fill: c.color });
			
			// this row should be partially colored
			} else {
				// what percentage of this  row should be colored
				var p = (c.items * (c.percentage/100)) / Math.round(c.items / c.rows);
				p = p - Math.floor(p);
				
				b = paper.rect(0,(i*itemBB.height),elBB.width * p,itemBB.height).attr({ fill: c.color })
				
				hasBeenColored = true;
			}
			
			// combine row backgrounds
			rectGroup.append(r).append(b);
		}				

		// put the rectangle on the paper
		paper.append(rectGroup);
						
		// Mask this row on the background
		rectGroup.attr({ mask: g});			
	
	});     
}		