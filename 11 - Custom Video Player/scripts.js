(function(){
// grab things
  const player = document.querySelector('.player');
  const video = player.querySelector('.viewer');
  const toggleBtn = player.querySelector('.toggle');
  const skipBtns = player.querySelectorAll('.skip');
  const sliders = player.querySelectorAll('.player__slider');
  const progress = player.querySelector('.progress__filled');
  const progressBar = player.querySelector('.progress');
  let mouseDown = false;
  const fullscreen = document.querySelector('.fullscreen');

// functions
  function togglePlay(){
    let method = video.paused ? 'play' : 'pause';
    video[method]();
  }

  function toggleBtnText(){
    let icon = video.paused ? '►' : '❚ ❚';
    toggleBtn.textContent = icon;
  }

  function skip(){
    let delta = +this.dataset.skip;
    video.currentTime += delta;
  }

  function setValue(){
    video[this.name] = this.value;
  }

  function showProgress(){
    progress.style.flexBasis = `${(video.currentTime / video.duration)* 100}%`;
  }

  function setProgress(e){
    video.currentTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  }

  function goFullScreen(){
     if (!document.mozFullScreen && !document.webkitFullScreen) {
      if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else {
        video.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }
  }

// events
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', toggleBtnText);
  video.addEventListener('pause', toggleBtnText);

  skipBtns.forEach(btn => btn.addEventListener('click', skip));
  toggleBtn.addEventListener('click', togglePlay);

  sliders.forEach(slider => {
    slider.addEventListener('change', setValue);
    slider.addEventListener('mousemove', setValue);
   });

  video.addEventListener('timeupdate', showProgress);
  progressBar.addEventListener('click', setProgress);
  progressBar.addEventListener('mousedown', () => mouseDown = true);
  progressBar.addEventListener('mouseup', () => mouseDown = false);
  progressBar.addEventListener('mousemove', (e) => {
    if (mouseDown){
      setProgress(e);
    }
  });
  fullscreen.addEventListener('click', goFullScreen);
})();