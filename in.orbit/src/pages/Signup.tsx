import logo from '../assets/logo-inorbit.svg'
import { Button } from '../components/ui/button_nlw'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
    name:   z.string().min(1, 'Digite seu nome'),
    email: z.string().email({ message: "Endereço de email inválido" }),
    password: z.string().min(6, 'Sua senha deve conter no mínimo 6 dígitos'),
    cnf_password:z.string().min(6, 'Sua senha deve conter no mínimo 6 dígitos')
}).refine((data) => data.password === data.cnf_password, {
    message:'As senhas não coincidem',
    path:['cnf_password']
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
                        <Label autoFocus htmlFor="name">Nome</Label>
                        <Input autoFocus id="name" {...register('name')} type='text'/>
                        {formState.errors.name && (
                            <p className='text-red-400 text-sm'>{formState.errors.name.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input  id="email" {...register('email')} type='email'/>
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

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="cnf_password">Confirme sua senha</Label>
                        <Input id="cnf_password" type='password'  {...register('cnf_password')}/>
                        {formState.errors.cnf_password && (
                            <p className='text-red-400 text-sm'>{formState.errors.cnf_password.message}</p>
                        )}
                    </div>

                    <Button size='default' type='submit'>
                        Entrar
                    </Button>

                </form>

                <div className='w-full flex justify-center'>
                    <span>já possui uma conta? <a href='/' className='cursor-pointer text-violet-300'>Entrar agora</a></span>
                </div>

            </div>
        </div>
    )
}