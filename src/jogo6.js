import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const learningPathData = {
    learningPath: {
        modules: [
            {
                id: 1,
                title: "1. HTML: Elementos e Atributos",
                description: "Aprenda sobre os principais elementos HTML e seus atributos.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Adicione uma tabela à sua página HTML.",
                        exampleCode: "<table>\n  <tr>\n    <th>Nome</th>\n    <th>Idade</th>\n  </tr>\n  <tr>\n    <td>João</td>\n    <td>25</td>\n  </tr>\n</table>",
                        hint: "Use <table>, <tr>, <th> e <td> para criar a tabela.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 2,
                title: "2. CSS: Estilizando Elementos",
                description: "Aprenda a aplicar estilos básicos a elementos HTML.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Estilize um botão para parecer mais atraente.",
                        exampleCode: "button {\n  background-color: blue;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 5px;\n}",
                        hint: "Use propriedades como 'background-color' e 'border-radius'.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 3,
                title: "3. JavaScript: Estruturas de Controle",
                description: "Entenda como usar estruturas de controle como if e loops.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie uma função que verifica se um número é par ou ímpar.",
                        exampleCode: "function verificarPar(numero) {\n  if (numero % 2 === 0) {\n    return 'Par';\n  } else {\n    return 'Ímpar';\n  }\n}",
                        hint: "Use o operador '%' para verificar a divisibilidade.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 4,
                title: "4. Manipulação do DOM com JavaScript",
                description: "Aprenda a modificar o conteúdo e estilo dos elementos na página.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Altere o texto de um cabeçalho ao clicar em um botão.",
                        exampleCode: "<h2 id='titulo'>Título Original</h2>\n<button onclick='mudarTitulo()'>Alterar Título</button>\n<script>\nfunction mudarTitulo() {\n  document.getElementById('titulo').innerText = 'Novo Título!';\n}\n</script>",
                        hint: "Use 'innerText' para mudar o texto de um elemento.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 5,
                title: "✏ Quiz Final Básico",
                quiz: [
                    {
                        question: "1. Qual tag HTML é usada para criar uma tabela?",
                        answerType: "multipleChoice",
                        options: [
                            "<list>",
                            "<table>",
                            "<data>",
                        ],
                        expectedAnswer: "<table>",
                    },
                    {
                        question: "2. Como você altera a cor de fundo de um elemento em CSS?",
                        answerType: "multipleChoice",
                        options: [
                            "background-color: yellow;",
                            "color: yellow;",
                            "bgcolor: yellow;",
                        ],
                        expectedAnswer: "background-color: yellow;",
                    },
                    {
                        question: "3. O que faz o operador '%' em JavaScript?",
                        answerType: "multipleChoice",
                        options: [
                            "Divide dois números.",
                            "Retorna o resto da divisão.",
                            "Adiciona dois números.",
                        ],
                        expectedAnswer: "Retorna o resto da divisão.",
                    },
                    {
                        question: "4. Como você adiciona um novo elemento ao DOM?",
                        answerType: "multipleChoice",
                        options: [
                            "document.createElement('div');",
                            "document.addElement('div');",
                            "document.insertElement('div');",
                        ],
                        expectedAnswer: "document.createElement('div');",
                    },
                    {
                        question: "5. O que é o método 'querySelector()'?",
                        answerType: "multipleChoice",
                        options: [
                            "Seleciona todos os elementos da página.",
                            "Seleciona o primeiro elemento que corresponde ao seletor especificado.",
                            "Cria um novo elemento na página.",
                        ],
                        expectedAnswer: "Seleciona o primeiro elemento que corresponde ao seletor especificado.",
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
