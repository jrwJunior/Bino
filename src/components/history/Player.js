"use strict";

import '../../img/display.png';
import '../../img/maxresdefault.jpg';
import '../../img/Horizon-ZeroDawn.mp4';
import '../../components/history/history.pcss';

export default class Player {
  constructor() {
    this.player = document.getElementById('video');

    this.isPlaying = false;
    this.player.muted = false;

    //initialization
    this.init();
  }

  init() {
    this.events();
  }

  events() {
    const parentElement = document.querySelector('.media-container');

    parentElement.addEventListener('click', evt => {
      const target = evt.target;
      if (target.id === "buttonSound") {
        this.soundSwitch(target);

        return false;
      }

      if (evt && target ) {
        if (!this.isPlaying) {
          this.isPlaying = true;

          this.removeElement('poster', target.parentElement);
          this.player.play();
          this.timeUpdate(parentElement);

        } else {
          this.isPlaying = false;
          this.player.pause();
        }
      }

      parentElement.querySelector(".play-button").classList.toggle("button-on");
    });
  }

  timeUpdate(element) {
    this.player.addEventListener("timeupdate", () => {
      if (this.player.currentTime === this.player.duration) {
        this.bringBack(element);
      }
    });
  }

  bringBack(element) {
    this.isPlaying = false;
    this.player.currentTime = 0;
    this.player.pause();

    const isElement = !!element.querySelector(".play-button");

    if (isElement) {
      this.player.parentElement.
      insertBefore(this.createElement('img', 'poster', 'assets/img/maxresdefault.jpg'), this.player.nextElementSibling);
      element.querySelector(".play-button").classList.add("button-on");
    }
  }

  createElement(type, className = null, url = null) {
    const node = document.createElement(type);

    if (node && className) {
      node.classList.add(className, 'img-responsive');

      if (node.tagName === 'IMG') {
        node.src = url;
      }

    } else {
      return;
    }

    return node;
  }

  removeElement(className, parent) {
    const node = !!parent.querySelector(`.${className}`);

    if (node) {
      parent.querySelector(`.${className}`).remove();
    }

    return null;
  }

  soundSwitch(element) {
    if (element.nodeType === element.ELEMENT_NODE) {
      const isClass = element.classList.contains('sound-off');

      isClass ? !element.classList.remove("sound-off") && element.classList.add("sound-on") : !element.classList.remove("sound-on") && element.classList.add("sound-off");
    }

    return this.player.muted = !this.player.muted;
  }

}
