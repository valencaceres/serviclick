import { useState } from "react";
import { useRouter } from "next/router"

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";

import { useUser } from "~/store/hooks";

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {validate, isLoading, user} = useUser()
  const router = useRouter()

  const sendCredentials = (e: any) => {
    e.preventDefault()
    if(email && password){
      validate(email, password)
      if(!isLoading){
        router.push('/')
      }
    }
  }

  return (
    <form action="" className="flex w-96 flex-col items-center gap-2 p-2 h-[80vh] justify-center">
      <div className="w-full">
        <Label className="text-xs text-dusty-gray hover:text-dusty-gray-600">
          Correo electrónico
        </Label>
        <Input 
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        placeholder="Correo electrónico"
        />
      </div>
      <div className="w-full">
      <Label className="text-xs text-dusty-gray hover:text-dusty-gray-600">
          Contraseña
        </Label>
        <Input 
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        type="password"
        placeholder="Contraseña"
        />
      </div>
      <Button className="w-full" onClick={sendCredentials}>Iniciar sesión</Button>
    </form>
  )
}

export default SignIn