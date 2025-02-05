import back from "$lib/assets/back.png";
import front from "$lib/assets/front.png";
import left from "$lib/assets/frontInv.png";
import right from "$lib/assets/frontInverted.png";

export function markDirection(grid, playerX, playerY, radius, direction) {
  switch (direction) {
    case "back":
      for (let dx = -radius; dx < 0; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          let newX = playerX + dx;
          let newY = playerY + dy;
          if (
            newX >= 0 &&
            newY >= 0 &&
            newX < grid.length &&
            newY < grid[0].length
          ) {
            grid[newX][newY].attackedArea = true;
          }
        }
      }
      break;
    case "front":
      for (let dx = 1; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          let newX = playerX + dx;
          let newY = playerY + dy;
          if (
            newX >= 0 &&
            newY >= 0 &&
            newX < grid.length &&
            newY < grid[0].length
          ) {
            grid[newX][newY].attackedArea = true;
          }
        }
      }
      break;
    case "left":
      for (let dy = -radius; dy < 0; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          let newX = playerX + dx;
          let newY = playerY + dy;

          if (
            newX >= 0 &&
            newY >= 0 &&
            newX < grid.length &&
            newY < grid[0].length
          ) {
            grid[newX][newY].attackedArea = true;
          }
        }
      }
      break;

    case "right":
      for (let dy = 1; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          let newX = playerX + dx;
          let newY = playerY + dy;
          if (
            newX >= 0 &&
            newY >= 0 &&
            newX < grid.length &&
            newY < grid[0].length
          ) {
            grid[newX][newY].attackedArea = true;
          }
        }
      }
      break;

    default:
      console.error("Invalid direction");
      break;
  }
}

export function mapPlayerToGrid(
  gridSize = 15,
  cellSizeRem = 2,
  remInPx = 15,
  player,
) {
  const cellSizePx = cellSizeRem * remInPx;
  const maxPosition = gridSize * cellSizePx;
  const clampedX = Math.max(0, Math.min(player.x, maxPosition - 1));
  const clampedY = Math.max(0, Math.min(player.z, maxPosition - 1));
  const column = Math.floor(clampedX / cellSizePx);
  const row = Math.floor(clampedY / cellSizePx);
  return { row, column };
}

export function mapGridToPlayer(
  gridSize = 15,
  cellSizeRem = 2,
  remInPx = 15,
  row,
  column,
) {
  const cellSizePx = cellSizeRem * remInPx;
  const x = column * cellSizePx;
  const z = row * cellSizePx;
  return { x, z };
}

export function updatePlayerImage(key) {
  let activeImage;
  if (key === "a") {
    activeImage = activeImage === back || activeImage === right ? back : left;
  } else if (key === "d") {
    activeImage = activeImage === front ? front : right;
  } else {
    activeImage = key === "w" ? front : back;
  }
  return activeImage;
}

export function arraySetUp(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      active: false,
      pressure: 0,
      attackedArea: false,
    })),
  );
}
