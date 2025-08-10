<script>
    export let player;
    export let keys;
    export let transformX;
    export let floor;
    import { ATTACK_MAP } from "$lib/const.ts";
    import staff from "$lib/assets/staff.png";

    export function playerFunction() {
        console.log("I am a player!");
    }

    let attackMap = {
        0: {
            front: "front",
            left: "left",
            right: "right",
            back: "back",
        },
        1: {
            front: "left",
            left: "back",
            right: "front",
            back: "right",
        },
        2: { front: "back", back: "front", right: "left", left: "right" },
        3: { front: "right", back: "left", left: "front", right: "back" },
    };
</script>

<div
    class="absolute player flex justify-center items-center w-[2rem] h-[2rem]"
    style=" --xplayer: {player.x}px;--yplayer: {player.y}px; --zplayer: {player.z}px; --face: {transformX}"
>
    <div
        class="w-[20rem] h-[10rem] player-image flex items-center justify-center player"
    >
        <img
            src={player.activeImage}
            alt="player"
            class="monster opacity player-img {player.state == 'moving'
                ? 'walking'
                : 'idle'}"
        />
        <img
            src={staff}
            alt="player"
            class="w-4 player-img rotate-20 -translate-x-2 {player.state ==
            'moving'
                ? 'walking'
                : 'idle'}"
        />
        <div class="attack flex flex-col justify-between">
            <div class="corner top">
                <div
                    class={player.direction ==
                        ATTACK_MAP[floor.position]["front"] && keys["space"]
                        ? "attack-animation-1 attack-animation-animation"
                        : ""}
                ></div>
            </div>
            <div class="corner left">
                <div
                    class={player.direction ==
                        ATTACK_MAP[floor.position]["left"] && keys["space"]
                        ? "attack-animation-2 attack-animation-animation"
                        : ""}
                ></div>
            </div>
            <div class="corner right">
                <div
                    class={player.direction ==
                        ATTACK_MAP[floor.position]["right"] && keys["space"]
                        ? "attack-animation-2 attack-animation-animation"
                        : ""}
                ></div>
            </div>
            <div class="corner bottom">
                <div
                    class={player.direction ==
                        ATTACK_MAP[floor.position]["back"] && keys["space"]
                        ? "attack-animation-1 attack-animation-animation"
                        : ""}
                ></div>
            </div>
        </div>
    </div>
</div>

<style>
    .filter-attack {
        filter: brightness(0) saturate(100%) invert(13%) sepia(48%)
            saturate(7228%) hue-rotate(356deg) brightness(122%) contrast(126%);
    }
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

    @keyframes left-to-right-1 {
        0% {
            min-height: 2rem;
            transform: scaleX(1);
            opacity: 1;
            transform-origin: left;
        }
        100% {
            transform: scaleX(0);
            min-height: 1rem;
            background-color: springgreen;
            transform-origin: left;
        }
    }

    @keyframes left-to-right-2 {
        0% {
            transform: scaleY(1);
            transform-origin: bottom;
        }
        100% {
            transform: scaleY(0);
            background-color: springgreen;
            transform-origin: bottom;
        }
    }

    .walking {
        animation: walk 0.3s ease-in-out infinite;
    }

    @keyframes stretch-top {
        0%,
        100% {
            transform: scaleY(1);
            transform-origin: bottom;
        }
        50% {
            transform: scaleY(1.05);
            transform-origin: bottom;
        }
    }

    .idle {
        animation: stretch-top 0.7s ease-in-out infinite;
    }

    .monster {
        height: 3rem;
        min-width: 3rem;
    }

    .attack-animation-1 {
        image-rendering: pixelated; /* Prevent blurring */
        image-rendering: -moz-crisp-edges; /* Support for older Firefox */
        image-rendering: crisp-edges; /* Standard syntax */
        min-height: 2rem;
        min-width: 8rem;
        background: mediumpurple;
        animation: left-to-right-1 0.1s ease-in;
    }

    .attack-animation-2 {
        image-rendering: pixelated; /* Prevent blurring */
        image-rendering: -moz-crisp-edges; /* Support for older Firefox */
        image-rendering: crisp-edges; /* Standard syntax */
        min-height: 8rem;
        min-width: 2rem;
        background: mediumpurple;
        animation: left-to-right-2 0.2s ease-in-out;
    }

    .attack {
        position: absolute;
        min-height: 10rem;
        width: 10rem;
        transform: rotateX(90deg);
    }

    .corner {
        width: 50px;
        height: 50px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* Middle of the top side */
    .top {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    /* Middle of the bottom side */
    .bottom {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    /* Middle of the left side */
    .left {
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    /* Middle of the right side */
    .right {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .player {
        transform-style: preserve-3d;
        transform: rotateX(0deg) translateY(var(--zplayer))
            translateX(var(--xplayer));
        /* transition: transform 0.05s ease-in-out; */
    }

    .player-image {
        transform-style: preserve-3d;
        min-width: 20rem;
        transform: rotateX(90deg) rotateY(var(--y)) translateY(-2rem);
        /* transform: rotateX(90deg) translateY(-2rem); */
        transition: transform 0.05s ease-in-out;
    }

    .player-img {
        image-rendering: pixelated; /* Prevent blurring */
        image-rendering: -moz-crisp-edges; /* Support for older Firefox */
        image-rendering: crisp-edges; /* Standard syntax */
    }
</style>
