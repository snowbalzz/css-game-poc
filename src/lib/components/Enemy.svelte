<script>
    // import enemySprite from "$lib/assets/enemy.png";
    import enemySprite from "$lib/assets/enemy-staff.png";

    export let enemy;
    export let attacked;
    export let transformX;
    export let image;
    export let health;

    const attackHandler = () => {
        health -= 5;
        if (health <= 0) {
            health = 0;
        }
        return "opacity-25";
    };

    const healthBar = () => {
        // Make this more dynamic
        const maxHealth = 100;
        const segments = 5;
        const healthPerSegment = maxHealth / segments;
        const activeSegments = Math.ceil(health / healthPerSegment);
        return "-".repeat(Math.max(0, activeSegments));
    };
</script>

<div
    class="absolute player flex flex-row justify-center items-center w-[2rem] h-[2rem]"
    style=" --xplayer: {enemy.x}px; --zplayer: {enemy.z}px; --face: {transformX}; display: {health >
    0
        ? 'block'
        : 'none'};"
>
    <div class="player-image flex flex-col items-center justify-center player">
        <p class="text-red-400 text-2xl font-black">{healthBar()}</p>
        <img
            src={image}
            alt="enemy"
            class="monster opacity player-img {attacked.attackedArea
                ? attackHandler()
                : ''}"
        />
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
        background: white;
        animation: left-to-right-1 0.1s ease-in;
    }

    .attack-animation-2 {
        image-rendering: pixelated; /* Prevent blurring */
        image-rendering: -moz-crisp-edges; /* Support for older Firefox */
        image-rendering: crisp-edges; /* Standard syntax */
        min-height: 8rem;
        min-width: 2rem;
        background: white;
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
        min-width: 3rem;
        min-height: 2rem;
        transform: rotateX(90deg) rotateY(var(--y)) translateY(-2rem) scale(1.3);
        /*transform: rotateX(90deg) translateY(-2rem);*/
        transition: transform 0.05s ease-in-out;
    }

    .player-img {
        image-rendering: pixelated; /* Prevent blurring */
        image-rendering: -moz-crisp-edges; /* Support for older Firefox */
        image-rendering: crisp-edges; /* Standard syntax */
    }

    .blink {
        animation: blink-animation 0.1s steps(5, start) infinite;
        -webkit-animation: blink-animation 1s steps(5, start) infinite;
    }
    @keyframes blink-animation {
        to {
            visibility: hidden;
        }
    }
    @-webkit-keyframes blink-animation {
        to {
            visibility: hidden;
        }
    }
</style>
