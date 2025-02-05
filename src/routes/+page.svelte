<script>
    import Player from "$lib/components/Player.svelte";
    import Enemy from "$lib/components/Enemy.svelte";
    import Floor from "$lib/components/Floor.svelte";
    import Filtered from "$lib/components/Filtered.svelte";
    import front from "$lib/assets/front.png";
    import { onMount } from "svelte";
    import {
        markDirection,
        mapPlayerToGrid,
        updatePlayerImage,
        arraySetUp,
        mapGridToPlayer,
    } from "$lib/game.ts";
    import { FACES, STATE, MOVES } from "$lib/const.ts";

    let world = {
        transformY: 0,
        transformX: 135,
        transformZ: 0,
        scale: 1000,
        plate: 20,
    };

    let playerRef;
    let floorRef;

    let enemies = [
        {
            r: 9,
            c: 5,
        },
        {
            r: 8,
            c: 9,
        },
        {
            r: 1,
            c: 1,
        },
    ];

    let player = {
        x: 0,
        y: 0,
        z: 0,
        direction: FACES.FRONT,
        state: STATE.IDLE,
        mapped: { row: 0, column: 0 },
        step: 10,
        activeImage: front,
    };

    let activeKeys = new Set();

    let keys = {
        w: false,
        a: false,
        s: false,
        d: false,
        space: false,
    };

    let floor = {
        position: 0,
        area: arraySetUp(world.plate, world.plate),
    };

    function updatePosition() {
        player.mapped = mapPlayerToGrid(world.plate, 2, 15, player);

        if (keys.space) {
            markDirection(
                floor.area,
                player.mapped.row,
                player.mapped.column,
                3,
                player.direction,
            );
        } else {
            floor.area.map((element) => {
                element.map((i) => {
                    i.attackedArea = false;
                });
            });
        }

        player.state = Object.values(keys).some((pressed) => pressed)
            ? STATE.MOVING
            : STATE.IDLE;

        // console.log(player.mapped);

        Object.entries(keys).forEach(([key, active]) => {
            if (!MOVES[key]) return;
            if (active && key !== "space") {
                player.activeImage = updatePlayerImage(key);
                let move = MOVES[key][floor.position];
                player.direction = move.dir;
                player[move.axis] += player.step * move.step;
            }
        });
    }

    const keyDown = (event) => {
        activeKeys.add(event.key);
        if (event.key == " ") {
            keys["space"] = true;
            setTimeout(() => {
                keys["space"] = false;
            }, 100);
            return;
        }
        keys[event.key.toLowerCase()] = true;
    };

    const keyUp = (event) => {
        activeKeys.delete(event.key);
        keys[event.key.toLowerCase()] = false;
    };

    const onKeyDown = (e) => {
        switch (e.keyCode) {
            case 190:
                world.scale += 50;
                break;
            case 188:
                world.scale -= 50;
                break;
            case 39:
                if (floor.position == 3) {
                    floor.position = 0;
                } else {
                    floor.position++;
                }
                world.transformY += 90;
                break;
            case 37:
                if (floor.position == 0) {
                    floor.position = 3;
                } else {
                    floor.position--;
                }
                world.transformY -= 90;
                break;
            case 82:
                window.location.reload();
                break;
        }
    };

    function gameLoop() {
        floorRef.floorLogicHandler();
        updatePosition();
        requestAnimationFrame(gameLoop);
    }

    onMount(() => {
        window.addEventListener("keyup", keyUp);
        window.addEventListener("keydown", keyDown);
        gameLoop();
        return () => {
            window.removeEventListener("keyup", keyUp);
            window.removeEventListener("keydown", keyDown);
        };
    });
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />
<div class="w-screen h-screen red font-mono screen overflow-hidden bg-black">
    <div class="relative w-screen h-screen">
        <Filtered />
        <div
            class="flex justify-center items-center w-full h-full absolute z-10"
        >
            <div class="world" style="--per:{world.scale}px;">
                <div
                    class="cube flex justify-center items-center"
                    style=" --x: {world.transformX}deg;--y: {world.transformY}deg; --z: {world.transformZ}deg;"
                >
                    <!-- Outter cube -->
                    <div
                        class="w-full h-full absolute floor"
                        style="width: {2 * world.plate}rem ; height: {2 *
                            world.plate}rem ;"
                    >
                        <Player
                            {player}
                            {keys}
                            transformX={world.transformX}
                            bind:this={playerRef}
                        />

                        {#each enemies as enemy}
                            <Enemy
                                enemy={mapGridToPlayer(
                                    world.plate,
                                    2,
                                    15,
                                    enemy.r,
                                    enemy.c,
                                )}
                                transformX={world.transformX}
                            />
                        {/each}

                        <Floor {floor} {player} {world} bind:this={floorRef} />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes walk {
        0%,
        100% {
            transform: translateY(0);
            scale: 1.01;
        }
        50% {
            transform: translateY(-5px);
        }
    }

    .world {
        perspective: var(--per);
        perspective-origin: 50% 100%;
    }

    .cube {
        margin-left: auto;
        margin-right: auto;
        position: relative;
        width: 480px;
        height: 480px;
        transform-style: preserve-3d;
        transform: rotateX(var(--x)) rotateY(var(--y));
        transition: transform 0.1s ease-in-out;
    }

    @keyframes rotate-self {
        0% {
            transform: rotateX(90deg) rotateZ(45deg) rotate(0deg);
        }
        100% {
            transform: rotateX(90deg) rotateZ(45deg) rotate(360deg);
        }
    }

    .floor {
        transform-style: preserve-3d;
        transform: rotateX(90deg);
    }
</style>
