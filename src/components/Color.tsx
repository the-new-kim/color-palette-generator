import { IColor } from "../atoms";

interface IColorProps {
  color: IColor;
}

function Color({ color }: IColorProps) {
  const { hue, saturation, lightness } = color;

  return (
    <div
      className="flex-grow"
      style={{ background: `hsl(${hue},${saturation}%,${lightness}%)` }}
    ></div>
  );
}

export default Color;
