import Icon from "@/components/shared/Icon";
import { FontSize, IconKey, MainColor } from "@/types/theme";

const DebugIcons = () => {
  return (
    <div className={`flex py-20 w-full overflow-y-auto gap-10`}>
      {<TestSet strokeWidth={10} size={1} color="purple-dark" />}
      {<TestSet strokeWidth={20} size={2} color="purple" />}
      {<TestSet size={3} color="purple-light" />}
      {<TestSet strokeWidth={50} size={4} color="pink-very-light" />}
    </div>
  );
};

const TestSet = ({ strokeWidth = 35, size, color }: { strokeWidth?: number, size: FontSize; color: MainColor }) => {
  const iconKeys: IconKey[] = [
    "arrowDown",
    "close",
    "eye",
    "lockClosed",
    "lockOpen",
    "plus",
    "rocket",
    "switch",
    "thrash",
    "upload",
    "note",
    "pause",
    "play",
  ];
  const testHorizontal = false;
  return (
    <div className={`${testHorizontal && "flex"}`}>
      {testHorizontal && <div className={`fs-${size}`}>Hallo</div>}
      {iconKeys.map((value, key) => {
        return (
          <div key={key}>
            <Icon strokeWidth={strokeWidth} name={value} size={size} color={color} />
          </div>
        );
      })}
      {testHorizontal && <div className={`fs-${size}`}>Hallo</div>}
    </div>
  );
};

export default DebugIcons;
