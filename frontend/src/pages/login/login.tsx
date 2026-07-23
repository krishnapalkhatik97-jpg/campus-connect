import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "@/services/authService";
import socket from "@/socket";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const data = await login({
        email: formData.email,
        password: formData.password,
      });

      // Save Login Details
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Connect Socket
      socket.connect();
      socket.emit("setup", data.user.id);

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            CampusConnect
          </CardTitle>

          <p className="text-center text-gray-500">
            Login to your account
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div>
            <Label>Email</Label>

            <Input
              name="email"
              type="email"
              placeholder="krishna@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Password</Label>

            <Input
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}