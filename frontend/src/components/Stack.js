import { Children, useRef, useState } from "react";

import Card from "./Card";

import { StackFrame } from "../styles/StyledFrame";

const Stack = ({ children, onVote, setTopDogIndex, ...props }) => {
	const [stack, setStack] = useState(Children.toArray(children));

	const stackRef = useRef(null);

	// return new array with last item removed
	const pop = (array) => {
		setTopDogIndex((prevState) => prevState - 1);

		return array.filter((_, index) => {
			return index < array.length - 1;
		});
	};

	const handleVote = (vote) => {
		// update the stack
		let newStack = pop(stack);
		setStack(newStack);

		// run function from onVote prop, passing the value of vote
		onVote(vote);
	};

	return (
		<>
			<StackFrame ref={stackRef} {...props}>
				{stack.map((item, index) => {
					let isTop = index === stack.length - 1;
					return (
						<Card
							drag={isTop} // only top card is draggable
							key={item.key || index}
							onVote={(result) => handleVote(result)}
							isTop={isTop}
							parentNode={stackRef.current}
							{...item.props}
						>
							{item}
						</Card>
					);
				})}
			</StackFrame>
		</>
	);
};

export default Stack;
