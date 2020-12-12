
const percentInput = document.querySelector('.get-percent');
      percentInputBtn = document.querySelector('.get-percent-btn');
      percentCls = document.querySelector('.percent');
      percentFloat = document.querySelector('.float');
      greenCircle = document.querySelector('#green-circle');
      yellowCircle = document.querySelector('#yellow-circle');
      circleStyle = document.querySelector('.circle-style');
      gorinWrapper = document.querySelector('.video-gorin-wrapper');
      gorinVideo = document.querySelector('.video-gorin');
      fortniteWrapper = document.querySelector('.video-fortnite-wrapper');
      fortniteVideo = document.querySelector('.video-fortnite');
      fortniteGradient = document.querySelector('.fortnite-gradient');
      flagImg = document.querySelector('.flag-img');
      statsBlockPercentValue = document.querySelector('.stats-block-percent-value');
      statsBlockNewPercent = document.querySelector('.new-percent');
      statsBlockPrevPercent = document.querySelector('.prev-percent');
      rectStyle = document.querySelector('.rect-style');
      statsBlockVisualDifference = document.querySelector('.stats-block-visual-difference');


var circleLength = 604;
    startPositiong = circleLength;
    startPositiony = circleLength;



// percentInputBtn.addEventListener('click', () => {
//       percent.innerHTML = valueInt + "<span class=\"float\">" + valueFloat + "</span>";

//       circleStyle.innerHTML=`
//       .cls-1, .cls-2, .cls-3 {
//                   fill:none;
//                   stroke-linecap:round;
//                   stroke-dasharray: 604;
//                   stroke-dashoffset: 0;
//                }
//                .cls-1 {
//                   stroke:#ececec;
//                   stroke-linejoin:round;
//                   stroke-width:7px;
//                   animation: drawGrey 1s linear;
//                }
//                .cls-2 {
                  
//                   stroke:#693;
//                   stroke-width:8px;
                  
//                }
//                .cls-2, .cls-3 {
//                   stroke-miterlimit:10;
//                   stroke-dashoffset: 604;
//                }
//                .cls-3 {
                  
//                   stroke:#fcd329;
//                   stroke-width:9px;
//                }

//                .active-green {
//                   animation: drawGreen 1s linear;
//                }

//                .active-yellow {
//                   animation: drawYellow 1s linear;
//                }
//       `;
      
//       setTimeout(updateCircles, 0, percentInputValue*0.01);
      
//    } 
//    else {
//      alert('Вводить можно только числа')
//    }

   

// })

    
    var prevPercent = 0;
      greenPercent ="";
      valueInt ="";
      valueFloat ="";
      mainPercent = 0;

percentInputBtn.addEventListener('click', () => {
   var percentInputValue = parseFloat(percentInput.value);

   greenRect(percentInputValue);

   updateCircles(greenPercent);
});

function greenRect(percentInputValue) {
   var newPercent = percentInputValue;
      greenPercent = percentInputValue*0.01;
      percentDifference = newPercent - prevPercent;

   valuesArr = FloatSlicer(percentInputValue); 

   statsBlockPercentValue.innerHTML = valuesArr[0] + "." + valuesArr[1] + "%";

   if (percentDifference > 0){
      statsBlockVisualDifference.innerHTML = "+" + percentDifference + "%";
   } 
   else {
      statsBlockVisualDifference.innerHTML = percentDifference + "%"
   }
   
   rectStyle.innerHTML= `
   .new-percent {
      width: `+ newPercent +`%;
      animation: DrawGreenRect 1s;
   }
   .prev-percent {
      width: `+ prevPercent +`%;
      animation: DrawGreenSubRect 1s;
   }

   @keyframes DrawGreenRect {
      0% {
         width: 0;
      }

      100% {
         width: `+ newPercent +`%;
      }
   }

   @keyframes DrawGreenSubRect {
      0% {
         width: 0;
      }

      100% {
         width: `+ prevPercent +`%;
      }
   }
   `;
   prevPercent = newPercent;
}

function gloatSlicer(inputValue) {
   var valueInt = parseInt(inputValue);
      valueFloat = inputValue - valueInt;
      valueFloat = valueFloat.toFixed(1);
      valueFloat *= 10;


      if (valueFloat == 10) {
         valueFloat = 9;
      }
      let arr = [valueInt, valueFloat];
   return arr;
}

function updateCircles(percent) {

       valuesArr = FloatSlicer(percent*100); 
       percentCls.innerHTML = valuesArr[0] + "<span class=\"float\">" + valuesArr[1] + "</span>";

       var percentLast = percent;
         animationDuration = percent.toFixed(1);

       if (Math.abs(percentLast-percent) < 0.4) {
          animationDuration = 0.4;
       }

         endPositiong = circleLength - (circleLength * percent);
         endPositiony = 604;

       circleStyle.innerHTML = `
               .cls-1, .cls-2, .cls-3 {
                  fill:none;
                  stroke-linecap:round;
                  stroke-dasharray: 604;
                  stroke-dashoffset: 0;
               }
               .cls-1 {
                  stroke:#ececec;
                  stroke-linejoin:round;
                  stroke-width:7px;
                  animation: drawGrey 1s linear;
               }
               .cls-2 {
                  
                  stroke:#693;
                  stroke-width:8px;
                  
               }
               .cls-2, .cls-3 {
                  stroke-miterlimit:10;
               }
               .cls-3 {
                  
                  stroke:#fcd329;
                  stroke-width:9px;
               }

               .active-green {
                  animation: drawGreen `+ animationDuration +`s ease-out;
                  stroke-dashoffset: `+ endPositiong +`;
               }

               .active-yellow {
                  animation: drawYellow `+ animationDuration +`s ease-out;
                  stroke-dashoffset: `+ endPositiony +`;
                  }
               }

               @keyframes drawGrey{
                  from {
                     stroke-dashoffset: 604;
                  }
                  to {
                     stroke-dashoffset: 0;
                  }
               }

               @keyframes drawGreen{
                  from {
                     stroke-dashoffset: `+ startPositiong +`;
                  }
                  to {
                     stroke-dashoffset: `+ endPositiong +`;
                  }
               }

               @keyframes drawYellow{
                  from {
                     stroke-dashoffset: `+ startPositiony +`;
                  }
                  to {
                     stroke-dashoffset: `+ endPositiony +`;
                  }
               }
         `;
           startPositiong = endPositiong;
           startPositiony = endPositiony;
}




