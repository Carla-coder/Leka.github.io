import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const learningPathData = {
    learningPath: {
        modules: [
            {
                id: 1,
                title: "1. HTML: Formulários Básicos",
                description: "Aprenda a criar formulários HTML para capturar dados do usuário.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie um formulário com campos para nome e email.",
                        exampleCode: "<form>\n  <label for='nome'>Nome:</label>\n  <input type='text' id='nome' name='nome'>\n  <label for='email'>Email:</label>\n  <input type='email' id='email' name='email'>\n  <input type='submit' value='Enviar'>\n</form>",
                        hint: "Use a tag <form> e os campos <input> para os dados.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 2,
                title: "2. CSS: Cores e Fundos",
                description: "Aprenda a aplicar cores e imagens de fundo em CSS.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Defina um fundo azul e texto branco para um div.",
                        exampleCode: ".caixa {\n  background-color: blue;\n  color: white;\n  padding: 20px;\n}",
                        hint: "Use 'background-color' para definir a cor de fundo.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 3,
                title: "3. JavaScript: Manipulação de Strings",
                description: "Entenda como manipular strings em JavaScript.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie uma função que converte um texto para maiúsculas.",
                        exampleCode: "function paraMaiusculas(texto) {\n  return texto.toUpperCase();\n}",
                        hint: "Use o método 'toUpperCase()' para converter para maiúsculas.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 4,
                title: "4. CSS: Transições e Animações",
                description: "Aprenda a adicionar transições suaves aos elementos.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie uma transição que altera a cor de fundo de um botão ao passar o mouse.",
                        exampleCode: "button {\n  background-color: gray;\n  transition: background-color 0.3s;\n}\nbutton:hover {\n  background-color: green;\n}",
                        hint: "Use a propriedade 'transition' para suavizar a mudança.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 5,
                title: "✏ Quiz Final Básico",
                quiz: [
                    {
                        question: "1. Qual tag HTML é usada para criar um botão?",
                        answerType: "multipleChoice",
                        options: [
                            "<input type='button'>",
                            "<button>",
                            "<btn>",
                        ],
                        expectedAnswer: "<button>",
                    },
                    {
                        question: "2. Como você define a cor do texto em CSS?",
                        answerType: "multipleChoice",
                        options: [
                            "text-color: red;",
                            "color: red;",
                            "font-color: red;",
                        ],
                        expectedAnswer: "color: red;",
                    },
                    {
                        question: "3. O que faz o método 'length' em uma string?",
                        answerType: "multipleChoice",
                        options: [
                            "Retorna o número de caracteres na string.",
                            "Converte a string para um número.",
                            "Adiciona um caractere à string.",
                        ],
                        expectedAnswer: "Retorna o número de caracteres na string.",
                    },
                    {
                        question: "4. Qual propriedade CSS permite fazer uma animação?",
                        answerType: "multipleChoice",
                        options: [
                            "animation-name",
                            "transition",
                            "keyframes",
                        ],
                        expectedAnswer: "animation-name",
                    },
                    {
                        question: "5. Como você cria um novo elemento HTML em JavaScript?",
                        answerType: "multipleChoice",
                        options: [
                            "document.addElement('div');",
                            "document.createElement('div');",
                            "document.newElement('div');",
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
