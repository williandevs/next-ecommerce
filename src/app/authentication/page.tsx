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

import SignInForm from "./components/sing-in-form";
import SignUpForm from "./components/sing-up-form";

// códidigo ts

const Authentication = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="sing-in">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="sing-in">Entrar</TabsTrigger>
            <TabsTrigger value="sing-up">Criar Conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sing-in">
            <SignInForm />
          </TabsContent>
          
          <TabsContent value="sing-up">
              <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Authentication;
