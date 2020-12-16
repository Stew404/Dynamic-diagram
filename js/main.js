
const percentInput = document.querySelectorAll('.percent-input');
      percentInputBtn = document.querySelectorAll('.percent-input-btn');
      percentCls = document.querySelector('.percent');
      percentFloat = document.querySelector('.float');
      circleStyle = document.querySelector('.circle-style');
      circle = document.querySelectorAll('.circle');
      rectStyle = document.querySelector('.rect-style');


var circleLength = 604;
    startPosition = circleLength;





var prevPercentArr = [];
    startPositionArr = [];
    endPositionArr =[];

percentInput.forEach(function readInput(input, index) {

   prevPercentArr.push(0);
   startPositionArr.push(604);

   percentInputBtn[index].addEventListener('click', () => {
    var inputValue = parseFloat(input.value);
       inputId = input.getAttribute('id');
       inputId = inputId.match(/\d/g);

       drawRect(inputValue, inputId);

      var percentSum = 0;

       prevPercentArr.forEach(function sumElem(elem) {
          percentSum += elem;
       })
     


       updateCircles(percentSum, prevPercentArr);
});
});


function drawRect(InputValue, inputId) {
   var newPercent = InputValue;
       prevPercent = prevPercentArr[inputId-1];
      percentMultiplier = InputValue*0.01;
      percentDifference = newPercent - prevPercent;

      percentDifference = percentDifference.toFixed(1);
      

   valuesArr = FloatSlicer(InputValue); 

   var statsBlockPercentValue = document.querySelector('#stats-value-' + inputId );
       statsBlockVisualDifference = document.querySelector('#difference-' + inputId );
       newPercentElem = document.querySelector('#new-percent-' + inputId );
       prevPercentElem = document.querySelector('#prev-percent-' + inputId );

   statsBlockPercentValue.innerHTML = valuesArr[0] + "." + valuesArr[1] + "%";

   if (percentDifference > 0){
      statsBlockVisualDifference.innerHTML = "+" + percentDifference + "%";
   } 
   else {
      statsBlockVisualDifference.innerHTML = percentDifference + "%"
   }

   rectStyle.innerHTML= `
   @keyframes DrawRect {
      0% {
         width: 0;
      }

      100% {
         width: `+ newPercent +`%;
      }
   }

   @keyframes DrawSubRect {
      0% {
         width: 0;
      }

      100% {
         width: `+ prevPercent +`%;
      }
   }
   `;

   newPercentElem.style.width=newPercent+"%";
   newPercentElem.style.animation="DrawRect 1s";

   prevPercentElem.style.width=prevPercent+"%";
   prevPercentElem.style.animation="DrawSubRect 1s";

   prevPercentArr[inputId-1] = newPercent; 
}

function FloatSlicer(inputValue) {
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

function updateCircles(percent, percentArr) {

       valuesArr = FloatSlicer(percent); 
       percentCls.innerHTML = valuesArr[0] + "<span class=\"float\">" + valuesArr[1] + "</span>";


       var percentMultiplier = percent*0.01;
           percentLast = percentMultiplier;
           animationDuration = percentMultiplier.toFixed(1);

       if (Math.abs(percentLast-percentMultiplier) < 0.4) {
          animationDuration = 0.4;
       }

       for(let i=percentArr.length-1; i > 0 ; i--){
          percentArr[i-1] += percentArr[i];
       }
      //  percentArr[1] += percentArr[2];
      //  percentArr[0] += percentArr[1];

       percentArr.forEach(function drawCircle(elem, index, percentArr){
          elem *= 0.01;
          var invertIndex = percentArr.length - (index+1);

          endPositionArr[index] = circleLength - (circleLength * elem);
          

          
          var thisCircle = circle[index];
            

          circleStyle.innerHTML = `
               @keyframes drawCircle{
                  from {
                     stroke-dashoffset: `+ startPositionArr[index] +`;
                  }
                  to {
                     stroke-dashoffset: `+ endPositionArr[index] +`;
                  }
               }
         `;

          thisCircle.style.animation = "drawCircle " + animationDuration + "s";
          thisCircle.style.strokeDashoffset = endPositionArr[index];


          startPositionArr[index] = endPositionArr[index];
          
       })

       for(let i=0; i < percentArr.length-1; i++){
          percentArr[i] -= percentArr[i+1];
       }

      //  percentArr[0] -= percentArr[1];
      //  percentArr[1] -= percentArr[2];

}




