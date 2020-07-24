import React from "react";
import {
  Circle,
  Square,
  Rectangle,
  Shape,
  displayShape,
  isSpecial,
} from "./lib/shape";
import "./Shape.css";

// Example: using typeguards
const commonProperties = (shape: Shape): React.CSSProperties => {
  return {
    backgroundColor: shape.color,
    border: isSpecial(shape)
      ? `10px solid ${shape.specialProperties.borderColor}`
      : undefined,
  };
};

const circleStyles = (c: Circle) => ({
  height: 2 * c.radius,
  width: 2 * c.radius,
  borderRadius: "100%",
  ...commonProperties(c),
});

export const CircleEl: React.FC<Circle> = (circle) => (
  <div style={circleStyles(circle)}></div>
);

const squareStyles = (s: Square): React.CSSProperties => ({
  height: s.sideLength,
  width: s.sideLength,
  ...commonProperties(s),
});
export const SquareEl: React.FC<Square> = (square) => (
  <div style={squareStyles(square)}></div>
);

const rectangleStyles = (r: Rectangle): React.CSSProperties => ({
  width: r.width,
  height: r.height,
  ...commonProperties(r),
});
export const RectangleEl: React.FC<Rectangle> = (rectangle) => (
  <div style={rectangleStyles(rectangle)}></div>
);

interface Props {
  shape: Shape;
  favorited?: boolean;
  onSelectShape: (id: number) => void;
}


// Example:: using Discriminated Unions
const getShapeElement = (shape: Shape): JSX.Element => {
  switch (shape.type) {
    case "Circle":
      return <CircleEl {...shape} />;
    case "Rectangle":
      return <RectangleEl {...shape} />;
    case "Square":
      return <SquareEl {...shape} />;
  }
};

const renderText = (value: string): JSX.Element => (
  <>
    {value.split("\n").map((value) => (
      <div key={value}>{value}</div>
    ))}
  </>
);

export const ShapeView: React.FC<Props> = ({
  onSelectShape,
  shape,
  favorited,
}): JSX.Element => {
  const handleSelect = () => onSelectShape(shape.id);
  const [showInfo, setShowInfo] = React.useState(false);

  return (
    <div className="shape-row">
      <div>{getShapeElement(shape)}</div>
      <div style={{ padding: "1rem" }}>
        <button onClick={() => setShowInfo(!showInfo)}>Show Info</button>
        {!favorited && <button onClick={handleSelect}>Add To Favorites</button>}
      </div>
      <div>{showInfo && renderText(displayShape(shape))}</div>
    </div>
  );
};
