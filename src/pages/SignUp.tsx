//hook
import { useEffect, useState } from "react";
//react router
import { Link, useNavigate } from "react-router-dom";
//components
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
//firebase
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import useFirebase from "../hooks/useFirebase";
import { collection, getDoc, doc, setDoc } from "firebase/firestore";
//toast
import { toast } from "react-toastify";
import { LoadingDots } from "../components/ui/LoadingDots";
import { checkPassword } from "../lib/utils/SignUpHelper";

//users collection

type SignUpDataType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type SignUpErrorsType = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const initialSignUpData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  //input data
  const [signUpData, setSignUpData] =
    useState<SignUpDataType>(initialSignUpData);
  //loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  //errors
  const [signUpErrors, setSignUpErrors] =
    useState<SignUpErrorsType>(initialSignUpData);

  const { auth, googleProvider, firestoredb } = useFirebase();

  const navigation = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation("/dashboard", { replace: true });
      }
      setIsLoadingUser(false);
    });

    return () => unsubscribe();
  }, [navigation, auth]);

  if (isLoadingUser) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-primary-50">
        <LoadingDots color="text-primary-500" size="8" />
      </div>
    );
  }

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSignUpErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const signUpValidation = async () => {
    let newErrors: SignUpErrorsType = {};
    const emailRegex = /^(?!.*\s)(?=.*@)(?=.*\.)/;

    if (!signUpData.fullName) {
      newErrors.fullName = "Name is required";
    }
    if (!signUpData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(signUpData.email)) {
      newErrors.email = "Please input a valid email address";
    }

    const passwordError = await checkPassword(signUpData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (!signUpData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setSignUpErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);

      if (!signUpValidation()) return;

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      );
      const user = userCredentials.user;

      const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        signUpData.fullName
      )}&background=random`;

      await setDoc(doc(firestoredb, "users", user.uid), {
        userId: user.uid,
        name: signUpData.fullName,
        email: user.email,
        photoURL: avatarURL,
        createdAt: new Date(),
      });
      await sendEmailVerification(user);
      navigation("/dashboard", { replace: true });
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        setSignUpErrors((prev) => ({
          ...prev,
          email: "Email is already in use",
        }));
      } else if (error.code === "auth/invalid-email") {
        setSignUpErrors((prev) => ({
          ...prev,
          email: "Email address is invalid",
        }));
      } else if (error.code === "auth/weak-password") {
        setSignUpErrors((prev) => ({
          ...prev,
          password: "Password is too weak",
        }));
      } else {
        console.log(error.code);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);
      const user = userCredentials.user;
      const userDoc = await getDoc(doc(firestoredb, "users", user.uid));

      const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.displayName || "User"
      )}&background=random`;

      if (!userDoc.exists()) {
        await setDoc(doc(firestoredb, "users", user.uid), {
          userId: user.uid,
          name: user.displayName || "User",
          email: user.email,
          photoURL: avatarURL,
          createdAt: new Date(),
        });
      }
      navigation("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occurred. Please try again...");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-primary-50">
      <div className="form flex flex-col gap-6 w-full md:shadow-[0px_0px_15px_0px_rgba(0,_0,_0,_0.1)] rounded-3xl md:w-[350px] p-6">
        <div className="flex flex-col items-center gap-4">
          <Link className="h-14" to="/">
            <img
              src="logos/logoDefault.svg"
              className="h-full object-contain"
            />
          </Link>
          <h1 className="text-3xl font-bold text-neutral-800">
            Create an account
          </h1>
          <p>
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-primary-600 font-semibold cursor-pointer transition-all duration-300 hover:text-primary-400"
            >
              Sing in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-full flex flex-col gap-1 items-start">
                <label className="text-sm text-neutral-500">First Name</label>
                <Input
                  placeholder="Full Name"
                  className="drop-shadow-none"
                  value={signUpData.fullName}
                  name="fullName"
                  onChange={handleChangeInputs}
                  isInvalid={!!signUpErrors.fullName}
                  labelText={signUpErrors.fullName}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1 items-start">
              <label className="text-sm text-neutral-500">Email</label>
              <Input
                placeholder="Email address"
                className="drop-shadow-none"
                value={signUpData.email}
                name="email"
                onChange={handleChangeInputs}
                isInvalid={!!signUpErrors.email}
                labelText={signUpErrors.email}
              />
            </div>
            <div className="w-full flex flex-col gap-1 items-start">
              <label className="text-sm text-neutral-500">Password</label>
              <Input
                placeholder="Password"
                type="password"
                className="drop-shadow-none"
                value={signUpData.password}
                name="password"
                onChange={handleChangeInputs}
                isInvalid={!!signUpErrors.password}
                labelText={signUpErrors.password}
              />
            </div>
            <div className="w-full flex flex-col gap-1 items-start">
              <label className="text-sm text-neutral-500">
                Confirm password
              </label>
              <Input
                placeholder="Confirm password"
                type="password"
                className="drop-shadow-none"
                value={signUpData.confirmPassword}
                name="confirmPassword"
                onChange={handleChangeInputs}
                isInvalid={!!signUpErrors.confirmPassword}
                labelText={signUpErrors.confirmPassword}
              />
            </div>
          </div>
          <Button className="w-full" onClick={handleSignUp}>
            {isLoading ? <Spinner size="25px" /> : "Sign Up"}
          </Button>
          <span className="h-[2px] bg-primary-100 w-full"></span>
          <Button onClick={handleSignInWithGoogle}>
            <div className="flex items-center justify-center gap-2">
              <div className="h-6">
                <img src="googleIcon.svg" className="h-full object-contain" />
              </div>
              <span>Sign Up with Google</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
