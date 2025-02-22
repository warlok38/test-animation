import { useState } from "react";
import {
  FLOOR_HEIGHT,
  FLOORS,
  HEX_X_SPACING,
  HEX_Z_SPACING,
  NB_COLUMNS,
  NB_ROWS,
} from "../consts";
import { Hexagon } from "./Hexagon";
import { RPC } from "playroomkit";

export const Arena = () => {
  const [hexagonHit, setHexagonHit] = useState<Record<string, boolean>>();

  RPC.register("hexagonHit", async (data) => {
    setHexagonHit((prev) => ({
      ...prev,
      [data.hexagonKey]: true,
    }));
  });

  return (
    <group
      position-x={-((NB_COLUMNS - 1) / 2) * HEX_X_SPACING}
      position-z={-((NB_ROWS - 1) / 2) * HEX_Z_SPACING}
    >
      {FLOORS.map((floor, floorIndex) => (
        <group key={floorIndex} position-y={floorIndex * -FLOOR_HEIGHT}>
          {[...Array(NB_ROWS)].map((_, rowIndex) => (
            <group
              key={rowIndex}
              position-z={rowIndex * HEX_Z_SPACING}
              position-x={rowIndex % 2 ? HEX_X_SPACING / 2 : 0}
            >
              {[...Array(NB_COLUMNS)].map((_, columnIndex) => (
                <Hexagon
                  key={columnIndex}
                  position-x={columnIndex * HEX_X_SPACING}
                  color={floor.color}
                  isHit={
                    hexagonHit?.[`${floorIndex}-${rowIndex}-${columnIndex}`] ||
                    false
                  }
                  onHit={() => {
                    const hexagonKey = `${floorIndex}-${rowIndex}-${columnIndex}`;
                    setHexagonHit((prev) => ({
                      ...prev,
                      [hexagonKey]: true,
                    }));
                    RPC.call("hexagonHit", { hexagonKey }, RPC.Mode.ALL);
                  }}
                />
              ))}
            </group>
          ))}
        </group>
      ))}
    </group>
  );
};
