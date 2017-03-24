getTime()
var intervalId = setInterval(getTime, 1000)

function getTime() {
  chrome.runtime.sendMessage({message: 'get time'}, function(response) {
    var seconds = response.time / 1000
    var minutes = Math.floor(seconds / 60)
    var hours = Math.floor(minutes / 60)
    minutes = minutes % 60
    seconds = seconds % 60

    var hands = [
        {
          hand: 'hours',
          angle: (hours * 30) + (minutes / 2)
        },
        {
          hand: 'minutes',
          angle: (minutes * 6)
        },
        {
          hand: 'seconds',
          angle: (seconds * 6)
        }
      ];
    for (var j = 0; j < hands.length; j++) {
    var elements = document.querySelectorAll('.' + hands[j].hand);
    for (var k = 0; k < elements.length; k++) {
        elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
        elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
        // If this is a minute hand, note the seconds position (to calculate minute position later)
        if (hands[j].hand === 'minutes') {
          elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
        }
      }
    }
    seconds = pad2(seconds)
    minutes = pad2(minutes)

    document.getElementById('time').innerHTML = `Time remaining: ${hours}:${minutes}:${seconds}`
  })
}

//get interval when the set button is clicked
document.getElementById('set').addEventListener('click', function(){
  var time = document.getElementById('setTimer')
  time = time.value * 1000 * 60
  //requires an interval of greater than 1 minute
  if (time < 1) {
    alert("Please set an invterval time of more than 1 minute.")
  } else {
    chrome.storage.local.set({timerLength: time}, function() {
      console.log('timer set to ' + time + 'seconds')
      chrome.runtime.reload()
    })
  }
})

//pad minutes and seconds with a zero if < 10 for display
function pad2(number) {
 return (number < 10 ? '0' : '') + number
}
