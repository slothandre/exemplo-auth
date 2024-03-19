import { Button, StyleSheet, TextInput, View } from "react-native";

// Importando os recursos de autenticação
import { auth } from "../../firebase.config";

// Importando a função de login com e-mail e senha
import { signInWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção!", "Preencha e-mail e senha!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace("AreaLogada");
    } catch (error) {
      console.error(error.code);
      let mensagem;
      switch (error.code) {
        case "auth/invalid-credential":
          mensagem = "Dados inválidos!";
          break;
        case "auth/invalid-email":
          mensagem = "Endereço de e-mail inválido!";
          break;
        default:
          mensagem = "Houve um erro, tente mais tarde!";
          break;
      }
      Alert.alert("Ops!", mensagem);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput placeholder="E-mail" style={estilos.input} />
        <TextInput placeholder="Senha" style={estilos.input} secureTextEntry />
        <View style={estilos.botoes}>
          <Button title="Entre" color="green" />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginBottom: 32,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
