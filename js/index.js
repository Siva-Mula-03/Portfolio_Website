const cards = document.querySelectorAll('.separate-card');
const duration = 300;
var pos = {top: 0, left: 0, width: 0, height: 0};

$("a[href]").click(function (e){
  e.preventDefault();
    if (this.href) {
        var target = this.href;
        setTimeout(function(){
            window.location = target;
        }, duration+150);
    }
})

const onCardClick = async (e) => {
    const card = e.currentTarget;
    // clone the card
    const cardClone = card.cloneNode(true);
    cardClone.classList.remove('separate-card');
    cardClone.classList.add('outer-card');
    cardClone.classList.add('card-expanded');
    // get the location of the card in the view
    const {top, left, width, height} = card.getBoundingClientRect();
    pos.top = top+"px";
    pos.left = left+"px";
    pos.width = width+"px";
    pos.height = height+"px";
    // position the clone on top of the original
    cardClone.style.position = 'fixed';
    cardClone.style.top = pos.top;
    cardClone.style.left = pos.left;
    cardClone.style.width = pos.width;
    cardClone.style.height = pos.height;
    // hide the original card with opacity
    // card.style.opacity = '0';
    // add card to the body tag
    document.body.appendChild(cardClone);
    // expand the clone card
    await toggleExpansion(cardClone, {top: "-4px", left: "-4px", width: '100vw', height: '100vh'});
    // document.body.removeChild(cardClone);
};

const toggleExpansion = (element, to) => {
return new Promise((res) => {
    element.animate([
        {
            top: to.top,
            left: to.left,
            width: to.width,
            height: to.height,
            margin: 0,
            padding: 0
        }
        ], {duration, fill: 'forwards', ease: 'ease-in'})
    setTimeout(res, duration);
    })
}
cards.forEach(card => card.addEventListener('click', onCardClick));

window.addEventListener( "pageshow", async function ( event ) {
  var historyTraversal = event.persisted ||
                         ( typeof window.performance != "undefined" &&
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
      cardClone = document.querySelector('.outer-card');
      await toggleExpansion(cardClone, pos);
      document.body.removeChild(cardClone);
      pos = {top: 0, left: 0, width: 0, height: 0};
  }
});

// history.go(-1);
// function test() {
//         document.URL = document.referrer;
//     }