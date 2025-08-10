<script>
    import Enemy from "$lib/components/Enemy.svelte";
    import { mapGridToPlayer } from "$lib/game.ts";
    import enemySpriteOne from "$lib/assets/enemy-staff.png";
    import enemySpriteTwo from "$lib/assets/frontInverted.png";

    export let floor;
    export let player;
    export let world;

    const playerPressureRadius = 4;

    let enemies = [
        {
            r: 3,
            c: 12,
            image: enemySpriteOne,
            health: 200,
        },
        {
            r: 12,
            c: 3,
            image: enemySpriteOne,
            health: 200,
        },
        {
            r: 3,
            c: 3,
            image: enemySpriteTwo,
            health: 100,
        },
        {
            r: 12,
            c: 12,
            image: enemySpriteTwo,
            health: 100,
        },
    ];

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

{#each enemies as enemy}
    <Enemy
        enemy={mapGridToPlayer(world.plate, 2, 15, enemy.r, enemy.c)}
        transformX={world.transformX}
        attacked={floor.area[enemy.r][enemy.c]}
        image={enemy.image}
        health={enemy.health}
    />
{/each}
<div class="absolute z-20 flex flex-col items-start area border-4 border-white">
    {#each floor.area as row, i}
        <div class="flex flex-row justify-center items-center area-col">
            <!-- <p class="text-xs text-red-500">{i}</p> -->
            {#each row as plate, i2}
                <div
                    class="w-[2rem] h-[2rem] flex flex-row items-center justify-centdaer plate"
                    style="transform: translateZ({0.2 * plate.pressure}px);
                        background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255, {0.1 *
                        plate.pressure}) 1px, transparent 0);
                          background-size: 4px 4px;
                        "
                >
                    <div
                        class="w-10 h-10 flex flex-col grass-plate
                        {plate.attackedArea ? 'bg-black opacity-50' : ''}
                        "
                    >
                        <p class="text-red-500 text-xs"></p>
                    </div>
                </div>
            {/each}
        </div>
    {/each}
</div>
<div class=" text-white font-bold text-4xl -translate-y-10">DEMO</div>

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
