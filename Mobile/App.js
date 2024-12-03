import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import MotivoScreen from './src/MotivoScreen';
import MelhorOpcaoScreen from './src/MelhorOpcaoScreen';
import ExperienciaScreen from './src/ExperienciaScreen';
import AspectoScreen from './src/AspectoScreen';
import InteressanteScreen from './src/InteressanteScreen';
import ResultadoScreen from './src/ResultadoScreen';
import WelcomeScreen from './src/WelcomeScreen';
import TimeScreen from './src/TimeScreen';
import TrilhaScreen from './src/TrilhaScreen';
import JogoScreen from './src/JogoScreen'; 
import Pergunta from './src/perguntas'; 
import jogo1 from './src/jogo'; 
import jogo2 from './src/jogo2'; 
import jogo3 from './src/jogo3'; 
import jogo4 from './src/jogo4'; 
import jogo5 from './src/jogo5'; 
import jogo6 from './src/jogo6'; 
import jogo7 from './src/jogo7'; 
import jogo8 from './src/jogo8'; 
import jogo9 from './src/jogo9'; 
import Perfil from './src/PerfilScreen'; 
import Resumo from './src/ResumoScreen'; 
import Amigos from './src/AmigosScreen'; 
import CommunityScreen from './src/CommunityScreen'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="bemvindo">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Motivo" component={MotivoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MelhorOpcao" component={MelhorOpcaoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Experiencia" component={ExperienciaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Aspecto" component={AspectoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Interessante" component={InteressanteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Resultado" component={ResultadoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="bemvindo" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Time" component={TimeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Trilha" component={TrilhaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={JogoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Pergunta" component={Pergunta} options={{ headerShown: false }} />
        <Stack.Screen name="Jogo1" component={jogo1} options={{ headerShown: false }} />
        <Stack.Screen name="Jogo2" component={jogo2} options={{ headerShown: false }} />
        <Stack.Screen name="Jogo3" component={jogo3} options={{ headerShown: false }} />
        <Stack.Screen name="Jogo4" component={jogo4} options={{ headerShown: false }} />
        <Stack.Screen name="Jogo5" component={jogo5} options={{ headerShown: false }} />
        <Stack.Screen name="Jogo6" component={jogo6} options={{ headerShown: false }} />
        <Stack.Screen name="Jogo7" component={jogo7} options={{ headerShown: false }} />
        <Stack.Screen name="Jogo8" component={jogo8} options={{ headerShown: false }} />
        <Stack.Screen name="Jogo9" component={jogo9} options={{ headerShown: false }} />
        <Stack.Screen name="Resumo" component={Resumo} options={{ headerShown: false }} />
        <Stack.Screen name="Amigos" component={Amigos} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name="CommunityScreen" component={CommunityScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
