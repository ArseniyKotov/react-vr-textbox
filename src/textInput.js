import React, { Component } from 'react';
import { View, VrButton, StyleSheet, Text } from 'react-vr';
import Keyboard from './keyboard';
import Scroll from './scroll'

class TextInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      cursorPosition: 0,
      textArrayCursorYes: '|',
      textArrayCursorNo: ' ',
      text: '',
      selected: false,
      rows: this.props.rows || 4,
      columns: this.props.cols || 50,
      submitHandler: this.props.onSubmit || null,
      showScroll: false,
      toggleCursor: true,
      x: -1,
      y: 0.2,
      z: -1.5,
      pages : 0,
      start : 0,
      end: (this.props.rows || 4) * (this.props.cols || 50),
      focus: false,
      counter: 0
    }
  }

  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState({
  //       toggleCursor: !this.state.toggleCursor
  //     })
  //   }, 500)
  // }
  focus() {
    this.setState({focus: true});
  }
  generateText() {
    var string = '';
    for(var i =0; i < this.state.textArrayCursorYes.length; i++) {
      if(this.state.textArrayCursorYes[i] !== '|') string += this.state.textArrayCursorYes[i];
    }
    return string;
  }

  handleSpace() {
    var newArrYes = this.state.textArrayCursorYes.slice(0, this.state.cursorPosition) + ' ' + this.state.textArrayCursorYes.slice(this.state.cursorPosition);
    var newArrNo = this.state.textArrayCursorNo.slice(0, this.state.cursorPosition) + ' ' + this.state.textArrayCursorNo.slice(this.state.cursorPosition);
    this.setState({
      textArrayCursorYes: newArrYes,
      textArrayCursorNo: newArrNo,
      cursorPosition: this.state.cursorPosition + 1,
      text: this.generateText()
    }, () => {
      this.handleCursorFollow.bind(this)();
    });
  }

  handleSubmit() {
    console.log(this.state.text);
    var string = JSON.parse(JSON.stringify(this.state.textArrayCursorYes));
    string = string.substring(0, string.length-1);
    console.log("TEST", string);
    this.setState({cursorPosition: 0,
      textArrayCursorYes: '|',
      textArrayCursorNo: ' ',
      text: '',
      selected: false,
      rows: this.props.rows || 4,
      columns: this.props.cols || 50,
      submitHandler: this.props.onSubmit || null,
      showScroll: false,
      toggleCursor: true,
      x: -1,
      y: 0.2,
      z: -1.5,
      pages : 0,
      start : 0,
      end: (this.props.rows || 4) * (this.props.cols || 50),
      focus: false
    });

      this.props.onSubmit(string);

    
  }

  handleAllLetters(value) {
    var newArrYes = this.state.textArrayCursorYes.slice(0, this.state.cursorPosition) + value + this.state.textArrayCursorYes.slice(this.state.cursorPosition);
    var newArrNo = this.state.textArrayCursorNo.slice(0, this.state.cursorPosition) + value + this.state.textArrayCursorNo.slice(this.state.cursorPosition);
    this.setState({
      textArrayCursorYes: newArrYes,
      textArrayCursorNo: newArrNo,
      cursorPosition: this.state.cursorPosition + 1,
      text: this.generateText()
    }, () => {
      this.handleCursorFollow.bind(this)();
    });
  }

  handleDelete() {
    var arr = this.state.textArrayCursorYes.slice(0, this.state.cursorPosition - 1) + this.state.textArrayCursorYes.slice(this.state.cursorPosition);
    var arr2 = this.state.textArrayCursorNo.slice(0, this.state.cursorPosition - 1) + this.state.textArrayCursorNo.slice(this.state.cursorPosition);

    this.setState({
      textArrayCursorYes: arr,
      textArrayCursorNo: arr2,
      cursorPosition: this.state.cursorPosition - 1
    }, () => {
      // this.handleCursorFollow.bind(this)();
      if (this.state.textArrayCursorYes.length > this.state.rows * this.state.columns) {
        // console.log('total space, LENGTH , start, end', this.state.rows*this.state.columns, this.state.textArrayCursorYes.length, this.state.start, this.state.end);
        if ((this.state.cursorPosition + 1) % this.state.columns === 0) {
          // console.log('CURSOR AT SPOT ', this.state.cursorPosition);
          // console.log('start, end ', this.state.start, this.state.end);
          this.setState({
            start: this.state.start - this.state.columns,
            end: this.state.end - this.state.columns
          });
        }
      } else {
        this.setState({
          start: 0,
          end: (this.props.rows || 4) * (this.props.cols || 50)
        })
      }
    });

  }

  handleForward() {
    if (this.state.cursorPosition < this.state.textArrayCursorYes.length - 1) {
      var cp = this.state.cursorPosition;
      var s = this.state.textArrayCursorYes;
      var s2 = this.state.textArrayCursorNo;

      s = s.slice(0, cp) + s.slice(cp + 1, cp + 2) + s.slice(cp, cp + 1) + s.slice(cp + 2);
      s2 = s2.slice(0, cp) + s2.slice(cp + 1, cp + 2) + s2.slice(cp, cp + 1) + s2.slice(cp + 2);

      this.setState({
        textArrayCursorYes: s,
        textArrayCursorNo: s2,
        cursorPosition: this.state.cursorPosition + 1
      }, () => {
        // this.handleCursorFollow.bind(this)();
        if (this.state.cursorPosition > this.state.rows * this.state.columns) {
          // console.log('total space, LENGTH , start, end', this.state.rows * this.state.columns, this.state.textArrayCursorYes.length, this.state.start, this.state.end);
          // console.log('CP ', this.state.cursorPosition);
          if ((this.state.cursorPosition - 1) % this.state.columns === 0) {
            // console.log('CURSOR AT SPOT ', this.state.cursorPosition);
            // console.log('start, end ', this.state.start, this.state.end);
            this.setState({
              start: this.state.start + this.state.columns,
              end: this.state.end + this.state.columns
            });
          }
        } else {
          this.setState({
            start: 0,
            end: (this.props.rows || 4) * (this.props.cols || 50)
          })
        }
      });
    }
  }

  handleBack() {

    if (this.state.cursorPosition !== 0) {
      var cp = this.state.cursorPosition;
      var s = this.state.textArrayCursorYes;
      var s2 = this.state.textArrayCursorNo;
      // console.log('s',s)
      // console.log('s2',s2)

      s = s.slice(0, cp-1) + s.slice(cp, cp+1) + s.slice(cp-1, cp) + s.slice(cp+1);
      s2 = s2.slice(0, cp - 1) + s2.slice(cp, cp + 1) + s2.slice(cp - 1, cp) + s2.slice(cp + 1);

      this.setState({
        textArrayCursorYes : s,
        textArrayCursorNo: s2,
        cursorPosition: this.state.cursorPosition - 1
      }, () => {
        // this.handleCursorFollow.bind(this)();
        if (this.state.cursorPosition > this.state.rows * this.state.columns) {
          // console.log('total space, LENGTH , start, end', this.state.rows * this.state.columns, this.state.textArrayCursorYes.length, this.state.start, this.state.end);
          if ((this.state.cursorPosition + 1) % this.state.columns === 0) {
            // console.log('CURSOR AT SPOT ', this.state.cursorPosition);
            // console.log('start, end ', this.state.start, this.state.end);
            this.setState({
              start: this.state.start - this.state.columns,
              end: this.state.end - this.state.columns
            });
          }
        } else {
          this.setState({
            start: 0,
            end: (this.props.rows || 4) * (this.props.cols || 50)
          })
        }
      });
    }
  }



  handleUp() {
    if(this.state.start!== 0) {
    if (this.state.pages !== 0) {
      var pages = this.state.pages - 1;
      var start = this.state.start - this.state.columns;
      var end = this.state.end - this.state.columns;
      this.setState({
        pages: pages,
        start: start,
        end : end
      })
    } 
    }
  }

  handleDown() {
    if(this.state.end < this.state.textArrayCursorYes.length) {
    var pages = this.state.pages + 1;
    var start = this.state.start + this.state.columns;
    var end = this.state.end + this.state.columns;
    this.setState({
      pages: pages,
      start: start,
      end: end
    })
    }
  }


  paginate(s) {

    var columns = 20;
    var cols;
    var results = [];
    var temp = s.split(' ');
    var string = '';
    for (var i = 0; i < temp.length; i++) {
      if (string.includes('|')) {
        cols = columns + 1;
      } else {
        cols = columns;
      }
      if (string.length === cols) {
        console.log('length === cols module got called for word ', temp[i])
        string = string.slice(0, string.length - 1);
        results.push(string);
        string = temp[i] + ' ';
      }

      else if (string.length + temp[i].length > cols) {
        console.log('cannot add the next word module got called for word ', temp[i])
        string = string.slice(0, string.length - 1);
        results.push(string);
        string = temp[i] + ' ';
      } else {
        //add current item to the string
        console.log('add word to string module got called for word ', temp[i])
        string += temp[i] + ' '
      }
    }
    if (string !== '') results.push(string.slice(0, string.length - 1));
    return results;
  }

  handleCursorFollow() {

    if (this.state.cursorPosition > this.state.end) {
      var num = this.state.counter + 1;
      this.setState({counter: num})
      var start = this.state.start;
      var end = this.state.end;
      var pages = this.state.pages;
      while (end <= this.state.cursorPosition) {
        pages = pages + 1;
        start = start + this.state.columns;
        end = end + this.state.columns;
      }

      if (this.state.textArrayCursorYes[start] === ' ') {
        start = start + 1;
        end = end + 1;
      } else {
        var temp = start;
        while(this.state.textArrayCursorYes[temp] !== ' ') {
          temp--
        }
        start = temp + 1;
        end = start + (this.state.columns * this.state.rows);
      }
    } else {
      var pages = this.state.pages;
      start = this.state.start;
      end = this.state.end;
    }

    this.setState({
      start: start,
      end: end,
      pages: pages
    })

  }

  render() {
    var arrayCursorYes = this.paginate(this.state.textArrayCursorYes);
    var arrayCursorNo = this.paginate(this.state.textArrayCursorNo);
    var displayString = '';
    var displayArray = this.paginate(this.state.textArrayCursorYes.slice(this.state.start, this.state.end));
    displayArray.forEach(function (element, index) {
      displayString += element + '\n';
    })

    displayString = displayString.slice(0, displayString.length - 1);
   
    return(
      <View>
        <View>
          <VrButton onClick={this.focus.bind(this)}>
          <Text style={{backgroundColor: 'grey', width: this.state.columns / 15, opacity: 0.8, height: this.state.rows / 10, fontSize: 0.08, fontWeight: '100', fontFamily: 'comicsans', includeFontPadding: true, transform: [{ translate: [this.state.x, this.state.y, this.state.z] }]}}>
            {displayString}
          </Text>
          </VrButton>
          </View>
          <View style={{ transform: [{ translate: [this.state.x + 1, this.state.y + 0.1, this.state.z] }] }}>
          {this.state.counter >= 1 ? ( <Scroll 
            handleUp={this.handleUp.bind(this)} 
            handleDown={this.handleDown.bind(this)}
          /> ): (<View/>)}
          </View>
        {this.state.focus ? (
        <View style={{transform: [{ translate: [this.state.x, this.state.y, this.state.z] }, {rotateX: -30}] }}>
          <Keyboard 
            handleAllLetters={this.handleAllLetters.bind(this)} 
            handleDelete={this.handleDelete.bind(this)} 
            handleForward={this.handleForward.bind(this)} 
            handleBack={this.handleBack.bind(this)} 
            handleSpace={this.handleSpace.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
          />
        </View> ) : (<View/>)}
      </View>);
    }
}

export default TextInput;