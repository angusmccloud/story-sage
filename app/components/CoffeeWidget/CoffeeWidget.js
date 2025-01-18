import React, { useEffect } from "react";

const CoffeeWidget = (props) => {
	const { scale = 1, marginTop = 0, marginBottom = 0, minHeight = 0, backgroundColor = "transparent" } = props;

	return (
	<div style={{
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		transform: `scale(${scale})`,
		marginTop: `${marginTop}px`,
		marginBottom: `${marginBottom}px`,
		minHeight: `${minHeight}px`,
		backgroundColor: backgroundColor
	}}>
	  <a href="https://www.buymeacoffee.com/chrispatten">
		<img src="https://img.buymeacoffee.com/button-api/?text=Buy me a book&emoji=📖&slug=chrispatten&button_colour=301e2c&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00" />
	  </a>
	</div>
	);
  };
  
export default CoffeeWidget;