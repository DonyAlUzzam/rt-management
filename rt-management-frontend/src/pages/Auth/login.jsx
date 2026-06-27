import { useForm } from "react-hook-form";
import { Card, Button, Input } from "@/components/common";
import { login } from "@/services/authService";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const {

        register,

        handleSubmit

    } = useForm();

    const auth = useAuth();

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try {

            const response = await login(data);

            auth.login(

                response.data.user,

                response.data.token

            );

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="flex min-h-screen items-center justify-center bg-gray-100">

            <Card className="w-full max-w-md">

                <h1 className="mb-6 text-center text-2xl font-bold">

                    RT Management

                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <Input
                        label="Email"
                        type="email"
                        {...register("email")}
                    />

                    <Input
                        label="Password"
                        type="password"
                        {...register("password")}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Login
                    </Button>

                </form>

            </Card>

        </div>

    );

}