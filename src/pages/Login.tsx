//hook
import { useEffect, useState } from "react";
//react router
import { Link, useNavigate } from "react-router-dom";
//components
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
//firebase
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import useFirebase from "../hooks/useFirebase";
//toast
import { toast } from "react-toastify";
import { LoadingDots } from "../components/ui/LoadingDots";
import { doc, getDoc, setDoc } from "firebase/firestore";

type LoginDataType = {
  email: string;
  password: string;
};
type LoginErrorsType = {
  email?: string;
  password?: string;
};

const initialLoginData = {
  email: "",
  password: "",
};

export default function Login() {
  //input data
  const [loginData, setLoginData] = useState<LoginDataType>(initialLoginData);
  //loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  //errors
  const [loginErrors, setLoginErrors] =
    useState<LoginErrorsType>(initialLoginData);

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
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLoginErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const loginValidation = () => {
    let newErrors: LoginErrorsType = {};
    const emailRegex = /^(?!.*\s)(?=.*@)(?=.*\.)/;

    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(loginData.email)) {
      newErrors.email = "Please input a valid email address";
    }
    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    setLoginErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    try {
      if (!loginValidation()) return;

      setIsLoading(true);
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      navigation("/dashboard", { replace: true });
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        setLoginErrors((prev) => ({ ...prev, password: "Wrong password" }));
      } else {
        toast.error("Unexpected error occurred. Please try again...");
      }
      console.error(error.code);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);
      const user = userCredentials.user;
      const userDoc = await getDoc(doc(firestoredb, "users", user.uid));

      console.log(userDoc)

      const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.displayName || "User"
      )}&background=random`;


      if (!userDoc.exists()) {
        setDoc(doc(firestoredb, "users", user.uid), {
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
      toast.error("Unexpected login error. Please try again...");
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
          <h1 className="text-3xl font-bold text-neutral-800">Welcome Back</h1>
          <p>
            Don't have an account?
            <Link
              to="/signup"
              className="ml-1 text-primary-600 font-semibold cursor-pointer transition-all duration-300 hover:text-primary-400"
            >
              Sing up
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-1 items-start">
              <label className="text-sm text-neutral-500">Email</label>
              <Input
                placeholder="Email address"
                className="drop-shadow-none"
                value={loginData.email}
                name="email"
                onChange={handleChangeInputs}
                isInvalid={!!loginErrors.email}
                labelText={loginErrors.email}
              />
            </div>
            <div className="w-full flex flex-col gap-1 items-start">
              <label className="text-sm text-neutral-500">Password</label>
              <Input
                placeholder="Password"
                type="password"
                className="drop-shadow-none"
                value={loginData.password}
                name="password"
                onChange={handleChangeInputs}
                isInvalid={!!loginErrors.password}
                labelText={loginErrors.password}
              />
            </div>
          </div>
          <Button className="w-full" onClick={handleSignIn}>
            {isLoading ? <Spinner size="25px" /> : "Sign in"}
          </Button>
          <span className="h-[2px] bg-primary-100 w-full"></span>
          <Button onClick={handleSignInWithGoogle}>
            <div className="flex items-center justify-center gap-2">
              <div className="h-6">
                <img src="googleIcon.svg" className="h-full object-contain" />
              </div>
              <span>Sign in with Google</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
