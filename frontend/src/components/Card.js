import { useCallback, useEffect, useRef, useState } from "react";
import { useAnimation, useMotionValue } from "framer-motion";

import { useChoiceStore } from "../store";

import { CardFrame } from "../styles/StyledFrame";

const Card = ({ children, onVote, isTop, ...props }) => {
  const cardRef = useRef(null);
  const choice = useChoiceStore();

  const x = useMotionValue(0);
  const controls = useAnimation();

  const [constrained, setConstrained] = useState(true);
  const [direction, setDirection] = useState();
  const [velocity, setVelocity] = useState();

  const getVote = (childNode, parentNode) => {
    const childRect = childNode.getBoundingClientRect();
    const parentRect = parentNode.getBoundingClientRect();
    let result =
      parentRect.left >= childRect.right
        ? false
        : parentRect.right <= childRect.left
        ? true
        : undefined;
    return result;
  };

  // determine direction of swipe based on velocity
  const getDirection = () => {
    return velocity >= 1 ? "right" : velocity <= -1 ? "left" : undefined;
  };

  const getTrajectory = () => {
    if (cardRef.current) {
      setVelocity(x.getVelocity());
      setDirection(getDirection());
    }
  };

  const flyAway = useCallback(
    (min, direction, velocity) => {
      const flyAwayDistance = (direction) => {
        const parentWidth =
          cardRef.current.parentNode.getBoundingClientRect().width;
        const childWidth = 350;

        return direction === "left"
          ? -parentWidth / 2 - childWidth / 2
          : parentWidth / 2 + childWidth / 2;
      };

      if (direction && Math.abs(velocity) > min) {
        setConstrained(false);
        controls.start({ x: flyAwayDistance(direction) });
      }
    },
    [controls]
  );

  useEffect(() => {
    const unsubscribeX = x.onChange(() => {
      const childNode = cardRef.current;
      if (childNode) {
        const result = getVote(childNode, childNode.parentNode);
        result !== undefined && onVote(result);
      }
    });

    return () => unsubscribeX();
  }, [onVote, x]);

  useEffect(() => {
    if (choice.isClicked && isTop) {
      flyAway(200, choice.direction, 300);
      choice.setIsClicked(false, "");
    }
  }, [isTop, choice, flyAway]);

  return (
    <CardFrame
      animate={controls}
      dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      ref={cardRef}
      style={{ x }}
      onDrag={getTrajectory}
      onDragEnd={() => flyAway(200, direction, velocity)}
      whileTap={{ scale: 1.1 }}
      {...props}
    >
      {children}
    </CardFrame>
  );
};

export default Card;
