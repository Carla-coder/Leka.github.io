import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const learningPathData = {
    learningPath: {
        modules: [
            {
                id: 1,
                title: "1. HTML Semântico",
                description: "Aprenda a usar tags HTML semânticas para melhorar a acessibilidade e SEO.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie uma estrutura HTML semântica usando <header>, <nav>, <main> e <footer>.",
                        exampleCode: "<header>\n  <h1>Título do Site</h1>\n</header>\n<nav>\n  <ul>\n    <li>Home</li>\n   </ul>\n</nav>\n<main></main>\n<footer></footer>",
                        hint: "Use tags semânticas para estruturar o conteúdo de forma clara.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 2,
                title: "2. Flexbox e Grid Layout",
                description: "Domine técnicas de layout modernas usando Flexbox e CSS Grid.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Utilize Flexbox para criar um layout de card simples.",
                        exampleCode: ".container {\n  display: flex;\n  justify-content: space-around;\n}\n.card {\n  width: 200px;\n  height: 300px;\n}",
                        hint: "Use 'display: flex' para habilitar o Flexbox.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 3,
                title: "3. Manipulação de DOM com JavaScript",
                description: "Aprenda a manipular o DOM usando JavaScript para criar interatividade dinâmica.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Escreva um código JavaScript para adicionar um novo item a uma lista quando um botão for clicado.",
                        exampleCode: "<script>\n  function addItem() {\n    const li = document.createElement('li');\n    li.textContent = 'Novo Item';\n    document.getElementById('minhaLista').appendChild(li);\n  }\n</script>",
                        hint: "Use 'document.createElement' para criar novos elementos.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 4,
                title: "4. Transições e Animações CSS",
                description: "Aprenda a aplicar transições e animações para tornar suas páginas mais dinâmicas.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Adicione uma transição suave a um botão ao passar o mouse.",
                        exampleCode: ".botao {\n  transition: background-color 0.3s;\n}\n.botao:hover {\n  background-color: #4CAF50;\n}",
                        hint: "Use a propriedade 'transition' para definir a animação.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 5,
                title: "✏ Quiz Final Avançado",
                quiz: [
                    {
                        question: "1. Quais tags HTML semânticas melhoram a acessibilidade?",
                        answerType: "multipleChoice",
                        options: [
                            "<div>, <span>",
                            "<header>, <footer>",
                            "<b>, <i>",
                        ],
                        expectedAnswer: "<header>, <footer>",
                    },
                    {
                        question: "2. Qual propriedade CSS é usada para criar um layout flexível?",
                        answerType: "multipleChoice",
                        options: [
                            "display: flex;",
                            "layout: grid;",
                            "flex: true;",
                        ],
                        expectedAnswer: "display: flex;",
                    },
                    {
                        question: "3. Como você pode adicionar um item à lista em JavaScript?",
                        answerType: "code",
                        expectedAnswer: "document.getElementById('minhaLista').appendChild(novoItem);",
                    },
                    {
                        question: "4. O que a propriedade 'transition' faz no CSS?",
                        answerType: "multipleChoice",
                        options: [
                            "Altera a cor do texto.",
                            "Cria animações suaves entre estados.",
                            "Altera o layout do elemento.",
                        ],
                        expectedAnswer: "Cria animações suaves entre estados.",
                    },
                    {
                        question: "5. Para que serve a propriedade 'grid-template-columns'?",
                        answerType: "multipleChoice",
                        options: [
                            "Define a cor de fundo da grade.",
                            "Define o número e o tamanho das colunas na grade.",
                            "Define a altura da grade.",
                        ],
                        expectedAnswer: "Define o número e o tamanho das colunas na grade.",
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
            navigation.navigate('Game', { score });
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
