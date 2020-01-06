
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';

import Button from './src/components/Button';
import Display from './src/components/Display';

const initState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  currentIndex: 0,
}

export default class App extends Component {

  state = { ...initState };

  addDigit = n => {
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return;
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });
    
    if (n !== '.') {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[this.state.currentIndex] = newValue;
      this.setState({ values });
    }
  }

  clearMemory = () => {
    this.setState({ ...initState });
  }

  setOperation = operation => {
    if (this.state.currentIndex === 0) {
      this.setState({ operation, currentIndex: 1, clearDisplay: true });
    } else {
      const equals = operation === '=';
      const values = [...this.state.values]
      
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        currentIndex: equals ? 0 : 1,
        // clearDisplay: true,
        clearDisplay: !equals,
        values,
      });
    }
  }

  render() {
    return (
      <View style={styles.sectionContainer}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label='AC' triple   onClick={this.clearMemory} />
          <Button label='/' operation onClick={this.setOperation} />
          <Button label='7'           onClick={this.addDigit} />
          <Button label='8'           onClick={this.addDigit} />
          <Button label='9'           onClick={this.addDigit} />
          <Button label='*' operation onClick={this.setOperation} />
          <Button label='4'           onClick={this.addDigit} />
          <Button label='5'           onClick={this.addDigit} />
          <Button label='6'           onClick={this.addDigit} />
          <Button label='-' operation onClick={this.setOperation} />
          <Button label='1'           onClick={this.addDigit} />
          <Button label='2'           onClick={this.addDigit} />
          <Button label='3'           onClick={this.addDigit} />
          <Button label='+' operation onClick={this.setOperation} />
          <Button label='0' double    onClick={this.addDigit} />
          <Button label='.'           onClick={this.addDigit}/>
          <Button label='=' operation onClick={this.setOperation} />
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
