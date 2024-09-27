
import{ useState, useEffect } from "react";

const LoadingText= ({ text } : {text: string;}) => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev < 3 ? prev + 1 : 0));
    }, 500); 

    return () => clearInterval(interval);
  }, []);

  const dots = ".".repeat(dotCount);

  return (
    <div className="inline-flex items-center">
      <span>{text}</span>
      <span className="ml-2">
        <span>{dots}</span>
      </span>
    </div>
  );
};

export default LoadingText;
