<script>
    export let floor;
    export let player;
    export let world;

    const playerPressureRadius = 4;

    export function floorLogicHandler() {
        floor.area.map((row, rowIndex) => {
            row.map((col, colIndex) => {
                if (
                    player.mapped.column == colIndex &&
                    player.mapped.row == rowIndex
                ) {
                    col.active = true;
                } else {
                    col.active = false;
                    col.pressure = 0;
                }
            });
        });

        for (let x = 0; x < world.plate; x++) {
            for (let y = 0; y < world.plate; y++) {
                let distance = Math.sqrt(
                    (x - player.mapped.row) ** 2 +
                        (y - player.mapped.column) ** 2,
                );
                if (distance <= playerPressureRadius) {
                    let layer = Math.ceil(playerPressureRadius - distance);
                    floor.area[x][y].pressure = layer + 1;
                }
            }
        }
    }
</script>

<div class="absolute z-20 flex flex-col items-start area border border-white">
    {#each floor.area as row, i}
        <div class="flex flex-row justify-center items-center area-col">
            {#each row as plate, i2}
                <div
                    class="w-[2rem] h-[2rem] flex flex-row items-center justify-centdaer plate"
                    style="transform: translateZ({0.5 * plate.pressure}px);
                        background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255, {0.1 *
                        plate.pressure}) 1px, transparent 0);
                          background-size: 4px 4px;
                        "
                >
                    <div
                        class="w-10 h-10 flex flex-col grass-plate
                        {plate.attackedArea ? 'bg-red-600' : ''}
                        "
                    ></div>
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .grass-plate {
        transform-style: preserve-3d;
    }
    .area {
        transform-style: preserve-3d;
    }
    .area-col {
        transform-style: preserve-3d;
    }
    .plate {
        transform-style: preserve-3d;
        transition: transform 0.1s ease-out;
    }
</style>
