import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';



export default function TypingGame() {

  const [timerCount, setTimer] = useState(0)
  const [inputString, setInputString] = useState('')
  const [finalString, setFinalString] = useState('')
  const [curIdx,setCurIdx] = useState(0)
  const [timeRecord,setTimeRecord]  = useState(0)
  const [result,setResult] = useState(-1)

useEffect(() => {
  checkInputString()
}, [inputString]);

useEffect(() => {
    setInterval(() => {
    setTimer(lastTimerCount => {
        return lastTimerCount + 1
    })
  }, 1000)
},[])


function generateRandomLetter() {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var letters = Array(20).fill().map(() => alphabets[Math.round(Math.random() * 25)])
  setTimer(0)
  setCurIdx(0)
  setInputString('')
  setFinalString(letters)
}

function checkInputString() {
  if(finalString.length == 0){
    generateRandomLetter();
    return;
  }
  if(finalString[curIdx] == inputString.slice(-1)){
    setCurIdx(curIdx + 1);
    if(curIdx === 19){
      setCurIdx(-1);
      if(timeRecord === 0){
        setTimeRecord(timerCount);
        setResult('SUCCESS!');
      }
      else if(timerCount < timeRecord){
        setTimeRecord(timerCount);
        setResult('SUCCESS!');
      }else{
        setResult('FAILURE!');
      }
      
    }
  }else{
    setTimer(timerCount + 0.5)
  }
}
  
  return (
    
    <View style={styles.container}>
      <View style = {styles.topContainer}>
        <Text style = {styles.innerText}>Type The Alphabet</Text>
        <Text style = {styles.outerText}>Typing game to see how fast you type. Timer starts when you do :)</Text>
      </View>
      <View style = {styles.letterContainer}>
        
        <Text style = {styles.letter}>{  curIdx != -1 ? finalString[curIdx]:result}</Text>
      </View>
      <View style = {styles.middleContainer}>
        <Text style = {styles.innerText}>Time: {timerCount}s</Text>
        <Text style = {styles.outerText}>my best time: {timeRecord}s! </Text>
      </View>
      <View style = {styles.bottomContainer}>
        <TextInput autoFocus = {true}  style = {styles.input} value = {inputString} onChangeText={setInputString} placeholder = "Type Here" />
        <Button  color = "#f1406c" title = "Reset" onPress={generateRandomLetter}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1a54',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  topContainer:{
    position:'relative',
    alignItems:'center',
    marginTop:80,
    paddingBottom:25,
    flexDirection:'column',
  },
  letter:{
    color:'#259844',
    fontSize:60,
    textAlign:'center',
    padding:25,
  },
  bottomContainer:{
    alignItems:'stretch',
    flexDirection:'row'
  },
  letterContainer:{
    width:325,
    height:140,
    borderRadius:10,
    backgroundColor:'white',
    marginBottom:20
  },
  innerText: {
    color:'white',
    fontWeight: 'bold',
    textAlign:'center',
    fontSize:20,
    letterSpacing:1
  },
  outerText: {
    color:'#60698f',
    fontWeight: 'bold',
    textAlign:'center',
    fontSize:15,
    padding:12,
    letterSpacing:1
  },
  input:{
    width:300,
    borderWidth:1,
    backgroundColor:"#faf2e7",
    textAlign:'center',
    fontWeight:'bold',
    fontSize:15
  },
  buttons:{
    color:"#f1406c",
    alignItems:'center',
  }
});
