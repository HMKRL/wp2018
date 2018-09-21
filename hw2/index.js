var current_card;

function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

function funcLoad() {
    document.getElementById('delete').style.visibility = 'hidden';
    document.getElementById('ad').style.visibility = 'hidden';

    var cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].onclick = function() { cardClicked(i); }
        setTimeout(function(cards, i) { cards[i].style.top = i * 50 + 'px'; }, 120 * i, cards, i)
    }
    document.addEventListener(whichTransitionEvent(), function() {
        setTimeout(function() { document.getElementById('delete').style.visibility = 'visible'; }, 400);
    }, false);

    current_card = cards[cards.length -1].id;
}

function cardClicked(cardnum) {
    var cards = document.getElementsByClassName('card');
    if(cards[cardnum].id !== current_card) document.getElementById('delete').style.visibility = 'hidden';

    // AD Zone
    if(cards[cardnum].id === 'gogo') {
        document.getElementById('ad').style.visibility = 'visible';
    } else {
        document.getElementById('ad').style.visibility = 'hidden';
    }

    for (let i = cards.length - 1; i > cardnum; i--) {
        setTimeout(function(cards, i) { cards[i].style.top = 88 + i + '%'; }, 120 * (cards.length - 1 - i), cards, i)
    }
    for (let i = cardnum; i >= 0; i--) {
        setTimeout(function(cards, i) { cards[i].style.top = i * 50 + 'px'; }, 120 * i , cards, i)
    }

    current_card = cards[cardnum].id;
}

function deleteCard() {
    document.getElementById(current_card).style.opacity = '0';
    setTimeout(function() {
        document.getElementById(current_card).remove();
        funcLoad();
    }, 400);
    
}
