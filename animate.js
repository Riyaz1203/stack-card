// const cards = document.querySelectorAll('.stack-card');
// const lastCard = cards[cards.length - 1];

// cards.forEach((card, index) => {
//     let startPercentage = index * 3 + 10;
//     let scaleValue = 0.65 + (index * 0.05);
//     if (scaleValue > 1) scaleValue = 1;

//     const gsapConfig = {
//         scale: scaleValue,
//         transformOrigin: 'top',
//         scrollTrigger: {
//             trigger: card,
//             start: `top ${startPercentage}%`,
//             endTrigger: lastCard,
//             end: 'top top',
//             scrub: true,
//             pin: card,
//             pinSpacing: false,
//             markers: true,
//         }
//     };

//     gsap.to(card, gsapConfig);
//     if (card !== lastCard) {
//         gsap.to(card, {
//             backgroundColor: '#a3a3a3',
//             scrollTrigger: {
//                 trigger: card,
//                 start: `top ${startPercentage}%`,
//                 end: 'top top',
//                 scrub: true
//             }
//         });
//     }
// });
				

document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll('.stack-card');
  const penultimateCard = cards[cards.length - 2]; // Second last card
  const lastCard = cards[cards.length - 1];

  gsap.config({
    nullTargetWarn: false,
    force3D: false
  });

  cards.forEach((card, index) => {
    const internalElement = card.querySelector('.stack-card-internal');
    let startPercentage = index * 3 + 10;
    let scaleValue = 0.70 + (index * 0.05);
    if (scaleValue > 1) scaleValue = 1;

    if (card) {
      gsap.to(card, {
        scale: scaleValue,
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: card,
          start: `top ${startPercentage + 10}%`,
          endTrigger: penultimateCard,
          end: 'center+=85% center',
          scrub: true,
          markers: true,  // Enable markers for debugging
          pin: card !== lastCard,
          pinSpacing: false,
          onEnter: () => gsap.set(card, {willChange: 'transform'}),
          onLeave: () => gsap.set(card, {willChange: ''}),
          onEnterBack: () => gsap.set(card, {willChange: 'transform'}),
          onLeaveBack: () => gsap.set(card, {willChange: ''}),
        },
      });

      if (internalElement && card !== lastCard) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: `top ${startPercentage + 10}%`,
            end: 'bottom bottom',
            scrub: 20,  // Adjust scrub value based on performance testing
          }
        });

        tl.to(internalElement, { backgroundColor: "rgb(27,27,27)"});
      } else if (card === lastCard) {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: `top ${startPercentage + 10}%`,
            end: `bottom bottom`,
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
        });
      }
    }
  });

  ScrollTrigger.refresh();
});

