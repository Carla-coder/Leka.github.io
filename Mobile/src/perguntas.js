import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const learningPathData = {
  learningPath: {
    modules: [
      {
        id: 1,
        title: "1. Introdução ao HTML",
        description: "O HTML (HyperText Markup Language) é a linguagem que estrutura páginas da web.",
        interactiveContent: [
          {
            step: 1,
            instruction: "📝 Digite o código para criar uma página com título 'Meu Primeiro Site':",
            exampleCode: "<!DOCTYPE html>\n<html>\n<head>\n<title>Meu Primeiro Site</title>\n</head>\n<body>\n</body>\n</html>",
            hint: "Use <html>, <head> e <title> para começar a estruturar a página.",
            userResponse: "code",
          },
        ],
      },
      {
        id: 2,
        title: "2. Introdução ao CSS",
        description: "O CSS é uma linguagem de estilo utilizada para definir a apresentação visual de documentos HTML.",
        interactiveContent: [
          {
            step: 1,
            instruction: "Adicione uma cor de fundo azul claro ao corpo da página.",
            exampleCode: "body {\n  background-color: lightblue;\n}",
            hint: "No CSS, use 'background-color' para definir a cor de fundo.",
            userResponse: "code",
          },
        ],
      },
      {
        id: 3,
        title: "3. Introdução ao JavaScript",
        description: "O JavaScript é uma linguagem de programação que possibilita a adição de interatividade em páginas web.",
        interactiveContent: [
          {
            step: 1,
            instruction: "Crie uma função JavaScript para exibir um alerta com a mensagem 'Olá, Mundo!' quando o botão for clicado.",
            exampleCode: "<script>\n  function showMessage() {\n    alert('Olá, Mundo!');\n  }\n</script>",
            hint: "Quando criar o botão use 'onclick' no botão para chamar a função.",
            userResponse: "code",
          },
        ],
      },
      {
        id: 4,
        title: "4. Prática de CSS",
        description: "Vamos consolidar seu conhecimento de CSS com exercícios práticos.",
        interactiveContent: [
          {
            step: 1,
            instruction: "Escreva o código CSS para centralizar um texto dentro de um elemento.",
            exampleCode: "h1 {\n  text-align: center;\n}",
            hint: "Use 'text-align: center' no CSS para centralizar.",
            userResponse: "code",
          },
        ],
      },
      {
        id: 5,
        title: "✏ Quiz Final",
        quiz: [
          {
            question: "1. Qual é a estrutura básica de um documento HTML?",
            answerType: "code",
            expectedAnswer: "<!DOCTYPE html>\n<html>\n<head>\n<title>Título</title>\n</head>\n<body>\n</body>\n</html>",
          },
          {
            question: "2. Como aplicar uma cor de fundo azul usando CSS?",
            answerType: "multipleChoice",
            options: [
              "body { color: blue; }",
              "body { background-color: blue; }",
              "body { background: blue; }",
            ],
            expectedAnswer: "body { background-color: blue; }",
          },
          {
            question: "3. Para que serve o atributo 'onclick' em JavaScript?",
            answerType: "multipleChoice",
            options: [
              "Executa uma função quando o elemento é clicado.",
              "Muda a cor do texto do elemento.",
              "Adiciona um evento hover ao elemento.",
            ],
            expectedAnswer: "Executa uma função quando o elemento é clicado.",
          },
          {
            question: "4. Qual propriedade CSS é usada para mudar a fonte de um elemento?",
            answerType: "multipleChoice",
            options: [
              "font-weight",
              "font-family",
              "text-font",
            ],
            expectedAnswer: "font-family",
          },
          {
            question: "5. Como você pode incluir um arquivo CSS externo em um documento HTML?",
            answerType: "code",
            expectedAnswer: "<link rel='stylesheet' href='styles.css'>",
          },
        ],
      },
    ],
  },
};

const gifSource = require('./assets/robo2.png');

function LearningPath() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const navigation = useNavigation();
  const currentModule = learningPathData.learningPath.modules[currentModuleIndex];

  const handleNext = () => {
    if (currentModuleIndex < learningPathData.learningPath.modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    } else {
      navigation.navigate('Game');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{learningPathData.learningPath.title}</Text>
      <Text style={styles.description}>{learningPathData.learningPath.description}</Text>
      {currentModule.quiz ? (
        <Quiz quiz={currentModule.quiz} onFinish={handleNext} />
      ) : (
        <Module module={currentModule} onNext={handleNext} />
      )}
    </ScrollView>
  );
}

function Module({ module, onNext }) {
  return (
    <View style={styles.moduleContainer}>
      <Text style={styles.moduleTitle}>{module.title}</Text>
      <Text style={styles.moduleDescription}>{module.description}</Text>
      {module.interactiveContent && module.interactiveContent.map((step, index) => (
        <InteractiveStep key={index} step={step} />
      ))}
      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonText}>Próximo Módulo</Text>
      </TouchableOpacity>
    </View>
  );
}

function InteractiveStep({ step }) {
  const [userInput, setUserInput] = useState("");

  return (
    <View style={styles.stepContainer}>
      <View style={styles.gifContainer}>
        <Image
          source={gifSource}
          style={styles.gif}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.stepInstruction}>{step.instruction}</Text>
      <Text style={styles.exampleCode}>{step.exampleCode}</Text>
      <TextInput
        style={styles.textInput}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Digite seu código aqui"
      />
      <Text style={styles.hint}>Dica: {step.hint}</Text>
    </View>
  );
}

function Quiz({ quiz, onFinish }) {
  const [userAnswers, setUserAnswers] = useState(Array(quiz.length).fill(""));
  const [quizFinished, setQuizFinished] = useState(false);
  const navigation = useNavigation();

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach((question, index) => {
      if (userAnswers[index] === question.expectedAnswer) {
        score++;
      }
    });

    if (score >= 3) {
      Alert.alert("Parabéns!", `Você acertou ${score} de ${quiz.length} perguntas. Você foi aprovado!`);
      navigation.navigate('Game', { score });
    } else {
      Alert.alert("Que pena!", `Você acertou apenas ${score} de ${quiz.length} perguntas. Tente novamente!`);
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setUserAnswers(Array(quiz.length).fill(""));
    setQuizFinished(false);
  };

  return (
    <View style={styles.quizContainer}>
      <Text style={styles.quizTitle}>Quiz Final</Text>
      {quiz.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.answerType === "multipleChoice" ? (
            question.options.map((option, optionIndex) => (
              <TouchableOpacity
                key={optionIndex}
                style={[styles.optionButton, userAnswers[index] === option && styles.selectedOptionButton]}
                onPress={() => handleAnswerChange(index, option)}
              >
                <Text style={[styles.optionText, userAnswers[index] === option ? styles.optionTextSelected : styles.optionTextDefault]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <TextInput
              style={styles.textInput}
              value={userAnswers[index]}
              onChangeText={(text) => handleAnswerChange(index, text)}
              placeholder="Sua resposta"
            />
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.calculateButton} onPress={calculateScore}>
        <Text style={styles.buttonText}>Calcular Pontuação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#333',
  },
  gif: {
    width: 200,
    height: 200,
  },
  gifContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  moduleContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  moduleTitle: {
    fontSize: 22,
    color: '#fff3db',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  moduleDescription: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stepContainer: {
    marginBottom: 15,
  },
  stepInstruction: {
    fontSize: 18,
    color: '#f7e1c9',
    fontWeight: 'bold',
  },
  exampleCode: {
    fontSize: 14,
    color: '#4d1948',
    backgroundColor: '#f7e1c9',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#666',
    color: '#000',
    backgroundColor: '#f7e1c9',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  hint: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  quizContainer: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  quizTitle: {
    fontSize: 26,
    color: '#f7e1c9',
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 15,
  },
  questionContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#cb9fc6',
    borderRadius: 8,
  },
  questionText: {
    fontSize: 18,
    color: '#4d1948',
    fontWeight: 'bold',
  },
  optionButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#f7e1c9',
    borderRadius: 8,
    marginTop: 10,
  },
  selectedOptionButton: {
    backgroundColor: '#b03892',
    borderColor: '#fff',
  },
  optionText: {
    color: '#4d1948',
    fontSize: 16,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#fff',
  },
  optionTextDefault: {
    color: '#4d1948',
  },
  calculateButton: {
    padding: 15,
    backgroundColor: '#b03892',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#b03892',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LearningPath;
