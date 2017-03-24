//get the timer length from local browser storage
setTimeout(function(){
  chrome.storage.local.get(function(storage){
    if (!storage.timerLength) {
      var time = 23*60*1000
      window.timer = time
      chrome.storage.local.set({timerLength: time})
    }
    window.timer = storage.timerLength
    window.timeRemaining = window.timer
    console.log(storage)
  })
}, 1000)

// When the user clicks the browser-action button...
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.browserAction.setPopup({popup:'popup.html'})
});
//call deduct every one second
var id2 = setInterval(deduct1sec, 1000)
//decduct one second
function deduct1sec () {
  window.timeRemaining = window.timeRemaining - 1000
  //if time runs out, open the new tab
  if(window.timeRemaining === 0) {
    chrome.tabs.create({url: 'https://timer-questions-page.herokuapp.com/'})
    //reset the timer
    window.timeRemaining = window.timer
  }
}
//send the remaining time to the popup for display
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log(request)
  sendResponse({time: window.timeRemaining})
})
