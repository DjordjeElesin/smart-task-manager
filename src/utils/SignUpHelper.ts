import { validatePassword } from "firebase/auth"
import { auth } from "../context/FirebaseProvider"

const checkPassword = async (password: string) => {
  const passwordStatus = await validatePassword(auth, password)
  let errorMessage = ""

  if(!passwordStatus.containsLowercaseLetter){
    errorMessage = "Password should contain a lowercase letter"
  }
  if(!passwordStatus.containsNumericCharacter){
    errorMessage = "Password should contain a number"
  }
  if(!passwordStatus.containsUppercaseLetter){
    errorMessage = "Password should contain an uppercase letter"
  }
  if(!passwordStatus.meetsMinPasswordLength){
    errorMessage = "Password is too short"
  }

  return errorMessage
} 

export {checkPassword}