import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { authentication, storage_db} from '../firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {
  const router = useRouter()

  const [idUser,setIdUser] = useState()
  const [userName,setUserName] = useState()
  const [email,setEmail] = useState()
  const [password,setpassword] = useState()

  function createUser() {
    createUserWithEmailAndPassword(authentication, email, password)
    .then((userCredential) => {
      setDoc(doc(storage_db, "Users", userCredential.user.uid), {      
        id: userCredential.user.uid,
        userName: userName,
        CPF: idUser
      })
      .then(() => {
         Alert.alert('Cadastro concluído!', 'Foi enviado um e-mail de ativação')
         router.push('/')
      })
      .catch((error) => {
        alert('Ocorreu um erro!')        
      })
    })
    .catch((error) => {
      alert(error.code)
    })    
  }

  return (
    <KeyboardAvoidingView style={styles.container} /*behavior='padding'*/>
        <Text style={styles.title}>Registro</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder='Nome Completo' value={userName} onChangeText={setUserName}/>
          <TextInput style={styles.input} placeholder='CPF' value={idUser} onChangeText={setIdUser}/>
          <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail}/>
          <TextInput style={styles.input} placeholder='Senha (mínimo de 6 dígitos)' value={password} onChangeText={setpassword} secureTextEntry/>
        </View>
        <View style={styles.buttonContainer}>          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={createUser}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.linkContainer}>
          <Link style={[styles.buttonOutLineText, {marginTop: 50}]} href='/'>Já tem conta?</Link>
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