"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import detectTemp from "@/lib/temp";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type resultState = {
    isTemp: Boolean,
    success: Boolean,
    domain: string
}

export default function Dectector() {
    const [email, setEmail] = useState("")
    const [result, setResult] = useState<resultState | null>(null)
    const [loading, setLoading] = useState(false)

    const handleCheckEmail = async () => {
        try {
            if (!email || !email.trim() || email === "") return

            setLoading(true)
            const res = await detectTemp(email)

            if (!res) return

            setTimeout(() => {
                setLoading(false)
            }, 1500);

            console.log(res);

            setResult(res)
        } catch (error: any) {
            console.log(error);

        }
    }
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Detect Temp Email
                        </CardTitle>
                        <CardDescription>
                            Spot if the email is a temporary email
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="col-span-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleCheckEmail} disabled={loading}>
                            Submit
                            {loading && <Loader2 className="h-3 w-3 ml-1 animate-spin" />}
                        </Button>
                    </CardFooter>
                </Card>
                {/* result */}
                {
                    result && !loading && (
                        <Card className="mt-5">
                            <CardHeader>
                                <CardTitle>
                                    Result
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {/* domain */}
                                    {result.domain}
                                </p>
                                <p className={`${result.isTemp === false ? "text-green-600" : "text-red-500"} text-sm text-muted-foreground`}>
                                    {result.isTemp === false ? "This email is not a temporary email" : "This email is a temporary email"}
                                </p>
                            </CardContent>
                        </Card>
                    )
                }

            </div>
        </div>
    );
}