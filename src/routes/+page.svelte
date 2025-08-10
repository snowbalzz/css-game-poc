<script>
    import Player from "$lib/components/Player.svelte";
    import Enemy from "$lib/components/Enemy.svelte";
    import Floor from "$lib/components/Floor.svelte";
    import Filtered from "$lib/components/Filtered.svelte";
    import front from "$lib/assets/player-back.png";

    import wasd from "$lib/assets/wasd.png";
    import space from "$lib/assets/space.png";
    import arrow from "$lib/assets/arrow.png";

    import { onMount } from "svelte";
    import {
        markDirection,
        mapPlayerToGrid,
        updatePlayerImage,
        arraySetUp,
        mapGridToPlayer,
    } from "$lib/game.ts";
    import { FACES, STATE, MOVES } from "$lib/const.ts";

    const remInPixels = 15;

    let world = {
        transformY: 0,
        transformX: 135,
        transformZ: 0,
        scale: 1000,
        plate: 15,
    };

    let playerRef;
    let floorRef;

    let player = {
        x: 0,
        y: 0,
        z: 0,
        direction: FACES.FRONT,
        state: STATE.IDLE,
        mapped: { row: 0, column: 0 },
        step: 5,
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

    let handlePressBasedOnKey = (key) => {
        keys[key] = !keys[key];
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

        Object.entries(keys).forEach(([key, active]) => {
            if (!MOVES[key]) return;
            if (active && key !== "space") {
                player.activeImage = updatePlayerImage(key);
                let move = MOVES[key][floor.position];
                const newPos = player[move.axis] + player.step * move.step;
                if (
                    (move.axis === "x" || move.axis === "z") &&
                    (newPos > remInPixels * world.plate * 2 || newPos < 0)
                )
                    return;

                player.direction = move.dir;
                player[move.axis] = newPos;
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

    function floorLeft() {
        if (floor.position == 0) {
            floor.position = 3;
        } else {
            floor.position--;
        }
        world.transformY -= 90;
    }

    function floorRight() {
        if (floor.position == 3) {
            floor.position = 0;
        } else {
            floor.position++;
        }
        world.transformY += 90;
    }

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
<div
    class="m-auto w-screen h-screen red font-mono screen overflow-hidden bg-black"
>
    <div class="relative w-screen h-screen">
        <!-- <Filtered /> -->
        <!-- <div
            class="absolute z-0 text-black w-96 h-96 flex flex-cold justify-center items-start p-4"
        >
            <div class="h-auto w-auto bg-yellow-400 p-4">
                <p>x:{player.x}</p>
                <p>y:{player.y}</p>
                <p>z:{player.z}</p>
                <p>direction:{player.direction}</p>
                <p>state:{player.state}</p>
                <p>mapped:{player.mapped}</p>
                <p>step:{player.step}</p>
                <p>activeImage:{player.activeImage}</p>
                <p>floor:{floor.position}</p>
            </div>
        </div> -->
        <div class="absolute z-0 w-auto h-auto flex flex-col p-4">
            <div class="flex h-auto w-auto items-center gap-2">
                <img src={wasd} alt="wasd" class="h-10 player-img" />
                <p class="h-5 w-auto text-white text-xs italic">
                    MOVE THE PLAYER
                </p>
            </div>
            <div class="flex h-auto w-auto items-center gap-2">
                <img src={space} alt="wasd" class="h-10 player-img" />
                <p class="h-5 w-auto text-white text-xs italic">
                    ATTACK THE ENEMY
                </p>
            </div>
        </div>

        <div
            class="absolute z-20 w-full h-auto p-4 flex flex-col items-center block md:hidden top-[28rem]"
        >
            <div
                class="h-60 w-96 p-4 flex flex-row text-white gap-1 justify-center items-center"
            >
                <div class="flex flex-col h-full w-48 gap-1">
                    <div class="h-[4rem] w-full flex flex-row gap-1">
                        <button
                            class="h-full w-[4rem] border-2 rounded-xl"
                            on:mousedown|preventDefault={floorLeft}
                            on:touchstart|preventDefault={floorLeft}
                            >CAM-L</button
                        >
                        <button
                            class="h-full w-[4rem] text-center border-2 rounded-xl"
                            on:mousedown|preventDefault={() =>
                                handlePressBasedOnKey("w")}
                            on:mouseup|preventDefault={() =>
                                handlePressBasedOnKey("w")}
                            on:touchstart|preventDefault={() =>
                                handlePressBasedOnKey("w")}
                            on:touchend|preventDefault={() =>
                                handlePressBasedOnKey("w")}
                        >
                            UP
                        </button>
                        <button
                            class="h-full w-[4rem] border-2 rounded-xl"
                            on:mousedown|preventDefault={floorRight}
                            on:touchstart|preventDefault={floorRight}
                            >CAM-R</button
                        >
                    </div>
                    <div class="h-[4rem] w-full flex flex-row gap-1">
                        <button
                            class="h-full w-[4rem] text-center border-2 rounded-xl"
                            on:mousedown|preventDefault={() =>
                                handlePressBasedOnKey("a")}
                            on:mouseup|preventDefault={() =>
                                handlePressBasedOnKey("a")}
                            on:touchstart|preventDefault={() =>
                                handlePressBasedOnKey("a")}
                            on:touchend|preventDefault={() =>
                                handlePressBasedOnKey("a")}>LEFT</button
                        >
                        <button
                            class="h-full w-[4rem] text-center border-2 rounded-xl"
                            on:mousedown|preventDefault={() =>
                                handlePressBasedOnKey("space")}
                            on:mouseup|preventDefault={() =>
                                handlePressBasedOnKey("space")}
                            on:touchstart|preventDefault={() =>
                                handlePressBasedOnKey("space")}
                            on:touchend|preventDefault={() =>
                                handlePressBasedOnKey("space")}>SPACE</button
                        >
                        <button
                            class="h-full w-[4rem] text-center border-2 rounded-xl"
                            on:mousedown|preventDefault={() =>
                                handlePressBasedOnKey("d")}
                            on:mouseup|preventDefault={() =>
                                handlePressBasedOnKey("d")}
                            on:touchstart|preventDefault={() =>
                                handlePressBasedOnKey("d")}
                            on:touchend|preventDefault={() =>
                                handlePressBasedOnKey("d")}>RIGHT</button
                        >
                    </div>
                    <div class="h-[4rem] w-full flex flex-row gap-1">
                        <div class="h-full w-[4rem]"></div>
                        <button
                            class="h-full w-[4rem] text-center border-2 rounded-xl"
                            on:mousedown|preventDefault={() =>
                                handlePressBasedOnKey("s")}
                            on:mouseup|preventDefault={() =>
                                handlePressBasedOnKey("s")}
                            on:touchstart|preventDefault={() =>
                                handlePressBasedOnKey("s")}
                            on:touchend|preventDefault={() =>
                                handlePressBasedOnKey("s")}>DOWN</button
                        >
                        <div class="h-full w-[4rem]"></div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="flex justify-center items-center w-full h-full scale-55 md:scale-100 absolute z-10"
        >
            <div class="world" style="--per:{world.scale}px;">
                <div
                    class="cube flex justify-center items-center"
                    style=" --x: {world.transformX}deg;--y: {world.transformY}deg; --z: {world.transformZ}deg;"
                >
                    <div
                        class="w-full h-full absolute floor"
                        style="width: {2 * world.plate}rem ; height: {2 *
                            world.plate}rem ;"
                    >
                        <Player
                            {player}
                            {keys}
                            {floor}
                            transformX={world.transformX}
                            bind:this={playerRef}
                        />
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
    .player-img {
        image-rendering: pixelated; /* Prevent blurring */
        image-rendering: -moz-crisp-edges; /* Support for older Firefox */
        image-rendering: crisp-edges; /* Standard syntax */
    }
</style>
