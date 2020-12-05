
const percentInput = document.querySelector('.get-percent');
      percentInputBtn = document.querySelector('.get-percent-btn');
      percent = document.querySelector('.percent');
      percentFloat = document.querySelector('.float');
      greenCircle = document.querySelector('#green-circle');
      yellowCircle = document.querySelector('#yellow-circle');
      circleStyle = document.querySelector('.circle-style');

var circleLength = 604;
    startPositiong = circleLength;
    startPositiony = circleLength;

function updateCircles(percent) {

       var percentLast = percent;

       animationDuration = percent.toFixed(1);

       if (Math.abs(percentLast-percent) < 0.4) {
          animationDuration = 0.4;
       }



         endPositiong = circleLength - (circleLength * percent);
         endPositiony = circleLength - (circleLength * percent)/2;


       


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

percentInputBtn.addEventListener('click', () => {
   var percentInputValue = parseFloat(percentInput.value);

   if (!isNaN(percentInputValue)) {
      var valueInt = parseInt(percentInputValue);
          valueFloat = percentInputValue - valueInt;
          
      valueFloat = valueFloat.toFixed(1);
      valueFloat *= 10;

      percent.innerHTML = valueInt + "<span class=\"float\">" + valueFloat + "</span>";

      circleStyle.innerHTML=`
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
                  stroke-dashoffset: 604;
               }
               .cls-3 {
                  
                  stroke:#fcd329;
                  stroke-width:9px;
               }

               .active-green {
                  animation: drawGreen 1s linear;
               }

               .active-yellow {
                  animation: drawYellow 1s linear;
               }
      `;
      
      setTimeout(updateCircles, 0, percentInputValue*0.01);
      
   }
   else {
      alert('УЧИ УРОКИ ДЕБИЛ');
   }


})

