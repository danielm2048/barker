import { Children, useCallback, useEffect, useState } from "react";

import Card from "./Card";

import { StackFrame } from "../styles/StyledFrame";

import useUnsaveDog from "../hooks/useUnsaveDog";

const Stack = ({
	children,
	onVote,
	setTopDogIndex,
	goBack,
	setGoBack,
	...props
}) => {
	const [stack, setStack] = useState(Children.toArray(children));
	const [lastCard, setLastCard] = useState(null);

	const { mutate: unsaveDog } = useUnsaveDog();

	// return new array with last item removed
	const pop = (array) => {
		return array.filter((_, index) => {
			return index < array.length - 1;
		});
	};

	// return new array with new item on top
	const push = (array, newItem) => {
		return [...array, newItem];
	};

	const handleVote = (vote) => {
		setLastCard({ card: stack[stack.length - 1], vote });

		// update the stack
		let newStack = pop(stack);
		setStack(newStack);

		// run function from onVote prop, passing the value of vote
		onVote(vote);

		setTopDogIndex((prevState) => prevState - 1);
	};

	const handleGoBack = useCallback(() => {
		if (lastCard) {
			// update the stack
			let newStack = push(stack, lastCard.card);
			setStack(newStack);

			if (lastCard.vote) {
				unsaveDog({ dogId: lastCard.card.props.id });
			}

			setGoBack(false);
			setLastCard(null);
		}
	}, [stack, lastCard, setGoBack, unsaveDog]);

	useEffect(() => {
		if (goBack) {
			handleGoBack();
		}
	}, [goBack, handleGoBack]);

	return (
		<>
			<StackFrame {...props}>
				{stack.map((item, index) => {
					let isTop = index === stack.length - 1;
					return (
						<Card
							drag={isTop} // only top card is draggable
							key={item.key || index}
							onVote={(result) => handleVote(result)}
							isTop={isTop}
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
