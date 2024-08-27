import { decrement, increment, selectCount } from "@redux/slices/counter";
import { useDispatch, useSelector } from "react-redux";

const HelloPage = () => {
  return (
    <>
      <h1>Hello, world!</h1>
      <Counter />
    </>
  );
};

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <>
      <div>count: {count}</div>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </>
  );
};

export default HelloPage;
