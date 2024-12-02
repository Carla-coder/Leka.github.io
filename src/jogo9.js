import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const learningPathData = {
    learningPath: {
        modules: [
            {
                id: 1,
                title: "1. HTML5: Semântica e Estruturas Avançadas",
                description: "Aprenda a usar tags semânticas para melhorar a acessibilidade e SEO.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie uma estrutura HTML5 com seções, cabeçalho e rodapé.",
                        exampleCode: "<header>\n  <h1>Meu Blog</h1>\n</header>\n<section>\n  <article>\n    <h2>Título do Artigo</h2>\n    <p>Conteúdo do artigo...</p>\n  </article>\n</section>\n<footer>\n  <p>© 2024 Meu Blog</p>\n</footer>",
                        hint: "Use <header>, <section>, <article>, e <footer> para a estrutura.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 2,
                title: "2. CSS: Flexbox e Alinhamento Complexo",
                description: "Domine o Flexbox para layouts dinâmicos e responsivos.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie um layout com três itens alinhados no centro usando Flexbox.",
                        exampleCode: ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n.item {\n  margin: 10px;\n  padding: 20px;\n  background-color: lightcoral;\n}",
                        hint: "Use 'justify-content' e 'align-items' para centralizar.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 3,
                title: "3. JavaScript: Funções Assíncronas e Promises",
                description: "Entenda como trabalhar com funções assíncronas e Promises para lidar com operações assíncronas.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie uma função que busca dados de uma API e retorna uma Promise.",
                        exampleCode: "function buscarDados(url) {\n  return fetch(url)\n    .then(response => response.json());\n}",
                        hint: "Use 'fetch()' para fazer uma requisição à API.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 4,
                title: "4. CSS: Transições e Transformações Avançadas",
                description: "Aprenda a criar animações com transições e transformações CSS.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie uma animação que aumenta e muda a cor de um elemento ao passar o mouse.",
                        exampleCode: ".box {\n  width: 100px;\n  height: 100px;\n  background-color: blue;\n  transition: transform 0.3s, background-color 0.3s;\n}\n.box:hover {\n  transform: scale(1.2);\n  background-color: green;\n}",
                        hint: "Combine 'transform' e 'transition' para efeitos suaves.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 5,
                title: "✏ Quiz Final Avançado",
                quiz: [
                    {
                        question: "1. Qual a principal vantagem de usar tags semânticas em HTML?",
                        answerType: "multipleChoice",
                        options: [
                            "Melhora o desempenho da página.",
                            "Aumenta a legibilidade do código para humanos e máquinas.",
                            "Facilita a estilização com CSS.",
                        ],
                        expectedAnswer: "Aumenta a legibilidade do código para humanos e máquinas.",
                    },
                    {
                        question: "2. Como você centraliza um item flexível em um contêiner flexível?",
                        answerType: "multipleChoice",
                        options: [
                            "Usando 'margin: auto;'",
                            "Definindo 'justify-content: center;' e 'align-items: center;'",
                            "Usando 'text-align: center;'",
                        ],
                        expectedAnswer: "Definindo 'justify-content: center;' e 'align-items: center;'",
                    },
                    {
                        question: "3. O que faz uma Promise em JavaScript?",
                        answerType: "multipleChoice",
                        options: [
                            "Retorna um valor sincrono.",
                            "Representa uma operação que pode ser concluída agora ou no futuro.",
                            "É um tipo de função que não aceita parâmetros.",
                        ],
                        expectedAnswer: "Representa uma operação que pode ser concluída agora ou no futuro.",
                    },
                    {
                        question: "4. Qual propriedade CSS permite a criação de animações suaves?",
                        answerType: "multipleChoice",
                        options: [
                            "transition",
                            "animation",
                            "transform",
                        ],
                        expectedAnswer: "transition",
                    },
                    {
                        question: "5. Como você manipula o DOM para adicionar um novo elemento em JavaScript?",
                        answerType: "multipleChoice",
                        options: [
                            "document.addElement('div');",
                            "document.appendChild('div');",
                            "document.createElement('div');",
                        ],
                        expectedAnswer: "document.createElement('div');",
                    },
                ],
            },
        ],
    }
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
            navigation.navigate('Certificado', { score });
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
