import React from "react";
import "./App.css";
import { getShapes } from "./lib/api";
import { Shape } from "./lib/shape";
import { ShapeList } from "./ShapeList";

type AppView = "All" | "Favorites";

function App(): JSX.Element {
  const [shapes, setShapes] = React.useState<Record<number, Shape>>({});
  const [favorites, setFavorites] = React.useState<Set<number>>(new Set());
  const [activeView, setView] = React.useState<AppView>("All");

  React.useEffect(() => {
    setShapes(getShapes(250));
  }, [setShapes]);

  return (
    <div className="app">
      <header className="header">
        Shape Center
        <div className="subheader">
          Putting shapes, front and center
        </div>
      </header>
      <ShapeList
        favorites={favorites}
        onSelectShape={(id) =>
          setFavorites(new Set([...Array.from(favorites), id]))}
        shapes={activeView === "All"
          ? Object.values(shapes)
          : Array.from(favorites.values()).map((id) => shapes[id])}
      />
      <button
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
        }}
        onClick={() => setView(activeView === "All" ? "Favorites" : "All")}
      >
        {activeView === "All" ? "Show Favorites" : "Show All"}
      </button>
    </div>
  );
}

export default App;
