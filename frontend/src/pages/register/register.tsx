import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "@/services/authService";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const data = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", data.token);

      alert("Registration Successful!");

      navigate("/");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Registration Failed");
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
            Create your account
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              placeholder="Krishna Pal"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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

          <div>
            <Label>Confirm Password</Label>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}