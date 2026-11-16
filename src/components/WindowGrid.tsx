import React, { useMemo } from 'react';
import { Window } from './Window';
import { WindowData, SilhouetteSceneType } from '../types';

interface WindowGridProps {
  onTargetCoordsCalculated?: (xPercent: number, yPercent: number) => void;
}

export const WindowGrid: React.FC<WindowGridProps> = () => {
  const COLS = 10;
  const ROWS = 8;
  const WIN_WIDTH = 72;
  const WIN_HEIGHT = 84;
  const START_X = 230;
  const STEP_X = 112;
  const START_Y = 140;
  const STEP_Y = 96;

  // Target window location: col 7, row 3 (middle-right, 5th floor from bottom)
  const TARGET_COL = 7;
  const TARGET_ROW = 3;

  const windowsData = useMemo<WindowData[]>(() => {
    const list: WindowData[] = [];

    // Pre-allocated curated scenes so the city feels authentically varied
    const sceneAssignments: { [key: string]: { scene: SilhouetteSceneType; light: 'tungsten' | 'sodium' | 'tv' | 'dim' | 'off'; intensity: number } } = {
      // Row 0 (Top floor / penthouses)
      '0-1': { scene: 'plants', light: 'tungsten', intensity: 0.9 },
      '0-3': { scene: 'pacing', light: 'sodium', intensity: 0.8 },
      '0-6': { scene: 'couch', light: 'dim', intensity: 0.7 },
      '0-8': { scene: 'blinds', light: 'tungsten', intensity: 0.6 },
      // Row 1
      '1-2': { scene: 'tv', light: 'tv', intensity: 0.85 },
      '1-4': { scene: 'cooking', light: 'tungsten', intensity: 0.95 },
      '1-7': { scene: 'dancing', light: 'tungsten', intensity: 0.9 },
      '1-9': { scene: 'blinds', light: 'sodium', intensity: 0.6 },
      // Row 2
      '2-0': { scene: 'party', light: 'tungsten', intensity: 1.0 },
      '2-3': { scene: 'homework', light: 'sodium', intensity: 0.85 },
      '2-5': { scene: 'tv', light: 'tv', intensity: 0.8 },
      '2-8': { scene: 'cooking', light: 'tungsten', intensity: 0.9 },
      // Row 3 (Dean's floor)
      '3-1': { scene: 'couch', light: 'dim', intensity: 0.6 },
      '3-4': { scene: 'pacing', light: 'sodium', intensity: 0.85 },
      '3-6': { scene: 'plants', light: 'tungsten', intensity: 0.8 },
      '3-7': { scene: 'target', light: 'tungsten', intensity: 1.0 }, // DEAN'S WINDOW
      '3-9': { scene: 'tv', light: 'tv', intensity: 0.75 },
      // Row 4
      '4-0': { scene: 'dancing', light: 'tungsten', intensity: 0.85 },
      '4-2': { scene: 'cooking', light: 'sodium', intensity: 0.9 },
      '4-5': { scene: 'couch', light: 'dim', intensity: 0.65 },
      '4-7': { scene: 'homework', light: 'tungsten', intensity: 0.8 },
      // Row 5
      '5-1': { scene: 'tv', light: 'tv', intensity: 0.8 },
      '5-3': { scene: 'party', light: 'tungsten', intensity: 0.95 },
      '5-6': { scene: 'pacing', light: 'sodium', intensity: 0.8 },
      '5-8': { scene: 'blinds', light: 'sodium', intensity: 0.6 },
      // Row 6
      '6-2': { scene: 'plants', light: 'tungsten', intensity: 0.8 },
      '6-4': { scene: 'tv', light: 'tv', intensity: 0.75 },
      '6-7': { scene: 'cooking', light: 'sodium', intensity: 0.9 },
      '6-9': { scene: 'couch', light: 'dim', intensity: 0.65 },
      // Row 7 (Ground level above lobby)
      '7-1': { scene: 'pacing', light: 'sodium', intensity: 0.75 },
      '7-3': { scene: 'blinds', light: 'tungsten', intensity: 0.6 },
      '7-5': { scene: 'homework', light: 'tungsten', intensity: 0.85 },
      '7-8': { scene: 'tv', light: 'tv', intensity: 0.8 },
    };

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const key = `${r}-${c}`;
        const isTarget = r === TARGET_ROW && c === TARGET_COL;

        let scene: SilhouetteSceneType = 'dark';
        let light: 'tungsten' | 'sodium' | 'tv' | 'dim' | 'off' = 'off';
        let intensity = 0.2;

        if (isTarget) {
          scene = 'target';
          light = 'tungsten';
          intensity = 1.0;
        } else if (sceneAssignments[key]) {
          scene = sceneAssignments[key].scene;
          light = sceneAssignments[key].light;
          intensity = sceneAssignments[key].intensity;
        } else {
          // Ambient fill windows (softly lit or dark)
          const hash = (r * 13 + c * 29) % 10;
          if (hash < 3) {
            light = 'off';
            scene = 'dark';
            intensity = 0.15;
          } else if (hash < 6) {
            light = 'dim';
            scene = 'blinds';
            intensity = 0.45;
          } else {
            light = hash % 2 === 0 ? 'sodium' : 'tungsten';
            scene = 'blinds';
            intensity = 0.6;
          }
        }

        // Pseudo-random animation delay and duration so loops are desynchronized
        const seed = (r * 31 + c * 47) % 100;
        const animDelay = -(seed / 10);
        const animDuration = 4 + (seed % 5);

        list.push({
          id: `win-${r}-${c}`,
          row: r,
          col: c,
          scene,
          lightType: light,
          intensity,
          curtainStyle: 'open',
          animDelay,
          animDuration,
          isTarget,
        });
      }
    }

    return list;
  }, []);

  return (
    <g id="building-windows-group">
      {windowsData.map((win) => {
        const x = START_X + win.col * STEP_X;
        const y = START_Y + win.row * STEP_Y;
        return (
          <Window
            key={win.id}
            data={win}
            x={x}
            y={y}
            width={WIN_WIDTH}
            height={WIN_HEIGHT}
          />
        );
      })}
    </g>
  );
};
