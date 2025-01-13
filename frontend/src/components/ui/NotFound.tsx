import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
            <div className="container px-4 md:px-6 flex flex-col items-center gap-8 text-center">
                {/* Animated 404 */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="relative z-10"
                    >
                        <h1 className="text-8xl md:text-9xl font-bold text-primary text-green-600">404</h1>
                    </motion.div>

                    {/* Decorative circles */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-primary/20"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [0, -360],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-primary/10"
                    />
                </motion.div>

                {/* Text content with fade-in animation */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold">Page Not Found</h2>
                    <p className="text-muted-foreground max-w-[600px]">Sorry, we couldn't find the page you're looking for. The page might have been removed or the link might be broken.</p>
                </motion.div>

                {/* Button with hover animation */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                    <Button onClick={() => navigate("/")} className="relative group" size="lg">
                        <motion.span initial={false} animate={{ x: 0 }} whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
                            ←
                        </motion.span>
                        <span className="ml-2">Back to Home</span>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
