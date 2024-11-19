// script.js

// Initial HP values for both players
let player1HP = 100;
let player2HP = 100;

// Create the spell ball for Player 1 or Player 2
function createSpell(player) {
    const ball = document.createElement('div');
    ball.classList.add('ball');

    // Set the initial position of the spell ball
    if (player === 1) {
        ball.classList.add('player1');
        ball.style.left = '10px'; // Player 1 starts at the left
        ball.style.top = '50%';
    } else {
        ball.classList.add('player2');
        ball.style.right = '10px'; // Player 2 starts at the right
        ball.style.top = '50%';
    }

    document.body.appendChild(ball);

    // Animation for the spell ball
    const animationDuration = 2; // 2 seconds
    ball.style.animation = `throw-ball ${animationDuration}s forwards`;

    // Animate the spell ball movement
    if (player === 1) {
        // Player 1's ball moves to the right (towards Player 2)
        ball.style.animationTimingFunction = 'ease-out';
        ball.style.transition = `left ${animationDuration}s, top ${animationDuration}s`;
        ball.style.left = '50%'; // Move towards center
    } else {
        // Player 2's ball moves to the left (towards Player 1)
        ball.style.animationTimingFunction = 'ease-out';
        ball.style.transition = `right ${animationDuration}s, top ${animationDuration}s`;
        ball.style.right = '50%'; // Move towards center
    }

    // After the spell ball hits the target, apply damage
    setTimeout(() => {
        applyDamage(player);
        triggerDamageAnimation(player === 1 ? 2 : 1);  // Trigger damage animation for opponent
    }, animationDuration * 1000); // Wait for the animation to finish
}

// Apply damage to the opponent
function applyDamage(player) {
    const damage = 20; // Set the damage value

    if (player === 1) {
        player2HP -= damage;
        document.getElementById('player2-hp').innerText = `HP: ${player2HP}`;
    } else {
        player1HP -= damage;
        document.getElementById('player1-hp').innerText = `HP: ${player1HP}`;
    }

    // Check for game-over condition
    if (player1HP <= 0 || player2HP <= 0) {
        const winner = player1HP > 0 ? "Player 1" : "Player 2";
        alert(`${winner} wins!`);
    }
}

// Trigger the damage animation for the opponent
function triggerDamageAnimation(opponent) {
    const opponentCharacter = document.getElementById(`player${opponent}-character`);
    opponentCharacter.classList.add('damage');
    setTimeout(() => {
        opponentCharacter.classList.remove('damage');
    }, 500); // Reset damage animation after 500ms
}

// Animation for when a character casts a spell
function triggerAttackAnimation(player) {
    const character = document.getElementById(`player${player}-character`);
    character.classList.add('attacking');
    setTimeout(() => {
        character.classList.remove('attacking');
    }, 1000); // Remove attack animation after 1 second
}

// Event listeners for casting spells
document.getElementById("createSpell1").addEventListener("click", () => {
    triggerAttackAnimation(1);
    createSpell(1); // Player 1 casts a spell
});

document.getElementById("createSpell2").addEventListener("click", () => {
    triggerAttackAnimation(2);
    createSpell(2); // Player 2 casts a spell
});
