
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
    prevPrevPercentArr = [];
    startPositionArr = [];
    endPositionArr =[];
    animationDurationArr =[];

percentInput.forEach(function readInput(input, index) {

   prevPercentArr.push(0);
   prevPrevPercentArr.push(0);
   startPositionArr.push(604);
   animationDurationArr.push(0);

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
       prevPrevPercent = prevPrevPercentArr [inputId-1];
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
         width: `+ prevPercent +`%;
      }

      100% {
         width: `+ newPercent +`%;
      }
   }

   @keyframes DrawSubRect {
      0% {
         width: `+ prevPrevPercent +`%;
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

   prevPrevPercentArr [inputId-1] = prevPercent;
   prevPercentArr[inputId-1] = newPercent; 
   setTimeout(() => {
      rectStyle.innerHTML = ``;
      newPercentElem.style.animation="";
      prevPercentElem.style.animation="";
   }, 1001);
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


       

       for(let i=percentArr.length-1; i > 0 ; i--){
          percentArr[i-1] += percentArr[i];
       }

       percentArr.forEach(function drawCircle(elem, index, percentArr){
          elem *= 0.01;

         var thisCircle = circle[index];



          endPositionArr[index] = circleLength - (circleLength * elem);
          endPositionArr[index] = endPositionArr[index].toFixed(0);
          
         var percentMultiplier = elem;
           percentLast = percentMultiplier;
           animationDuration = 1-percentMultiplier.toFixed(1);

       var animParam = parseInt(startPositionArr[index]);

       if (endPositionArr[index]-startPositionArr[index] < 0){

          let drawAnimationPlus = setInterval(() => {

          if (animParam <= endPositionArr[index]) {
             clearInterval(drawAnimationPlus);
             thisCircle.style.strokeDashoffset = endPositionArr[index];
             startPositionArr[index] = endPositionArr[index];
             return;
          }

          animParam -= 3;


          thisCircle.style.strokeDashoffset = animParam;
       }, 4);

       } 
       else if (endPositionArr[index]-startPositionArr[index] > 0){
          let drawAnimationMinus = setInterval(() => {

          if (animParam >= endPositionArr[index]) {
             clearInterval(drawAnimationMinus);
             thisCircle.style.strokeDashoffset = endPositionArr[index];
             startPositionArr[index] = endPositionArr[index];
             return;
          }

          animParam += 3;

          

          thisCircle.style.strokeDashoffset = animParam;
       }, 4);
       }

       })

       for(let i=0; i < percentArr.length-1; i++){
          percentArr[i] -= percentArr[i+1];
       }


}




