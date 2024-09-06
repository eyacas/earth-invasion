document.addEventListener('DOMContentLoaded', () => {
  const users = {
    user1: document.getElementById('user1-cards'),
    user2: document.getElementById('user2-cards'),
    user3: document.getElementById('user3-cards'),
    user4: document.getElementById('user4-cards'),
    user5: document.getElementById('user5-cards'),
    user6: document.getElementById('user6-cards'),
    user7: document.getElementById('user7-cards'),
    entrance: document.getElementById('entrance-cards') // "Entrance" user
  };

  const giveCardButton = document.getElementById('giveCardButton');
  const selectSender = document.getElementById('selectSender');
  const selectReceiver = document.getElementById('selectReceiver');
  const selectCard = document.getElementById('selectCard');

  // Initialize each user's cards
  const initializeUserCards = (user, hasCards = true) => {
    if (hasCards) {
      const lifeCards = ['Life Card 1', 'Life Card 2', 'Life Card 3', 'Life Card 4', 'Life Card 5'];
      const deathCard = 'Death Card';

      lifeCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'life-card');
        cardElement.textContent = card;
        user.appendChild(cardElement);
      });

      const deathCardElement = document.createElement('div');
      deathCardElement.classList.add('card', 'death-card');
      deathCardElement.textContent = deathCard;
      user.appendChild(deathCardElement);
    }
  };

  // Initialize cards for all users except Entrance
  Object.keys(users).forEach(user => {
    if (user === 'entrance') {
      initializeUserCards(users[user], false); // Entrance has no initial cards
    } else {
      initializeUserCards(users[user], true);  // Other users have initial cards
    }
  });

  // Update card selection when a sender is chosen
  selectSender.addEventListener('change', () => {
    updateCardSelection(selectSender.value);
  });

  // Update card selection dropdown with available cards from the selected sender
  const updateCardSelection = (sender) => {
    selectCard.innerHTML = '';  // Clear previous options
    const senderCards = users[sender].children;

    Array.from(senderCards).forEach(card => {
      const option = document.createElement('option');
      option.value = card.textContent;
      option.textContent = card.textContent;
      selectCard.appendChild(option);
    });
  };

  // Initially update the card selection for the first user
  updateCardSelection(selectSender.value);

  // Button to give a card from the selected sender to the selected receiver
  giveCardButton.addEventListener('click', () => {
    const sender = selectSender.value;
    const receiver = selectReceiver.value;
    const selectedCard = selectCard.value;

    // Prevent giving a card to the same user or from entrance (Entrance cannot send cards)
    if (sender === receiver || sender === 'entrance') {
      alert('Invalid card transfer!');
      return;
    }

    const senderCards = users[sender];
    const receiverCards = users[receiver];

    // Find the selected card in the sender's card list and transfer it
    for (let i = 0; i < senderCards.children.length; i++) {
      if (senderCards.children[i].textContent === selectedCard) {
        const cardToTransfer = senderCards.children[i];

        // Check if the transferred card is a Death Card
        if (selectedCard === 'Death Card') {
          removeLifeCard(receiverCards);
          senderCards.removeChild(cardToTransfer); // Remove Death Card from sender

          // Do not reflect the Death Card on the receiver's side
          alert(`${receiver} received a Death Card, but it will not be shown!`);
        } else {
          receiverCards.appendChild(cardToTransfer);  // Transfer Life Card
        }

        updateCardSelection(sender);  // Update the card selection dropdown
        break;
      }
    }
  });

  // Function to remove a Life Card from a user's cards
  const removeLifeCard = (userCards) => {
    for (let i = 0; i < userCards.children.length; i++) {
      if (userCards.children[i].classList.contains('life-card')) {
        userCards.removeChild(userCards.children[i]);  // Remove the first found life card
        alert('A Life Card was removed due to receiving a Death Card!');
        break;
      }
    }
  };
});
