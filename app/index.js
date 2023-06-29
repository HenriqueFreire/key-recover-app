import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { authentication } from '../firebaseConfig'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'

export default function Logis() {
  const router = useRouter()
  
  const [email,setEmail] = useState()
  const [password,setpassword] = useState()

  function loginUser() {
    authentication
    signInWithEmailAndPassword(authentication, email, password)
    .then((userCredential) => {
      router.replace('/home')     
    })
    .catch((error) => {
      alert(error.code)
    });
  }

  function recoverPassword() {
    sendPasswordResetEmail(email).then(()=>{
      alert('Email enviado com sucesso!')
    })
    .catch((error) => {
      alert(error.code)
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container} /*behavior='padding'*/>
      <Link href='/'>
      <Text style={styles.title}>Key Recovery</Text>
      </Link>      
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail}/>
        <TextInput style={styles.input} placeholder='Senha' value={password} onChangeText={setpassword} secureTextEntry/>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={loginUser}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.linkContainer}>
          <Link style={[styles.buttonOutLineText, {marginTop: 50}]} href='/register'>Cadastre-se!</Link>
          <Link style={[styles.buttonOutLineText, {marginTop: 50}]} onPress={recoverPassword}>Esqueci minha senha</Link>
        </View>       
    </KeyboardAvoidingView>    
)
}

const styles = StyleSheet.create({  
  button:{
    alignItems: 'center',
    backgroundColor: '#0782F9',
    borderRadius: 10,
    padding: 15,
    width: '100%',
  },
  
  buttonContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    width: '60%',
  },
  
  buttonOutLine:{
    backgroundColor: 'white',
    borderColor: '#0782F9',
    borderWidth: 2,
    marginTop: 5,
  },
  
  buttonOutLineText:{
    color: '#0782F9',
    fontSize: 16,
    fontWeight: '700',
  },

  buttonText:{
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  container:{
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  
  input:{
    backgroundColor: 'white',
    borderRadius: 10,
    borderBottomWidth: 1,
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  inputContainer:{
    width: '80%',
  },

  linkContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  title:{
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 20,
  },
})