// const debouncedValue = useDebounce(noneDebouncedValue)

import { useEffect, useState } from "react";

const useDebounce = (noneDebouncedVal: string) => {
	const [debouncedVal, setDebouncedVal] = useState("");

	useEffect(() => {
		const timeOutId = setTimeout(() => {
			console.log("SETTING NEW VAL");
			setDebouncedVal(noneDebouncedVal);
		}, 500);
		return () => {
			console.log("CLEARING");
			clearTimeout(timeOutId);
		};
	}, [noneDebouncedVal]);

	return debouncedVal;
};

export default useDebounce;
