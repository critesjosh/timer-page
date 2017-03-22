document.getElementById('button1').addEventListener('click', function(){
  document.getElementById('firstQuestion').setAttribute('style', 'display:none;')
  document.getElementById('firstAnswer').setAttribute('style', 'display:none;')
  document.getElementById('button1').setAttribute('style', 'display:none;')
  document.getElementById('secondQuestion').setAttribute('style', '')
  document.getElementById('secondAnswer').setAttribute('style', '')
  document.getElementById('button2').setAttribute('style', '')
})

document.getElementById('button2').addEventListener('click', function(){
  document.getElementById('secondQuestion').setAttribute('style', 'display:none;')
  document.getElementById('secondAnswer').setAttribute('style', 'display:none;')
  document.getElementById('button2').setAttribute('style', 'display:none;')
  document.getElementById('thirdQuestion').setAttribute('style', '')
  document.getElementById('thirdAnswer').setAttribute('style', '')
  document.getElementById('button3').setAttribute('style', '')
})
