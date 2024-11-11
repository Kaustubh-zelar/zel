// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth } from './firebaseConfig'
// import { useAuth } from './useAuth'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// export default function AuthPage() {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [error, setError] = useState<string | null>(null)
//     const [loading, setLoading] = useState(false)
//     const [mode, setMode] = useState<'login' | 'signup'>('login')
//     const router = useRouter()
//     const { user } = useAuth()

//     useEffect(() => {
//         if (user) {
//             router.push('/dashboard')
//         }
//     }, [user, router])

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         setError(null)
//         setLoading(true)

//         try {
//             if (mode === 'login') {
//                 await signInWithEmailAndPassword(auth, email, password)
//                 console.log('Login successful')
//             } else {
//                 await createUserWithEmailAndPassword(auth, email, password)
//                 console.log('Signup successful')
//             }
//             // Navigation is handled by the useEffect hook
//         } catch (error) {
//             setError(mode === 'login'
//                 ? 'Failed to log in. Please check your email and password.'
//                 : 'Failed to sign up. This email might be already in use.')
//             console.error('Auth error:', error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     if (user) {
//         return null; // or a loading spinner
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <Card className="w-full max-w-md">
//                 <CardHeader>
//                     <CardTitle className="text-2xl">Welcome</CardTitle>
//                     <CardDescription>Sign in to your account or create a new one.</CardDescription>
//                 </CardHeader>
//                 <Tabs value={mode} onValueChange={(value) => setMode(value as 'login' | 'signup')}>
//                     <TabsList className="grid w-full grid-cols-2">
//                         <TabsTrigger value="login">Login</TabsTrigger>
//                         <TabsTrigger value="signup">Sign Up</TabsTrigger>
//                     </TabsList>
//                     <TabsContent value="login">
//                         <form onSubmit={handleSubmit}>
//                             <CardContent className="space-y-4">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="email">Email</Label>
//                                     <Input
//                                         id="email"
//                                         type="email"
//                                         placeholder="name@example.com"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="password">Password</Label>
//                                     <Input
//                                         id="password"
//                                         type="password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 {error && (
//                                     <Alert variant="destructive">
//                                         <AlertDescription>{error}</AlertDescription>
//                                     </Alert>
//                                 )}
//                             </CardContent>
//                             <CardFooter>
//                                 <Button type="submit" className="w-full" disabled={loading}>
//                                     {loading ? 'Logging in...' : 'Log in'}
//                                 </Button>
//                             </CardFooter>
//                         </form>
//                     </TabsContent>
//                     <TabsContent value="signup">
//                         <form onSubmit={handleSubmit}>
//                             <CardContent className="space-y-4">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="email">Email</Label>
//                                     <Input
//                                         id="email"
//                                         type="email"
//                                         placeholder="name@example.com"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="password">Password</Label>
//                                     <Input
//                                         id="password"
//                                         type="password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 {error && (
//                                     <Alert variant="destructive">
//                                         <AlertDescription>{error}</AlertDescription>
//                                     </Alert>
//                                 )}
//                             </CardContent>
//                             <CardFooter>
//                                 <Button type="submit" className="w-full" disabled={loading}>
//                                     {loading ? 'Signing up...' : 'Sign up'}
//                                 </Button>
//                             </CardFooter>
//                         </form>
//                     </TabsContent>
//                 </Tabs>
//             </Card>
//         </div>
//     )
// }