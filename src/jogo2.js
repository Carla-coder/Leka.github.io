import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const learningPathData = {
    learningPath: {
        modules: [
            {
                id: 1,
                title: "1. HTML5 Avançado",
                description: "Explore novos recursos do HTML5, como APIs e elementos avançados.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Implemente uma aplicação usando a API de Geolocalização do HTML5.",
                        exampleCode: "<script>\n  navigator.geolocation.getCurrentPosition(function(position) {\n    console.log(position.coords.latitude, position.coords.longitude);\n  });\n</script>",
                        hint: "Verifique se a localização do usuário está habilitada no navegador.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 2,
                title: "2. CSS Avançado com Variáveis e Pré-processadores",
                description: "Aprofunde-se em variáveis CSS, SASS e LESS para estilos dinâmicos.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie um tema usando variáveis CSS para cores e fontes.",
                        exampleCode: ":root {\n  --main-color: #3498db;\n  --font-family: 'Arial', sans-serif;\n}\nbody {\n  color: var(--main-color);\n  font-family: var(--font-family);\n}",
                        hint: "Use :root para definir variáveis globais.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 3,
                title: "3. JavaScript Assíncrono e Promises",
                description: "Aprenda a trabalhar com operações assíncronas utilizando Promises e Async/Await.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie uma função que busca dados de uma API usando Fetch e retorna uma Promise.",
                        exampleCode: "async function fetchData(url) {\n  const response = await fetch(url);\n  return await response.json();\n}",
                        hint: "Use 'async' para definir uma função assíncrona e 'await' para esperar a resolução da Promise.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 4,
                title: "4. Animações Avançadas com CSS e JavaScript",
                description: "Aprofunde-se em animações complexas usando keyframes e bibliotecas JavaScript.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie uma animação CSS usando keyframes para um efeito de entrada.",
                        exampleCode: "@keyframes slideIn {\n  from { transform: translateX(-100%); }\n  to { transform: translateX(0); }\n}\n.element {\n  animation: slideIn 0.5s ease-out;\n}",
                        hint: "Use @keyframes para definir a animação.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 5,
                title: "✏ Quiz Final Avançado",
                quiz: [
                    {
                        question: "1. Quais novos elementos HTML5 ajudam na estruturação de páginas?",
                        answerType: "multipleChoice",
                        options: [
                            "<article>, <aside>, <figure>",
                            "<div>, <span>",
                            "<table>, <tr>",
                        ],
                        expectedAnswer: "<article>, <aside>, <figure>",
                    },
                    {
                        question: "2. Como você define uma variável CSS?",
                        answerType: "multipleChoice",
                        options: [
                            "--minhaVariavel: valor;",
                            "var(--minhaVariavel);",
                            ":root { --minhaVariavel: valor; }",
                        ],
                        expectedAnswer: ":root { --minhaVariavel: valor; }",
                    },
                    {
                        question: "3. O que 'async' faz em uma função JavaScript?",
                        answerType: "multipleChoice",
                        options: [
                            "Faz a função executar mais rápido.",
                            "Permite o uso de 'await' dentro da função.",
                            "Transforma a função em um método de classe.",
                        ],
                        expectedAnswer: "Permite o uso de 'await' dentro da função.",
                    },
                    {
                        question: "4. Como você cria uma animação CSS com múltiplos passos?",
                        answerType: "multipleChoice",
                        options: [
                            "Usando 'animation-duration'.",
                            "Definindo @keyframes.",
                            "Usando 'transition'.",
                        ],
                        expectedAnswer: "Definindo @keyframes.",
                    },
                    {
                        question: "5. Qual método é usado para buscar dados de uma API em JavaScript?",
                        answerType: "multipleChoice",
                        options: [
                            "XMLHttpRequest.",
                            "fetch().",
                            "getData().",
                        ],
                        expectedAnswer: "fetch().",
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
