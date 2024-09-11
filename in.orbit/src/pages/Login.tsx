import logo from '../assets/logo-inorbit.svg'
import { Button } from '../components/ui/button_nlw'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Separator } from '../components/ui/separator'
import {  Github } from 'lucide-react'
import GoogleLogo from '../assets/googleLogo'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email({ message: "Endereço de email inválido" }),
    password: z.string().min(6, 'Digite uma senha válida')
})

export default function Login(){

    const {register, handleSubmit, formState} = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    })

    async function handleLogin(data:z.infer<typeof loginSchema>){
        alert(JSON.stringify(data))
    }

    return(
        <div className="h-screen py-10 max-w-[480px] px-5 mx-auto flex flex-col items-center justify-center">
            <div className=" h-fit w-full flex flex-col gap-6">
                <img src={logo} alt="In.Orbit logo" />

                <form className="flex-1 flex flex-col justify-between gap-6" onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input autoFocus id="email" {...register('email')} />
                        {formState.errors.email && (
                            <p className='text-red-400 text-sm'>{formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input id="password" type='password'  {...register('password')}/>
                        {formState.errors.password && (
                            <p className='text-red-400 text-sm'>{formState.errors.password.message}</p>
                        )}
                    </div>

                    <Button size='default' type='submit'>
                        Entrar
                    </Button>

                </form>

                <div className='w-full flex justify-center'>
                    <span>Ainda não possui uma conta? <a href='/signup' className='cursor-pointer text-violet-300'>Criar agora</a></span>
                </div>

                <Separator/>

                <Button type='button' variant='secondary' size='default'>
                    <Github/>
                    <span>Entrar com GitHub</span>
                </Button>

                <Button type='button' variant='secondary' size='default'>
                    <GoogleLogo size={24}/>
                    <span>Entrar com Google</span>
                </Button>
            </div>
        </div>
    )
}