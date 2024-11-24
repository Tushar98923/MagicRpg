// Initial HP values for both players
let player1HP = 100;
let player2HP = 100;

// Function for Player 1's spell
function createPlayer1Spell() {
    const ball = document.createElement('div');
    ball.classList.add('ball', 'player1');
    ball.style.left = '150px'; // Near Player 1
    ball.style.top = 'calc(50% - 10px)'; // Center vertically

    document.body.appendChild(ball);

    // Animate the ball towards Player 2
    ball.style.transition = 'transform 2s linear';
    ball.style.transform = 'translate(600px, 0)';

    setTimeout(() => {
        applyDamageToPlayer2();
        triggerDamageAnimation(2);
        ball.remove();
    }, 2000);
}

// Function for Player 2's spell
function createPlayer2Spell() {
    const ball = document.createElement('div');
    ball.classList.add('ball', 'player2');
    ball.style.right = '150px'; // Near Player 2
    ball.style.top = 'calc(50% - 10px)'; // Center vertically

    document.body.appendChild(ball);

    // Animate the ball towards Player 1
    ball.style.transition = 'transform 2s linear';
    ball.style.transform = 'translate(-600px, 0)';

    setTimeout(() => {
        applyDamageToPlayer1();
        triggerDamageAnimation(1);
        ball.remove();
    }, 2000);
}

// Apply damage to Player 2
function applyDamageToPlayer2() {
    const damage = 20;
    player2HP -= damage;

    document.getElementById('player2-hp').innerText = player2HP;

    if (player2HP <= 0) {
        alert("Player 1 wins!");
    }
}

// Apply damage to Player 1
function applyDamageToPlayer1() {
    const damage = 20;
    player1HP -= damage;

    document.getElementById('player1-hp').innerText = player1HP;

    if (player1HP <= 0) {
        alert("Player 2 wins!");
    }
}

// Trigger damage animation
function triggerDamageAnimation(player) {
    const opponentCharacter = document.getElementById(`player${player}-character`);
    opponentCharacter.classList.add('damage');
    setTimeout(() => {
        opponentCharacter.classList.remove('damage');
    }, 500);
}

// Trigger attack animation
function triggerAttackAnimation(player) {
    const character = document.getElementById(`player${player}-character`);
    character.classList.add('attacking');
    setTimeout(() => {
        character.classList.remove('attacking');
    }, 1000);
}

// Event listeners for casting spells
document.getElementById('createSpell1').addEventListener('click', () => {
    triggerAttackAnimation(1);
    createPlayer1Spell();
});

document.getElementById('createSpell2').addEventListener('click', () => {
    triggerAttackAnimation(2);
    createPlayer2Spell();
});
