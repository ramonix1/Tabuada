import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const MultiplicationGame = () => {
  const [num1, setNum1] = useState(getRandomNumber());
  const [num2, setNum2] = useState(getRandomNumber());
  const [userAnswer, setUserAnswer] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [message, setMessage] = useState('');

  // Para gerar números aleatórios [1,9]
  function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
  }

  // Para captar a resposta do jogador
  const checkAnswer = () => {
    const correctAnswer = num1 * num2;
    const userNumericAnswer = parseInt(userAnswer);

    if (userNumericAnswer === correctAnswer) {
      setCorrectCount(correctCount + 1);
      setMessage('Correto!');
    } else {
      setIncorrectCount(incorrectCount + 1);
      setMessage(`Incorreto! A resposta correta é ${correctAnswer}`);
    }

    // Loop para limpar campo e solicitar nova resposta
    setUserAnswer('');
    setNum1(getRandomNumber());
    setNum2(getRandomNumber());
  };

  // Parar o jogo
  const stopGame = () => {
    Alert.alert(
      'Fim de Jogo',
      `Você acertou ${correctCount} e errou ${incorrectCount}`,
      [{ text: 'OK' }]
    );
    resetGame();
  };

  // Reiniciar o jogo
  const resetGame = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    setUserAnswer('');
    setMessage('');
    setNum1(getRandomNumber());
    setNum2(getRandomNumber());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Tabuada</Text>
      <Text style={styles.equation}>
        {num1} x {num2} = ?
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={userAnswer}
        onChangeText={setUserAnswer}
        placeholder="Digite sua resposta"
      />
      <Button title="Confirmar" onPress={checkAnswer} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button title="Parar" onPress={stopGame} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  equation: {
    fontSize: 32,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    width: '80%',
    padding: 8,
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    borderRadius: 10,
  },
});

export default MultiplicationGame;
