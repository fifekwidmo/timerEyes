import React from 'react';
import {render} from 'react-dom';

const AppDescription = () => {
  return (
  	<div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
    </div>
  );
};

class App extends React.Component {
	state = {
    status: "off", 
    time: 0, 
    timer: null, 
	};
	formatTime = (time) => {
	let minutes = Math.floor(time/60);
	let seconds = Math.floor(time%60);
	if(minutes < 10) {
		minutes = '0' + minutes;
	}
	if(seconds < 10) {
		seconds = '0' + seconds;
	}
	return `${minutes}:${seconds}`;
	}
	step = () => {
	this.setState({
		time: this.state.time - 1,
	});
	if (this.state.time === 0 && this.state.status === "work") {
		this.playBell();
		this.setState({
			status: "rest",
			time: 20,
		});
	} else if (this.state.time === 0 && this.state.status === "rest") {
		this.playBell();
		this.setState({
			status: "work",
			time: 1200,
		});
	}
	};
	startTimer = () => {
		this.setState({
			status: 'work',
			time: 1200,
			timer: setInterval(this.step, 1000),
		});
	};
	stopTimer = () => {
		clearInterval(this.state.timer)
		this.setState({
			status: 'off',
			time: 0,
			timer: null,
		})
	}
	playBell = () => {
		const bell = new Audio('./sounds/bell.wav');
		bell.play();
	};
	closeApp = () => {
		window.close()
	}	
	render() {
    const { status, time } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
				{status === "off" && <AppDescription />}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
				{status !== "off" && (<div className="timer">{this.formatTime(time)}</div>)}
				{status === "off" && (
					<button onClick={() => this.startTimer()} className="btn">
						Start
          </button>
        )}
        {status !== "off" && (
          <button onClick={() => this.stopTimer()} className="btn">
            Stop
          </button>
        )}
        <button onClick={() => this.closeApp()} className="btn btn-close">
          X
        </button>
      </div>
    )
  };
};

render(<App />, document.querySelector('#app'));
