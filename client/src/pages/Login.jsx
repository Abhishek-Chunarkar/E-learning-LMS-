import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [tab, setTab] = useState("login");

  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryTab = searchParams.get("tab");

  useEffect(() => {
    if (queryTab === "signup" || queryTab === "login") {
      setTab(queryTab);
    }
  }, [queryTab]);

  const [
    registerUser,
    { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    return regex.test(password);
  };

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    if (type === "signup" && !isStrongPassword(signupInput.password)) {
      toast.error("Weak password. Use at least 8 characters with uppercase, lowercase, number, and symbol.");
      return;
    }
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup Failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data.message || "Login Failed");
    }
  }, [loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerError]);

  const handleTabChange = (value) => {
    setTab(value);
    setSearchParams({ tab: value });
  };

  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs value={tab} onValueChange={handleTabChange} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        {/* Signup Tab */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Create a new account and click signup when you're done.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1 relative">
                <Label>Password</Label>
                <Input
                  type={showSignupPassword ? "text" : "password"}
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Password"
                  required
                />
                <div
                  className="absolute right-2 top-[38px] cursor-pointer text-gray-500"
                  onClick={() => setShowSignupPassword((prev) => !prev)}
                >
                  {showSignupPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
                {signupInput.password && (
                  <p
                    className={`text-sm ${
                      isStrongPassword(signupInput.password) ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isStrongPassword(signupInput.password)
                      ? "Strong password"
                      : "At least 8 characters, including uppercase, lowercase, number & symbol."}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Login Tab */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login your password here. After signup, you'll be logged in.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1 relative">
                <Label>Password</Label>
                <Input
                  type={showLoginPassword ? "text" : "password"}
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Password"
                  required
                />
                <div
                  className="absolute right-2 top-[38px] cursor-pointer text-gray-500"
                  onClick={() => setShowLoginPassword((prev) => !prev)}
                >
                  {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
