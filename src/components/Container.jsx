import React, { Component } from 'react';
import '../index.css';
import { Button, Badge, Alert } from 'reactstrap';
import track1 from '../tracks/1.mp3';
import track2 from '../tracks/2.mp3';
import track3 from '../tracks/3.mp3';
import track4 from '../tracks/4.mp3';
import track5 from '../tracks/5.mp3';
import track6 from '../tracks/6.mp3';

import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpeg';
import img3 from '../img/3.png';
import img4 from '../img/img4.jpg';
import img5 from '../img/img5.jpg';
import img6 from '../img/img6.jpg';


class Container extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isNext: 1,
      isPrev: -1,
      alert: false,
      alertF: false,
      plusDisab: true,
      minusDisab: false,
      thTrack: track1,
      autoPlay: false,
      imageSrc: '',
      isEnd: this.end,
      isName: '',
      isPlay: false,
      duration: '',
      currentTime: '',
      clearInterval: false,
      isTracks: [
            {
              id: 1,
              src: track1,
              img: img1,
              name: 'Burito - По Волнам',
            },
            {
              id: 2,
              src: track2,
              img: img2,
              name: 'Тимати и Егор Крид - Гучи',
            },
            {
              id: 3,
              src: track3,
              img: img3,
              name: 'Егор Крид - Миллион Алых роз',
            },
            {
              id: 4,
              src: track4,
              img: img4,
              name: 'Imagine Dragons - thunder',
            },
            {
              id: 5,
              src: track5,
              img: img5,
              name: 'L-one - Трехочковый',
            },
            {
              id: 6,
              src: track6,
              img: img6,
              name: 'Жак Энтони - Люли',
            },
      ],
      val: 1,
    }
    this.trackSrc = this.state.isTracks.map(i => i.src);
    this.trackImg = this.state.isTracks.map(i => i.img);
    this.trackName = this.state.isTracks.map(i => i.name);
    let player = document.getElementById('player');
    this.defTrack = this.state.isTracks[0];

  }


  render () {
    let player = document.getElementById('player');
    return (
      <div className='container'>
        <Button onClick={
          this.durationTrack
        }/>
        <div className='album'>
          <img
            className="album-image"
            src={this.state.imageSrc || img1}
          />
          <span className="name-song">
            { this.state.isName || this.state.isTracks[0].name }
          </span>
        </div>
        <div className='Buttons-container'>
           <Button
            outline
            className='btnC'
            color="primary"
            onClick={ this.handlerPlay }
          >
            <i
              className="fas fa-play fa-1x">
            </i>
          </Button>
          <Button
            onClick={ this.handlerPause }
            outline
            className='btnC'
            color="primary"
            >
            <i
              className="fas fa-pause fa-1x">
            </i>
          </Button>
          <Button
            disabled={
              this.state.plusDisab
            }
            onClick={this.clickPlusVol}
             className='btnC'
             outline
             color="primary"
            >
          <i className="fas fa-plus">
          </i>
           </Button>
          <Button
            disabled={this.state.minusDisab}
            onClick={this.clickMinusVal}
             className='btnC'
             outline
             color="primary">
             <i className="fas fa-minus"></i>
           </Button>

          <audio
            controls
            id="player"
            src={ this.state.thTrack }
            autoPlay={this.state.autoPlay}>
          </audio>
        </div>
        <Button
          outline
          className="chevron-right btnC"
          color="primary"
          disabled={this.state.isNext >= this.state.isTracks.length ? true : false}
          onClick={ this.clickNext }
        >
          <i className="fas fa-chevron-right fa-1x"></i>
        </Button>
        <Button
          outline
          className="chevron-left btnC"
          color="primary"
          disabled={this.state.isPrev === -1 ? true : false}
          onClick={ this.clickPrev}
        >
          <i className="fas fa-chevron-left fa-1x"></i>
        </Button>
        <input
           value={}
           step='2'
           type="range"
           style={{
            width: '100%',
            marginTop: '10px',
            height: '20px',
            background: 'rgba(0,0,0, 0.4)'
        }}
      />
      </div>
    )
  }
  handlerPlay = () => {
    let player = document.getElementById('player');

    let timeId = setInterval(() => {
      this.setState({
        currentTime: player.currentTime
      })
    }, 1000)
    this.setState({
      isPlay: !this.state.isPlay,
      duration: player.duration,
      clearInterval: false
    })
    this.state.clearInterval ? clearInterval : null
    player.play()

  }
  handlerPause = () => {
    let player = document.getElementById('player');
    this.setState({
      clearInterval: !this.clearInterval
    })
    player.pause();
  }
  clickNext = () => {
    let player = document.getElementById('player');
    this.setState({
        isNext: this.state.isNext +1,
        isPrev: this.state.isPrev +1,
        thTrack: this.state.isTracks[this.state.isNext].src,
        imageSrc: this.state.isTracks[this.state.isNext].img,
        isName: this.state.isTracks[this.state.isNext].name,
        autoPlay: true,
      })
  }
  clickPrev = () => {
    let player = document.getElementById('player');

    this.setState({
      ...this.state,
        isPrev: this.state.isPrev -1,
        isNext: this.state.isNext -1,
        thTrack: this.state.isTracks[this.state.isPrev].src,
        imageSrc: this.state.isTracks[this.state.isPrev].img,
        isName: this.state.isTracks[this.state.isPrev].name,
        autoPlay: true
      })
  }
  clickPlusVol = () => {
    let player = document.getElementById('player');
    player.volume = this.state.val;
    if (player.volume) {
      return (
        this.setState({
          ...this.state,
          val: this.state.val + 0.1,
        })
      )
    } else  if (player.volume <= 0.2){
      return (
        this.setState({
        ...this.state,
          minusDisab: true
        })
    )
    }
}
  clickMinusVal = () => {
    let player = document.getElementById('player');
      return (
        player.volume = this.state.val,
        this.setState({
          ...this.state,
          val: this.state.val - 0.1,
          plusDisab: false
        }),
        console.log(this.state.val)
      )
    }
  durationTrack = () => {
    let player = document.getElementById('player');
}
componentDidUpdate () {
  let player = document.getElementById('player');
  let timing = player.currentTime;
  let duration = player.duration
}
currTime =  () => {
  let ct = JSON.stringify(this.state.currentTime + 'px');
 }

}

export default Container;
