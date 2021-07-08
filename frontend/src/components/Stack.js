import { Children, useState } from "react";

import Card from "./Card";

import { StackFrame } from "../styles/StyledFrame";

const Stack = ({ children, onVote, setTopDogIndex, ...props }) => {
  const [stack, setStack] = useState(Children.toArray(children));

  // return new array with last item removed
  const pop = (array) => {
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

    setTopDogIndex((prevState) => prevState - 1);
  };

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
