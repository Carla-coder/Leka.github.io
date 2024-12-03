import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const learningPathData = {
    learningPath: {
        modules: [
            {
                id: 1,
                title: "1. Introdução ao HTML e Acessibilidade",
                description: "Aprenda os fundamentos do HTML e como tornar suas páginas acessíveis.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Adicione um título e uma descrição a uma página HTML.",
                        exampleCode: "<h1>Bem-vindo ao meu site</h1>\n<p>Esta é uma descrição acessível.</p>",
                        hint: "Use tags HTML semânticas para melhorar a acessibilidade.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 2,
                title: "2. CSS Básico e Estilização Simples",
                description: "Descubra como usar o CSS para estilizar suas páginas.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Altere a cor de fundo de um elemento usando CSS.",
                        exampleCode: "body {\n  background-color: lightblue;\n}",
                        hint: "Use a propriedade 'background-color' para mudar a cor.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 3,
                title: "3. Introdução ao JavaScript",
                description: "Explore os conceitos básicos do JavaScript e como interagir com a página.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie uma função simples que exibe uma mensagem.",
                        exampleCode: "function mostrarMensagem() {\n  alert('Olá, mundo!');\n}",
                        hint: "Use 'alert()' para mostrar mensagens ao usuário.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 4,
                title: "4. Manipulação Básica do DOM",
                description: "Aprenda como alterar o conteúdo da página usando JavaScript.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Mude o texto de um elemento HTML usando JavaScript.",
                        exampleCode: "document.getElementById('meuElemento').innerText = 'Texto Atualizado';",
                        hint: "Use 'getElementById()' para acessar elementos da página.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 5,
                title: "✏ Quiz Final Básico",
                quiz: [
                    {
                        question: "1. O que é HTML?",
                        answerType: "multipleChoice",
                        options: [
                            "Uma linguagem de programação.",
                            "Uma linguagem de marcação para estruturar páginas.",
                            "Uma biblioteca de JavaScript.",
                        ],
                        expectedAnswer: "Uma linguagem de marcação para estruturar páginas.",
                    },
                    {
                        question: "2. Para que serve o CSS?",
                        answerType: "multipleChoice",
                        options: [
                            "Para adicionar interatividade às páginas.",
                            "Para estilizar a aparência das páginas.",
                            "Para estruturar o conteúdo das páginas.",
                        ],
                        expectedAnswer: "Para estilizar a aparência das páginas.",
                    },
                    {
                        question: "3. Como você declara uma variável no JavaScript?",
                        answerType: "multipleChoice",
                        options: [
                            "var minhaVariavel;",
                            "minhaVariavel = var;",
                            "declare minhaVariavel;",
                        ],
                        expectedAnswer: "var minhaVariavel;",
                    },
                    {
                        question: "4. O que é o DOM?",
                        answerType: "multipleChoice",
                        options: [
                            "Um tipo de banco de dados.",
                            "Uma representação em árvore da estrutura da página.",
                            "Um estilo CSS.",
                        ],
                        expectedAnswer: "Uma representação em árvore da estrutura da página.",
                    },
                    {
                        question: "5. Qual método é usado para mostrar alertas no JavaScript?",
                        answerType: "multipleChoice",
                        options: [
                            "console.log()",
                            "alert()",
                            "message()",
                        ],
                        expectedAnswer: "alert()",
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
