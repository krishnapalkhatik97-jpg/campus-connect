import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Register() {
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
            <Input placeholder="Krishna Pal" />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="krishna@gmail.com"
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="********"
            />
          </div>

          <div>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="********"
            />
          </div>

          <Button className="w-full">
            Create Account
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